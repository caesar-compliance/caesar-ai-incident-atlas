/* Caesar AI Incident Atlas — Functional MVP (T013) */

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

/* ── State ── */
let allIncidents  = [];
let activeFilters = { sector: new Set(), severity: new Set(), confidence: new Set(), fm: new Set(), recordType: new Set(), jurisdiction: new Set() };
let openCards     = new Set();
let currentSort   = "id-asc";
let searchQuery   = "";

const SEV_ORDER  = { critical: 0, high: 1, medium: 2, low: 3 };
const CONF_ORDER = { high: 0, medium: 1, low: 2 };

/* ── Bootstrap ── */
async function init() {
  setLoading(true, "Loading incident records…");
  try {
    const indexRes = await fetch("data/incident-index.json");
    if (!indexRes.ok) throw new Error("Could not load incident-index.json — HTTP " + indexRes.status);
    const index = await indexRes.json();

    const results = await Promise.allSettled(
      index.incidents.map(entry => fetch(entry.file).then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status + " for " + entry.file);
        return r.json();
      }))
    );

    const loaded = [], errors = [];
    results.forEach((r, i) => {
      if (r.status === "fulfilled") loaded.push(r.value);
      else errors.push(index.incidents[i].incident_id + ": " + r.reason.message);
    });

    if (errors.length) {
      showError("Failed to load " + errors.length + " record(s):\n" + errors.join("\n"));
      return;
    }

    allIncidents = loaded;
    setLoading(false);
    updateStatusPanel();
    buildFilters(allIncidents);
    applyAndRender();
    handleHashOnLoad();
  } catch (err) {
    showError(err.message);
    console.error(err);
  }
}

function setLoading(on, msg) {
  const el = document.getElementById("loading");
  if (on) { el.textContent = msg || "Loading…"; el.style.display = ""; }
  else    { el.style.display = "none"; }
}

function showError(msg) {
  const el = document.getElementById("loading");
  el.innerHTML = `<span class="error-state">⚠ Error: ${esc(msg)}</span>`;
  el.style.display = "";
}

/* ── Status panel ── */
function updateStatusPanel() {
  const el = document.getElementById("status-panel");
  if (!el || !allIncidents.length) return;
  const lastId = allIncidents.reduce((a, b) => a.incident_id > b.incident_id ? a : b).incident_id;
  el.innerHTML =
    `<span class="sp-item"><span class="sp-label">Dataset</span> INC-0001–${esc(lastId)}</span>` +
    `<span class="sp-sep">·</span>` +
    `<span class="sp-item"><span class="sp-label">Records</span> ${allIncidents.length}</span>` +
    `<span class="sp-sep">·</span>` +
    `<span class="sp-item"><span class="sp-label">Version</span> v0.6.5</span>` +
    `<span class="sp-sep">·</span>` +
    `<span class="sp-item"><span class="sp-label">Updated</span> 21 May 2026</span>` +
    `<span class="sp-sep">·</span>` +
    `<span class="sp-item sp-caution">⚠ Draft taxonomy labels active</span>`;
}

