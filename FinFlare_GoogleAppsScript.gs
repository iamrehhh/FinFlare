// =============================================================================
// FinFlare 2026 — Google Apps Script for Inter Round Registration
// =============================================================================
//
// PURPOSE:
//   1. Receives form submissions from the register.html web form
//   2. Stores registration data + payment screenshot in Google Sheets & Drive
//   3. Coordinators download the confirmation PDF directly from the website
//
// SETUP:
//   1. Create a new Google Sheet (name it "FinFlare 2026 Registrations")
//   2. Open Extensions → Apps Script
//   3. Paste this entire code into the script editor
//   4. Run "setupSheets" once to create headers
//   5. Deploy as Web App:
//      - Click Deploy → New Deployment
//      - Type: Web App
//      - Execute as: Me
//      - Who has access: Anyone
//      - Copy the Web App URL
//   6. Paste the Web App URL into register.html (GOOGLE_SCRIPT_URL)
//
// SHEET LAYOUT:
//   Sheet "Registrations":
//     A: Timestamp | B: School Name | C: Coordinator | D: Contact Number
//     E: School Email | F: Total Participants | G: Amount Paid | H: Txn/UTR Ref
//     I: Screenshot Link | J: Student Emails
//
//   Sheet "Participants":
//     A: School Name | B: Event | C: Participant Name | D: Class
//     E: Section | F: Team Name | G: Phone | H: Student Email
//
//   Sheet "Individual Registrations":
//     A: Timestamp | B: School Name | C: Event | D: Participant Name
//     E: Class | F: Section | G: Team Name | H: Phone | I: Student Email
//     J: Amount Paid | K: Txn/UTR Ref | L: Screenshot Link
//
// =============================================================================


// ─── CONFIGURATION ───
var SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
var SCREENSHOT_FOLDER_NAME = "FinFlare 2026 Payment Screenshots";

// Active 9 Inter-Round Events (FinTales & FinStrokes excluded — they are intra-school junior events)
var ALLOWED_EVENTS = [
  "MockStreet",
  "PowerPitch",
  "BoardroomBattle",
  "CaseCipher",
  "BrandCraft",
  "BudgetBreaker",
  "QuizNomics",
  "MonopolyMasters",
  "EchoSpark"
];


// ═══════════════════════════════════════════════════════════════
// 1. SETUP — Run once to create sheet headers & event validation
// ═══════════════════════════════════════════════════════════════

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // --- 1. School Registrations sheet ---
  var regSheet = ss.getSheetByName("Registrations");
  if (!regSheet) {
    regSheet = ss.insertSheet("Registrations");
  }
  var regHeaders = [
    "Timestamp", "School Name", "Coordinator",
    "Contact Number", "School Email", "Total Participants",
    "Amount Paid", "Txn / UTR Ref", "Screenshot Link",
    "Student Emails"
  ];
  // Clear any old leftover header columns beyond the current schema (e.g., Payment Verified, Mail Sent)
  var maxCols = regSheet.getMaxColumns();
  if (maxCols > regHeaders.length) {
    regSheet.getRange(1, regHeaders.length + 1, 1, maxCols - regHeaders.length).clearContent().clearFormat();
  }
  regSheet.getRange(1, 1, 1, regHeaders.length).setValues([regHeaders]);
  regSheet.getRange(1, 1, 1, regHeaders.length)
    .setBackground("#B28558")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold");
  regSheet.setFrozenRows(1);

  // --- 2. School Participants sheet ---
  var partSheet = ss.getSheetByName("Participants");
  if (!partSheet) {
    partSheet = ss.insertSheet("Participants");
  }
  var partHeaders = [
    "School Name", "Event", "Participant Name", "Class",
    "Section", "Team Name", "Phone", "Student Email"
  ];
  partSheet.getRange(1, 1, 1, partHeaders.length).setValues([partHeaders]);
  partSheet.getRange(1, 1, 1, partHeaders.length)
    .setBackground("#B28558")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold");
  partSheet.setFrozenRows(1);

  // Set Event dropdown validation on Column B (rows 2 to 2000)
  var eventRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ALLOWED_EVENTS, true)
    .setAllowInvalid(false)
    .build();
  partSheet.getRange("B2:B2000").setDataValidation(eventRule);

  // --- 3. Dedicated Individual Registrations sheet ---
  var indivSheet = ss.getSheetByName("Individual Registrations");
  if (!indivSheet) {
    indivSheet = ss.insertSheet("Individual Registrations");
  }
  var indivHeaders = [
    "Timestamp", "School Name", "Event", "Participant Name",
    "Class", "Section", "Team Name", "Phone", "Student Email",
    "Amount Paid", "Txn / UTR Ref", "Screenshot Link"
  ];
  var maxIndivCols = indivSheet.getMaxColumns();
  if (maxIndivCols > indivHeaders.length) {
    indivSheet.getRange(1, indivHeaders.length + 1, 1, maxIndivCols - indivHeaders.length).clearContent().clearFormat();
  }
  indivSheet.getRange(1, 1, 1, indivHeaders.length).setValues([indivHeaders]);
  indivSheet.getRange(1, 1, 1, indivHeaders.length)
    .setBackground("#B28558")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold");
  indivSheet.setFrozenRows(1);
  indivSheet.getRange("C2:C2000").setDataValidation(eventRule); // Event dropdown on Column C

  // --- Create screenshot folder in Drive ---
  var folders = DriveApp.getFoldersByName(SCREENSHOT_FOLDER_NAME);
  if (!folders.hasNext()) {
    DriveApp.createFolder(SCREENSHOT_FOLDER_NAME);
  }

  // Auto-remove any old FinTales / FinStrokes rows if they exist
  var cleanedParts = cleanDeprecatedEventsInternal(partSheet, 2);
  var cleanedIndiv = cleanDeprecatedEventsInternal(indivSheet, 3);
  var totalCleaned = cleanedParts + cleanedIndiv;

  safeAlert(
    "Setup complete!\n\n" +
    "• 'Registrations': School delegations summary\n" +
    "• 'Participants': School participants roster\n" +
    "• 'Individual Registrations': Separate sheet for individual entries (8 fields + payment)\n" +
    "• Event dropdown validation active for 9 events\n" +
    (totalCleaned > 0 ? "• Cleaned " + totalCleaned + " old FinTales / FinStrokes row(s)\n" : "") +
    "\nDeploy as Web App and paste URL into register.html."
  );
}


