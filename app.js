// FinFlare 2026 — shared JS (multipage safe, teacher-simple)
const EVENTS = [
  { n: "01", script: "Mock", title: "STREET", cls: "11-12", elig: "Class 11 to 12", team: "Team of 2", time: "3 hours", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.51.58%20PM.jpeg", logo: "assets/Events Logo/MockStreet.png?v=2", short: "Real-time stock market simulation", desc: "MockStreet is an interactive simulation of the real-time stock market, designed to give students a hands-on investments experience. Participants can build virtual portfolios, place trades, and track their gains and losses as markets fluctuate. It\u2019s a risk-free way to explore how investing works, understand market behavior, and develop smart strategies. Whether you\u2019re new to stocks or curious about finance, MockStreet makes learning dynamic and practical.", judge: ["Group with highest net worth wins"], rules: ["MockStreet will run for 3 hours in the Qualifier Round and Final Round, using a virtual capital of \u20B910,00,000 and involving 10\u201315 companies.", "All event details and company information will be shared 24 hours before the event. Printed copies of the company details will be available during the event with the Panelist.", "Live news updates will be displayed on-screen throughout the event. Participants can buy and sell company stocks at the Current Market Price, as shown on the screen.", "By the end of the Opening Bell, each team must hold shares in at least three different companies.", "Barter deals (mutual share exchanges) between teams are allowed through verbal conversation or chits but must be signed off by the Exchange to be valid.", "Mergers between teams are permitted. In such cases, the combined net worth will be calculated using a simple average.", "Short-selling of shares is not allowed.", "All official documents held by participants must be submitted to the Panelist by the Closing Bell.", "If a team\u2019s net worth becomes negative, they will be disqualified. Each team is responsible for managing and tracking its own net worth.", "Teams that have qualified for the Finals will compete with a new set of capital and companies, along with an additional Crisis Management round."] },
  { n: "02", script: "Power", title: "PITCH", cls: "11-12", elig: "Class 11 to 12", team: "Team of 3", time: "12 min per team", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.54.25%20PM.jpeg", logo: "assets/Events Logo/Power Pitch.png?v=2", short: "Dynamic pitch deck competition", desc: "A dynamic pitch deck competition where bold ideas meet real opportunities. Participants craft compelling business stories, design impactful presentations, and pitch their ventures to an expert panel of judges. It\u2019s more than just a contest, a launchpad for creativity, strategy, and innovation. From identifying problems to presenting feasible solutions, students learn to think like entrepreneurs. Compete, collaborate, and bring your startup dreams to life in a space where every idea has the power to grow.", judge: ["Clarity of Idea", "Innovation & Originality", "Market Relevance & Feasibility", "Design & Visual Appeal", "Delivery & Confidence", "Negotiation"], rules: ["The presentation must include these four things: a clear problem statement, the name and tagline of the product/service, the amount of funding the team is asking for, and the share of ownership they\u2019re offering in return.", "Teams must send in their presentations and any other materials at least 24 hours before the event to avoid delays or disqualification.", "Intra-school Round: Each team will get 12 minutes in total: 2 minutes to set up, 7 minutes to present, and 3 minutes for Q&A and negotiation.", "Inter-school Round: Each team will get 15 minutes: 2 minutes for setup, 10 minutes to present, and 3 minutes for Q&A and negotiation.", "Finalists can either continue with the same product or service (with or without improvements) or pitch a new idea altogether in the Final Round.", "The main goal of the pitch is to convince the Investor Panel to fund your idea. Negotiation is important and part of the pitch, but getting the highest amount of funding doesn\u2019t automatically mean you\u2019ll win, though it does help earn points.", "Each round will have a different Investor Panel to eliminate any bias.", "Props and audio-visual tools are allowed, but if you\u2019re using videos, they must be under 2 minutes in total. Usage of AI is strictly prohibited."] },
  { n: "03", script: "Boardroom", title: "BATTLE", cls: "11-12", elig: "Class 11 to 12", team: "Individual Participation", time: "About 1 hour", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2011.04.33%20PM.jpeg", logo: "assets/Events Logo/Boardroom Battle.png?v=2", short: "Leadership hot seat: 3 rounds", desc: "Boardroom Battle puts students in the hot seat of leadership, where every decision counts. Participants will face real-world management scenarios, tackle business crises, and defend their strategies under pressure. It\u2019s a chance to test problem-solving, communication, and leadership skills in a competitive setting. Designed to mirror the challenges of the corporate world, this event helps students discover if they have what it takes to be the next big decision-maker.", judge: ["Decision-Making", "Creativity & Innovation", "Communication Skills", "Leadership", "Practicality"], rules: ["The event will consist of 3 rounds: Stress Test \u2014 Jury acts as board members firing rapid scenario-based questions; open to all participants; Time limit \u2014 30 minutes. Crisis Simulation \u2014 Participants will be given a sudden business/financial crisis and must propose solutions in limited prep time in a group discussion; Time limit \u2014 30 minutes. Final Interview \u2014 Surviving participants will face the jury in a decisive one-to-one cross-examination; Time limit \u2014 10 minutes for every participant.", "Each round will be scored independently; cumulative scores will determine advancement.", "Participants must adhere to the time limits for each round.", "Participants can only leave the venue for up to 5 minutes at a time to rule out unfair practices."] },
  { n: "04", script: "Case", title: "CIPHER", cls: "9-10", elig: "Class 9 to 10", team: "Team of 2", time: "1 hr prep + talk", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.54.48%20PM.jpeg", logo: "assets/Events Logo/Case Cipher.png?v=2", short: "Crack real-world business crises", desc: "CaseCipher challenges students to crack real-world business crises through sharp analysis and strategic thinking. Participants tackle complex management dilemmas that test their problem-solving, teamwork, and decision-making skills. With limited time and high stakes, teams must craft compelling resolutions that are both original and practical. From operations to leadership to ethics, each case demands insight and ingenuity. Compete, collaborate, and rise to the challenge because in CaseCipher, the smartest solutions win the spotlight.", judge: ["Clarity of Resolution", "Originality and Practicality", "Reasoning and Rationality", "Presentation Skills", "Time Management"], rules: ["Intra-school Round: Teams will get two cases and 1 hour to prepare their resolutions. After that, each team will get 3+3 minutes to explain it.", "Inter-school Round: Teams will get two cases and 1.5 hours to prepare their resolutions. After that, each team will get 4+4 minutes to explain it.", "The teams must prepare one Resolution Paper per case on scripts provided by the organisers and submit the same to the jury at the time of presenting.", "A glossary of key terminologies will be provided by the organisers as usage of gadgets and internet will not be allowed.", "Participants can only leave the venue for up to 5 minutes at a time to rule out unfair practices."] },
  { n: "05", script: "Brand", title: "CRAFT", cls: "9-10", elig: "Class 9 to 10", team: "Team of 3", time: "8 min per team", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2011.06.33%20PM.jpeg", logo: "assets/Events Logo/Brand Craft.png?v=2", short: "Ad campaign showdown", desc: "BrandCraft is a creative showdown where young minds step into the world of branding, advertising, and strategy. Participants are challenged to craft compelling ad campaigns or brand pitches for real-world products, services, or social causes. It\u2019s a test of creativity, market insight, and storytelling flair\u2014where each idea must grab attention and leave an impact. BrandCraft brings marketing to life through bold imagination and real-world relevance.", judge: ["Clarity of Concept", "Creativity and Originality", "Storytelling Quality", "Visual Appeal and Presentation", "Time Management"], rules: ["Teams may select from an existing brand/product or create their own.", "Each team must create two ads \u2014 one poster and one video ad of 30 seconds.", "Each team will have a total time of 8 minutes (2 mins setup, 3 mins presentation, 3 mins Q&A).", "The poster and video ad must include the brand/product name or logo and a tagline.", "For the poster ad, both digital or handmade entries are welcome.", "For the video ad, pre-recorded visuals, music, jingles or voiceovers are allowed, but making your own content will earn bonus points.", "Teams must send in their ads and any other materials at least 24 hours before the event to avoid delays or disqualification.", "Teams will not be allowed to re-use their ads for the Final Round.", "Advertisements cannot be made on any illicit brand/product/service.", "The contest will be judged by a jury who will act like potential customers. In the Final Round, two audience questions will be allowed without follow-ups. No extra points for participants asking questions.", "Usage of AI is strictly prohibited."] },
  { n: "06", script: "Budget", title: "BREAKER", cls: "9-10", elig: "Class 9 to 10", team: "Team of 2", time: "60 min + 5-min pitch", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2011.05.01%20PM.jpeg", logo: "assets/Events Logo/Budget Breaker.png?v=2", short: "Smart budgeting challenge", desc: "BudgetBreaker challenges students to think smart with limited resources. Given a set amount of virtual money, participants must plan, prioritize, and create the most effective budget for real-life scenarios. Every choice has consequences, and success depends on balancing needs, wants, and savings while staying within limits. Designed for Classes 9\u201310, this event makes financial decision-making both exciting and practical, building essential skills for managing money wisely.", judge: ["Feasibility & Practicality", "Creativity in Allocation", "Cost-effectiveness", "Presentation Skills", "Judges Q/A"], rules: ["All teams will receive the same scenario and a list of potential expense categories.", "Teams have to prepare their budget allocation within 60 minutes using MS Excel and mail it to the organisers. Usage of the internet otherwise is strictly prohibited.", "Late submission will result in disqualification.", "Each team will present their budget to the judges in a 5-minute pitch.", "Judges may ask questions to clarify budget decisions.", "Teams must not exceed the given budget under any circumstances.", "All expenses must be realistic and justifiable.", "Teams may choose not to spend the entire budget, but unused funds must be accounted for.", "Teams cannot introduce fictional prices \u2014 they must use the indicative price list provided by the organisers.", "Participants are mandated to bring their laptops/tablets for BudgetBreaker. Usage of AI or internet is strictly prohibited."] },
  { n: "07", script: "Quiz", title: "NOMICS", cls: "6-8", elig: "Class 6 to 8", team: "Team of 2", time: "About 1 hour", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.53.55%20PM.jpeg", logo: "assets/Events Logo/Quiznomics.png?v=2", short: "Finance quiz: 50 questions", desc: "QuizNomics is a fast-paced, intellectually charged quiz that puts your economics, finance, and business knowledge to the ultimate test. From currency to capitalism, stock markets to startups, participants will face a thrilling mix of questions that demand both speed and strategy. Compete in teams, calculate your way through challenges, and conquer rounds designed to sharpen your money smarts. It\u2019s not just about facts but about thinking on your feet and thriving under pressure.", judge: ["Team with highest score wins"], rules: ["The quiz will consist of 4 sections with a total of 50 questions: Financial General Knowledge \u2013 20 questions, Logo and Tagline Identification \u2013 10 questions, Currency Round \u2013 10 questions, Daily Life Money Management \u2013 10 questions.", "No elimination. All teams will participate in all sections.", "Each correct answer will carry 10 points.", "There will be no negative marking for incorrect answers.", "The team with the highest total score at the end of all sections will be declared the winner.", "In case of a tie, a tiebreaker question will be asked.", "The Final Round for QuizNomics may vary as per the discretion of the QuizMaster."] },
  { n: "08", script: "Monopoly", title: "MASTERS", cls: "6-8", elig: "Class 6 to 8", team: "Individual Participation", time: "45 min per round", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.55.08%20PM.jpeg", logo: "assets/Events Logo/Monopoly Masters.png?v=2", short: "Strategic Monopoly boards", desc: "Monopoly Masters brings the classic board game to life with a focus on financial learning. Participants will compete in an engaging, strategy-driven environment that teaches money management, budgeting, and smart investment choices. As dice roll and deals unfold, students must balance risk and reward to stay ahead. Designed for Classes 6\u20138, the event makes learning about finance playful, practical, and memorable while building confidence in managing resources.", judge: ["Participant with highest net worth wins"], rules: ["Participants will be seated at Monopoly boards in groups of 4\u20136.", "The game begins with standard Monopoly rules but is time-bound; Preliminary Round: 45 minutes.", "At the end of the timer, the highest total wealth (cash + property value) is calculated to determine winners.", "Top scorers from each board advance to the final round; Final Round: 45 minutes.", "No player may borrow or lend money to another player.", "Trading of properties is allowed only during your turn and must be announced to the table.", "Properties \u201cOpen to Bid\u201d during your turn is allowed.", "Any disputes are to be resolved by the Banker.", "Deliberate stalling will result in a time penalty or disqualification."] },
  { n: "09", script: "Echo", title: "SPARK", cls: "6-8", elig: "Class 6 to 8", team: "Team of 2", time: "5 min per pair", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.51.58%20PM.jpeg", logo: "assets/Events Logo/Echo Spark.png?v=2", short: "Finance debate, Oxford style", desc: "EchoSpark is a thought-provoking finance debate that empowers young minds to address pressing real-world issues with purpose and passion. Participants engage in meaningful discourse, challenge conventional thinking, and present innovative solutions to societal challenges. This debate is about inspiring change, advocating for impact, and echoing ideas that matter. Whether you\u2019re speaking up or listening in, EchoSpark creates a platform where dialogue meets direction and purpose finds its voice.", judge: ["Factuality and Understanding", "Language", "Persuasiveness", "Presentation and Delivery", "Cross-Examination & Rebuttal"], rules: ["EchoSpark is based on the Oxford Style of debating wherein one participant will speak for the motion and the other participant will speak against the motion.", "Every pair will be allotted a total time of 5 minutes with per speaker time to represent the case being 2 minutes. Speakers would be alerted at the end of 1 minute 30 seconds.", "A total of 1 minute will be provided for the rebuttal and questions to cross examine the speakers can be asked by anyone.", "Please note that only one question can be asked and follow-up questions won\u2019t be allowed, however the judges may choose to cross examine either or both of the participants for the purpose of evaluation.", "The topic for the debate will be notified to the participants 24 hours prior to the start of the debate."] },
  { n: "10", script: "Fin", title: "TALES", cls: "3-5", elig: "Class 3 to 5", team: "Individual Participation", time: "1 hour", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.53.55%20PM.jpeg", logo: "assets/Events Logo/Fin Tales.png?v=2", short: "Money story-writing (in-school)", desc: "FinTales is a fun story-writing competition that combines imagination with important money ideas. It encourages young minds to create stories about saving, spending, earning, or using money wisely. Creative storytelling can make smart money choices easy to understand and enjoyable to learn about. These stories help others see how good decisions with money can make a big difference. FinTales turns learning about finance into an exciting adventure through words.", judge: ["Clarity of idea", "Creativity and Originality", "Storytelling Quality", "Moral Construct", "Formatting"], rules: ["FinTales will be held only at the intra-school level. Top three submissions in every participant school will be shortlisted and rewarded. Overall top three rank holders of the event will be invited to attend the Finals and receive felicitation.", "The topic will be given to the participants on-spot, 15 minutes before the commence of writing time.", "Participants will be expected to write a 200-300 word original short-story within 1 hour.", "The story must contain an appropriate title and participant details like the name, class, school.", "The story must be written in English.", "Participants can use pencil or black or blue pens to write. The script for writing will be provided by the organisers.", "Two or more participants together will not be permitted to leave the designated venue to discourage unfair practices among young peers."] },
  { n: "11", script: "Fin", title: "STROKES", cls: "3-5", elig: "Class 3 to 5", team: "Individual Participation", time: "2 hours", img: "assets/New%20Photos/WhatsApp%20Image%202026-09-12%20at%2010.54.25%20PM.jpeg", logo: "assets/Events Logo/FinStrokes.png?v=2", short: "Money art competition (in-school)", desc: "FinStrokes is a creative art competition that helps explore money ideas through drawings. It invites students to show concepts like saving, spending, and budgeting using colors, symbols, and smart designs. Through meaningful illustrations and simple messages, complex financial topics become easier to understand. FinStrokes brings together imagination and learning, turning everyday money lessons into powerful visual stories that can inform and inspire others. It\u2019s where creativity meets financial awareness on paper.", judge: ["Concept Clarity", "Creativity & Originality", "Use of Space & Composition", "Overall Presentation"], rules: ["FinStrokes will be held only at the intra-school level. Top three submissions in every participant school will be shortlisted and rewarded. Overall top three rank holders of the event will be invited to attend the Finals and receive felicitation.", "The theme will be given to the participants on-spot, 15 minutes before the starting time.", "Participants will be expected to create an original work within 2 hours.", "All art styles and colour mediums are accepted for FinStrokes.", "The artwork must contain the theme title and participant details like the name, class, school.", "Participants are expected to carry their own stationery. The drawing script will be provided by the organisers."] },
];

function rowHTML(e) {
  return `<div class="num">${e.n}</div><h3>${e.script.toUpperCase()} ${e.title}</h3><div class="meta">${e.elig.toUpperCase()}<br>${e.team.toUpperCase()}</div><div class="arrow">↗</div>`;
}
function attachRow(row, e) {
  row.addEventListener('click', () => openModal(e));
}
function renderInto(el, items) {
  if (!el) return; el.innerHTML = '';
  items.forEach(e => { const r = document.createElement('div'); r.className = 'event-row reveal in'; r.innerHTML = rowHTML(e); attachRow(r, e); el.appendChild(r); });
}
// Home/old single list with filters
const list = document.getElementById('eventList');
if (list && !document.getElementById('eventList2')) {
  const render = f => renderInto(list, EVENTS.filter(e => f === 'all' || e.cls === f));
  render('all');
  document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(x => x.classList.remove('active'));
    b.classList.add('active'); render(b.dataset.filter);
  }));
}
// Events page: static cards + filters + Read More modal
const evGroups = document.querySelectorAll('.ev-group');
if (evGroups.length) {
  document.querySelectorAll('.filters button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const f = b.dataset.filter;
    evGroups.forEach(g => { g.style.display = (f === 'all' || g.dataset.group === f) ? '' : 'none'; });
  }));
  document.querySelectorAll('.ev-more').forEach(btn => btn.addEventListener('click', () => {
    const key = (btn.dataset.event || '').toLowerCase();
    const e = EVENTS.find(x => (x.script + x.title).toLowerCase() === key);
    if (e) openModal(e);
  }));
}

// modal (teacher-simple labels)
const modal = document.getElementById('modal');
function openModal(e) {
  if (!modal) return;
  document.getElementById('mImg').src = e.img;
  document.getElementById('mClass').textContent = e.elig;
  const logo = document.getElementById('mLogo');
  if (e.logo) { logo.src = e.logo; logo.alt = (e.script + ' ' + e.title).trim(); logo.style.display = 'block'; }
  else { logo.style.display = 'none'; }
  document.getElementById('mDesc').textContent = e.desc;
  document.getElementById('mElig').textContent = e.elig;
  document.getElementById('mTeam').textContent = e.team;
  document.getElementById('mJudgeMeta').textContent = e.judge.join(', ');
  document.getElementById('mRules').innerHTML = e.rules.map(j => `<li>${j}</li>`).join('');
  const card = modal.querySelector('.modal-card');
  if (card) card.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
}
if (modal) {
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  ['modalClose', 'modalCloseX', 'modalBottomBack'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', closeModal);
  });
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

// hide top menu on scroll down, show on scroll up
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let lastY = window.scrollY || 0, ticking = false;
  function onScroll() {
    const y = window.scrollY || 0;
    const menuOpen = document.getElementById('menu') && document.getElementById('menu').classList.contains('open');
    if (!menuOpen) {
      if (y > lastY && y > 140) nav.classList.add('nav-hidden');
      else if (y < lastY) nav.classList.remove('nav-hidden');
      if (y <= 140) nav.classList.remove('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastY = y; ticking = false;
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
})();

// menu
const menu = document.getElementById('menu'), menuBtn = document.getElementById('menuBtn');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') menu.classList.remove('open'); });
}

// reveals + counters
function runCount(el) { if (el.dataset.done) return; el.dataset.done = 1; const t = +el.dataset.count; const s = performance.now(); (function f(n) { const k = Math.min(1, (n - s) / 1400); el.textContent = Math.floor(t * (1 - Math.pow(1 - k, 3))).toLocaleString('en-IN') + (k === 1 ? '+' : ''); if (k < 1) requestAnimationFrame(f); })(s); }
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); e.target.querySelectorAll('[data-count]').forEach(runCount); if (e.target.hasAttribute('data-count')) runCount(e.target); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll('.reveal,[data-count]').forEach(el => io.observe(el));

// countdown
const cd = document.getElementById('cd');
if (cd) {
  const target = new Date('2026-10-31T09:00:00+05:30').getTime();
  setInterval(() => { let d = target - Date.now(); if (d < 0) d = 0; const dd = Math.floor(d / 864e5), hh = Math.floor(d / 36e5) % 24, mm = Math.floor(d / 6e4) % 60, ss = Math.floor(d / 1e3) % 60; cd.textContent = `${String(dd).padStart(2, '0')}D : ${String(hh).padStart(2, '0')}H : ${String(mm).padStart(2, '0')}M : ${String(ss).padStart(2, '0')}S`; }, 1000);
}

// accordion (if present on any page)
document.querySelectorAll('.acc button').forEach(b => b.addEventListener('click', () => { b.parentElement.classList.toggle('open'); const s = b.querySelector('span'); if (s) s.textContent = b.parentElement.classList.contains('open') ? '-' : '+'; }));

// drag gallery
document.querySelectorAll('.photorail').forEach(rail => {
  let down = false, sx = 0, sl = 0;
  rail.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sl = rail.scrollLeft; rail.classList.add('dragging'); rail.setPointerCapture(e.pointerId); });
  rail.addEventListener('pointermove', e => { if (down) rail.scrollLeft = sl - (e.clientX - sx); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => rail.addEventListener(ev, () => { down = false; rail.classList.remove('dragging'); }));
});
const strip = document.getElementById('strip');
if (strip) {
  let down = false, sx = 0, sl = 0;
  strip.addEventListener('pointerdown', e => { down = true; sx = e.clientX; sl = strip.scrollLeft; strip.setPointerCapture(e.pointerId); });
  strip.addEventListener('pointermove', e => { if (down) strip.scrollLeft = sl - (e.clientX - sx); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => strip.addEventListener(ev, () => down = false));
}

// legacy film sound toggle
const lv = document.getElementById('legacyVideo'), lb = document.getElementById('legacySound');
if (lv && lb) { lb.addEventListener('click', () => { lv.muted = !lv.muted; if (!lv.muted) lv.play().catch(() => { }); lb.textContent = lv.muted ? 'TAP FOR SOUND' : 'MUTE'; }); }

// form
const form = document.getElementById('regForm');
if (form) form.addEventListener('submit', e => { e.preventDefault(); const m = document.getElementById('formMsg'); if (m) m.textContent = 'Done! We will call you within 24 hrs. Urgent? Call 98363 42812.'; form.reset(); });
