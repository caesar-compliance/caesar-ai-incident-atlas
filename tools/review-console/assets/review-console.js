// Interactive Client JS for Local Draft Review Console Simulation

document.addEventListener('DOMContentLoaded', () => {
  let bundleData = { candidates: [], drafts: [], digests: [] };
  let selectedDraft = null;

  // DOM Elements
  const draftListContainer = document.getElementById('draft-list-container');
  const draftCountEl = document.getElementById('draft-count');
  const bundleTimestampEl = document.getElementById('bundle-timestamp');
  const draftSearchInput = document.getElementById('draft-search');
  const emptyStatePanel = document.getElementById('empty-state');
  const activeDetailPanel = document.getElementById('active-detail');
  const weeklyHighlightsList = document.getElementById('weekly-highlights-list');

  // Detail View DOM Elements
  const detailDraftId = document.getElementById('detail-draft-id');
  const detailCandidateId = document.getElementById('detail-candidate-id');
  const detailProposedTitle = document.getElementById('detail-proposed-title');
  const detailJurisdiction = document.getElementById('detail-jurisdiction');
  const detailLegalDomain = document.getElementById('detail-legal-domain');
  const detailCommercialDomain = document.getElementById('detail-commercial-domain');
  const detailCleanRoomSummary = document.getElementById('detail-clean-room-summary');
  const detailCaseType = document.getElementById('detail-case-type');
  const detailSourceAuthorities = document.getElementById('detail-source-authorities');
  const detailSourceUrl = document.getElementById('detail-source-url');

  // Risk & Safety Elements
  const detailSourceTier = document.getElementById('detail-source-tier');
  const detailSourceRiskLevel = document.getElementById('detail-source-risk-level');
  const detailPublishRecommendation = document.getElementById('detail-publish-recommendation');
  const detailBusinessRisk = document.getElementById('detail-business-risk');

  // Lists
  const detailFailureModesList = document.getElementById('detail-failure-modes-list');
  const detailMissingControlsList = document.getElementById('detail-missing-controls-list');
  const detailEvidenceList = document.getElementById('detail-evidence-list');
  const detailTrainingLesson = document.getElementById('detail-training-lesson');
  const detailVendorQuestionsList = document.getElementById('detail-vendor-questions-list');

  // Promotion Gate Simulation Elements
  const btnSimulateAudit = document.getElementById('btn-simulate-audit');
  const btnSimulateReject = document.getElementById('btn-simulate-reject');
  const simulationResultPanel = document.getElementById('simulation-result-panel');
  const gateStepCurator = document.getElementById('gate-step-curator');
  const gateStepWording = document.getElementById('gate-step-wording');
  const gateStepControl = document.getElementById('gate-step-control');

  // 1. Initial Load of review-bundle.json
  fetch('./review-bundle.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      bundleData = data;

      // Update global UI info
      bundleTimestampEl.textContent = data.generated_at
        ? new Date(data.generated_at).toLocaleString()
        : 'Unknown';

      renderSidebar(bundleData.drafts);
      renderDigestPreview();
    })
    .catch(err => {
      console.error('Error fetching review-bundle.json:', err);
      draftListContainer.innerHTML = `
        <div class="loading-placeholder" style="color: var(--color-danger);">
          Failed to load local review bundle.<br>
          Run <code>node scripts/build-review-bundle.mjs</code> first!
        </div>
      `;
    });

  // 2. Render Sidebar
  function renderSidebar(draftsToRender) {
    draftListContainer.innerHTML = '';
    draftCountEl.textContent = draftsToRender.length;

    if (draftsToRender.length === 0) {
      draftListContainer.innerHTML = `
        <div class="loading-placeholder">No drafts found.</div>
      `;
      return;
    }

    draftsToRender.forEach(draft => {
      const isSelected = selectedDraft && selectedDraft.draft_id === draft.draft_id;

      // Find candidate associated with this draft
      const firstCandId = draft.candidate_ids && draft.candidate_ids[0];
      const candidate = bundleData.candidates.find(c => c.candidate_id === firstCandId);
      const sourceTier = candidate ? candidate.source_tier : 'unknown';

      const itemDiv = document.createElement('button');
      itemDiv.className = `draft-item ${isSelected ? 'active' : ''}`;
      itemDiv.setAttribute('data-id', draft.draft_id);

      // Compute color class based on source tier
      let tierColorClass = 'badge-green';
      if (sourceTier === 'yellow') tierColorClass = 'badge-yellow';
      if (sourceTier === 'red') tierColorClass = 'badge-red';

      itemDiv.innerHTML = `
        <div class="draft-item-header">
          <span class="draft-item-id">${draft.draft_id}</span>
          <span class="draft-item-tier ${tierColorClass}">${sourceTier}</span>
        </div>
        <div class="draft-item-title">${escapeHTML(draft.proposed_case_title)}</div>
        <div class="draft-item-meta">
          <span>${escapeHTML(draft.jurisdiction || 'US')} • ${escapeHTML(draft.case_type || 'Unknown')}</span>
          <span>${escapeHTML(draft.review_status || 'draft')}</span>
        </div>
      `;

      itemDiv.addEventListener('click', () => {
        selectDraft(draft.draft_id);
      });

      draftListContainer.appendChild(itemDiv);
    });
  }

  // 3. Search Filter
  draftSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = bundleData.drafts.filter(draft => {
      return (
        draft.draft_id.toLowerCase().includes(query) ||
        draft.proposed_case_title.toLowerCase().includes(query) ||
        (draft.jurisdiction && draft.jurisdiction.toLowerCase().includes(query)) ||
        (draft.case_type && draft.case_type.toLowerCase().includes(query))
      );
    });
    renderSidebar(filtered);
  });

  // 4. Select Draft Action
  function selectDraft(draftId) {
    selectedDraft = bundleData.drafts.find(d => d.draft_id === draftId);
    if (!selectedDraft) return;

    // Redraw sidebar to highlight active
    const activeQuery = draftSearchInput.value.toLowerCase();
    const currentList = activeQuery
      ? bundleData.drafts.filter(d => d.draft_id.toLowerCase().includes(activeQuery) || d.proposed_case_title.toLowerCase().includes(activeQuery))
      : bundleData.drafts;
    renderSidebar(currentList);

    // Hide empty state and show details
    emptyStatePanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    // Reset simulator results
    simulationResultPanel.classList.add('hidden');
    gateStepCurator.className = 'status-step pending';
    gateStepCurator.querySelector('.step-check').innerHTML = '○';
    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';

    // Populate Fields
    const candId = selectedDraft.candidate_ids && selectedDraft.candidate_ids[0];
    const candidate = bundleData.candidates.find(c => c.candidate_id === candId) || {};

    detailDraftId.textContent = selectedDraft.draft_id;
    detailCandidateId.textContent = candId || 'NO_CANDIDATE_LINK';
    detailProposedTitle.textContent = selectedDraft.proposed_case_title;
    detailJurisdiction.textContent = selectedDraft.jurisdiction || 'US';
    detailLegalDomain.textContent = selectedDraft.legal_domain || 'Unspecified';
    detailCommercialDomain.textContent = selectedDraft.commercial_domain || 'Unspecified';
    detailCleanRoomSummary.textContent = selectedDraft.clean_room_summary || 'No summary drafted.';
    detailCaseType.textContent = selectedDraft.case_type || 'enforcement';

    // Authorities
    const authList = selectedDraft.source_authorities || [];
    detailSourceAuthorities.textContent = authList.length > 0 ? authList.join(', ') : 'None';

    // Source Link URL
    const urls = selectedDraft.source_urls || (candidate.source_url ? [candidate.source_url] : []);
    if (urls.length > 0) {
      detailSourceUrl.href = urls[0];
      detailSourceUrl.textContent = urls[0];
      detailSourceUrl.classList.remove('hidden');
    } else {
      detailSourceUrl.href = '#';
      detailSourceUrl.textContent = 'None Provided';
    }

    // Risk and Tiers
    const tier = (candidate.source_tier || 'unknown').toLowerCase();
    detailSourceTier.textContent = tier.toUpperCase();
    detailSourceTier.className = `tier-pill tier-${tier}`;

    const risk = (selectedDraft.source_risk_level || candidate.source_risk_level || 'unknown').toLowerCase();
    detailSourceRiskLevel.textContent = risk.toUpperCase();
    detailSourceRiskLevel.className = `risk-pill risk-${risk}`;

    detailPublishRecommendation.textContent = selectedDraft.publish_recommendation || 'needs_review';
    detailBusinessRisk.textContent = selectedDraft.business_risk || 'No risk evaluation provided.';

    // Lists
    populateList(detailFailureModesList, selectedDraft.failure_mode || [], 'tag');
    populateList(detailMissingControlsList, selectedDraft.missing_controls || [], 'control');
    populateList(detailEvidenceList, selectedDraft.required_evidence || [], 'evidence');

    // Insights
    detailTrainingLesson.textContent = selectedDraft.training_lesson || 'No training guidance drafted.';
    populateList(detailVendorQuestionsList, selectedDraft.vendor_questions || [], 'question');
  }

  // 5. Populate List Helper
  function populateList(element, items, type) {
    element.innerHTML = '';
    if (!items || items.length === 0) {
      const li = document.createElement('li');
      li.textContent = `No ${type} entries associated.`;
      if (type === 'question') li.style.fontStyle = 'italic';
      element.appendChild(li);
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      element.appendChild(li);
    });
  }

  // 6. Digest Preview Panel in Empty State
  function renderDigestPreview() {
    weeklyHighlightsList.innerHTML = '';
    if (bundleData.digests && bundleData.digests.length > 0) {
      const preview = bundleData.digests[0];
      const highlights = preview.highlights || [];
      if (highlights.length === 0) {
        weeklyHighlightsList.innerHTML = '<li>No synthetic weekly discovery drafts included.</li>';
      } else {
        highlights.forEach(hl => {
          const li = document.createElement('li');
          li.textContent = hl;
          weeklyHighlightsList.appendChild(li);
        });
      }
    } else {
      weeklyHighlightsList.innerHTML = '<li>No offline discovery digests generated.</li>';
    }
  }

  // 7. Simulated Gate Controls
  btnSimulateAudit.addEventListener('click', () => {
    if (!selectedDraft) return;

    // Fast multi-stage animation simulation
    setTimeout(() => {
      // Step 1 Curator
      gateStepCurator.className = 'status-step passed';
      gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    }, 400);

    setTimeout(() => {
      // Step 2 Clean Wording
      gateStepWording.className = 'status-step passed';
      gateStepWording.querySelector('.step-check').innerHTML = '✓';
    }, 800);

    setTimeout(() => {
      // Step 3 Control Tower Block
      gateStepControl.className = 'status-step blocked';
      gateStepControl.querySelector('.step-check').innerHTML = '🚫';

      // Reveal containment barrier output
      simulationResultPanel.classList.remove('hidden');
      simulationResultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1200);
  });

  btnSimulateReject.addEventListener('click', () => {
    if (!selectedDraft) return;
    alert(`[Simulation] Draft ${selectedDraft.draft_id} rejected and archived successfully under mock review flow parameters.`);
  });

  // Helper Escape HTML
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
