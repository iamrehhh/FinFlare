
(function () {
  "use strict";

  /* Direct-submission endpoint: registrations + payment screenshot are
     posted here so the team receives them straight into the inbox/Excel flow.
     FormSubmit activates on first use via a confirmation mail to the inbox. */
  var SUBMIT_URL = "https://formsubmit.co/ajax/teamfinflare@gmail.com";

  var EVENTS = [
    { name: "MockStreet", min: 11, max: 12 },
    { name: "PowerPitch", min: 11, max: 12 },
    { name: "BoardroomBattle", min: 11, max: 12 },
    { name: "CaseCipher", min: 9, max: 10 },
    { name: "BrandCraft", min: 9, max: 10 },
    { name: "BudgetBreaker", min: 9, max: 10 },
    { name: "QuizNomics", min: 6, max: 8 },
    { name: "MonopolyMasters", min: 6, max: 8 },
    { name: "EchoSpark", min: 6, max: 8 }
  ];

  var body = document.getElementById("partsBody");
  var addBtn = document.getElementById("addRowBtn");
  var FEE = 300;
  var partCount = document.getElementById("partCount");
  var totalAmt = document.getElementById("totalAmt");
  var formError = document.getElementById("formError");
  var payShot = document.getElementById("payShot");
  var fileNote = document.getElementById("fileNote");
  var shotName = "";

  function eventOptions() {
    var h = '<option value="">Select event</option>';
    EVENTS.forEach(function (e) {
      h += '<option value="' + e.name + '" data-min="' + e.min + '" data-max="' + e.max + '">' +
           e.name + " (Class " + e.min + "\u2013" + e.max + ")</option>";
    });
    return h;
  }

  function classOptions() {
    var h = '<option value="">Class</option>';
    for (var c = 3; c <= 12; c++) h += '<option value="' + c + '">' + c + "</option>";
    return h;
  }

  function renumber() {
    var rows = body.querySelectorAll("tr");
    rows.forEach(function (r, i) {
      r.querySelector(".idx").textContent = i + 1;
    });
    partCount.textContent = rows.length;
    updateTotal();
  }

  function updateTotal() {
    var n = body.querySelectorAll("tr").length;
    totalAmt.textContent = "\u20B9" + (FEE * n).toLocaleString("en-IN");
  }

  function checkRow(tr) {
    var ev = tr.querySelector(".p-event");
    var cl = tr.querySelector(".p-class");
    var warn = tr.querySelector(".row-warn");
    var opt = ev.options[ev.selectedIndex];
    if (opt && opt.dataset.min && cl.value) {
      var c = parseInt(cl.value, 10);
      if (c < parseInt(opt.dataset.min, 10) || c > parseInt(opt.dataset.max, 10)) {
        warn.textContent = ev.value + " is for Class " + opt.dataset.min + "\u2013" + opt.dataset.max + " (Rulebook criteria).";
        warn.style.display = "block";
        return;
      }
    }
    warn.style.display = "none";
  }

  function addRow() {
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td class="idx"></td>' +
      '<td><select class="p-event">' + eventOptions() + "</select></td>" +
      '<td><input type="text" class="p-team" placeholder="Team name"></td>' +
      '<td><input type="text" class="p-name" placeholder="Full name"></td>' +
      '<td><select class="p-class">' + classOptions() + '</select><div class="row-warn"></div></td>' +
      '<td><input type="tel" class="p-phone" placeholder="WhatsApp no."></td>' +
      '<td><input type="email" class="p-mail" placeholder="Student email"></td>' +
      '<td><button type="button" class="btn-danger rm-btn">Remove</button></td>';
    body.appendChild(tr);
    tr.querySelector(".rm-btn").addEventListener("click", function () {
      if (body.querySelectorAll("tr").length <= 1) { showError("At least one participant is required."); return; }
      tr.remove(); renumber();
    });
    tr.querySelector(".p-event").addEventListener("change", function () { checkRow(tr); });
    tr.querySelector(".p-class").addEventListener("change", function () { checkRow(tr); });
    renumber();
  }

  function showError(msg) {
    formError.textContent = msg;
    formError.style.display = "block";
    formError.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function clearError() { formError.style.display = "none"; formError.textContent = ""; }

  function validMail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function cleanPhone(v) {
    if (!v) return "";
    var digits = String(v).replace(/\D/g, "");
    if (digits.length === 12 && digits.indexOf("91") === 0) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.indexOf("0") === 0) {
      digits = digits.slice(1);
    }
    return digits;
  }
  function validPhone(v) {
    var digits = cleanPhone(v);
    return digits.length >= 10 && digits.length <= 13;
  }

  addBtn.addEventListener("click", function () { clearError(); addRow(); });

  payShot.addEventListener("change", function () {
    if (payShot.files && payShot.files[0]) {
      shotName = payShot.files[0].name;
      fileNote.textContent = "Attached: " + shotName + " (this file name is recorded on the form — also attach it to your mail).";
      fileNote.classList.add("ok");
    } else {
      shotName = "";
      fileNote.textContent = "No file chosen. Upload the screenshot / receipt of your payment.";
      fileNote.classList.remove("ok");
    }
  });

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function collectRows() {
    var out = [];
    body.querySelectorAll("tr").forEach(function (tr) {
      out.push({
        event: tr.querySelector(".p-event").value,
        team: tr.querySelector(".p-team").value.trim(),
        name: tr.querySelector(".p-name").value.trim(),
        cls: tr.querySelector(".p-class").value,
        phone: cleanPhone(tr.querySelector(".p-phone").value),
        mail: tr.querySelector(".p-mail").value.trim()
      });
    });
    return out;
  }

  document.getElementById("regForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    clearError();

    var school = document.getElementById("schoolName").value.trim();
    var coord = document.getElementById("coordName").value.trim();
    var cPhone = cleanPhone(document.getElementById("coordPhone").value);
    var cMail = document.getElementById("coordMail").value.trim();
    var fee = FEE;
    var rows = collectRows();
    var amtPaid = parseFloat(document.getElementById("amtPaid").value) || 0;
    var txn = document.getElementById("txnRef").value.trim();

    if (!school) return showError("Please enter the School Name.");
    if (!coord) return showError("Please enter the Coordinator Name.");
    if (!validPhone(cPhone)) return showError("Please enter a valid 10-digit coordinator Contact Number.");
    if (!validMail(cMail)) return showError("Please enter a valid coordinator Mail Address.");
    if (!rows.length) return showError("Please add at least one participant.");

    for (var i = 0; i < rows.length; i++) {
      var r = rows[i], n = i + 1;
      if (!r.event) return showError("Row " + n + ": please select the event.");
      if (!r.name) return showError("Row " + n + ": please enter the participant name.");
      if (!r.cls) return showError("Row " + n + ": please select the class.");
      if (!validPhone(r.phone)) return showError("Row " + n + ": please enter a valid 10-digit WhatsApp phone number.");
      if (!validMail(r.mail)) return showError("Row " + n + ": please enter a valid student mail address.");
    }

    var expected = fee * rows.length;
    if (amtPaid !== expected) {
      return showError("Amount Paid (\u20B9" + amtPaid.toLocaleString("en-IN") +
        ") must equal the payable total (\u20B9" + expected.toLocaleString("en-IN") + " = " +
        rows.length + " participant(s) \u00D7 \u20B9" + fee + ").");
    }
    if (!txn) return showError("Please enter the Transaction / UTR Reference.");
    if (!shotName) return showError("Please upload the payment screenshot — the amount is confirmed against this upload.");

    var ref = "FF26-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    var stamp = new Date().toLocaleString("en-IN");
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting\u2026";

    /* ---- send registration + screenshot directly to the team ---- */
    var fd = new FormData();
    fd.append("_subject", "FinFlare 2026 Inter Round Registration \u2014 " + ref + " \u2014 " + school);
    fd.append("_template", "table");
    fd.append("Reference ID", ref);
    fd.append("Submitted", stamp);
    fd.append("School Name", school);
    fd.append("Coordinator Name", coord);
    fd.append("Contact Number", cPhone);
    fd.append("Mail Address", cMail);
    fd.append("Fee per Participant (INR)", fee);
    fd.append("Total Participants", rows.length);
    fd.append("Amount Paid (INR)", amtPaid);
    fd.append("Transaction / UTR Reference", txn);
    rows.forEach(function (r, i) {
      var p = "P" + (i + 1) + " ";
      fd.append(p + "Event", r.event);
      fd.append(p + "Team", r.team);
      fd.append(p + "Name", r.name);
      fd.append(p + "Class", r.cls);
      fd.append(p + "Phone", r.phone);
      fd.append(p + "Mail", r.mail);
    });
    if (payShot.files && payShot.files[0]) fd.append("Payment Screenshot", payShot.files[0], payShot.files[0].name);

    var submitted = false;
    fetch(SUBMIT_URL, { method: "POST", body: fd, headers: { "Accept": "application/json" } })
      .then(function (res) { submitted = res.ok; })
      .catch(function () { submitted = false; })
      .finally(function () { finishSubmit(submitted); });

    function finishSubmit(ok) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Registration";
      if (!ok) {
        showError("Direct submit failed (network/endpoint issue). Your Excel record will still download below \u2014 " +
          "please mail it with the payment screenshot to teamfinflare@gmail.com using the button in the confirmation.");
      }
    /* ---- build Excel-compatible record (.xls via HTML table) ---- */
    var x = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body>';
    x += "<h3>FinFlare 2026 Bulk Registration Form</h3>";
    x += "<p>Reference ID: " + esc(ref) + " | Submitted: " + esc(stamp) + "</p>";
    x += '<table border="1"><tr><th>School Name</th><td>' + esc(school) + "</td></tr>" +
         "<tr><th>Coordinator Name</th><td>" + esc(coord) + "</td></tr>" +
         "<tr><th>Contact Number</th><td>" + esc(cPhone) + "</td></tr>" +
         "<tr><th>Mail Address</th><td>" + esc(cMail) + "</td></tr>" +
         "<tr><th>Fee per Participant (INR)</th><td>" + fee + "</td></tr>" +
         "<tr><th>Total Participants</th><td>" + rows.length + "</td></tr>" +
         "<tr><th>Amount Paid (INR)</th><td>" + amtPaid + "</td></tr>" +
         "<tr><th>Transaction / UTR Reference</th><td>" + esc(txn) + "</td></tr>" +
         "<tr><th>Payment Screenshot File</th><td>" + esc(shotName) + "</td></tr></table><br>";
    x += '<table border="1"><tr><th>Name of event</th><th>Team Name</th><th>Participant Name</th>' +
         "<th>Class</th><th>Phone Number</th><th>Mail address</th></tr>";
    rows.forEach(function (r) {
      x += "<tr><td>" + esc(r.event) + "</td><td>" + esc(r.team) + "</td><td>" + esc(r.name) +
           "</td><td>" + esc(r.cls) + "</td><td>" + esc(r.phone) + "</td><td>" + esc(r.mail) + "</td></tr>";
    });
    x += "</table></body></html>";

    var blob = new Blob(["\ufeff" + x], { type: "application/vnd.ms-excel" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "FinFlare26_" + school.replace(/[^\w\-]+/g, "_").slice(0, 30) + "_" + ref + ".xls";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);

    /* ---- confirmation panel ---- */
    document.getElementById("refId").textContent = ref;
    document.getElementById("mailSub").textContent = "FinFlare 2026 Inter Round Registration — " + ref;
    var s = "<p><b>" + esc(school) + "</b> &middot; " + rows.length + " participant(s)" +
            " &middot; Paid: \u20B9" + amtPaid.toLocaleString("en-IN") +
            " (" + esc(txn) + ") &middot; Screenshot: " + esc(shotName) + "</p>";
    s += '<table><tr><th>#</th><th>Event</th><th>Team</th><th>Participant</th><th>Class</th><th>Phone</th><th>Mail</th></tr>';
    rows.forEach(function (r, i) {
      s += "<tr><td>" + (i + 1) + "</td><td>" + esc(r.event) + "</td><td>" + esc(r.team) + "</td><td>" +
           esc(r.name) + "</td><td>" + esc(r.cls) + "</td><td>" + esc(r.phone) + "</td><td>" + esc(r.mail) + "</td></tr>";
    });
    document.getElementById("confirmSummary").innerHTML = s + "</table>";
    document.getElementById("confirmation").classList.add("show");
    document.getElementById("confirmation").scrollIntoView({ behavior: "smooth" });

    document.getElementById("mailBtn").onclick = function () {
      var subject = encodeURIComponent("FinFlare 2026 Inter Round Registration — " + ref + " — " + school);
      var mbody = "Reference ID: " + ref + "\nSchool: " + school + "\nCoordinator: " + coord +
        " (" + cPhone + ", " + cMail + ")" +
        "\nParticipants: " + rows.length + "\nAmount Paid: INR " + amtPaid + " (" + txn + ")" +
        "\nPayment Screenshot: " + shotName + " (attached)\n\nExcel record attached. Please confirm.";
      window.location.href = "mailto:teamfinflare@gmail.com?subject=" + subject +
        "&body=" + encodeURIComponent(mbody);
    };
    } /* end finishSubmit */
  });

  document.getElementById("againBtn").addEventListener("click", function () {
    window.location.reload();
  });

  addRow();
})();