/* ── Filter builder ── */
function buildFilters(incidents) {
  const sectors       = new Map();
  const fms           = new Map();
  const recordTypes   = new Map();
  const jurisdictions = new Map();
  const SEV_ORDER_LIST  = ["critical", "high", "medium", "low"];
  const CONF_ORDER_LIST = ["high", "medium", "low"];

  incidents.forEach(inc => {
    (inc.sector || []).forEach(s => sectors.set(s, (sectors.get(s) || 0) + 1));
    (inc.failure_modes || []).forEach(f => fms.set(f, (fms.get(f) || 0) + 1));
    const rt = inc.record_type || "incident";
    recordTypes.set(rt, (recordTypes.get(rt) || 0) + 1);
    if (inc.jurisdiction) {
      const jur = inc.jurisdiction;
      jurisdictions.set(jur, (jurisdictions.get(jur) || 0) + 1);
    }
  });

  const sevCounts = {}, confCounts = {};
  incidents.forEach(inc => {
    sevCounts[inc.severity]    = (sevCounts[inc.severity]    || 0) + 1;
    confCounts[inc.confidence] = (confCounts[inc.confidence] || 0) + 1;
  });

  renderFilterGroup("filter-sectors",      [...sectors.entries()], "sector",     v => sectorLabel(v));
  renderFilterGroup("filter-severity",     SEV_ORDER_LIST.filter(s => sevCounts[s]).map(s => [s, sevCounts[s]]),   "severity",   v => cap(v));
  renderFilterGroup("filter-confidence",   CONF_ORDER_LIST.filter(c => confCounts[c]).map(c => [c, confCounts[c]]), "confidence", v => cap(v));
  renderFilterGroup("filter-fm",           [...fms.entries()], "fm", v => (FM_LABELS[v] || v) + " (" + v + ")");
  renderFilterGroup("filter-record-type",  [...recordTypes.entries()], "recordType", v => RECORD_TYPE_LABELS[v] || cap(v));
  if (jurisdictions.size > 0)
    renderFilterGroup("filter-jurisdiction", [...jurisdictions.entries()].sort((a,b)=>a[0].localeCompare(b[0])), "jurisdiction", v => v);
}

function renderFilterGroup(containerId, entries, filterKey, labelFn) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = "";
  entries.forEach(([value, count]) => {
    const id  = "fc-" + filterKey + "-" + value.replace(/[^a-z0-9]/gi, "_");
    const chip = document.createElement("div");
    chip.className = "filter-chip";
    chip.dataset.key   = filterKey;
    chip.dataset.value = value;
    chip.innerHTML =
      `<input type="checkbox" id="${id}" value="${esc(value)}" aria-label="${esc(labelFn(value))}">` +
      `<label for="${id}">${esc(labelFn(value))}</label>` +
      `<span class="chip-count" aria-hidden="true">${count}</span>`;
    chip.querySelector("input").addEventListener("change", e => {
      if (e.target.checked) { activeFilters[filterKey].add(value);    chip.classList.add("active"); }
      else                  { activeFilters[filterKey].delete(value); chip.classList.remove("active"); }
      applyAndRender();
      renderActiveChips();
    });
    el.appendChild(chip);
  });
}

/* ── Active filter chips ── */
function renderActiveChips() {
  const bar = document.getElementById("active-chips-bar");
  if (!bar) return;
  const chips = [];
  const keyLabels = { sector: "Sector", severity: "Severity", confidence: "Confidence", fm: "FM", recordType: "Type", jurisdiction: "Jurisdiction" };
  Object.entries(activeFilters).forEach(([k, vals]) => {
    vals.forEach(v => {
      let label = v;
      if (k === "sector")   label = sectorLabel(v);
      if (k === "severity" || k === "confidence") label = cap(v);
      if (k === "fm")         label = (FM_LABELS[v] || v);
      if (k === "recordType")  label = RECORD_TYPE_LABELS[v] || cap(v);
      chips.push({ key: k, value: v, label: keyLabels[k] + ": " + label });
    });
  });

  bar.innerHTML = "";
  if (!chips.length) { bar.style.display = "none"; return; }
  bar.style.display = "flex";
  chips.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "active-chip";
    btn.setAttribute("aria-label", "Remove filter: " + c.label);
    btn.innerHTML = `${esc(c.label)} <span aria-hidden="true">×</span>`;
    btn.addEventListener("click", () => removeFilter(c.key, c.value));
    bar.appendChild(btn);
  });
}

function removeFilter(key, value) {
  activeFilters[key].delete(value);
  const cb = document.querySelector(`.filter-chip[data-key="${key}"][data-value="${CSS.escape(value)}"] input`);
  if (cb) { cb.checked = false; cb.closest(".filter-chip").classList.remove("active"); }
  applyAndRender();
  renderActiveChips();
}