// ═══════════════════════════════════════════════════════════════
// 2. WEB APP — Receives POST from the registration form
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var regSheet = ss.getSheetByName("Registrations");
    var partSheet = ss.getSheetByName("Participants");
    var indivSheet = ss.getSheetByName("Individual Registrations");

    // Ensure Individual Registrations sheet exists
    if (!indivSheet) {
      indivSheet = ss.insertSheet("Individual Registrations");
      var indivHeaders = [
        "Timestamp", "School Name", "Event", "Participant Name",
        "Class", "Section", "Team Name", "Phone", "Student Email",
        "Amount Paid", "Txn / UTR Ref", "Screenshot Link"
      ];
      indivSheet.getRange(1, 1, 1, indivHeaders.length).setValues([indivHeaders]);
      indivSheet.getRange(1, 1, 1, indivHeaders.length)
        .setBackground("#B28558")
        .setFontColor("#FFFFFF")
        .setFontWeight("bold");
      indivSheet.setFrozenRows(1);
    }

    var timestamp = data.timestamp || new Date().toLocaleString("en-IN");
    var isIndividual = (data.regType === "Individual" || (data.coordinator && data.coordinator.indexOf("Student:") === 0));
    var school = data.school || "";
    var coord = data.coordinator || "";
    var phone = data.phone || "";
    var email = data.email || "";
    var totalPart = data.totalParticipants || 0;
    var amtPaid = data.amountPaid || 0;
    var txnRef = data.txnRef || "";
    var studentEmails = data.studentEmails || "";
    var participants = data.participants || [];

    // Save screenshot to Google Drive (base64 encoded)
    var screenshotLink = "";
    if (data.screenshot && data.screenshotName) {
      screenshotLink = saveScreenshot(data.screenshot, data.screenshotName, school);
    }

    if (isIndividual) {
      // ──── FAST BATCH WRITE TO 'Individual Registrations' SHEET ────
      if (participants.length > 0) {
        var indivRows = participants.map(function(p) {
          return [
            timestamp,
            (p.school || school),
            p.event,
            p.name,
            p.cls,
            (p.sec || ""),
            p.team,
            p.phone,
            p.mail,
            amtPaid,
            txnRef,
            screenshotLink
          ];
        });
        var lastRow = indivSheet.getLastRow();
        indivSheet.getRange(lastRow + 1, 1, indivRows.length, indivRows[0].length).setValues(indivRows);
      }
    } else {
      // ──── FAST BATCH WRITE TO 'Registrations' & 'Participants' SHEETS ────
      regSheet.appendRow([
        timestamp, school, coord, phone, email,
        totalPart, amtPaid, txnRef, screenshotLink,
        studentEmails
      ]);

      if (participants.length > 0) {
        var partRows = participants.map(function(p) {
          return [
            (p.school || school),
            p.event,
            p.name,
            p.cls,
            (p.sec || ""),
            p.team,
            p.phone,
            p.mail
          ];
        });
        var lastRow = partSheet.getLastRow();
        partSheet.getRange(lastRow + 1, 1, partRows.length, partRows[0].length).setValues(partRows);
      }
    }

    SpreadsheetApp.flush(); // Commit all pending changes immediately

    // Return success
    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok" })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "FinFlare 2026 Registration API is live." })
  ).setMimeType(ContentService.MimeType.JSON);
}


