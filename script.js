// Multi Timezone Digital Clock
// Plain JS, uses Intl.DateTimeFormat. Saves selection in localStorage.

const tzList = [
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Asia/Hong_Kong",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Australia/Sydney",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Sao_Paulo",
  "Africa/Johannesburg",
  "Pacific/Auckland"
];

// DOM
const tzSelect = document.getElementById("tzSelect");
const tzSearch = document.getElementById("tzSearch");
const addBtn = document.getElementById("addBtn");
const addLocalBtn = document.getElementById("addLocalBtn");
const clearBtn = document.getElementById("clearBtn");
const clocks = document.getElementById("clocks");
const hourToggle = document.getElementById("hourToggle");
const toggleLabel = document.getElementById("toggleLabel");

// storage keys
const STORAGE_KEY = "multi-tz-clocks";
const STORAGE_24 = "multi-tz-24h";

let selectedZones = loadZones();
let hour24 = loadHourFormat();

// initialize UI
function populateSelect(list) {
  tzSelect.innerHTML = "";
  list.forEach(tz => {
    const opt = document.createElement("option");
    opt.value = tz;
    opt.textContent = tz.replace("_", " ");
    tzSelect.appendChild(opt);
  });
}

function filterList(q){
  const ql = q.trim().toLowerCase();
  const filtered = tzList.filter(tz => {
    return tz.toLowerCase().includes(ql) || tz.replace("_"," ").toLowerCase().includes(ql);
  });
  populateSelect(filtered);
}

// load/save
function loadZones(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : ["UTC","Asia/Shanghai"];
  }catch(e){ return ["UTC","Asia/Shanghai"]; }
}
function saveZones(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedZones));
}
function loadHourFormat(){
  return localStorage.getItem(STORAGE_24) === "true";
}
function saveHourFormat(){
  localStorage.setItem(STORAGE_24, hour24 ? "true" : "false");
}

// helper to format time
function formatFor(tz){
  const options = {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: !hour24,
    timeZone: tz
  };
  const dateOptions = { year: "numeric", month: "short", day: "numeric", timeZone: tz };
  const dtf = new Intl.DateTimeFormat(undefined, options);
  const dtd = new Intl.DateTimeFormat(undefined, dateOptions);
  return { dtf, dtd };
}

// render cards
function render(){
  clocks.innerHTML = "";
  selectedZones.forEach(tz => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.tz = tz;

    const meta = document.createElement("div");
    meta.className = "meta";
    const name = document.createElement("div");
    name.innerHTML = `<div class="zone-name">${tz.replace("_"," ")}</div><div class="tz-sub">${tz}</div>`;
    const btn = document.createElement("button");
    btn.className = "remove";
    btn.title = "Remove";
    btn.textContent = "Remove";
    btn.addEventListener("click", () => {
      selectedZones = selectedZones.filter(x => x !== tz);
      saveZones();
      render();
    });

    meta.appendChild(name);
    meta.appendChild(btn);

    const timeDiv = document.createElement("div");
    timeDiv.className = "time";
    timeDiv.id = `time-${tz}`;

    const small = document.createElement("div");
    small.className = "small";
    small.innerHTML = `<span id="date-${tz}"></span><span class="tz-sub">${tz}</span>`;

    card.appendChild(meta);
    card.appendChild(timeDiv);
    card.appendChild(small);

    clocks.appendChild(card);
  });
  // initial populate of times
  tick();
}

// tick updates every second
function tick(){
  const now = new Date();
  selectedZones.forEach(tz => {
    const timeEl = document.getElementById(`time-${tz}`);
    const dateEl = document.getElementById(`date-${tz}`);
    if (!timeEl || !dateEl) return;
    const { dtf, dtd } = formatFor(tz);
    timeEl.textContent = dtf.format(now);
    dateEl.textContent = dtd.format(now);
  });
}

// events
tzSearch.addEventListener("input", e => filterList(e.target.value));
addBtn.addEventListener("click", () => {
  const tz = tzSelect.value;
  if (!tz) return;
  if (!selectedZones.includes(tz)) selectedZones.push(tz);
  saveZones();
  render();
});
addLocalBtn.addEventListener("click", () => {
  const local = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  if (!selectedZones.includes(local)) selectedZones.push(local);
  saveZones();
  render();
});
clearBtn.addEventListener("click", () => {
  selectedZones = [];
  saveZones();
  render();
});
hourToggle.addEventListener("change", () => {
  hour24 = hourToggle.checked;
  toggleLabel.textContent = hour24 ? "24-hour" : "12-hour";
  saveHourFormat();
  render();
});

// init
(function init(){
  populateSelect(tzList);
  tzSearch.value = "";
  hourToggle.checked = hour24;
  toggleLabel.textContent = hour24 ? "24-hour" : "12-hour";
  render();
  // run every second
  setInterval(tick, 1000);
})();