/* ── Search ── */
function setSearch(q) {
  searchQuery = q.toLowerCase().trim();
  applyAndRender();
}

function matchSearch(inc, q) {
  if (!q) return true;
  const haystack = [
    inc.incident_id,
    inc.title,
    inc.summary,
    inc.ai_system_context,
    inc.impact,
    inc.jurisdiction,
    inc.record_type,
    RECORD_TYPE_LABELS[inc.record_type] || "",
    ...(inc.lessons  || []),
    ...(inc.sector   || []).map(sectorLabel),
    ...(inc.failure_modes || []).map(f => (FM_LABELS[f] || f) + " " + f),
    ...(inc.controls || []),
    ...(inc.evidence_required || []),
    ...(inc.harms || []),
    ...(inc.affected_stakeholders || []),
    ...(inc.sources || []).map(s => (s.title || "") + " " + (s.source_type || "") + " " + (s.url || "")),
  ].filter(Boolean).join(" ").toLowerCase();
  return haystack.includes(q);
}

/* ── Sort ── */
function sortIncidents(list) {
  const copy = [...list];
  switch (currentSort) {
    case "id-asc":     return copy.sort((a,b) => a.incident_id.localeCompare(b.incident_id));
    case "date-new":   return copy.sort((a,b) => parseDateApprox(b.date) - parseDateApprox(a.date));
    case "date-old":   return copy.sort((a,b) => parseDateApprox(a.date) - parseDateApprox(b.date));
    case "sev-high":   return copy.sort((a,b) => (SEV_ORDER[a.severity]??9) - (SEV_ORDER[b.severity]??9));
    case "conf-high":  return copy.sort((a,b) => (CONF_ORDER[a.confidence]??9) - (CONF_ORDER[b.confidence]??9));
    default:           return copy;
  }
}

const MONTHS = {january:0,february:1,march:2,april:3,may:4,june:5,july:6,august:7,september:8,october:9,november:10,december:11};
function parseDateApprox(d) {
  if (!d) return 0;
  const parts = d.toLowerCase().split(" ");
  if (parts.length < 3) return 0;
  const day = parseInt(parts[0], 10) || 1;
  const mon = MONTHS[parts[1]] ?? 0;
  const yr  = parseInt(parts[2], 10) || 2000;
  return new Date(yr, mon, day).getTime();
}

/* ── Apply + render ── */
function applyAndRender() {
  const { sector, severity, confidence, fm, recordType, jurisdiction } = activeFilters;
  let result = allIncidents.filter(inc => {
    if (sector.size       && ![...sector].some(s => (inc.sector||[]).includes(s)))          return false;
    if (severity.size     && !severity.has(inc.severity))                                   return false;
    if (confidence.size   && !confidence.has(inc.confidence))                               return false;
    if (fm.size           && ![...fm].some(f => (inc.failure_modes||[]).includes(f)))       return false;
    if (recordType.size   && !recordType.has(inc.record_type || "incident"))                return false;
    if (jurisdiction.size && !jurisdiction.has(inc.jurisdiction))                           return false;
    if (!matchSearch(inc, searchQuery))                                                     return false;
    return true;
  });
  result = sortIncidents(result);
  renderList(result);
}

function resetFilters() {
  Object.keys(activeFilters).forEach(k => activeFilters[k].clear());
  document.querySelectorAll(".filter-chip input").forEach(cb => { cb.checked = false; });
  document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
  const searchEl = document.getElementById("search-input");
  if (searchEl) { searchEl.value = ""; searchQuery = ""; }
  applyAndRender();
  renderActiveChips();
  const rtEl = document.getElementById("filter-record-type");
  if (rtEl) rtEl.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
}