// ═══════════════════════════════════════════════════════════════
// 3. SAVE SCREENSHOT TO GOOGLE DRIVE (CACHED FOLDER LOOKUP)
// ═══════════════════════════════════════════════════════════════

function getScreenshotFolder() {
  var props = PropertiesService.getScriptProperties();
  var folderId = props.getProperty("SCREENSHOT_FOLDER_ID");
  if (folderId) {
    try {
      return DriveApp.getFolderById(folderId);
    } catch (e) {}
  }
  var folders = DriveApp.getFoldersByName(SCREENSHOT_FOLDER_NAME);
  var folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(SCREENSHOT_FOLDER_NAME);
  try {
    props.setProperty("SCREENSHOT_FOLDER_ID", folder.getId());
  } catch (e) {}
  return folder;
}

function saveScreenshot(base64Data, fileName, schoolName) {
  try {
    // Remove data URL prefix if present (e.g., "data:image/png;base64,")
    var base64Clean = base64Data.replace(/^data:[^;]+;base64,/, "");
    var cleanSchool = (schoolName || "School").replace(/[^a-zA-Z0-9]/g, "_");
    var isPdf = fileName && fileName.toLowerCase().indexOf(".pdf") > 0;
    var blob = Utilities.newBlob(
      Utilities.base64Decode(base64Clean),
      isPdf ? MimeType.PDF : MimeType.JPEG,
      cleanSchool + "_" + fileName
    );

    var folder = getScreenshotFolder();
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();
  } catch (err) {
    Logger.log("Screenshot save error: " + err.toString());
    return "Error saving: " + err.toString();
  }
}


// ═══════════════════════════════════════════════════════════════
// 4. CLEANUP & DATA VALIDATION UTILITIES
// ═══════════════════════════════════════════════════════════════

function cleanDeprecatedEventsInternal(sheet, colIndex) {
  if (!sheet) return 0;
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return 0;
  var values = sheet.getRange(2, colIndex, lastRow - 1, 1).getValues();
  var deleted = 0;
  for (var i = values.length - 1; i >= 0; i--) {
    var ev = String(values[i][0]).replace(/[\s_]/g, "").toLowerCase();
    if (ev === "fintales" || ev === "finstrokes") {
      sheet.deleteRow(i + 2);
      deleted++;
    }
  }
  return deleted;
}

function removeDeprecatedEventRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var partSheet = ss.getSheetByName("Participants");
  var indivSheet = ss.getSheetByName("Individual Registrations");
  var d1 = cleanDeprecatedEventsInternal(partSheet, 2);
  var d2 = cleanDeprecatedEventsInternal(indivSheet, 3);
  safeAlert("Done! Cleaned " + (d1 + d2) + " row(s) containing FinTales or FinStrokes.");
}

function updateEventValidation() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(ALLOWED_EVENTS, true)
    .setAllowInvalid(false)
    .build();

  var partSheet = ss.getSheetByName("Participants");
  if (partSheet) {
    partSheet.getRange("B2:B2000").setDataValidation(rule);
  }
  var indivSheet = ss.getSheetByName("Individual Registrations");
  if (indivSheet) {
    indivSheet.getRange("C2:C2000").setDataValidation(rule);
  }

  safeAlert(
    "Updated Event validation with active 9 events in:\n" +
    "• Participants (Column B)\n" +
    "• Individual Registrations (Column C)\n\n" +
    ALLOWED_EVENTS.join("\n• ")
  );
}

function safeAlert(msg) {
  try {
    SpreadsheetApp.getUi().alert(msg);
  } catch (err) {
    Logger.log(msg);
  }
}


// ═══════════════════════════════════════════════════════════════
// 5. CUSTOM MENU — Adds FinFlare menu to the spreadsheet
// ═══════════════════════════════════════════════════════════════

function onOpen() {
  try {
    SpreadsheetApp.getUi().createMenu("🔥 FinFlare")
      .addItem("📋 Setup Sheets & Headers", "setupSheets")
      .addItem("🎯 Update Allowed Events Dropdown", "updateEventValidation")
      .addItem("🧹 Remove FinTales / FinStrokes Rows", "removeDeprecatedEventRows")
      .addSeparator()
      .addItem("ℹ️ About", "showAbout")
      .addToUi();
  } catch (err) {
    Logger.log("Menu could not be attached: " + err.toString());
  }
}

function showAbout() {
  safeAlert(
    "FinFlare 2026 — Registration Manager\n\n" +
    "Sheets Layout:\n" +
    "• 'Registrations': School delegation submissions\n" +
    "• 'Participants': School participants roster\n" +
    "• 'Individual Registrations': Dedicated sheet for all individual student entries\n\n" +
    "Active Events (9):\n• " + ALLOWED_EVENTS.join("\n• ") + "\n\n" +
    "Contact: teamfinflare@gmail.com"
  );
}
