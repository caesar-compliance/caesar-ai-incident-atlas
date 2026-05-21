// Interactive Client JS for Local Draft Review Console Simulation
// Supports both mock review-bundle.json and real-review-bundle.json local-only data

document.addEventListener('DOMContentLoaded', () => {
  let bundleData = { candidates: [], drafts: [], digests: [] };
  let selectedDraft = null;
  let isRealBundle = false;

  // DOM Elements
  const draftListContainer = document.getElementById('draft-list-container');
  const draftCountEl = document.getElementById('draft-count');
  const bundleTimestampEl = document.getElementById('bundle-timestamp');
  const draftSearchInput = document.getElementById('draft-search');
  const emptyStatePanel = document.getElementById('empty-state');
  const activeDetailPanel = document.getElementById('active-detail');
  const weeklyHighlightsList = document.getElementById('weekly-highlights-list');
  const sidebarHeaderTitle = document.getElementById('sidebar-header-title');
  const safetyWarningBanner = document.querySelector('.safety-warning-banner');
  const safetyLabel = document.querySelector('.safety-label');
  const safetyIndicator = document.querySelector('.safety-indicator span:first-child');
  const bundleSelector = document.getElementById('bundle-selector');

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

  // Define original contents of simulationResultPanel for resetting
  const originalResultHtml = `
    <div class="result-header">
      <span class="result-badge badge-blocked">PROMOTION BLOCKED</span>
    </div>
    <div class="result-body">
      <p><strong>Reason:</strong> Synthetic mock data drafts cannot be promoted to public Atlas records. The Promotion Gate has intercepted this attempt.</p>
      <div class="gate-error-message">
        <strong>ERROR: MOCK_CONTAINMENT_RULE_VIOLATION</strong><br>
        Offline mock auto-discovery drafts are strictly confined to the local reviewer console database and cannot be pushed onto site/ public incidents list.
      </div>
      <div class="gate-checklist-item">
        <span>Approved for Publication:</span> <strong>False</strong>
      </div>
      <div class="gate-checklist-item">
        <span>Status:</span> <strong>mock_review_only</strong>
      </div>
    </div>
  `;

  // 1. Load Bundle Function
  function loadBundle(bundleName) {
    draftListContainer.innerHTML = '<div class="loading-placeholder">Loading bundle data...</div>';
    emptyStatePanel.classList.remove('hidden');
    activeDetailPanel.classList.add('hidden');
    selectedDraft = null;

    fetch(`./${bundleName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        bundleData = data;
        isRealBundle = (data.dataset_type === "real_detected_candidates_local_only");

        // Update global UI info
        bundleTimestampEl.textContent = data.generated_at
          ? new Date(data.generated_at).toLocaleString()
          : 'Unknown';

        if (isRealBundle) {
          // Real detected candidates view
          sidebarHeaderTitle.textContent = "Real Candidates";
          safetyWarningBanner.innerHTML = `<strong>[CRITICAL SECURITY ALERT]</strong> REAL WATCHER CANDIDATE METADATA • NOT APPROVED FOR PUBLIC SITE • NOT LEGAL ADVICE • STRICTLY LOCAL DATABASE`;
          safetyLabel.textContent = "LOCAL-ONLY REAL CANDIDATES";
          if (safetyIndicator) {
            safetyIndicator.className = 'pulse-green';
            safetyIndicator.style.backgroundColor = 'var(--color-success)';
          }

          renderSidebarReal(bundleData.candidates);
          weeklyHighlightsList.innerHTML = '<li>Local-only real candidate database loaded. No synthetic weekly previews available.</li>';
        } else {
          // Synthetic mock view
          sidebarHeaderTitle.textContent = "Mock Draft Cases";
          safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> SYNTHETIC MOCK DATA ONLY • NOT APPROVED FOR PUBLIC ATLAS • NOT LEGAL ADVICE • STRICTLY LOCAL SANDBOX`;
          safetyLabel.textContent = "OFFLINE MOCK AUDIT SIMULATION";
          if (safetyIndicator) {
            safetyIndicator.className = 'pulse-red';
            safetyIndicator.style.backgroundColor = 'var(--color-danger)';
          }

          renderSidebar(bundleData.drafts);
          renderDigestPreview();
        }
      })
      .catch(err => {
        console.error(`Error fetching ${bundleName}:`, err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load bundle: ${bundleName}<br>
            Please run the corresponding generation script first!
          </div>
        `;
      });
  }

  // 2. Render Mock Sidebar
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

  // 3. Render Real Sidebar
  function renderSidebarReal(candidatesToRender) {
    draftListContainer.innerHTML = '';
    draftCountEl.textContent = candidatesToRender.length;

    if (candidatesToRender.length === 0) {
      draftListContainer.innerHTML = `
        <div class="loading-placeholder">No real candidates found.</div>
      `;
      return;
    }

    candidatesToRender.forEach(cand => {
      const isSelected = selectedDraft && selectedDraft.candidate_id === cand.candidate_id;

      const itemDiv = document.createElement('button');
      itemDiv.className = `draft-item ${isSelected ? 'active' : ''}`;
      itemDiv.setAttribute('data-id', cand.candidate_id);

      let tierColorClass = 'badge-green';
      if (cand.source_tier === 'yellow') tierColorClass = 'badge-yellow';
      if (cand.source_tier === 'red') tierColorClass = 'badge-red';

      itemDiv.innerHTML = `
        <div class="draft-item-header">
          <span class="draft-item-id">${cand.candidate_id}</span>
          <span class="draft-item-tier ${tierColorClass}">${cand.source_tier || 'green'}</span>
        </div>
        <div class="draft-item-title">${escapeHTML(cand.title)}</div>
        <div class="draft-item-meta">
          <span>${escapeHTML(cand.jurisdiction || 'US')} • ${escapeHTML(cand.preliminary_case_type || 'Unknown')}</span>
          <span>${escapeHTML(cand.status || 'real_detected')}</span>
        </div>
      `;

      itemDiv.addEventListener('click', () => {
        selectCandidate(cand.candidate_id);
      });

      draftListContainer.appendChild(itemDiv);
    });
  }

  // 4. Search Filter
  draftSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (isRealBundle) {
      const filtered = bundleData.candidates.filter(c => {
        return (
          c.candidate_id.toLowerCase().includes(query) ||
          c.title.toLowerCase().includes(query) ||
          (c.jurisdiction && c.jurisdiction.toLowerCase().includes(query)) ||
          (c.preliminary_case_type && c.preliminary_case_type.toLowerCase().includes(query))
        );
      });
      renderSidebarReal(filtered);
    } else {
      const filtered = bundleData.drafts.filter(draft => {
        return (
          draft.draft_id.toLowerCase().includes(query) ||
          draft.proposed_case_title.toLowerCase().includes(query) ||
          (draft.jurisdiction && draft.jurisdiction.toLowerCase().includes(query)) ||
          (draft.case_type && draft.case_type.toLowerCase().includes(query))
        );
      });
      renderSidebar(filtered);
    }
  });

  // 5. Select Draft Action (Mock)
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

    // Reset simulator results for mock draft
    simulationResultPanel.classList.add('hidden');
    simulationResultPanel.innerHTML = originalResultHtml;
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

  // 6. Select Candidate Action (Real)
  function selectCandidate(candId) {
    const candidate = bundleData.candidates.find(c => c.candidate_id === candId);
    if (!candidate) return;

    selectedDraft = candidate; // Use selectedDraft variable for active tracking

    // Redraw sidebar to highlight active
    const activeQuery = draftSearchInput.value.toLowerCase();
    const currentList = activeQuery
      ? bundleData.candidates.filter(c => c.candidate_id.toLowerCase().includes(activeQuery) || c.title.toLowerCase().includes(activeQuery))
      : bundleData.candidates;
    renderSidebarReal(currentList);

    // Hide empty state and show details
    emptyStatePanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    // Display strict local containment warning immediately
    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: var(--color-danger); color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center;">
        PROMOTION BLOCKED
      </div>
      <div class="result-body" style="font-size: 13px;">
        <p><strong>Reason:</strong> Real detected candidates are kept strictly in a secure local database outside the public site folder to prevent premature publication.</p>
        <div class="gate-error-message" style="border-left: 3px solid var(--color-danger); padding-left: 8px; margin-top: 10px; font-style: normal; color: var(--color-text);">
          <strong>SAFETY CONSTRAINTS:</strong><br>
          • Local-only metadata record<br>
          • Not approved for public release<br>
          • Candidate metadata only<br>
          • Not legal advice
        </div>
        <div class="gate-checklist-item" style="margin-top: 8px;">
          <span>Approved for Publication:</span> <strong>False</strong>
        </div>
        <div class="gate-checklist-item">
          <span>Status:</span> <strong>real_detected</strong>
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step pending';
    gateStepCurator.querySelector('.step-check').innerHTML = '○';
    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';

    // Populate Fields
    detailDraftId.textContent = 'REAL_CANDIDATE';
    detailCandidateId.textContent = candidate.candidate_id;
    detailProposedTitle.textContent = candidate.title;
    detailJurisdiction.textContent = candidate.jurisdiction || 'US';
    detailLegalDomain.textContent = 'Pending Classification';
    detailCommercialDomain.textContent = 'Pending Classification';

    // Display metadata notes & keywords cleanly
    detailCleanRoomSummary.innerHTML = `
      <strong>Caesar Curator Internal Notes:</strong><br>
      ${escapeHTML(candidate.notes || 'Factual candidate record automatically detected during manual watcher run.')}<br><br>
      <strong>Detected Keywords:</strong><br>
      ${(candidate.detected_keywords || []).map(k => `<span style="display:inline-block; background:#333; padding:2px 8px; border-radius:10px; margin-right:5px; font-size:11px; margin-top:5px; color:#ddd; border:1px solid #555;">${escapeHTML(k)}</span>`).join('')}
    `;

    detailCaseType.textContent = candidate.preliminary_case_type || 'regulator_guidance';
    detailSourceAuthorities.textContent = candidate.source_id || 'Unknown';

    if (candidate.source_url) {
      detailSourceUrl.href = candidate.source_url;
      detailSourceUrl.textContent = candidate.source_url;
      detailSourceUrl.classList.remove('hidden');
    } else {
      detailSourceUrl.href = '#';
      detailSourceUrl.textContent = 'None Provided';
    }

    // Risk and Tiers
    const tier = (candidate.source_tier || 'green').toLowerCase();
    detailSourceTier.textContent = tier.toUpperCase();
    detailSourceTier.className = `tier-pill tier-${tier}`;

    detailSourceRiskLevel.textContent = 'LOCAL_ONLY';
    detailSourceRiskLevel.className = 'risk-pill risk-green';

    detailPublishRecommendation.textContent = 'publication_blocked_local_only';
    detailBusinessRisk.textContent = 'This is a real-world candidate record and is held strictly in the non-public data/watch/ folder. Direct promotion to the public Atlas dataset is disallowed without clean-room copy editing.';

    // Clear list items since they don't apply to raw candidates
    populateList(detailFailureModesList, [], 'tag');
    populateList(detailMissingControlsList, [], 'control');
    populateList(detailEvidenceList, [], 'evidence');

    // Insights
    detailTrainingLesson.textContent = 'This is raw candidate metadata detected via watch triggers. No curator insights are compiled yet.';
    populateList(detailVendorQuestionsList, [], 'question');
  }

  // 7. Populate List Helper
  function populateList(element, items, type) {
    element.innerHTML = '';
    if (!items || items.length === 0) {
      const li = document.createElement('li');
      li.textContent = isRealBundle ? `N/A for raw candidates` : `No ${type} entries associated.`;
      if (type === 'question' || isRealBundle) li.style.fontStyle = 'italic';
      element.appendChild(li);
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      element.appendChild(li);
    });
  }

  // 8. Digest Preview Panel in Empty State
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

  // 9. Simulated Gate Controls
  btnSimulateAudit.addEventListener('click', () => {
    if (!selectedDraft) return;

    if (isRealBundle) {
      alert('[Audit Gate Warning] Raw candidate metadata records are blocked from simulated Curator/Wording promotion gates until promoted to a formal draft JSON structure.');
      return;
    }

    // Fast multi-stage animation simulation for mock drafts
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
    const id = isRealBundle ? selectedDraft.candidate_id : selectedDraft.draft_id;
    alert(`[Simulation] Record ${id} rejected and archived successfully under mock review flow parameters.`);
  });

  // Bundle Selector Listener
  if (bundleSelector) {
    bundleSelector.addEventListener('change', (e) => {
      loadBundle(e.target.value);
    });
  }

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

  // Initialize load
  loadBundle('review-bundle.json');
});
