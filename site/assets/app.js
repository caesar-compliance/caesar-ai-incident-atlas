/* Caesar AI Incident Atlas — Prototype App */

const DRAFT_SECTORS = new Set(["transportation-autonomous", "retail-ecommerce"]);
const DRAFT_FM      = new Set(["FM-REL"]);

const FM_LABELS = {
  "FM-HALL":  "Hallucination",
  "FM-REL":   "Reliability",
  "FM-SAFE":  "Safety",
  "FM-BIAS":  "Bias",
  "FM-TRANS": "Transparency",
  "FM-UNAUTH":"Unauthorised Action",
  "FM-PRIV":  "Privacy",
  "FM-SEC":   "Security"
};

let allIncidents = [];
let activeFilters = { sector: new Set(), severity: new Set(), confidence: new Set(), fm: new Set() };
let openCards     = new Set();

/* ── Bootstrap ── */
async function init() {
  try {
    const indexRes = await fetch("../data/incident-index.json");
    if (!indexRes.ok) throw new Error("Could not load incident-index.json");
    const index = await indexRes.json();

    const loaded = await Promise.all(
      index.incidents.map(async (entry) => {
        const res = await fetch(entry.file);
        if (!res.ok) throw new Error("Could not load " + entry.file);
        return res.json();
      })
    );

    allIncidents = loaded;
    document.getElementById("loading").style.display = "none";
    buildFilters(allIncidents);
    renderList(allIncidents);
  } catch (err) {
    document.getElementById("loading").textContent = "⚠ Error loading data: " + err.message;
    console.error(err);
  }
}

/* ── Filter builder ── */
function buildFilters(incidents) {
  const sectors     = new Map();
  const severities  = ["critical", "high", "medium", "low"];
  const confidences = ["high", "medium", "low"];
  const fms         = new Map();

  incidents.forEach(inc => {
    (inc.sector || []).forEach(s => sectors.set(s, (sectors.get(s) || 0) + 1));
    (inc.failure_modes || []).forEach(f => fms.set(f, (fms.get(f) || 0) + 1));
  });

  const sevCounts  = {};
  const confCounts = {};
  incidents.forEach(inc => {
    sevCounts[inc.severity]   = (sevCounts[inc.severity]  || 0) + 1;
    confCounts[inc.confidence]= (confCounts[inc.confidence]|| 0) + 1;
  });

  renderFilterGroup("filter-sectors",   [...sectors.entries()], "sector",     v => sectorLabel(v));
  renderFilterGroup("filter-severity",  severities.filter(s => sevCounts[s]).map(s => [s, sevCounts[s]]), "severity", v => cap(v));
  renderFilterGroup("filter-confidence",confidences.filter(c => confCounts[c]).map(c => [c, confCounts[c]]), "confidence", v => cap(v));
  renderFilterGroup("filter-fm",        [...fms.entries()], "fm", v => (FM_LABELS[v] || v) + " (" + v + ")");
}

function renderFilterGroup(containerId, entries, filterKey, labelFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  entries.forEach(([value, count]) => {
    const chip = document.createElement("label");
    chip.className = "filter-chip";
    chip.dataset.key   = filterKey;
    chip.dataset.value = value;
    chip.innerHTML =
      `<input type="checkbox" value="${esc(value)}">` +
      `<span>${esc(labelFn(value))}</span>` +
      `<span class="chip-count">${count}</span>`;
    chip.querySelector("input").addEventListener("change", e => {
      if (e.target.checked) {
        activeFilters[filterKey].add(value);
        chip.classList.add("active");
      } else {
        activeFilters[filterKey].delete(value);
        chip.classList.remove("active");
      }
      applyFilters();
    });
    el.appendChild(chip);
  });
}