/* ── Render list ── */
function renderList(incidents) {
  const container = document.getElementById("incident-list");
  const countEl   = document.getElementById("result-count");
  const total     = allIncidents.length;
  const shown     = incidents.length;
  countEl.textContent = shown + " of " + total + " record" + (total !== 1 ? "s" : "");
  countEl.setAttribute("aria-live", "polite");

  if (!shown) {
    const hasActiveFilter = Object.values(activeFilters).some(s => s.size) || searchQuery;
    container.innerHTML = `<div class="empty-state" role="status">
      <p>${hasActiveFilter ? "No records match the current search or filters." : "No records available."}</p>
      ${hasActiveFilter ? `<button class="filter-reset" onclick="resetFilters()" style="margin:1rem auto 0;display:block;">Clear all filters</button>` : ""}
    </div>`;
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
  const card = document.createElement("article");
  card.className = "incident-card";
  card.id        = inc.incident_id;
  card.dataset.id = inc.incident_id;
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-expanded", "false");
  card.setAttribute("aria-label", inc.incident_id + ": " + inc.title);

  const hasDraftSector = (inc.sector || []).some(s => DRAFT_SECTORS.has(s));
  const hasDraftFM     = (inc.failure_modes || []).some(f => DRAFT_FM.has(f));
  const isMedConf      = inc.confidence === "medium";
  const isLowConf      = inc.confidence === "low";

  /* Header */
  const copyId = "copy-" + inc.incident_id;
  let headerHtml = `
    <div class="card-header">
      <span class="inc-id">${esc(inc.incident_id)}</span>
      <span class="card-title">${esc(inc.title)}</span>
      <button class="copy-link-btn" id="${copyId}" aria-label="Copy link to ${esc(inc.incident_id)}" title="Copy link">⧉</button>
    </div>`;

  /* Meta badges */
  let metaHtml = `<div class="card-meta" aria-label="Metadata for ${esc(inc.incident_id)}">`;
  metaHtml += `<span class="badge badge-date">${esc(inc.date)}</span>`;

  (inc.sector || []).forEach(s => {
    const isDraft = DRAFT_SECTORS.has(s);
    metaHtml += `<span class="badge ${isDraft ? "badge-draft" : "badge-sector"}" title="${isDraft ? "Draft taxonomy ID" : "Sector"}">${isDraft ? "⚠ draft · " : ""}${esc(sectorLabel(s))}</span>`;
  });

  if (inc.record_type && inc.record_type !== 'incident')
    metaHtml += `<span class="badge badge-guidance" title="Record type">${esc(RECORD_TYPE_LABELS[inc.record_type] || inc.record_type)}</span>`;
  metaHtml += `<span class="badge badge-sev-${esc(inc.severity)}" title="Severity">Severity: ${esc(cap(inc.severity))}</span>`;
  metaHtml += `<span class="badge badge-conf-${esc(inc.confidence)}" title="Confidence">Confidence: ${esc(cap(inc.confidence))}</span>`;

  (inc.failure_modes || []).forEach(f => {
    const isDraft = DRAFT_FM.has(f);
    metaHtml += `<span class="badge badge-fm${isDraft ? " badge-draft" : ""}" title="${isDraft ? "Draft FM" : "Failure mode"}">${isDraft ? "⚠ " : ""}${esc(f)}</span>`;
  });

  if (hasDraftSector || hasDraftFM)
    metaHtml += `<span class="badge badge-caution" title="Contains draft taxonomy IDs">⚠ Draft taxonomy</span>`;
  if (isMedConf || isLowConf)
    metaHtml += `<span class="badge badge-caution" title="Confidence level reflects evidence quality">Source caution: confidence ${esc(inc.confidence)}</span>`;

  metaHtml += `</div>`;

  /* Toggle hint */
  const toggleHtml = `<div class="card-toggle-hint" aria-hidden="true">Click to expand ▾</div>`;

  /* Detail section */
  const detailHtml = buildDetail(inc);

  card.innerHTML = headerHtml + metaHtml + toggleHtml + `<div class="card-detail" role="region" aria-label="Detail for ${esc(inc.incident_id)}">${detailHtml}</div>`;

  /* Toggle expand */
  function toggleCard(e) {
    if (e.target.closest(".copy-link-btn") || e.target.tagName === "A") return;
    const detail = card.querySelector(".card-detail");
    const hint   = card.querySelector(".card-toggle-hint");
    const isOpen = detail.classList.toggle("visible");
    card.classList.toggle("open", isOpen);
    card.setAttribute("aria-expanded", String(isOpen));
    if (hint) hint.textContent = isOpen ? "Click to collapse ▴" : "Click to expand ▾";
    if (isOpen) { openCards.add(inc.incident_id); history.replaceState(null, "", "#" + inc.incident_id); }
    else        { openCards.delete(inc.incident_id); }
  }

  card.addEventListener("click",   toggleCard);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleCard(e); } });

  /* Copy link */
  card.querySelector(".copy-link-btn").addEventListener("click", e => {
    e.stopPropagation();
    const url = location.href.replace(/#.*$/, "") + "#" + inc.incident_id;
    navigator.clipboard.writeText(url).then(() => {
      const btn = e.currentTarget;
      const orig = btn.textContent;
      btn.textContent = "✓";
      setTimeout(() => { btn.textContent = orig; }, 1500);
    }).catch(() => {
      prompt("Copy this link:", url);
    });
  });

  return card;
}

