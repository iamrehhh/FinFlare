// Grand Finale registration — simple local flow (no backend)
const FEE = 300;
const UPI_ID = "teamfinflare@upi"; // TODO: replace with FinFlare's real UPI ID
const EVENTS9 = ["Mock Street","Power Pitch","Boardroom Battle","Case Cipher","BrandCraft","Budget Breaker","QuizNomics","Monopoly Masters","EchoSpark"];
const $ = id => document.getElementById(id);
const rowsEl = $("rows");
let draft = { regId: null };

function classes(){ let o=""; for(let c=3;c<=12;c++) o+=`<option>Class ${c}</option>`; return o; }
function eventOpts(){ return EVENTS9.map(e=>`<option>${e}</option>`).join(""); }

function addRow(d){
  const div = document.createElement("div");
  div.className = "frow";
  div.innerHTML = `<input placeholder="Student name *" value="${d?d.name:""}" class="rn" />
    <select class="rc">${classes()}</select>
    <select class="re">${eventOpts()}</select>
    <button class="mini danger" aria-label="Remove">✕</button>`;
  if(d){ div.querySelector(".rc").value = d.cls; div.querySelector(".re").value = d.ev; }
  div.querySelector(".danger").addEventListener("click", ()=>{ div.remove(); sync(); });
  div.querySelectorAll("input,select").forEach(el=>el.addEventListener("input", sync));
  rowsEl.appendChild(div); sync();
}
function getRows(){
  return [...rowsEl.querySelectorAll(".frow")].map(r=>({
    name: r.querySelector(".rn").value.trim(),
    cls: r.querySelector(".rc").value,
    ev: r.querySelector(".re").value
  })).filter(r=>r.name);
}
function sync(){
  const n = getRows().length;
  $("feeCount").textContent = `${n} finalist${n===1?"":"s"}`;
  $("feeTotal").textContent = "Rs " + (n*FEE).toLocaleString("en-IN");
  try{ localStorage.setItem("ff26_finale", JSON.stringify({ rows: getRows(),
    school: $("fSchool").value, name: $("fName").value, phone: $("fPhone").value, email: $("fEmail").value })); }catch(e){}
}
function go(n){
  document.querySelectorAll(".wstep").forEach(s=>{ s.hidden = s.dataset.step != String(n); });
  document.querySelectorAll("#stepsBar span").forEach(s=>s.classList.toggle("on", +s.dataset.s <= n));
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function need(msg){ const m=$("payMsg"); if(m){ m.textContent=msg; } else { alert(msg); } }

// restore
try{
  const s = JSON.parse(localStorage.getItem("ff26_finale") || "null");
  if(s){ $("fSchool").value=s.school||""; $("fName").value=s.name||""; $("fPhone").value=s.phone||""; $("fEmail").value=s.email||"";
    (s.rows&&s.rows.length?s.rows:[null]).forEach(addRow);
  } else addRow(null);
}catch(e){ addRow(null); }
["fSchool","fName","fPhone","fEmail"].forEach(id=>$(id).addEventListener("input", sync));

$("addRow").addEventListener("click", ()=>addRow(null));
$("backTo1").addEventListener("click", ()=>go(1));
$("backTo2").addEventListener("click", ()=>go(2));

$("toStep2").addEventListener("click", ()=>{
  if(!$("fSchool").value.trim() || !$("fName").value.trim() || !$("fPhone").value.trim()){
    alert("Please add school name, coordinator name and phone."); return;
  }
  sync(); go(2);
});
$("toStep3").addEventListener("click", ()=>{
  if(!getRows().length){ alert("Add at least one finalist."); return; }
  const n = getRows().length, amt = n*FEE;
  draft.regId = "FF26-" + Math.random().toString(36).slice(2,8).toUpperCase();
  $("payAmt").textContent = "Rs " + amt.toLocaleString("en-IN");
  $("payBreak").textContent = `${n} finalist${n===1?"":"s"} × Rs ${FEE}`;
  $("upiBtn").href = `upi://pay?pa=${UPI_ID}&pn=FinFlareFest&am=${amt}&cu=INR&tn=${draft.regId}`;
  if($("payMsg")) $("payMsg").textContent = "";
  sync(); go(3);
});
$("copyUpi").addEventListener("click", async ()=>{
  try{ await navigator.clipboard.writeText(UPI_ID); $("copyUpi").textContent = "COPIED"; }
  catch(e){ prompt("Copy UPI ID:", UPI_ID); }
});
$("fShot").addEventListener("change", e=>{
  const f = e.target.files[0]; if(!f) return;
  const r = new FileReader();
  r.onload = ()=>{ const p=$("shotPrev"); p.src=r.result; p.hidden=false; };
  r.readAsDataURL(f);
});
$("confirmPay").addEventListener("click", ()=>{
  const utr = $("fUtr").value.trim();
  const rows = getRows();
  if(!rows.length){ need("Add at least one finalist first."); return; }
  if(utr.length < 6){ need("Enter the UTR / transaction ref no. from your UPI app."); return; }
  const school = $("fSchool").value.trim(), phone = $("fPhone").value.trim();
  $("regId").textContent = draft.regId;
  $("doneSum").textContent = `${school} · ${rows.length} finalist${rows.length===1?"":"s"} · Rs ${(rows.length*FEE).toLocaleString("en-IN")} paid · Ref ${utr}`;
  $("doneList").innerHTML = "<ul>" + rows.map(r=>`<li><b>${r.name}</b> — ${r.cls}, ${r.ev}</li>`).join("") + "</ul>";
  const msg = `${draft.regId} | ${school} | ${phone}%0A` + rows.map(r=>`- ${r.name} (${r.cls}, ${r.ev})`).join("%0A") + `%0ARef: ${utr}`;
  $("waBtn").href = `https://wa.me/919836342812?text=${msg}`;
  try{ localStorage.removeItem("ff26_finale"); }catch(e){}
  go(4);
});