/* ── Filtering ── */
function applyFilters() {
  const { sector, severity, confidence, fm } = activeFilters;
  const result = allIncidents.filter(inc => {
    if (sector.size     && !([...sector].some(s => (inc.sector||[]).includes(s)))) return false;
    if (severity.size   && !severity.has(inc.severity))                             return false;
    if (confidence.size && !confidence.has(inc.confidence))                         return false;
    if (fm.size         && !([...fm].some(f => (inc.failure_modes||[]).includes(f)))) return false;
    return true;
  });
  renderList(result);
}

function resetFilters() {
  Object.keys(activeFilters).forEach(k => activeFilters[k].clear());
  document.querySelectorAll(".filter-chip input").forEach(cb => { cb.checked = false; });
  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  renderList(allIncidents);
}

/* ── Render list ── */
function renderList(incidents) {
  const container = document.getElementById("incident-list");
  const countEl   = document.getElementById("result-count");
  countEl.textContent = incidents.length + " of " + allIncidents.length + " incident" + (allIncidents.length !== 1 ? "s" : "");

  if (!incidents.length) {
    container.innerHTML = `<div class="empty-state"><p>No incidents match the selected filters.</p></div>`;
    return;
  }

  container.innerHTML = "";
  incidents.forEach(inc => {
    const card = buildCard(inc);
    container.appendChild(card);
    if (openCards.has(inc.incident_id)) {
      card.classList.add("open");
      card.querySelector(".card-detail").classList.add("visible");
    }
  });
}

/* ── Build card ── */
function buildCard(inc) {
  const card = document.createElement("div");
  card.className = "incident-card";
  card.dataset.id = inc.incident_id;

  const hasDraftSector = (inc.sector || []).some(s => DRAFT_SECTORS.has(s));
  const hasDraftFM     = (inc.failure_modes || []).some(f => DRAFT_FM.has(f));
  const isMedConf      = inc.confidence === "medium";
  const isLowConf      = inc.confidence === "low";

  /* Header */
  let headerHtml = `
    <div class="card-header">
      <span class="inc-id">${esc(inc.incident_id)}</span>
      <span class="card-title">${esc(inc.title)}</span>
    </div>`;

  /* Meta badges */
  let metaHtml = `<div class="card-meta">`;
  metaHtml += `<span class="badge badge-date">${esc(inc.date)}</span>`;

  (inc.sector || []).forEach(s => {
    const isDraft = DRAFT_SECTORS.has(s);
    metaHtml += `<span class="badge ${isDraft ? "badge-draft" : "badge-sector"}">${isDraft ? "⚠ draft · " : ""}${esc(sectorLabel(s))}</span>`;
  });

  metaHtml += `<span class="badge badge-sev-${inc.severity}">Severity: ${esc(cap(inc.severity))}</span>`;
  metaHtml += `<span class="badge badge-conf-${inc.confidence}">Confidence: ${esc(cap(inc.confidence))}</span>`;

  (inc.failure_modes || []).forEach(f => {
    const isDraft = DRAFT_FM.has(f);
    metaHtml += `<span class="badge badge-fm${isDraft ? " badge-draft" : ""}">${isDraft ? "⚠ " : ""}${esc(f)}</span>`;
  });

  if (hasDraftSector || hasDraftFM)
    metaHtml += `<span class="badge badge-caution">⚠ Draft taxonomy</span>`;
  if (isMedConf || isLowConf)
    metaHtml += `<span class="badge badge-caution">Source caution: confidence ${esc(inc.confidence)}</span>`;

  metaHtml += `</div>`;

  /* Detail section */
  const detailHtml = buildDetail(inc);

  card.innerHTML = headerHtml + metaHtml + `<div class="card-detail">${detailHtml}</div>`;

  card.addEventListener("click", (e) => {
    if (e.target.tagName === "A") return;
    const detail = card.querySelector(".card-detail");
    const isOpen = detail.classList.toggle("visible");
    card.classList.toggle("open", isOpen);
    if (isOpen) openCards.add(inc.incident_id);
    else        openCards.delete(inc.incident_id);
  });

  return card;
}