/* ── Build detail ── */
function buildDetail(inc) {
  const sections = [];

  const isGuidance = (inc.record_type === 'guidance' || inc.record_type === 'governance_case');

  if (isGuidance) {
    sections.push(`<div class="guidance-notice" role="note">Official guidance / governance case. Not an enforcement allegation.</div>`);
  }

  if (inc.summary) {
    const sectionLabel = isGuidance ? 'Summary' : 'What Happened';
    sections.push(detailSection(sectionLabel, `<div class="detail-text">${esc(inc.summary)}</div>`));
  }

  if (inc.ai_system_context)
    sections.push(detailSection("AI System / Context", `<div class="detail-text">${esc(inc.ai_system_context)}</div>`));

  if (inc.harms?.length)
    sections.push(detailSection("Harms", `<ul class="detail-list">${inc.harms.map(h => `<li>${esc(h)}</li>`).join("")}</ul>`));

  if (inc.impact)
    sections.push(detailSection("Impact", `<div class="detail-text">${esc(inc.impact)}</div>`));

  if (inc.failure_modes?.length) {
    const fmItems = inc.failure_modes.map(f => {
      const isDraft = DRAFT_FM.has(f);
      return `<li>${isDraft ? "⚠ " : ""}<strong>${esc(f)}</strong> — ${esc(FM_LABELS[f] || f)}${isDraft ? ' <span class="inline-draft">(draft taxonomy)</span>' : ""}</li>`;
    }).join("");
    sections.push(detailSection("Failure Modes", `<ul class="detail-list">${fmItems}</ul>`));
  }

  if (inc.controls?.length)
    sections.push(detailSection(isGuidance ? "Applicable Controls" : "Affected Controls",
      `<div class="controls-row">${inc.controls.map(c => `<span class="badge-ctl">${esc(c)}</span>`).join("")}</div>`));

  if (inc.jurisdiction)
    sections.push(detailSection("Jurisdiction", `<div class="detail-text">${esc(inc.jurisdiction)}</div>`));

  if (inc.evidence_required?.length)
    sections.push(detailSection("Evidence Required",
      `<ul class="detail-list">${inc.evidence_required.map(e => `<li>${esc(e)}</li>`).join("")}</ul>`));

  if (inc.lessons?.length)
    sections.push(detailSection(isGuidance ? "Governance Lesson" : "Governance Lessons",
      `<ul class="detail-list">${inc.lessons.map(l => `<li class="lesson">${esc(l)}</li>`).join("")}</ul>`));

  if (inc.affected_stakeholders?.length)
    sections.push(detailSection("Affected Stakeholders",
      `<ul class="detail-list">${inc.affected_stakeholders.map(s => `<li>${esc(s)}</li>`).join("")}</ul>`));

  /* Sources */
  if (inc.sources?.length) {
    let srcHtml = "";
    inc.sources.forEach((src, i) => {
      const caveat = (inc.confidence === "medium" || inc.confidence === "low")
        ? `<span class="source-caution-note">Confidence: ${esc(inc.confidence)} — see record notes</span>` : "";
      srcHtml += `<div class="source-item">
        <div class="source-num">Source ${i + 1}</div>
        <a href="${esc(src.url)}" target="_blank" rel="noopener noreferrer">${esc(src.title || src.url)}</a>
        <div class="source-meta">
          <span class="source-type-badge">${esc(src.source_type.replace(/_/g, " "))}</span>
          <span class="source-accessed">Last verified: ${esc(src.accessed)}</span>
          ${caveat}
        </div>
      </div>`;
    });
    sections.push(detailSection("Sources", srcHtml));
  }

  /* Caveats */
  const caveats = [];
  if ((inc.sector||[]).some(s => DRAFT_SECTORS.has(s)))
    caveats.push("Sector taxonomy ID is draft — may be revised in a future taxonomy version.");
  if ((inc.failure_modes||[]).some(f => DRAFT_FM.has(f)))
    caveats.push("FM-REL failure mode ID is draft — may be revised in a future taxonomy version.");
  if (inc.confidence === "medium")
    caveats.push("Confidence is medium — this record anchors on a strong secondary or company-level source, not a court/regulatory ruling.");
  if (inc.confidence === "low")
    caveats.push("Confidence is low — source evidence is limited. Treat findings with caution.");

  if (caveats.length)
    sections.push(detailSection("Caveats",
      `<ul class="detail-list caveat-list">${caveats.map(c => `<li>${esc(c)}</li>`).join("")}</ul>`));

  if (inc.date_note)
    sections.push(detailSection("Date Note",
      `<div class="detail-text detail-muted">${esc(inc.date_note)}</div>`));

  return sections.join("");
}

function detailSection(label, content) {
  return `<div class="detail-section">
    <div class="detail-label">${esc(label)}</div>
    ${content}
  </div>`;
}

/* ── Deep linking ── */
function handleHashOnLoad() {
  const hash = location.hash.replace("#", "");
  if (!hash) return;
  setTimeout(() => {
    const card = document.getElementById(hash);
    if (!card) return;
    const detail = card.querySelector(".card-detail");
    const hint   = card.querySelector(".card-toggle-hint");
    if (detail && !detail.classList.contains("visible")) {
      detail.classList.add("visible");
      card.classList.add("open");
      card.setAttribute("aria-expanded", "true");
      if (hint) hint.textContent = "Click to collapse ▴";
      openCards.add(hash);
    }
    card.scrollIntoView({ behavior: "smooth", block: "start" });
    card.focus();
  }, 100);
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
  "general":                  "General / Cross-sector",
  "cross-sector AI governance": "Cross-sector AI Governance"
};

const RECORD_TYPE_LABELS = {
  "guidance":       "Guidance / Governance Case",
  "governance_case":"Governance Case",
  "incident":       "Incident"
};

function sectorLabel(id) { return SECTOR_NAMES[id] || id; }

/* ── Boot ── */
document.addEventListener("DOMContentLoaded", () => {
  /* Search */
  const searchEl = document.getElementById("search-input");
  if (searchEl) {
    searchEl.addEventListener("input", () => setSearch(searchEl.value));
    searchEl.addEventListener("keydown", e => { if (e.key === "Escape") { searchEl.value = ""; setSearch(""); } });
  }

  /* Sort */
  const sortEl = document.getElementById("sort-select");
  if (sortEl) {
    sortEl.addEventListener("change", () => { currentSort = sortEl.value; applyAndRender(); });
  }

  /* Reset */
  const resetBtn = document.getElementById("reset-filters");
  if (resetBtn) resetBtn.addEventListener("click", resetFilters);

  /* Hash navigation */
  window.addEventListener("hashchange", handleHashOnLoad);

  init();
});