/* ── Build detail ── */
function buildDetail(inc) {
  let html = "";

  if (inc.summary) {
    html += `<div class="detail-section">
      <div class="detail-label">Summary</div>
      <div class="detail-text">${esc(inc.summary)}</div>
    </div>`;
  }

  if (inc.ai_system_context) {
    html += `<div class="detail-section">
      <div class="detail-label">AI System Context</div>
      <div class="detail-text">${esc(inc.ai_system_context)}</div>
    </div>`;
  }

  if (inc.harms && inc.harms.length) {
    html += `<div class="detail-section">
      <div class="detail-label">Harms</div>
      <ul class="detail-list">${inc.harms.map(h => `<li>${esc(h)}</li>`).join("")}</ul>
    </div>`;
  }

  if (inc.impact) {
    html += `<div class="detail-section">
      <div class="detail-label">Impact</div>
      <div class="detail-text">${esc(inc.impact)}</div>
    </div>`;
  }

  if (inc.lessons && inc.lessons.length) {
    html += `<div class="detail-section">
      <div class="detail-label">Governance Lessons</div>
      <ul class="detail-list">${inc.lessons.map(l => `<li class="lesson">${esc(l)}</li>`).join("")}</ul>
    </div>`;
  }

  if (inc.controls && inc.controls.length) {
    html += `<div class="detail-section">
      <div class="detail-label">Affected Controls</div>
      <div class="controls-row">${inc.controls.map(c => `<span class="badge-ctl">${esc(c)}</span>`).join("")}</div>
    </div>`;
  }

  if (inc.evidence_required && inc.evidence_required.length) {
    html += `<div class="detail-section">
      <div class="detail-label">Evidence Required</div>
      <ul class="detail-list">${inc.evidence_required.map(e => `<li>${esc(e)}</li>`).join("")}</ul>
    </div>`;
  }

  if (inc.affected_stakeholders && inc.affected_stakeholders.length) {
    html += `<div class="detail-section">
      <div class="detail-label">Affected Stakeholders</div>
      <ul class="detail-list">${inc.affected_stakeholders.map(s => `<li>${esc(s)}</li>`).join("")}</ul>
    </div>`;
  }

  if (inc.sources && inc.sources.length) {
    html += `<div class="detail-section">
      <div class="detail-label">Sources</div>`;
    inc.sources.forEach(src => {
      html += `<div class="source-item">
        <a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title || src.url)}</a>
        <div class="source-meta">
          <span class="source-type-badge">${esc(src.source_type)}</span>
          <span class="source-accessed">Accessed: ${esc(src.accessed)}</span>
        </div>
      </div>`;
    });
    html += `</div>`;
  }

  if (inc.date_note) {
    html += `<div class="detail-section">
      <div class="detail-label">Date Note</div>
      <div class="detail-text" style="color:var(--muted);font-size:0.78rem;">${esc(inc.date_note)}</div>
    </div>`;
  }

  return html;
}

/* ── Helpers ── */
function esc(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cap(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

const SECTOR_NAMES = {
  "legal-compliance":         "Legal & Compliance",
  "transportation-autonomous":"Transportation (Autonomous)",
  "retail-ecommerce":         "Retail & E-commerce",
  "public-sector":            "Public Sector",
  "law-enforcement":          "Law Enforcement",
  "hiring-employment":        "Hiring & Employment",
  "media-content":            "Media & Content",
  "healthcare-medical":       "Healthcare",
  "general":                  "General / Cross-sector"
};

function sectorLabel(id) {
  return SECTOR_NAMES[id] || id;
}

/* ── Boot ── */
document.addEventListener("DOMContentLoaded", () => {
  const resetBtn = document.getElementById("reset-filters");
  if (resetBtn) resetBtn.addEventListener("click", resetFilters);
  init();
});
