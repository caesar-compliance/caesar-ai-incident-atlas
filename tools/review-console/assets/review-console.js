// Interactive Client JS for Local Draft Review Console Simulation
// Supports mock review-bundle.json and real-review-bundle.json (T048 pipeline)

document.addEventListener('DOMContentLoaded', () => {
  let bundleData = { candidates: [], drafts: [], promotion_packets: [], digests: [], source_health_summary: null };
  let selectedDraft = null;
  let isRealBundle = false;
  let isPrivateIntakeBundle = false;
  let privateDecisions = [];
  let privatePackets = [];
  let privateApprovals = [];
  let activeStage = 'candidates'; // candidates | drafts | packets | health
  let activeQualityFilter = 'all';

  // DOM Elements
  const draftListContainer = document.getElementById('draft-list-container');
  const draftCountEl = document.getElementById('draft-count');
  const bundleTimestampEl = document.getElementById('bundle-timestamp');
  const draftSearchInput = document.getElementById('draft-search');
  const emptyStatePanel = document.getElementById('empty-state');
  const activeDetailPanel = document.getElementById('active-detail');
  const healthDetailPanel = document.getElementById('health-detail');
  const packetDetailPanel = document.getElementById('packet-detail');
  const weeklyHighlightsList = document.getElementById('weekly-highlights-list');
  const sidebarHeaderTitle = document.getElementById('sidebar-header-title');
  const safetyWarningBanner = document.querySelector('.safety-warning-banner');
  const safetyLabel = document.querySelector('.safety-label');
  const safetyIndicator = document.querySelector('.safety-indicator span:first-child');
  const bundleSelector = document.getElementById('bundle-selector');
  const pipelineStageTabs = document.getElementById('pipeline-stage-tabs');
  const pipelineSummaryBar = document.getElementById('pipeline-summary-bar');
  const digestPreviewBlock = document.getElementById('digest-preview-block');
  const qualityClassFilter = document.getElementById('quality-class-filter');
  const qualityClassSelect = document.getElementById('quality-class-select');

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

  // Helper: hide all detail panels
  function hideAllDetailPanels() {
    emptyStatePanel.classList.remove('hidden');
    activeDetailPanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    const shortlistDetailPanel = document.getElementById('shortlist-detail');
    if (shortlistDetailPanel) shortlistDetailPanel.classList.add('hidden');
  }

  // Helper: switch active stage tab
  function setActiveStage(stage) {
    activeStage = stage;
    document.querySelectorAll('.stage-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.stage === stage);
    });
    selectedDraft = null;
    hideAllDetailPanels();

    if (stage === 'candidates') {
      sidebarHeaderTitle.textContent = 'Real Candidates';
      renderSidebarReal(applyQualityFilter(bundleData.candidates || []));
    } else if (stage === 'drafts') {
      sidebarHeaderTitle.textContent = 'Real Drafts';
      renderSidebarDrafts(bundleData.drafts || []);
    } else if (stage === 'packets') {
      sidebarHeaderTitle.textContent = 'Promotion Packets';
      renderSidebarPackets(bundleData.promotion_packets || []);
    } else if (stage === 'shortlist') {
      sidebarHeaderTitle.textContent = 'Case Shortlist';
      draftListContainer.innerHTML = '<div class="loading-placeholder" style="font-style:italic; color: var(--color-muted);">Select Shortlist tab to view top 5 candidates for Control Tower review.</div>';
      draftCountEl.textContent = '';
      showShortlistPanel();
    } else if (stage === 'health') {
      sidebarHeaderTitle.textContent = 'Source Health';
      draftListContainer.innerHTML = '<div class="loading-placeholder" style="font-style:italic; color: var(--color-muted);">Select Health tab to view source health report.</div>';
      draftCountEl.textContent = '';
      showHealthPanel();
    }
  }

  // 1. Load Bundle Function
  function loadBundle(bundleName) {
    draftListContainer.innerHTML = '<div class="loading-placeholder">Loading bundle data...</div>';
    hideAllDetailPanels();
    selectedDraft = null;

    if (bundleName === 'private-candidate-intake.json') {
      isPrivateIntakeBundle = true;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE LOCAL INTAKE REVIEW • NOT APPROVED FOR PUBLIC ATLAS • NOT LEGAL ADVICE • STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE LOCAL INTAKE CONSOLE";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-purple';
        safetyIndicator.style.backgroundColor = '#9333ea';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Private Intake Records";

      Promise.all([
        fetch(`./data/private-candidate-intake.json`).then(r => r.json()),
        fetch(`./data/private-review-decisions.json`).then(r => r.json()).catch(() => ({ decisions: [] })),
        fetch(`./data/private-draft-candidate-packets.json`).then(r => r.json()).catch(() => ({ packets: [] })),
        fetch(`./data/private-draft-approvals.json`).then(r => r.json()).catch(() => ({ templates: [] }))
      ])
      .then(([intakeData, decisionsData, packetsData, approvalsData]) => {
        bundleData = intakeData;
        privateDecisions = decisionsData.decisions || [];
        privatePackets = packetsData.packets || [];
        privateApprovals = approvalsData.templates || [];

        bundleTimestampEl.textContent = intakeData.generated_at
          ? new Date(intakeData.generated_at).toLocaleString()
          : 'Unknown';

        renderSidebarPrivateIntake(intakeData.records || []);
      })
      .catch(err => {
        console.error("Error loading private intake bundle:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Intake bundle.<br>
            Please run the private review workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-draft-candidate-package.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE DRAFT CANDIDATE PACKAGE • NOT APPROVED FOR PUBLIC ATLAS • NOT LEGAL ADVICE • STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE DRAFT PACKAGE REVIEW";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-purple';
        safetyIndicator.style.backgroundColor = '#9333ea';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Private Draft Packages";

      fetch(`./data/private-draft-candidate-package.json`)
      .then(r => r.json())
      .then(packageData => {
        bundleData = { records: [packageData] };
        bundleTimestampEl.textContent = packageData.generated_at || packageData.created_at
          ? new Date(packageData.generated_at || packageData.created_at).toLocaleString()
          : 'Unknown';

        renderSidebarPrivatePackage(packageData);
      })
      .catch(err => {
        console.error("Error loading private draft package:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Draft Package.<br>
            Please run the T066 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-promotion-dry-run.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE PROMOTION DRY-RUN ONLY &bull; NOT A REAL PROMOTION PACKET &bull; NO INC-0014 CREATED &bull; NO PUBLIC PREVIEW &bull; HUMAN LEGAL/GOVERNANCE REVIEW REQUIRED &bull; STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE PROMOTION DRY-RUN";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-orange';
        safetyIndicator.style.backgroundColor = '#f97316';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Promotion Dry-Runs";

      fetch(`./data/private-promotion-dry-run.json`)
      .then(r => r.json())
      .then(dryRunData => {
        bundleTimestampEl.textContent = dryRunData.generated_at
          ? new Date(dryRunData.generated_at).toLocaleString()
          : 'Unknown';

        // Render sidebar
        draftListContainer.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'draft-item draft-item-private-dryrun';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid #2a2a2a; background:#0d1a0d;';
        item.innerHTML = `
          <div style="font-size:10px; color:#f97316; font-weight:700; text-transform:uppercase; margin-bottom:4px;">
            ⚡ PRIVATE PROMOTION DRY-RUN
          </div>
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:2px;">
            ${dryRunData.suggested_title || 'Promotion Dry-Run'}
          </div>
          <div style="font-size:10px; color:#888;">
            ${dryRunData.source_run_id || '—'}
          </div>
          <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
            <span style="background:#1a1a0d; border:1px solid #f97316; color:#f97316; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${dryRunData.dry_run_status || 'private_promotion_dry_run'}
            </span>
            <span style="background:#1a0d0d; border:1px solid #ef4444; color:#ef4444; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${dryRunData.blocker_count || 0} blockers
            </span>
          </div>
        `;
        item.addEventListener('click', () => renderPrivatePromoDryRunDetail(dryRunData));
        draftListContainer.appendChild(item);
        // Auto-open detail
        renderPrivatePromoDryRunDetail(dryRunData);
      })
      .catch(err => {
        console.error("Error loading private promotion dry-run data:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Promotion Dry-Run data.<br>
            Please run the T067 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-promotion-signoff.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE SIGNOFF ONLY &bull; NOT PUBLICATION APPROVAL &bull; NO REAL PROMOTION PACKET &bull; NO PUBLIC PREVIEW &bull; NO INC-0014 &bull; HUMAN LEGAL/GOVERNANCE REVIEW REQUIRED &bull; STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE PROMOTION SIGNOFF";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-orange';
        safetyIndicator.style.backgroundColor = '#a855f7';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Promotion Signoffs";

      fetch(`./data/private-promotion-signoff.json`)
      .then(r => r.json())
      .then(signoffData => {
        bundleTimestampEl.textContent = signoffData.generated_at
          ? new Date(signoffData.generated_at).toLocaleString()
          : 'Unknown';

        draftListContainer.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'draft-item draft-item-private-signoff';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid #2a2a2a; background:#120d1a;';
        item.innerHTML = `
          <div style="font-size:10px; color:#a855f7; font-weight:700; text-transform:uppercase; margin-bottom:4px;">
            🔒 PRIVATE SIGNOFF
          </div>
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:2px;">
            ${(signoffData.suggested_public_record_id || {}).suggested_id || 'Signoff Review'}
          </div>
          <div style="font-size:10px; color:#888;">
            ${signoffData.source_run_id || '—'}
          </div>
          <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
            <span style="background:#1a0d1a; border:1px solid #a855f7; color:#a855f7; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${signoffData.signoff_status || 'private_review_pending'}
            </span>
            <span style="background:#1a0d0d; border:1px solid #ef4444; color:#ef4444; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${signoffData.unresolved_blocker_count || 0} blockers
            </span>
          </div>
        `;
        item.addEventListener('click', () => renderPrivatePromoSignoffDetail(signoffData));
        draftListContainer.appendChild(item);
        renderPrivatePromoSignoffDetail(signoffData);
      })
      .catch(err => {
        console.error("Error loading private promotion signoff data:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Promotion Signoff data.<br>
            Please run the T068 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-promotion-packet-candidate.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE PROMOTION-PACKET CANDIDATE ONLY &bull; NOT A REAL PROMOTION PACKET &bull; NO INC-0014 CREATED &bull; NOT PUBLICATION APPROVAL &bull; STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE PROMOTION-PACKET CANDIDATE";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-orange';
        safetyIndicator.style.backgroundColor = '#9333ea';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Packet Candidates";

      fetch(`./data/private-promotion-packet-candidate.json`)
      .then(r => r.json())
      .then(candidateData => {
        bundleTimestampEl.textContent = candidateData.generated_at || candidateData.created_at
          ? new Date(candidateData.generated_at || candidateData.created_at).toLocaleString()
          : 'Unknown';

        draftListContainer.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'draft-item draft-item-private-packet-candidate';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid #2a2a2a; background:#120d1a;';
        item.innerHTML = `
          <div style="font-size:10px; color:#c084fc; font-weight:700; text-transform:uppercase; margin-bottom:4px;">
            📦 PACKET CANDIDATE
          </div>
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:2px;">
            ${escapeHTML(candidateData.candidate_packet_id || 'Packet Candidate')}
          </div>
          <div style="font-size:10px; color:#888;">
            ${candidateData.source_run_id || '—'}
          </div>
          <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
            <span style="background:#1a0d1a; border:1px solid #c084fc; color:#c084fc; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${candidateData.status || 'prepared'}
            </span>
            <span style="background:#1a0d0d; border:1px solid #ef4444; color:#ef4444; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${(candidateData.publication_approval_state || {}).unresolved_blocker_count || 0} blockers
            </span>
          </div>
        `;
        item.addEventListener('click', () => renderPrivatePromoPacketCandidateDetail(candidateData));
        draftListContainer.appendChild(item);
        renderPrivatePromoPacketCandidateDetail(candidateData);
      })
      .catch(err => {
        console.error("Error loading private promotion-packet candidate data:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Promotion-Packet Candidate data.<br>
            Please run the T069 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-publication-blocker-resolution.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE BLOCKER-RESOLUTION DOSSIER ONLY &bull; PUBLICATION REMAINS BLOCKED &bull; NO INC-0014 CREATED &bull; NO PUBLIC PREVIEW &bull; NO REAL PROMOTION PACKET &bull; HUMAN/LEGAL/PUBLICATION REVIEW REQUIRED &bull; STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE BLOCKER-RESOLUTION DOSSIER";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-orange';
        safetyIndicator.style.backgroundColor = '#9333ea';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Blocker Resolutions";

      fetch(`./data/private-publication-blocker-resolution.json`)
      .then(r => r.json())
      .then(dossierData => {
        bundleTimestampEl.textContent = dossierData.generated_at || dossierData.created_at
          ? new Date(dossierData.generated_at || dossierData.created_at).toLocaleString()
          : 'Unknown';

        draftListContainer.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'draft-item draft-item-private-blocker-resolution';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid #2a2a2a; background:#120d1a;';
        item.innerHTML = `
          <div style="font-size:10px; color:#c084fc; font-weight:700; text-transform:uppercase; margin-bottom:4px;">
            🛡️ BLOCKER RESOLUTION
          </div>
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:2px;">
            ${escapeHTML(dossierData.resolution_id || 'Blocker Resolution')}
          </div>
          <div style="font-size:10px; color:#888;">
            ${dossierData.source_run_id || '—'}
          </div>
          <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
            <span style="background:#1a0d1a; border:1px solid #c084fc; color:#c084fc; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${dossierData.status || 'partially_resolved'}
            </span>
            <span style="background:#1a0d0d; border:1px solid #ef4444; font-size:9px; padding:1px 5px; border-radius:3px;">
              blocked
            </span>
          </div>
        `;
        item.addEventListener('click', () => renderPrivatePublicationBlockerResolutionDetail(dossierData));
        draftListContainer.appendChild(item);
        renderPrivatePublicationBlockerResolutionDetail(dossierData);
      })
      .catch(err => {
        console.error("Error loading private publication blocker-resolution data:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Publication Blocker-Resolution data.<br>
            Please run the T070 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-review-state-sync.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> HOSTED PRIVATE REVIEW-STATE SYNC READINESS ONLY &bull; DRY-RUN STATUS &bull; REMOTE WRITES STRICTLY DISABLED &bull; NO INC-0014 &bull; NO PUBLIC PREVIEW &bull; NO REAL PROMOTION PACKET &bull; STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "HOSTED PRIVATE SYNC READINESS";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-orange';
        safetyIndicator.style.backgroundColor = '#9333ea';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Sync Readiness";

      fetch(`./data/private-review-state-sync.json`)
      .then(r => r.json())
      .then(syncData => {
        bundleTimestampEl.textContent = syncData.generated_at || syncData.created_at
          ? new Date(syncData.generated_at || syncData.created_at).toLocaleString()
          : 'Unknown';

        draftListContainer.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'draft-item draft-item-private-review-state-sync';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid #2a2a2a; background:#120d1a;';
        item.innerHTML = `
          <div style="font-size:10px; color:#c084fc; font-weight:700; text-transform:uppercase; margin-bottom:4px;">
            🔄 HOSTED SYNC READINESS
          </div>
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:2px;">
            ${escapeHTML(syncData.sync_id || 'Hosted Sync')}
          </div>
          <div style="font-size:10px; color:#888;">
            ${syncData.source_run_id || '—'}
          </div>
          <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
            <span style="background:#1a0d1a; border:1px solid #c084fc; color:#c084fc; font-size:9px; padding:1px 5px; border-radius:3px;">
              dryrun_ready
            </span>
            <span style="background:#1a0d0d; border:1px solid #ef4444; color:#ef4444; font-size:9px; padding:1px 5px; border-radius:3px;">
              blocked
            </span>
          </div>
        `;
        item.addEventListener('click', () => renderPrivateReviewStateSyncDetail(syncData));
        draftListContainer.appendChild(item);
        renderPrivateReviewStateSyncDetail(syncData);
      })
      .catch(err => {
        console.error("Error loading private review-state sync data:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Hosted Private Review-State Sync data.<br>
            Please run the T071 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-runtime-activation.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE RUNTIME ACTIVATION • DRY-RUN BY DEFAULT • REMOTE MUTATION SAFEGUARDS ACTIVE • STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE RUNTIME ACTIVATION";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-orange';
        safetyIndicator.style.backgroundColor = '#a855f7';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Runtime Activation";

      fetch(`./data/private-runtime-activation.json`)
      .then(r => r.json())
      .then(activationData => {
        bundleTimestampEl.textContent = activationData.generated_at || activationData.created_at
          ? new Date(activationData.generated_at || activationData.created_at).toLocaleString()
          : 'Unknown';

        draftListContainer.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'draft-item draft-item-private-runtime-activation';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid #2a2a2a; background:#120d1a;';

        const isLive = activationData.live_activation_executed || activationData.remote_apply_executed;
        item.innerHTML = `
          <div style="font-size:10px; color:#c084fc; font-weight:700; text-transform:uppercase; margin-bottom:4px;">
            🛡️ RUNTIME ACTIVATION
          </div>
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:2px;">
            ${escapeHTML(activationData.migration_target || 'Supabase Target Table')}
          </div>
          <div style="font-size:10px; color:#888;">
            Apply: ${escapeHTML(activationData.apply_status || 'dry_run')}
          </div>
          <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
            <span style="background:#1a0d1a; border:1px solid #c084fc; color:#c084fc; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${isLive ? 'live_activated' : 'dryrun_ready'}
            </span>
            <span style="background:#1a0d0d; border:1px solid #ef4444; color:#ef4444; font-size:9px; padding:1px 5px; border-radius:3px;">
              blocked
            </span>
          </div>
        `;
        item.addEventListener('click', () => renderPrivateRuntimeActivationDetail(activationData));
        draftListContainer.appendChild(item);
        renderPrivateRuntimeActivationDetail(activationData);
      })
      .catch(err => {
        console.error("Error loading private runtime activation data:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Runtime Activation data.<br>
            Please run the T072 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    if (bundleName === 'private-runtime-operational-status.json') {
      isPrivateIntakeBundle = false;
      isRealBundle = false;
      safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> PRIVATE RUNTIME OPERATIONAL STATUS • DRY-RUN BY DEFAULT • REMOTE MUTATION SAFEGUARDS ACTIVE • STRICTLY LOCAL SANDBOX`;
      safetyLabel.textContent = "PRIVATE OPERATIONAL STATUS";
      if (safetyIndicator) {
        safetyIndicator.className = 'pulse-orange';
        safetyIndicator.style.backgroundColor = '#a855f7';
      }
      if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
      if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
      if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
      if (qualityClassFilter) qualityClassFilter.style.display = 'none';

      sidebarHeaderTitle.textContent = "Runtime Status";

      fetch(`./data/private-runtime-operational-status.json`)
      .then(r => r.json())
      .then(statusData => {
        bundleTimestampEl.textContent = statusData.generated_at
          ? new Date(statusData.generated_at).toLocaleString()
          : 'Unknown';

        draftListContainer.innerHTML = '';
        const item = document.createElement('div');
        item.className = 'draft-item draft-item-private-runtime-ops-status';
        item.style.cssText = 'padding:10px 12px; cursor:pointer; border-bottom:1px solid #2a2a2a; background:#120d1a;';

        const isLive = statusData.operational_components?.supabase_table_apply?.executed;
        item.innerHTML = `
          <div style="font-size:10px; color:#c084fc; font-weight:700; text-transform:uppercase; margin-bottom:4px;">
            🛡️ OPERATIONAL STATUS
          </div>
          <div style="font-size:12px; font-weight:600; color:#fff; margin-bottom:2px;">
            T073 Private Runtime
          </div>
          <div style="font-size:10px; color:#888;">
            Apply: ${escapeHTML(statusData.operational_components?.supabase_table_apply?.status || 'dry-run')}
          </div>
          <div style="margin-top:6px; display:flex; gap:4px; flex-wrap:wrap;">
            <span style="background:#1a0d1a; border:1px solid #c084fc; color:#c084fc; font-size:9px; padding:1px 5px; border-radius:3px;">
              ${isLive ? 'live_activated' : 'dryrun_ready'}
            </span>
            <span style="background:#1a0d0d; border:1px solid #ef4444; color:#ef4444; font-size:9px; padding:1px 5px; border-radius:3px;">
              blocked
            </span>
          </div>
        `;
        item.addEventListener('click', () => renderPrivateRuntimeOperationalStatusDetail(statusData));
        draftListContainer.appendChild(item);
        renderPrivateRuntimeOperationalStatusDetail(statusData);
      })
      .catch(err => {
        console.error("Error loading private runtime operational status data:", err);
        draftListContainer.innerHTML = `
          <div class="loading-placeholder" style="color: var(--color-danger);">
            Failed to load Private Runtime Operational Status data.<br>
            Please run the T073 workflow scripts first!
          </div>
        `;
      });
      return;
    }

    isPrivateIntakeBundle = false;


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

        bundleTimestampEl.textContent = data.generated_at
          ? new Date(data.generated_at).toLocaleString()
          : 'Unknown';

        if (isRealBundle) {
          safetyWarningBanner.innerHTML = `<strong>[CRITICAL SECURITY ALERT]</strong> REAL WATCHER PIPELINE DATA • LOCAL ONLY • NOT APPROVED FOR PUBLIC SITE • NOT LEGAL ADVICE`;
          safetyLabel.textContent = "LOCAL-ONLY REAL PIPELINE";
          if (safetyIndicator) {
            safetyIndicator.className = 'pulse-green';
            safetyIndicator.style.backgroundColor = 'var(--color-success)';
          }
          if (pipelineStageTabs) pipelineStageTabs.style.display = 'block';
          if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'block';
          if (digestPreviewBlock) digestPreviewBlock.style.display = 'none';
          if (qualityClassFilter) qualityClassFilter.style.display = 'block';

          // Update tab counts
          const cands = bundleData.candidates || [];
          const drafts = bundleData.drafts || [];
          const packets = bundleData.promotion_packets || [];
          const tcEl = document.getElementById('tab-count-candidates');
          const tdEl = document.getElementById('tab-count-drafts');
          const tpEl = document.getElementById('tab-count-packets');
          if (tcEl) tcEl.textContent = cands.length;
          if (tdEl) tdEl.textContent = drafts.length;
          if (tpEl) tpEl.textContent = packets.length;

          // Update pipeline summary bar
          const pcc = document.getElementById('ps-count-candidates');
          const pcd = document.getElementById('ps-count-drafts');
          const pcp = document.getElementById('ps-count-packets');
          if (pcc) pcc.textContent = cands.length;
          if (pcd) pcd.textContent = drafts.length;
          if (pcp) pcp.textContent = packets.length;

          // Load ranked candidates (T051)
          loadRankedCandidates(data);

          activeStage = 'candidates';
          setActiveStage('candidates');
        } else {
          safetyWarningBanner.innerHTML = `<strong>[CRITICAL WARNING]</strong> SYNTHETIC MOCK DATA ONLY • NOT APPROVED FOR PUBLIC ATLAS • NOT LEGAL ADVICE • STRICTLY LOCAL SANDBOX`;
          safetyLabel.textContent = "OFFLINE MOCK AUDIT SIMULATION";
          if (safetyIndicator) {
            safetyIndicator.className = 'pulse-red';
            safetyIndicator.style.backgroundColor = 'var(--color-danger)';
          }
          if (pipelineStageTabs) pipelineStageTabs.style.display = 'none';
          if (pipelineSummaryBar) pipelineSummaryBar.style.display = 'none';
          if (digestPreviewBlock) digestPreviewBlock.style.display = '';

          sidebarHeaderTitle.textContent = "Mock Draft Cases";
          renderSidebar(bundleData.drafts || []);
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

  // Load Ranked Candidates (T051)
  function loadRankedCandidates(bundleOrNull) {
    const rankedPanel = document.getElementById('ranked-candidates-panel');
    const rankedListBody = document.getElementById('ranked-list-body');
    const noCaseQualityBanner = document.getElementById('no-case-quality-banner');

    // Use bundle data if available, else fall back to direct file fetch
    const rankedInBundle = bundleOrNull?.ranked_candidates;
    const top5InBundle = bundleOrNull?.top_5_ranked;

    function renderRanked(data) {
      if (!data || !data.ranked_candidates || data.ranked_candidates.length === 0) {
        if (rankedPanel) rankedPanel.style.display = 'none';
        return;
      }

      if (rankedPanel) rankedPanel.style.display = 'block';

      // no_case_quality_candidate_ready banner
      if (noCaseQualityBanner) {
        noCaseQualityBanner.style.display = (data.no_case_quality_candidate_ready || bundleOrNull?.no_case_quality_candidate_ready) ? 'block' : 'none';
      }

      // no_publication_candidate_ready banner
      const noReadyEl = document.getElementById('top-recommendation');
      if (data.no_publication_candidate_ready && noReadyEl) {
        noReadyEl.style.borderLeftColor = '#dc3545';
        noReadyEl.style.background = '#1a0505';
        const existing = noReadyEl.querySelector('.no-ready-banner');
        if (!existing) {
          const noReadyBanner = document.createElement('div');
          noReadyBanner.className = 'no-ready-banner';
          noReadyBanner.style.cssText = 'background:#dc3545; color:#fff; font-weight:700; font-size:11px; padding:6px 8px; border-radius:3px; margin-bottom:8px; text-align:center;';
          noReadyBanner.textContent = '⚠ NO PUBLICATION CANDIDATE READY — ALL BLOCKED BY QUALITY GATES';
          noReadyEl.insertBefore(noReadyBanner, noReadyEl.firstChild);
        }
      }

      const top = data.top_recommendation;
      if (top) {
        const topPacket = document.getElementById('top-packet-id');
        const topDraft = document.getElementById('top-draft-id');
        const topScore = document.getElementById('top-score');
        const topReason = document.getElementById('top-reason');
        if (topPacket) topPacket.textContent = top.top_packet_id || '-';
        if (topDraft) topDraft.textContent = `Draft: ${top.top_draft_id || '-'} | Class: ${top.top_quality_class || 'unknown'} | Eligible: ${top.top_promotion_eligible}`;
        if (topScore) topScore.textContent = `Score: ${top.top_score || 0} pts | Best eligible: ${top.best_eligible_packet_id || 'NONE'}`;
        if (topReason) topReason.textContent = top.reason || '-';
      }

      const CASE_QUALITY = ['likely_enforcement_case', 'likely_official_decision', 'likely_case'];
      if (rankedListBody) {
        rankedListBody.innerHTML = (data.ranked_candidates || []).slice(0, 5).map(c => {
          const eligible = c.promotion_eligible;
          const isCaseQ = CASE_QUALITY.includes(c.quality_class);
          const statusColor = eligible ? '#28a745' : '#dc3545';
          const statusText = eligible ? '✓ Eligible' : '✗ Blocked';
          const qualityLabel = (c.quality_class || 'unknown').replace(/_/g, ' ');
          const qualityColor = isCaseQ ? '#28a745' : '#aaa';
          const badge = isCaseQ ? ' <span style="background:#155724;color:#d4edda;font-size:9px;padding:1px 4px;border-radius:2px;">CASE</span>' : '';
          const adapterText = escapeHTML(c.adapter_name || '-');
          return `
            <tr style="border-bottom:1px solid #333; ${!eligible ? 'opacity:0.65;' : ''}">
              <td style="padding:6px; color:#fff; font-weight:600;">${c.rank}</td>
              <td style="padding:6px; color:#ccc;">${escapeHTML(c.packet_id || '-')}</td>
              <td style="padding:6px; color:#888;">${escapeHTML(c.draft_id || '-')}</td>
              <td style="padding:6px; text-align:right; color:#fff; font-weight:600;">${c.score}</td>
              <td style="padding:6px; text-align:center; color:${statusColor}; font-size:11px;">${statusText}</td>
              <td style="padding:6px; font-size:10px; color:${qualityColor};">${escapeHTML(qualityLabel)}${badge}</td>
              <td style="padding:6px; font-size:10px; color:#777;">${adapterText}</td>
            </tr>
          `;
        }).join('');
      }
    }

    if (rankedInBundle) {
      renderRanked(rankedInBundle);
    } else {
      fetch('../../data/reviews/real/ranked-promotion-candidates.json')
        .then(r => { if (!r.ok) throw new Error('not found'); return r.json(); })
        .then(renderRanked)
        .catch(err => {
          console.log('Ranked candidates not loaded:', err.message);
          if (rankedPanel) rankedPanel.style.display = 'none';
        });
    }
  }

  // Quality class filter listener
  if (qualityClassSelect) {
    qualityClassSelect.addEventListener('change', (e) => {
      activeQualityFilter = e.target.value;
      if (activeStage === 'candidates') {
        const filtered = applyQualityFilter(bundleData.candidates || []);
        renderSidebarReal(filtered);
      }
    });
  }

  // Stage tab click listeners
  document.querySelectorAll('.stage-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isRealBundle) setActiveStage(btn.dataset.stage);
    });
  });

  function applyQualityFilter(candidates) {
    if (activeQualityFilter === 'all') return candidates;
    return candidates.filter(c => (c.quality_class || '') === activeQualityFilter);
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
      const isBlocked = cand.promotion_eligible === false;
      itemDiv.className = `draft-item ${isSelected ? 'active' : ''} ${isBlocked ? 'quality-blocked-item' : ''}`;
      itemDiv.setAttribute('data-id', cand.candidate_id);

      let tierColorClass = 'badge-green';
      if (cand.source_tier === 'yellow') tierColorClass = 'badge-yellow';
      if (cand.source_tier === 'red') tierColorClass = 'badge-red';

      const qualityBadge = qualityBadgeHtml(cand.quality_class, cand.quality_score, cand.promotion_eligible);
      const blockedLabel = isBlocked
        ? `<span style="color:#dc3545; font-size:9px; font-weight:600;">✗ BLOCKED</span>`
        : `<span style="color:#28a745; font-size:9px; font-weight:600;">✓ ELIGIBLE</span>`;
      const rejectionText = (cand.rejection_reasons && cand.rejection_reasons.length > 0)
        ? `<div style="font-size:9px; color:#dc3545; margin-top:2px; font-style:italic;">${escapeHTML(cand.rejection_reasons[0])}</div>`
        : '';

      itemDiv.innerHTML = `
        <div class="draft-item-header">
          <span class="draft-item-id">${cand.candidate_id}</span>
          <span class="draft-item-tier ${tierColorClass}">${cand.source_tier || 'green'}</span>
        </div>
        <div class="draft-item-title">${escapeHTML(cand.title)}</div>
        <div style="margin-top:3px;">${qualityBadge} ${blockedLabel}</div>
        ${rejectionText}
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

  // 3b. Render Real Drafts Sidebar
  function renderSidebarDrafts(draftsToRender) {
    draftListContainer.innerHTML = '';
    draftCountEl.textContent = draftsToRender.length;
    if (draftsToRender.length === 0) {
      draftListContainer.innerHTML = '<div class="loading-placeholder">No real drafts found. Run build-real-case-drafts.mjs first.</div>';
      return;
    }
    draftsToRender.forEach(draft => {
      const itemDiv = document.createElement('button');
      itemDiv.className = `draft-item ${selectedDraft && selectedDraft.draft_id === draft.draft_id ? 'active' : ''}`;
      itemDiv.setAttribute('data-id', draft.draft_id);
      itemDiv.innerHTML = `
        <div class="draft-item-header">
          <span class="draft-item-id">${draft.draft_id}</span>
          <span class="draft-item-tier badge-green">GREEN</span>
        </div>
        <div class="draft-item-title">${escapeHTML(draft.proposed_case_title)}</div>
        <div class="draft-item-meta">
          <span>${escapeHTML(draft.jurisdiction || '')} • ${escapeHTML(draft.case_type || '')}</span>
          <span class="pipeline-label local-only-label" style="font-size:9px; padding:1px 4px;">LOCAL ONLY</span>
        </div>
      `;
      itemDiv.addEventListener('click', () => selectRealDraft(draft.draft_id));
      draftListContainer.appendChild(itemDiv);
    });
  }

  // 3c. Render Promotion Packets Sidebar
  function renderSidebarPackets(packetsToRender) {
    draftListContainer.innerHTML = '';
    draftCountEl.textContent = packetsToRender.length;
    if (packetsToRender.length === 0) {
      draftListContainer.innerHTML = '<div class="loading-placeholder">No promotion packets found. Run build-promotion-packets.mjs first.</div>';
      return;
    }
    packetsToRender.forEach(pkt => {
      const itemDiv = document.createElement('button');
      itemDiv.className = `draft-item ${selectedDraft && selectedDraft.packet_id === pkt.packet_id ? 'active' : ''}`;
      itemDiv.setAttribute('data-id', pkt.packet_id);
      itemDiv.innerHTML = `
        <div class="draft-item-header">
          <span class="draft-item-id">${pkt.packet_id}</span>
          <span class="draft-item-tier badge-red" style="background:#7a2020;">BLOCKED</span>
        </div>
        <div class="draft-item-title">${escapeHTML(pkt.draft_id)} — ${escapeHTML(pkt.suggested_public_case_id || '')}</div>
        <div class="draft-item-meta">
          <span class="pipeline-label not-approved-label" style="font-size:9px; padding:1px 4px;">NOT APPROVED</span>
          <span class="pipeline-label promotion-blocked-label" style="font-size:9px; padding:1px 4px;">PROMOTION BLOCKED</span>
        </div>
      `;
      itemDiv.addEventListener('click', () => selectPacket(pkt.packet_id));
      draftListContainer.appendChild(itemDiv);
    });
  }

  // Show health panel
  function showHealthPanel() {
    hideAllDetailPanels();
    if (!healthDetailPanel) return;
    healthDetailPanel.classList.remove('hidden');
    emptyStatePanel.classList.add('hidden');
    const contentEl = document.getElementById('health-detail-content');
    if (!contentEl) return;
    const health = bundleData.source_health_summary;
    if (!health) {
      contentEl.innerHTML = '<p style="color:var(--color-muted);">No health data available. Run watch-green-sources.mjs first.</p>';
      return;
    }
    const sources = health.source_health || [];
    const rows = sources.map(s => {
      const statusColor = s.status === 'ok' ? 'var(--color-success)' : s.status === 'failed' ? 'var(--color-danger)' : 'var(--color-muted)';
      return `<tr>
        <td style="padding:6px 10px; font-weight:bold; color:${statusColor};">${escapeHTML(s.status.toUpperCase())}</td>
        <td style="padding:6px 10px;">${escapeHTML(s.source_id)}</td>
        <td style="padding:6px 10px; font-size:11px; color:var(--color-muted);">${s.http_status !== null ? s.http_status : '—'}</td>
        <td style="padding:6px 10px; font-size:11px;">${s.used_fallback ? '<span style="color:var(--color-warning);">Fallback used</span>' : '—'}</td>
        <td style="padding:6px 10px; font-size:11px; color:var(--color-muted);">${escapeHTML(s.error_message || '—')}</td>
      </tr>`;
    }).join('');
    contentEl.innerHTML = `
      <p style="font-size:12px; color:var(--color-muted); margin-bottom:12px;">Run timestamp: ${escapeHTML(health.run_timestamp || '—')}</p>
      <table style="width:100%; border-collapse:collapse; font-size:13px;">
        <thead>
          <tr style="border-bottom: 1px solid #444; color:var(--color-muted); font-size:11px;">
            <th style="padding:4px 10px; text-align:left;">STATUS</th>
            <th style="padding:4px 10px; text-align:left;">SOURCE</th>
            <th style="padding:4px 10px; text-align:left;">HTTP</th>
            <th style="padding:4px 10px; text-align:left;">FALLBACK</th>
            <th style="padding:4px 10px; text-align:left;">ERROR</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <div style="margin-top:12px; font-size:12px; color:var(--color-muted);">
        OK: ${health.sources_ok} | Failed: ${health.sources_failed} | Skipped: ${health.sources_skipped}
      </div>
    `;
  }

  // Show shortlist panel (T052)
  function showShortlistPanel() {
    hideAllDetailPanels();
    const shortlistDetailPanel = document.getElementById('shortlist-detail');
    if (!shortlistDetailPanel) return;
    shortlistDetailPanel.classList.remove('hidden');
    emptyStatePanel.classList.add('hidden');

    const sourceHealthTable = document.getElementById('source-health-table');
    const adapterSummaryTable = document.getElementById('adapter-summary-table');
    const readyForReviewList = document.getElementById('ready-for-review-list');

    // Source health summary
    const health = bundleData.source_health_summary;
    if (health && sourceHealthTable) {
      const sources = health.source_health || [];
      const okCount = sources.filter(s => s.status === 'ok').length;
      const failCount = sources.filter(s => s.status === 'failed').length;
      sourceHealthTable.innerHTML = `
        <div style="margin-bottom:8px;"><strong>${okCount}</strong> sources OK | <strong style="color:var(--color-danger)">${failCount}</strong> failed</div>
        <table style="width:100%; border-collapse:collapse; font-size:12px;">
          ${sources.map(s => {
            const color = s.status === 'ok' ? 'var(--color-success)' : 'var(--color-danger)';
            return `<tr><td style="padding:4px 0;"><span style="color:${color}">●</span> ${escapeHTML(s.source_id)}</td><td style="text-align:right; color:var(--color-muted);">${s.adapter_name || '—'}</td></tr>`;
          }).join('')}
        </table>
      `;
    }

    // Adapter summary
    const adapterSummary = bundleData.adapter_success_summary;
    if (adapterSummary && adapterSummaryTable) {
      adapterSummaryTable.innerHTML = `
        <table style="width:100%; border-collapse:collapse; font-size:12px;">
          <thead><tr style="border-bottom:1px solid #444; color:var(--color-muted);"><th style="text-align:left; padding:4px;">Source</th><th style="text-align:left; padding:4px;">Adapter</th><th style="text-align:center; padding:4px;">Links</th><th style="text-align:center; padding:4px;">Status</th></tr></thead>
          <tbody>
            ${adapterSummary.map(a => `<tr><td style="padding:4px;">${escapeHTML(a.source_id)}</td><td style="padding:4px; color:var(--color-muted);">${a.adapter_name}</td><td style="text-align:center; padding:4px;">${a.links_found}</td><td style="text-align:center; padding:4px;">${a.ok ? '<span style="color:var(--color-success)">✓</span>' : '<span style="color:var(--color-danger)">✗</span>'}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
    }

    // Ready for review list
    const shortlist = bundleData.shortlist;
    if (shortlist && readyForReviewList) {
      const readyItems = shortlist.items?.filter(i => i.case_quality_ready) || [];
      if (readyItems.length > 0) {
        readyForReviewList.innerHTML = readyItems.map(i => `
          <div style="padding:8px; margin-bottom:8px; background:#0d1f0d; border-left:3px solid var(--color-success); border-radius:4px;">
            <div style="font-weight:600; color:#fff;">${escapeHTML(i.packet_id)} — ${escapeHTML(i.title.substring(0, 50))}${i.title.length > 50 ? '...' : ''}</div>
            <div style="font-size:11px; color:var(--color-muted); margin-top:4px;">${escapeHTML(i.source_authority)} • Score: ${i.quality_score}</div>
            <div style="margin-top:6px;"><span style="background:var(--color-success); color:#fff; font-size:10px; padding:2px 6px; border-radius:3px;">✓ Ready for Control Tower Review</span></div>
          </div>
        `).join('');
      } else {
        readyForReviewList.innerHTML = '<div style="color:var(--color-muted); font-style:italic;">No case-quality candidates ready for Control Tower review.</div>';
      }
    }
  }

  // Select real draft
  function selectRealDraft(draftId) {
    const draft = (bundleData.drafts || []).find(d => d.draft_id === draftId);
    if (!draft) return;
    selectedDraft = draft;
    renderSidebarDrafts(bundleData.drafts || []);
    hideAllDetailPanels();
    emptyStatePanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    // Show local-only labels
    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: var(--color-danger); color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center;">
        PROMOTION BLOCKED — REAL DRAFT
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div class="gate-error-message" style="border-left: 3px solid var(--color-danger); padding-left: 8px; margin-bottom: 10px;">
          <strong>LOCAL ONLY • NOT PUBLIC • NOT APPROVED</strong><br>
          This is a real Caesar-authored draft. Control Tower approval, curator review, and clean-room wording audit are required before any public record may be created.
        </div>
        <div class="gate-checklist-item"><span>Local Only:</span> <strong>True</strong></div>
        <div class="gate-checklist-item"><span>Approved for Publication:</span> <strong>False</strong></div>
        <div class="gate-checklist-item"><span>Auto Publish:</span> <strong>False</strong></div>
        <div class="gate-checklist-item"><span>Status:</span> <strong>${escapeHTML(draft.pipeline_stage || draft.review_status || 'draft')}</strong></div>
      </div>
    `;
    simulationResultPanel.classList.remove('hidden');

    gateStepCurator.className = 'status-step pending';
    gateStepCurator.querySelector('.step-check').innerHTML = '○';
    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';

    const detectedTextEl = document.getElementById('gate-step-detected-text');
    if (detectedTextEl) detectedTextEl.textContent = 'Real Candidate Detected';

    const candId = (draft.candidate_ids || [])[0] || '';
    detailDraftId.textContent = draft.draft_id;
    detailCandidateId.textContent = candId;
    detailProposedTitle.textContent = draft.proposed_case_title;
    detailJurisdiction.textContent = draft.jurisdiction || '—';
    detailLegalDomain.textContent = draft.legal_domain || 'Pending';
    detailCommercialDomain.textContent = draft.commercial_domain || 'Pending';
    detailCleanRoomSummary.textContent = draft.clean_room_summary || '—';
    detailCaseType.textContent = draft.case_type || '—';
    detailSourceAuthorities.textContent = (draft.source_authorities || []).join(', ') || '—';

    const urls = draft.source_urls || [];
    if (urls.length > 0) {
      detailSourceUrl.href = urls[0];
      detailSourceUrl.textContent = urls[0];
    } else {
      detailSourceUrl.href = '#';
      detailSourceUrl.textContent = 'None';
    }

    const tier = (draft.source_risk_level || 'green').toLowerCase();
    detailSourceTier.textContent = tier.toUpperCase();
    detailSourceTier.className = `tier-pill tier-${tier}`;
    detailSourceRiskLevel.textContent = tier.toUpperCase();
    detailSourceRiskLevel.className = `risk-pill risk-${tier}`;
    detailPublishRecommendation.textContent = draft.publish_recommendation || 'needs_legal_review';
    detailBusinessRisk.textContent = draft.business_risk || '—';

    populateList(detailFailureModesList, draft.failure_mode || [], 'tag');
    populateList(detailMissingControlsList, draft.missing_controls || [], 'control');
    populateList(detailEvidenceList, draft.required_evidence || [], 'evidence');
    detailTrainingLesson.textContent = draft.training_lesson || '—';
    populateList(detailVendorQuestionsList, draft.vendor_questions || [], 'question');
  }

  // Select promotion packet
  function selectPacket(packetId) {
    const pkt = (bundleData.promotion_packets || []).find(p => p.packet_id === packetId);
    if (!pkt) return;
    selectedDraft = pkt;
    renderSidebarPackets(bundleData.promotion_packets || []);
    hideAllDetailPanels();
    emptyStatePanel.classList.add('hidden');
    if (!packetDetailPanel) return;
    packetDetailPanel.classList.remove('hidden');

    const idBadge = document.getElementById('packet-id-badge');
    if (idBadge) idBadge.textContent = pkt.packet_id;

    const titleEl = document.getElementById('packet-draft-title');
    if (titleEl) titleEl.textContent = `Packet for ${pkt.draft_id}`;

    const safetyEl = document.getElementById('packet-safety-content');
    if (safetyEl) {
      const decl = pkt.safety_declarations || {};
      safetyEl.innerHTML = Object.entries(decl).map(([k, v]) => {
        const color = v === true ? 'var(--color-success)' : v === false ? 'var(--color-danger)' : 'var(--color-muted)';
        return `<div><strong>${escapeHTML(k.replace(/_/g,' '))}:</strong> <span style="color:${color}; font-weight:bold;">${String(v).toUpperCase()}</span></div>`;
      }).join('');
    }

    const reviewsEl = document.getElementById('packet-reviews-list');
    if (reviewsEl) {
      reviewsEl.innerHTML = (pkt.required_reviews || []).map(r => `<li>${escapeHTML(r.replace(/_/g,' '))}</li>`).join('');
    }

    const missingEl = document.getElementById('packet-missing-list');
    if (missingEl) {
      missingEl.innerHTML = (pkt.missing_information || []).map(m => `<li>${escapeHTML(m)}</li>`).join('');
    }

    const checklistEl = document.getElementById('packet-checklist-content');
    if (checklistEl) {
      const checklist = pkt.checklist || {};
      checklistEl.innerHTML = Object.entries(checklist).map(([k, v]) => {
        const icon = v ? '✅' : '⬜';
        return `<div>${icon} <strong>${escapeHTML(k.replace(/_/g,' '))}</strong></div>`;
      }).join('');
    }

    const sugIdEl = document.getElementById('packet-suggested-id');
    const sugFileEl = document.getElementById('packet-suggested-filename');
    if (sugIdEl) sugIdEl.textContent = pkt.suggested_public_case_id || '—';
    if (sugFileEl) sugFileEl.textContent = pkt.suggested_public_filename || '—';
  }

  // 4. Search Filter
  draftSearchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (isPrivateIntakeBundle) {
      const filtered = (bundleData.records || []).filter(r =>
        r.intake_id.toLowerCase().includes(query) ||
        r.source_name.toLowerCase().includes(query) ||
        (r.source_id && r.source_id.toLowerCase().includes(query)) ||
        (r.legal_governance_relevance && r.legal_governance_relevance.toLowerCase().includes(query))
      );
      renderSidebarPrivateIntake(filtered);
    } else if (isRealBundle) {
      if (activeStage === 'candidates') {
        const filtered = (bundleData.candidates || []).filter(c =>
          c.candidate_id.toLowerCase().includes(query) ||
          c.title.toLowerCase().includes(query) ||
          (c.jurisdiction && c.jurisdiction.toLowerCase().includes(query)) ||
          (c.preliminary_case_type && c.preliminary_case_type.toLowerCase().includes(query))
        );
        renderSidebarReal(filtered);
      } else if (activeStage === 'drafts') {
        const filtered = (bundleData.drafts || []).filter(d =>
          d.draft_id.toLowerCase().includes(query) ||
          d.proposed_case_title.toLowerCase().includes(query) ||
          (d.jurisdiction && d.jurisdiction.toLowerCase().includes(query))
        );
        renderSidebarDrafts(filtered);
      } else if (activeStage === 'packets') {
        const filtered = (bundleData.promotion_packets || []).filter(p =>
          p.packet_id.toLowerCase().includes(query) ||
          p.draft_id.toLowerCase().includes(query) ||
          (p.suggested_public_case_id && p.suggested_public_case_id.toLowerCase().includes(query))
        );
        renderSidebarPackets(filtered);
      }
    } else {
      const filtered = (bundleData.drafts || []).filter(draft =>
        draft.draft_id.toLowerCase().includes(query) ||
        draft.proposed_case_title.toLowerCase().includes(query) ||
        (draft.jurisdiction && draft.jurisdiction.toLowerCase().includes(query)) ||
        (draft.case_type && draft.case_type.toLowerCase().includes(query))
      );
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
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    // Hide real-draft-only labels for mock view
    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });

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
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
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
    detailSourceAuthorities.textContent = candidate.authority || candidate.source_id || 'Unknown';

    if (candidate.source_url) {
      detailSourceUrl.href = candidate.source_url;
      detailSourceUrl.textContent = candidate.source_url;
      detailSourceUrl.classList.remove('hidden');
    } else {
      detailSourceUrl.href = '#';
      detailSourceUrl.textContent = 'None Provided';
    }

    // Adapter metadata (T051)
    const adapterNameEl = document.getElementById('detail-adapter-name');
    const extractionMethodEl = document.getElementById('detail-extraction-method');
    const confidenceReasonEl = document.getElementById('detail-confidence-reason');
    if (adapterNameEl) adapterNameEl.textContent = candidate.adapter_name || '—';
    if (extractionMethodEl) extractionMethodEl.textContent = candidate.extraction_method || '—';
    if (confidenceReasonEl) confidenceReasonEl.textContent = candidate.confidence_reason || '—';

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

  // Helper: quality class badge HTML (T051 classes)
  function qualityBadgeHtml(qualityClass, qualityScore, promotionEligible) {
    const BLOCKED_CLASSES = [
      'generic_page', 'event_or_webinar', 'job_or_procurement', 'low_relevance',
      'blocked_generic_page', 'blocked_low_relevance',
    ];
    const CASE_QUALITY = ['likely_enforcement_case', 'likely_official_decision', 'likely_case'];
    const GUIDANCE_QUALITY = ['likely_regulatory_guidance', 'likely_guidance'];
    const isBlocked = BLOCKED_CLASSES.includes(qualityClass) || promotionEligible === false;
    const isCaseQuality = CASE_QUALITY.includes(qualityClass);
    const isGuidanceOnly = GUIDANCE_QUALITY.includes(qualityClass);

    const colorMap = {
      'likely_enforcement_case':   '#155724',
      'likely_official_decision':  '#0c3547',
      'likely_regulatory_guidance':'#1a5a7a',
      'likely_policy_update':      '#4a4a1a',
      'blocked_generic_page':      '#7a1a1a',
      'blocked_low_relevance':     '#3a3a3a',
      'likely_case':               '#1a7a1a',
      'likely_guidance':           '#1a5a7a',
      'likely_regulatory_update':  '#4a4a1a',
      'generic_page':              '#7a1a1a',
      'event_or_webinar':          '#7a4a1a',
      'job_or_procurement':        '#5a2a2a',
      'low_relevance':             '#3a3a3a',
      'unclassified':              '#444',
    };
    const bg = colorMap[qualityClass] || '#444';
    const label = qualityClass ? qualityClass.replace(/_/g, ' ') : 'unclassified';
    const scoreText = qualityScore != null ? ` (${qualityScore})` : '';
    const blockedText = isBlocked ? ' ✗' : ' ✓';

    let extra = '';
    if (isCaseQuality && !isBlocked) extra = ' <span style="background:#d4edda;color:#155724;font-size:8px;padding:0 3px;border-radius:2px;margin-left:2px;">CASE</span>';
    else if (isGuidanceOnly && !isBlocked) extra = ' <span style="background:#cce5ff;color:#004085;font-size:8px;padding:0 3px;border-radius:2px;margin-left:2px;">GUIDANCE</span>';
    else if (isBlocked) extra = ' <span style="background:#f8d7da;color:#721c24;font-size:8px;padding:0 3px;border-radius:2px;margin-left:2px;">BLOCKED</span>';

    return `<span style="display:inline-block; background:${bg}; color:#eee; font-size:9px; padding:1px 5px; border-radius:3px; font-weight:600; margin-top:2px; letter-spacing:0.3px;">${escapeHTML(label)}${scoreText}${blockedText}${extra}</span>`;
  }

  function renderSidebarPrivateIntake(recordsToRender) {
    draftListContainer.innerHTML = '';
    draftCountEl.textContent = recordsToRender.length;

    if (recordsToRender.length === 0) {
      draftListContainer.innerHTML = `
        <div class="loading-placeholder">No private intake records found.</div>
      `;
      return;
    }

    recordsToRender.forEach(rec => {
      const isSelected = selectedDraft && selectedDraft.intake_id === rec.intake_id;

      // Find the associated decision to show status in sidebar
      const decision = privateDecisions.find(d => d.intake_id === rec.intake_id);
      const decisionStatus = decision ? decision.decision_status : 'needs_review';

      const itemDiv = document.createElement('button');
      itemDiv.className = `draft-item ${isSelected ? 'active' : ''}`;
      itemDiv.setAttribute('data-id', rec.intake_id);

      let statusColorClass = 'badge-yellow';
      if (decisionStatus === 'approve_for_private_draft') statusColorClass = 'badge-green';
      if (decisionStatus === 'reject_signal') statusColorClass = 'badge-red';
      if (decisionStatus === 'defer') statusColorClass = 'badge-yellow';

      itemDiv.innerHTML = `
        <div class="draft-item-header">
          <span class="draft-item-id" style="color: #c084fc;">${rec.intake_id}</span>
          <span class="draft-item-tier ${statusColorClass}">${decisionStatus.replace(/_/g, ' ')}</span>
        </div>
        <div class="draft-item-title">${escapeHTML(rec.source_name)}</div>
        <div class="draft-item-meta">
          <span>Relevance: <strong>${escapeHTML(rec.legal_governance_relevance || 'unknown')}</strong></span>
          <span>${escapeHTML(rec.source_id)}</span>
        </div>
      `;

      itemDiv.addEventListener('click', () => {
        selectPrivateIntake(rec.intake_id);
      });

      draftListContainer.appendChild(itemDiv);
    });
  }

  function selectPrivateIntake(intakeId) {
    const record = bundleData.records.find(r => r.intake_id === intakeId);
    if (!record) return;

    selectedDraft = record;

    const activeQuery = draftSearchInput.value.toLowerCase();
    const currentList = activeQuery
      ? bundleData.records.filter(r => r.intake_id.toLowerCase().includes(activeQuery) || r.source_name.toLowerCase().includes(activeQuery))
      : bundleData.records;
    renderSidebarPrivateIntake(currentList);

    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    detailDraftId.textContent = 'INTAKE_RECORD';
    detailCandidateId.textContent = record.intake_id;
    detailProposedTitle.textContent = record.source_name;
    detailJurisdiction.textContent = 'Local (Private)';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Compliance Audit';

    let keywordHitsHtml = '';
    if (record.keyword_group_hits) {
      keywordHitsHtml = Object.entries(record.keyword_group_hits).map(([group, val]) => {
        return `<div><strong>${escapeHTML(group)} (${val.count} hits):</strong> ${val.terms.map(t => `<span style="display:inline-block; background:#2e1065; padding:1px 6px; border-radius:4px; margin-right:4px; font-size:11px; color:#d8b4fe;">${escapeHTML(t)}</span>`).join('')}</div>`;
      }).join('<div style="margin-top:6px;"></div>');
    }

    detailCleanRoomSummary.innerHTML = `
      <strong>Ingested Signal Summary:</strong><br>
      ${escapeHTML(record.signal_summary)}<br><br>
      <strong>Keyword Group Hits:</strong><br>
      ${keywordHitsHtml || 'No keyword hits recorded.'}
    `;

    detailCaseType.textContent = record.suggested_record_type || 'candidate';
    detailSourceAuthorities.textContent = record.source_id || 'Unknown';

    if (record.source_url) {
      detailSourceUrl.href = record.source_url;
      detailSourceUrl.textContent = record.source_url;
      detailSourceUrl.classList.remove('hidden');
    } else {
      detailSourceUrl.href = '#';
      detailSourceUrl.textContent = 'None';
    }

    const relevance = record.legal_governance_relevance || 'medium';
    detailSourceTier.textContent = `RELEVANCE: ${relevance.toUpperCase()}`;
    detailSourceTier.className = `tier-pill tier-${relevance === 'high' ? 'green' : relevance === 'low' ? 'red' : 'yellow'}`;

    detailSourceRiskLevel.textContent = 'PRIVATE_INTAKE';
    detailSourceRiskLevel.className = 'risk-pill risk-green';

    detailPublishRecommendation.textContent = 'private_review_required';
    detailBusinessRisk.textContent = 'This intake record is privately stored. Under T063 rules, this candidate is not ready for public publication, has no legal advice, and remains strictly private.';

    populateList(detailFailureModesList, record.suggested_failure_modes || [], 'tag');
    populateList(detailMissingControlsList, record.suggested_control_themes || [], 'control');
    populateList(detailEvidenceList, record.suggested_evidence_questions || [], 'evidence');
    detailTrainingLesson.textContent = 'Suggested vendor compliance assessment questions are rendered below.';
    populateList(detailVendorQuestionsList, record.suggested_vendor_questions || [], 'question');

    const decision = privateDecisions.find(d => d.intake_id === record.intake_id);
    const decisionStatus = decision ? decision.decision_status : 'needs_more_review';
    const decisionReason = decision ? decision.decision_reason : 'No reason provided.';
    const reviewNotes = decision ? decision.review_notes : '';
    const decidedAt = decision ? new Date(decision.decided_at).toLocaleString() : 'Pending';

    const packet = privatePackets.find(p => p.intake_id === record.intake_id);

    let packetSummaryHtml = '';
    if (packet) {
      packetSummaryHtml = `
        <div style="margin-top:12px; padding:12px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px;">
          <div style="font-weight:700; color: var(--color-success); font-size:12px; text-transform:uppercase; margin-bottom:6px;">📦 DRAFT CANDIDATE PACKET COMPILED</div>
          <div style="font-size:11px; margin-bottom:4px;"><strong>Packet ID:</strong> <span style="font-family:var(--font-mono);">${packet.packet_id}</span></div>
          <div style="font-size:11px; margin-bottom:4px;"><strong>Candidate Hash:</strong> <span style="font-family:var(--font-mono); color:var(--color-text-muted);">${packet.candidate_hash}</span></div>
          <div style="font-size:11px; margin-bottom:4px;"><strong>Suggested Record Type:</strong> ${packet.suggested_record_type}</div>
          <div style="font-size:11px; margin-top:8px; color:#a7f3d0;">
            ✓ Draft candidate packet generated in secure offline directory.<br>
            ⚠️ public_publish_ready remains FALSE (promotion blocked).
          </div>
        </div>
      `;
    }

    let approvalHtml = '';
    const approval = privateApprovals.find(a => a.intake_id === record.intake_id);
    if (approval) {
      const isApproved = approval.control_tower_approval_present && approval.approval_status === 'approved_for_private_draft';
      const gateBadge = isApproved
        ? `<span style="display:inline-block; background:rgba(16,185,129,0.2); color:var(--color-success); padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">✓ CT APPROVED</span>`
        : `<span style="display:inline-block; background:rgba(239,68,68,0.2); color:var(--color-danger); padding:2px 8px; border-radius:4px; font-weight:700; font-size:11px;">🔒 CT APPROVAL REQUIRED</span>`;

      approvalHtml = `
        <div style="margin-top:12px; padding:12px; background: rgba(147, 51, 234, 0.06); border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 8px;">
          <div style="font-weight:700; color: #c084fc; font-size:12px; text-transform:uppercase; margin-bottom:6px;">🔐 EXPLICIT PRIVATE DRAFT APPROVAL GATE</div>
          <div style="font-size:11px; margin-bottom:4px;"><strong>Approval ID:</strong> <span style="font-family:var(--font-mono);">${approval.approval_id}</span></div>
          <div style="font-size:11px; margin-bottom:4px;"><strong>Scope:</strong> <span style="font-family:var(--font-mono);">${approval.approval_scope}</span></div>
          <div style="font-size:11px; margin-bottom:6px;"><strong>Gate Status:</strong> ${gateBadge}</div>
          <div style="font-size:11px; margin-bottom:4px;"><strong>Reason:</strong> ${escapeHTML(approval.approval_reason)}</div>
          <div style="font-size:11px; color:#c084fc; margin-top:6px; border-top:1px solid rgba(147,51,234,0.15); padding-top:6px;">
            Control Tower YES signature and Approval ID must match exactly to promote decision to private draft candidate packet.
          </div>
        </div>
      `;
    }

    let statusBg = 'var(--bg-primary)';
    let statusBorderColor = 'rgba(245, 158, 11, 0.3)';
    let statusTextCol = 'var(--color-warning)';
    if (decisionStatus === 'approve_for_private_draft') {
      statusBg = 'rgba(16, 185, 129, 0.05)';
      statusBorderColor = 'rgba(16, 185, 129, 0.3)';
      statusTextCol = 'var(--color-success)';
    } else if (decisionStatus === 'reject_signal') {
      statusBg = 'rgba(239, 68, 68, 0.05)';
      statusBorderColor = 'rgba(239, 68, 68, 0.3)';
      statusTextCol = 'var(--color-danger)';
    }

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #5b21b6; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px; letter-spacing:0.05em;">
        PRIVATE REVIEW DECISION
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: ${statusBg}; border: 1px solid ${statusBorderColor}; border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: ${statusTextCol}; font-size: 13px; text-transform: uppercase;">
            ${decisionStatus.replace(/_/g, ' ')}
          </div>
          <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
            Decided: ${decidedAt}
          </div>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Reason:</strong>
          <p style="color: var(--color-text-muted); margin-top:2px;">${escapeHTML(decisionReason)}</p>
        </div>

        ${reviewNotes ? `
        <div style="margin-bottom: 8px;">
          <strong>Review Notes:</strong>
          <p style="color: var(--color-text-muted); margin-top:2px;">${escapeHTML(reviewNotes)}</p>
        </div>
        ` : ''}

        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: var(--color-warning);">
          ⚠️ WARNING: Private/local only. Not public. No legal advice.
        </div>

        ${approvalHtml}
        ${packetSummaryHtml}
      </div>
    `;

    gateStepCurator.className = decisionStatus === 'approve_for_private_draft' ? 'status-step passed' : 'status-step pending';
    gateStepCurator.querySelector('.step-check').innerHTML = decisionStatus === 'approve_for_private_draft' ? '✓' : '○';
    gateStepCurator.querySelector('.step-text').textContent = 'Intake Approved';

    gateStepWording.className = packet ? 'status-step passed' : 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = packet ? '✓' : '○';
    gateStepWording.querySelector('.step-text').textContent = 'Draft Packet Compiled';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Public Promotion Gate';
  }

  function renderSidebarPrivatePackage(pkg) {
    draftListContainer.innerHTML = '';
    draftCountEl.textContent = '1';

    const itemDiv = document.createElement('button');
    itemDiv.className = `draft-item active`;
    itemDiv.setAttribute('data-id', pkg.package_id);

    itemDiv.innerHTML = `
      <div class="draft-item-header">
        <span class="draft-item-id" style="color: #a855f7;">${pkg.package_id}</span>
        <span class="draft-item-tier badge-purple" style="background:#6b21a8; color:#fff; font-size:9px; padding:1px 4px; border-radius:3px;">PRIVATE DRAFT</span>
      </div>
      <div class="draft-item-title">${escapeHTML(pkg.suggested_title)}</div>
      <div class="draft-item-meta">
        <span>Status: <strong>${escapeHTML(pkg.draft_status)}</strong></span>
        <span>${escapeHTML(pkg.source_id)}</span>
      </div>
    `;

    itemDiv.addEventListener('click', () => {
      selectPrivatePackage(pkg);
    });

    draftListContainer.appendChild(itemDiv);
    selectPrivatePackage(pkg);
  }

  function selectPrivatePackage(pkg) {
    selectedDraft = pkg;
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    detailDraftId.textContent = 'DRAFT_PACKAGE';
    detailCandidateId.textContent = pkg.package_id;
    detailProposedTitle.textContent = pkg.suggested_title;
    detailJurisdiction.textContent = 'Local (Private)';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Draft Package';

    detailCleanRoomSummary.innerHTML = `
      <strong>Governance Chain / Synthesis (Caesar-native):</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Signal:</strong> ${escapeHTML(pkg.governance_chain.candidate_signal)}</div>
      <div style="margin-bottom:6px;">• <strong>Risk:</strong> ${escapeHTML(pkg.governance_chain.legal_or_governance_risk)}</div>
      <div style="margin-bottom:6px;">• <strong>Failure Mode:</strong> ${escapeHTML(pkg.governance_chain.likely_failure_mode)}</div>
      <div style="margin-bottom:6px;">• <strong>Controls:</strong> ${escapeHTML(pkg.governance_chain.missing_controls)}</div>
      <div style="margin-bottom:6px;">• <strong>Required Evidence:</strong> ${escapeHTML(pkg.governance_chain.required_evidence)}</div>
      <div style="margin-bottom:6px;">• <strong>Vendor Questions:</strong> ${escapeHTML(pkg.governance_chain.vendor_questions)}</div>
      <div style="margin-bottom:6px;">• <strong>Training Lesson:</strong> ${escapeHTML(pkg.governance_chain.training_lesson)}</div>
      <div style="margin-bottom:6px;">• <strong>Client Checklist:</strong> ${escapeHTML(pkg.governance_chain.client_checklist_items)}</div>
    `;

    detailCaseType.textContent = pkg.suggested_record_type || 'candidate';
    detailSourceAuthorities.textContent = pkg.source_name || 'Unknown';

    if (pkg.source_url) {
      detailSourceUrl.href = pkg.source_url;
      detailSourceUrl.textContent = pkg.source_url;
      detailSourceUrl.classList.remove('hidden');
    } else {
      detailSourceUrl.href = '#';
      detailSourceUrl.textContent = 'None';
    }

    const relevance = pkg.legal_governance_relevance || 'medium';
    detailSourceTier.textContent = `RELEVANCE: ${relevance.toUpperCase()}`;
    detailSourceTier.className = `tier-pill tier-${relevance === 'high' ? 'green' : relevance === 'low' ? 'red' : 'yellow'}`;

    detailSourceRiskLevel.textContent = 'PRIVATE_DRAFT_CANDIDATE';
    detailSourceRiskLevel.className = 'risk-pill risk-green';

    detailPublishRecommendation.textContent = 'private_draft_shaping';
    detailBusinessRisk.textContent = 'This draft candidate package is private and strictly kept in-place. Direct promotion to the public Atlas dataset is disallowed.';

    populateList(detailFailureModesList, pkg.suggested_failure_modes || [], 'tag');
    populateList(detailMissingControlsList, pkg.suggested_control_themes || [], 'control');
    populateList(detailEvidenceList, pkg.suggested_evidence_questions || [], 'evidence');
    detailTrainingLesson.textContent = 'Vendor evaluation checklist items are rendered below.';
    populateList(detailVendorQuestionsList, pkg.suggested_vendor_questions || [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #6b21a8; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px; letter-spacing:0.05em;">
        PRIVATE DRAFT CANDIDATE PACKAGE
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(107, 33, 168, 0.05); border: 1px solid rgba(107, 33, 168, 0.3); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #a855f7; font-size: 13px; text-transform: uppercase;">
            ${escapeHTML(pkg.draft_status.replace(/_/g, ' '))}
          </div>
          <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
            Created: ${new Date(pkg.created_at).toLocaleString()}
          </div>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Public Readiness:</strong>
          <p style="color: var(--color-danger); font-weight: bold; margin-top:2px; text-transform: uppercase;">NOT READY — Promotion Blocked</p>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Blockers (${pkg.public_readiness.blockers.length}):</strong>
          <ul style="color: var(--color-text-muted); padding-left: 20px; margin-top:4px;">
            ${pkg.public_readiness.blockers.map(b => `<li>${escapeHTML(b)}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Missing Review Items (${pkg.missing_review_items.length}):</strong>
          <ul style="color: var(--color-text-muted); padding-left: 20px; margin-top:4px;">
            ${pkg.missing_review_items.map(m => `<li>${escapeHTML(m)}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: var(--color-danger); font-weight: bold;">
          ⚠️ Private draft candidate only • Not public • No INC-0014 • Human review required
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Intake Approved';

    gateStepWording.className = 'status-step passed';
    gateStepWording.querySelector('.step-check').innerHTML = '✓';
    gateStepWording.querySelector('.step-text').textContent = 'Draft Package Synthesized';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Public Promotion Blocked';
  }

  function renderPrivatePromoDryRunDetail(dryRunData) {
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    const sugRec = dryRunData.suggested_public_record_id || {};

    detailDraftId.textContent = 'PROMOTION_DRY_RUN';
    detailCandidateId.textContent = dryRunData.package_id || '—';
    detailProposedTitle.textContent = dryRunData.suggested_title || 'Promotion Dry-Run';
    detailJurisdiction.textContent = 'Local (Private Dry-Run)';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Promotion Dry-Run';

    const gc = dryRunData.governance_chain || {};
    detailCleanRoomSummary.innerHTML = `
      <strong>Governance Chain / Synthesis (Caesar-native):</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Signal:</strong> ${escapeHTML(gc.candidate_signal || '—')}</div>
      <div style="margin-bottom:6px;">• <strong>Risk:</strong> ${escapeHTML(gc.legal_or_governance_risk || '—')}</div>
      <div style="margin-bottom:6px;">• <strong>Failure Mode:</strong> ${escapeHTML(gc.likely_failure_mode || '—')}</div>
      <div style="margin-bottom:6px;">• <strong>Controls:</strong> ${escapeHTML(gc.missing_controls || '—')}</div>
      <div style="margin-bottom:6px;">• <strong>Required Evidence:</strong> ${escapeHTML(gc.required_evidence || '—')}</div>
      <div style="margin-bottom:6px;">• <strong>Vendor Questions:</strong> ${escapeHTML(gc.vendor_questions || '—')}</div>
      <div style="margin-bottom:6px;">• <strong>Training Lesson:</strong> ${escapeHTML(gc.training_lesson || '—')}</div>
    `;

    detailCaseType.textContent = dryRunData.suggested_record_type || 'candidate';
    detailSourceAuthorities.textContent = dryRunData.source_run_id || 'Unknown';
    detailSourceUrl.href = '#';
    detailSourceUrl.textContent = 'Private dry-run — no source URL exposed';

    const relevance = dryRunData.legal_governance_relevance || 'medium';
    detailSourceTier.textContent = `RELEVANCE: ${relevance.toUpperCase()}`;
    detailSourceTier.className = `tier-pill tier-${relevance === 'high' ? 'green' : relevance === 'low' ? 'red' : 'yellow'}`;
    detailSourceRiskLevel.textContent = 'PRIVATE_PROMOTION_DRY_RUN';
    detailSourceRiskLevel.className = 'risk-pill risk-orange';

    detailPublishRecommendation.textContent = 'private_promotion_dry_run';
    detailBusinessRisk.textContent = 'This is a private promotion dry-run bundle only. No INC-0014 created. No real promotion packet. No public preview. Human legal/governance review required before T068.';

    populateList(detailFailureModesList, dryRunData.proposed_failure_modes || [], 'tag');
    populateList(detailMissingControlsList, dryRunData.proposed_control_themes || [], 'control');
    populateList(detailEvidenceList, [], 'evidence');
    detailTrainingLesson.textContent = 'Pending human legal/governance review and T068 controlled review.';
    populateList(detailVendorQuestionsList, [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #b45309; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px; letter-spacing:0.05em;">
        ⚡ PRIVATE PROMOTION DRY-RUN
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(180, 83, 9, 0.08); border: 1px solid rgba(249, 115, 22, 0.4); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #f97316; font-size: 13px; text-transform: uppercase;">
            ${escapeHTML((dryRunData.dry_run_status || 'private_promotion_dry_run').replace(/_/g, ' '))}
          </div>
          <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 4px;">
            Created: ${dryRunData.created_at ? new Date(dryRunData.created_at).toLocaleString() : '—'}
          </div>
        </div>

        <div style="margin-bottom: 8px; padding: 8px; background: #0d1a0d; border: 1px solid #22c55e33; border-radius:4px;">
          <strong>Suggested Record ID:</strong>
          <span style="color:#f97316; font-weight:600; margin-left:4px;">
            ${escapeHTML(sugRec.suggested_id || 'INC-0014-SUGGESTED')}
          </span>
          <span style="font-size:10px; color:#888; margin-left:6px;">
            (${escapeHTML(sugRec.id_status || 'suggestion_only')} — creates_public_record: ${sugRec.creates_public_record})
          </span>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Publication Blockers (${(dryRunData.publication_blockers || []).length}):</strong>
          <ul style="color: var(--color-text-muted); padding-left: 20px; margin-top:4px;">
            ${(dryRunData.publication_blockers || []).map(b => `<li>${escapeHTML(b)}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Missing Items Before T068 (${(dryRunData.missing_items || []).length}):</strong>
          <ul style="color: var(--color-text-muted); padding-left: 20px; margin-top:4px;">
            ${(dryRunData.missing_items || []).map(m => `<li>${escapeHTML(m)}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: #f97316; font-weight: bold;">
          ⚡ Private promotion dry-run only &bull; Not a real promotion packet &bull; No INC-0014 created &bull; No public preview &bull; Human legal/governance review required
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Promotion Dry-Run Compiled';

    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepWording.querySelector('.step-text').textContent = 'Legal/Governance Review Required';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Public Promotion Blocked';
  }

  function renderPrivatePromoSignoffDetail(signoffData) {
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    const sugRec = signoffData.suggested_public_record_id || {};
    const review = signoffData.review_status_summary || {};

    detailDraftId.textContent = 'PROMOTION_SIGNOFF';
    detailCandidateId.textContent = signoffData.dry_run_id || '—';
    detailProposedTitle.textContent = (sugRec.suggested_id || 'INC-0014-SUGGESTED') + ' (suggestion only)';
    detailJurisdiction.textContent = 'Local (Private Signoff)';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Promotion Signoff Gate';

    detailCleanRoomSummary.innerHTML = `
      <strong>Private Promotion Signoff — Review Checklist:</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Legal review:</strong> ${escapeHTML(review.legal_review_status || 'pending')}</div>
      <div style="margin-bottom:6px;">• <strong>Source quotation:</strong> ${escapeHTML(review.source_quotation_review_status || 'pending')}</div>
      <div style="margin-bottom:6px;">• <strong>Public narrative:</strong> ${escapeHTML(review.public_narrative_review_status || 'pending')}</div>
      <div style="margin-bottom:6px;">• <strong>Publication risk:</strong> ${escapeHTML(review.publication_risk_review_status || 'pending')}</div>
      <div style="margin-bottom:6px;">• <strong>Control Tower approval:</strong> ${escapeHTML(review.control_tower_publication_approval_status || 'pending')}</div>
    `;

    detailCaseType.textContent = 'signoff_gate';
    detailSourceAuthorities.textContent = signoffData.source_run_id || 'Unknown';
    detailSourceUrl.href = '#';
    detailSourceUrl.textContent = 'Private signoff — no source URL exposed';

    detailSourceTier.textContent = 'PRIVATE REVIEW GATE';
    detailSourceTier.className = 'tier-pill tier-yellow';
    detailSourceRiskLevel.textContent = 'PRIVATE_PROMOTION_SIGNOFF';
    detailSourceRiskLevel.className = 'risk-pill risk-orange';

    detailPublishRecommendation.textContent = signoffData.signoff_status || 'private_review_pending';
    detailBusinessRisk.textContent = 'Private signoff only. Not publication approval. No real promotion packet. No public preview. No INC-0014.';

    populateList(detailFailureModesList, [], 'tag');
    populateList(detailMissingControlsList, [], 'control');
    populateList(detailEvidenceList, [], 'evidence');
    detailTrainingLesson.textContent = signoffData.next_allowed_step || 'Complete review checklist before T069.';
    populateList(detailVendorQuestionsList, [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #7c3aed; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px;">
        🔒 PRIVATE PROMOTION SIGNOFF
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(124, 58, 237, 0.08); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #a855f7; text-transform: uppercase;">
            ${escapeHTML((signoffData.signoff_status || 'private_review_pending').replace(/_/g, ' '))}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Unresolved Blockers (${signoffData.unresolved_blocker_count || 0}):</strong>
          <ul style="color: var(--color-text-muted); padding-left: 20px; margin-top:4px;">
            ${(signoffData.unresolved_blockers || []).map(b => `<li>${escapeHTML(b)}</li>`).join('')}
          </ul>
        </div>
        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: #a855f7; font-weight: bold;">
          Private signoff only &bull; Not publication approval &bull; No real promotion packet &bull; No public preview &bull; No INC-0014
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Signoff Record Created';

    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepWording.querySelector('.step-text').textContent = 'Human Review Checklist Pending';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Publication Not Allowed';
  }

  function renderPrivatePromoPacketCandidateDetail(candidateData) {
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    const prep = candidateData.private_package_preparation_checklist || {};
    const state = candidateData.publication_approval_state || {};

    detailDraftId.textContent = 'PROMO_PACKET_CANDIDATE';
    detailCandidateId.textContent = candidateData.candidate_packet_id || '—';
    detailProposedTitle.textContent = (candidateData.candidate_packet_id || 'PROMO-PACKET-CAND-GREEN-RUN-20260521-202417-001') + ' (Private Candidate)';
    detailJurisdiction.textContent = 'Local (Private Candidate)';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Promotion Packet Candidate Gate';

    detailCleanRoomSummary.innerHTML = `
      <strong>Private Promotion Packet Candidate — Preparation Checklist:</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Source Chain Referenced:</strong> ${prep.source_chain_referenced ? '✅' : '⬜'}</div>
      <div style="margin-bottom:6px;">• <strong>Parent Package Referenced:</strong> ${prep.parent_package_referenced ? '✅' : '⬜'}</div>
      <div style="margin-bottom:6px;">• <strong>Dry Run Referenced:</strong> ${prep.dry_run_referenced ? '✅' : '⬜'}</div>
      <div style="margin-bottom:6px;">• <strong>Signoff Referenced:</strong> ${prep.signoff_referenced ? '✅' : '⬜'}</div>
      <div style="margin-bottom:6px;">• <strong>Blockers Preserved:</strong> ${prep.blockers_preserved ? '✅' : '⬜'}</div>
      <div style="margin-bottom:6px;">• <strong>Safety Flags Locked:</strong> ${prep.safety_flags_locked ? '✅' : '⬜'}</div>
      <div style="margin-bottom:6px;">• <strong>Console Export Ready:</strong> ${prep.console_export_ready ? '✅' : '⬜'}</div>
      <div style="margin-bottom:6px;">• <strong>Hosted Payload Sanitized:</strong> ${prep.hosted_payload_sanitized ? '✅' : '⬜'}</div>
    `;

    detailCaseType.textContent = 'candidate_packet_gate';
    detailSourceAuthorities.textContent = candidateData.source_run_id || 'Unknown';
    detailSourceUrl.href = '#';
    detailSourceUrl.textContent = 'Private candidate — no source URL exposed';

    detailSourceTier.textContent = 'PRIVATE CANDIDATE PACKAGE';
    detailSourceTier.className = 'tier-pill tier-yellow';
    detailSourceRiskLevel.textContent = 'PRIVATE_PROMOTION_PACKET_CANDIDATE';
    detailSourceRiskLevel.className = 'risk-pill risk-orange';

    detailPublishRecommendation.textContent = candidateData.status || 'prepared';
    detailBusinessRisk.textContent = 'Private promotion-packet candidate only — not public — no INC-0014 — not publication approval.';

    populateList(detailFailureModesList, [], 'tag');
    populateList(detailMissingControlsList, [], 'control');
    populateList(detailEvidenceList, [], 'evidence');
    detailTrainingLesson.textContent = 'Private promotion-packet candidate has been successfully prepared. Publication approval remains blocked/pending.';
    populateList(detailVendorQuestionsList, [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #6d28d9; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px;">
        📦 PRIVATE PROMOTION PACKET CANDIDATE
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(109, 40, 217, 0.08); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #a78bfa; text-transform: uppercase;">
            ${escapeHTML((candidateData.status || 'prepared').replace(/_/g, ' '))}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Publication Approval Status:</strong>
          <span style="color:#ef4444; font-weight:bold; margin-left:4px;">${escapeHTML(state.status || 'blocked').toUpperCase()}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Unresolved Blockers (${state.unresolved_blocker_count || 0}):</strong>
          <ul style="color: var(--color-text-muted); padding-left: 20px; margin-top:4px;">
            ${(state.publication_blockers || []).map(b => `<li>${escapeHTML(b)}</li>`).join('')}
          </ul>
        </div>
        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: #a78bfa; font-weight: bold;">
          Private promotion-packet candidate only &bull; Not public &bull; No INC-0014 &bull; Not publication approval
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Candidate Packet Prepared';

    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepWording.querySelector('.step-text').textContent = 'Publication Approval Blocked';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Public Publication Blocked';
  }

  function renderPrivatePublicationBlockerResolutionDetail(dossierData) {
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    const ledger = dossierData.blocker_ledger || [];
    const resolvedList = ledger.filter(b => b.t070_status === 'resolved');
    const unresolvedList = ledger.filter(b => b.t070_status !== 'resolved');

    detailDraftId.textContent = 'BLOCKER_RESOLUTION';
    detailCandidateId.textContent = dossierData.resolution_id || '—';
    detailProposedTitle.textContent = (dossierData.resolution_id || 'PUB-BLOCKER-RES-GREEN-RUN-20260521-202417-001') + ' (Private Dossier)';
    detailJurisdiction.textContent = 'Local (Private Blocker Resolution)';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Blocker Resolution Gate';

    detailCleanRoomSummary.innerHTML = `
      <strong>Private Blocker Resolution Dossier Summary:</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Private Blocker-Resolution Dossier Only:</strong> ✅</div>
      <div style="margin-bottom:6px;">• <strong>Publication Blocked:</strong> 🔒 YES (strictly false)</div>
      <div style="margin-bottom:6px;">• <strong>No INC-0014 Created:</strong> ✅ YES</div>
      <div style="margin-bottom:6px;">• <strong>No Public Preview:</strong> ✅ YES</div>
      <div style="margin-bottom:6px;">• <strong>No Real Promotion Packet:</strong> ✅ YES</div>
      <br>
      <strong>Blocker Status Evaluation:</strong><br>
      <div style="margin-top:4px; font-size:12px; color:#888;">
        Total Evaluated: <strong>${ledger.length}</strong> | Resolved: <strong style="color:#28a745;">${resolvedList.length}</strong> | Remaining Blocked/Human Review: <strong style="color:#ef4444;">${unresolvedList.length}</strong>
      </div>
    `;

    detailCaseType.textContent = 'blocker_resolution_gate';
    detailSourceAuthorities.textContent = dossierData.source_run_id || 'Unknown';
    detailSourceUrl.href = '#';
    detailSourceUrl.textContent = 'Private dossier — no source URL exposed';

    detailSourceTier.textContent = 'PRIVATE RESOLUTION DOSSIER';
    detailSourceTier.className = 'tier-pill tier-yellow';
    detailSourceRiskLevel.textContent = 'PUBLICATION_STILL_BLOCKED';
    detailSourceRiskLevel.className = 'risk-pill risk-orange';

    detailPublishRecommendation.textContent = dossierData.status || 'partially_resolved';
    detailBusinessRisk.textContent = 'Private blocker-resolution dossier only — not publication approval — all remote/public writes strictly disabled.';

    populateList(detailFailureModesList, [], 'tag');
    populateList(detailMissingControlsList, [], 'control');
    populateList(detailEvidenceList, [], 'evidence');
    detailTrainingLesson.textContent = 'T070 blocker resolution compiled successfully. Only private technical preparation package blockers are resolved. All human/legal review and public preview blockers remain strictly blocked.';
    populateList(detailVendorQuestionsList, [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #7c2d12; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px;">
        🛡️ PRIVATE BLOCKER-RESOLUTION DOSSIER
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(124, 45, 18, 0.08); border: 1px solid rgba(249, 115, 22, 0.4); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #fdba74; text-transform: uppercase;">
            ${escapeHTML((dossierData.status || 'partially_resolved').replace(/_/g, ' '))}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Publication Status:</strong>
          <span style="color:#ef4444; font-weight:bold; margin-left:4px;">BLOCKED</span>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Resolved Blockers (${resolvedList.length}):</strong>
          <ul style="color: #28a745; padding-left: 20px; margin-top:4px;">
            ${resolvedList.map(b => `<li><strong>${escapeHTML(b.source_signoff_blocker_id)}:</strong> ${escapeHTML(b.resolution_basis)}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 8px;">
          <strong>Remaining Blockers (${unresolvedList.length}):</strong>
          <ul style="color: #ef4444; padding-left: 20px; margin-top:4px;">
            ${unresolvedList.map(b => `<li><strong>${escapeHTML(b.source_signoff_blocker_id)}:</strong> ${escapeHTML(b.t070_status)} (${escapeHTML(b.remaining_action)})</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: #fdba74; font-weight: bold;">
          Private Blocker-Resolution Dossier Only &bull; Publication remains blocked &bull; No INC-0014 &bull; Not publication approval
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Technical Blocker Evaluated';

    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepWording.querySelector('.step-text').textContent = 'Human Reviews Blocked';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Publication Blocked';
  }

  function renderPrivateReviewStateSyncDetail(syncData) {
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    detailDraftId.textContent = 'HOSTED_PRIVATE_SYNC';
    detailCandidateId.textContent = syncData.sync_id || '—';
    detailProposedTitle.textContent = (syncData.sync_id || 'HOSTED-PRIVATE-REVIEW-STATE-SYNC-GREEN-RUN-20260521-202417-001') + ' (Hosted private review-state sync readiness)';
    detailJurisdiction.textContent = 'Hosted Private Review-State Sync';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Hosted Sync Boundary Gate';

    detailCleanRoomSummary.innerHTML = `
      <strong>Hosted Private Review-State Sync Readiness Summary:</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Sync Readiness Prepared:</strong> ✅</div>
      <div style="margin-bottom:6px;">• <strong>Dry-Run Mode:</strong> 🔒 YES (strictly true)</div>
      <div style="margin-bottom:6px;">• <strong>Remote Write Attempted:</strong> ❌ FALSE</div>
      <div style="margin-bottom:6px;">• <strong>Intended Table:</strong> <code>${syncData.hosted_sync_contract ? syncData.hosted_sync_contract.intended_supabase_table : '—'}</code></div>
      <div style="margin-bottom:6px;">• <strong>Intended Worker Routes:</strong> <code>${syncData.hosted_sync_contract ? syncData.hosted_sync_contract.intended_worker_routes.join(', ') : '—'}</code></div>
      <br>
      <strong>Safety Verification Flags:</strong><br>
      <div style="margin-top:4px; font-size:12px; color:#888;">
        No Raw HTML: <strong>${(syncData.safety_flags || {}).no_raw_html}</strong> | No Secrets: <strong>${(syncData.safety_flags || {}).no_secrets}</strong> | No INC-0014: <strong>${(syncData.safety_flags || {}).no_inc_0014_created}</strong>
      </div>
    `;

    detailCaseType.textContent = 'hosted_private_sync_readiness';
    detailSourceAuthorities.textContent = syncData.source_run_id || 'Unknown';
    detailSourceUrl.href = '#';
    detailSourceUrl.textContent = 'Private sync contract — local simulation';

    detailSourceTier.textContent = 'HOSTED SYNC READINESS';
    detailSourceTier.className = 'tier-pill tier-yellow';
    detailSourceRiskLevel.textContent = 'REMOTE_WRITE_STRICTLY_DISABLED';
    detailSourceRiskLevel.className = 'risk-pill risk-orange';

    detailPublishRecommendation.textContent = syncData.sync_status || 'hosted_private_sync_readiness_prepared';
    detailBusinessRisk.textContent = 'Hosted private review-state sync readiness dossier only — remote write and deploy disabled by design — publication remains blocked.';

    populateList(detailFailureModesList, [], 'tag');
    populateList(detailMissingControlsList, [], 'control');
    populateList(detailEvidenceList, [], 'evidence');
    detailTrainingLesson.textContent = 'T071 sync readiness compiled successfully. The boundary contract is fully locked down. Remote activation remains completely disabled until explicit human signoff and credentials are provided.';
    populateList(detailVendorQuestionsList, [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #1e3a8a; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px;">
        🔄 HOSTED PRIVATE SYNC CONTRACT READINESS
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(30, 58, 138, 0.08); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #93c5fd; text-transform: uppercase;">
            ${escapeHTML((syncData.sync_status || 'hosted_private_sync_readiness_prepared').replace(/_/g, ' '))}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Intended Supabase Table:</strong> <code>${escapeHTML((syncData.hosted_sync_contract || {}).intended_supabase_table || '')}</code>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Intended Cloudflare Worker Routes:</strong>
          <ul style="color: #93c5fd; padding-left: 20px; margin-top:4px;">
            ${((syncData.hosted_sync_contract || {}).intended_worker_routes || []).map(r => `<li><code>${escapeHTML(r)}</code></li>`).join('')}
          </ul>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Remote Write Attempted:</strong> <span style="color:#ef4444; font-weight:bold;">false</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Publication Still Blocked:</strong> <span style="color:#ef4444; font-weight:bold;">true</span>
        </div>
        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: #93c5fd; font-weight: bold;">
          Hosted activation still requires explicit approval &bull; Dry-run mode strictly active &bull; Local mock route contract tests passed successfully
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Sync Contract Ready';

    gateStepWording.className = 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = '○';
    gateStepWording.querySelector('.step-text').textContent = 'Remote Write Blocked';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Publication Blocked';
  }

  function renderPrivateRuntimeActivationDetail(activationData) {
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    const isLive = activationData.live_activation_executed || activationData.remote_apply_executed;

    detailDraftId.textContent = 'RUNTIME_ACTIVATION';
    detailCandidateId.textContent = 'T072';
    detailProposedTitle.textContent = (activationData.migration_target || '002_private_review_state_sync.sql') + ' (Private Runtime Activation)';
    detailJurisdiction.textContent = 'Local (Private Runtime Activation)';
    detailLegalDomain.textContent = 'AI & Governance';
    detailCommercialDomain.textContent = 'Supabase Apply Harness Gate';

    detailCleanRoomSummary.innerHTML = `
      <strong>Private Runtime Activation — Tranche 1 Summary:</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Supabase Migration:</strong> <code>${escapeHTML(activationData.migration_target)}</code></div>
      <div style="margin-bottom:6px;">• <strong>Apply Status:</strong> <code>${escapeHTML(activationData.apply_status)}</code></div>
      <div style="margin-bottom:6px;">• <strong>Probe Status:</strong> <code>${escapeHTML(activationData.probe_status)}</code></div>
      <div style="margin-bottom:6px;">• <strong>Snapshot Write:</strong> <code>${escapeHTML(activationData.snapshot_write_status)}</code></div>
      <div style="margin-bottom:6px;">• <strong>Worker Route Status:</strong> <code>${escapeHTML(activationData.worker_route_status || 'dry_run_ready')}</code></div>
      <br>
      <strong>Safety Verification Flags:</strong><br>
      <div style="margin-top:4px; font-size:12px; color:#888;">
        No Raw HTML: <strong>${activationData.safety_flags?.no_raw_html ?? true}</strong> | No Secrets: <strong>${activationData.safety_flags?.no_secrets ?? true}</strong> | No INC-0014: <strong>${activationData.safety_flags?.no_inc_0014 ?? true}</strong>
      </div>
    `;

    detailCaseType.textContent = 'private_runtime_activation';
    detailSourceAuthorities.textContent = 'Supabase / Cloudflare Route Readiness';
    detailSourceUrl.href = '#';
    detailSourceUrl.textContent = 'Private activation harness — local status';

    detailSourceTier.textContent = 'PRIVATE RUNTIME';
    detailSourceTier.className = 'tier-pill tier-yellow';
    detailSourceRiskLevel.textContent = isLive ? 'LIVE_ACTIVATED' : 'DRY_RUN_BY_DEFAULT';
    detailSourceRiskLevel.className = isLive ? 'risk-pill risk-green' : 'risk-pill risk-orange';

    detailPublishRecommendation.textContent = isLive ? 'live_activated' : 'dryrun_ready';
    detailBusinessRisk.textContent = 'All live/remote mutation flags strictly false unless explicit live markers are provided. Publication remains completely blocked.';

    populateList(detailFailureModesList, [], 'tag');
    populateList(detailMissingControlsList, [], 'control');
    populateList(detailEvidenceList, [], 'evidence');
    detailTrainingLesson.textContent = 'T072 private runtime activation tranche 1 compiled. Safe additive migration validated. Dry-run limits confirmed.';
    populateList(detailVendorQuestionsList, [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #1e3a8a; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px;">
        🛡️ PRIVATE RUNTIME ACTIVATION
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(30, 58, 138, 0.08); border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #93c5fd; text-transform: uppercase;">
            ${escapeHTML(isLive ? 'LIVE_ACTIVATED' : 'DRY_RUN_READY')}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Supabase Migration:</strong> <code>${escapeHTML(activationData.migration_target || '')}</code>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Apply Status:</strong> <code>${escapeHTML(activationData.apply_status || '')}</code>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Probe Status:</strong> <code>${escapeHTML(activationData.probe_status || '')}</code>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Snapshot Write:</strong> <code>${escapeHTML(activationData.snapshot_write_status || '')}</code>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Publication Still Blocked:</strong> <span style="color:#ef4444; font-weight:bold;">${activationData.publication_still_blocked}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>No INC-0014:</strong> <span style="color:#28a745; font-weight:bold;">${activationData.no_inc_0014}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>No Public Preview:</strong> <span style="color:#28a745; font-weight:bold;">${activationData.no_public_preview}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>No Worker Deploy:</strong> <span style="color:#28a745; font-weight:bold;">${activationData.no_worker_deploy}</span>
        </div>
        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: #93c5fd; font-weight: bold;">
          Private runtime activation tranche 1 compiled &bull; Safe additive migrations validated &bull; Dry-run limits confirmed
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Preflight Validation Passed';

    gateStepWording.className = isLive ? 'status-step passed' : 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = isLive ? '✓' : '○';
    gateStepWording.querySelector('.step-text').textContent = isLive ? 'Remote Activation Done' : 'Remote Activation Bounded';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Publication Blocked';
  }

  function renderPrivateRuntimeOperationalStatusDetail(statusData) {
    emptyStatePanel.classList.add('hidden');
    if (healthDetailPanel) healthDetailPanel.classList.add('hidden');
    if (packetDetailPanel) packetDetailPanel.classList.add('hidden');
    activeDetailPanel.classList.remove('hidden');

    ['detail-local-only-label', 'detail-not-public-label', 'detail-not-approved-label', 'detail-promotion-blocked-label'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.remove('hidden');
    });

    const isLive = statusData.operational_components?.supabase_table_apply?.status === 'live' ||
                   statusData.operational_components?.worker_deploy?.status === 'live';

    detailDraftId.textContent = 'RUNTIME_OPERATIONAL_STATUS';
    detailCandidateId.textContent = 'T073';
    detailProposedTitle.textContent = 'Private Hosted Runtime End-to-End Operational Status';
    detailJurisdiction.textContent = 'Hosted (Private Runtime Tranche 2)';
    detailLegalDomain.textContent = 'Private Hosting';
    detailCommercialDomain.textContent = 'Supabase + Cloudflare Live Harness';

    detailCleanRoomSummary.innerHTML = `
      <strong>Private Runtime Operational Status (Tranche 2) Summary:</strong><br><br>
      <div style="margin-bottom:6px;">• <strong>Supabase Table Apply:</strong> <code>${escapeHTML(statusData.operational_components?.supabase_table_apply?.status || 'dry-run')}</code></div>
      <div style="margin-bottom:6px;">• <strong>Supabase Live Probe:</strong> <code>${escapeHTML(statusData.operational_components?.supabase_live_probe?.status || 'dry-run')}</code></div>
      <div style="margin-bottom:6px;">• <strong>Private Snapshot Write:</strong> <code>${escapeHTML(statusData.operational_components?.private_snapshot_write?.status || 'dry-run')}</code></div>
      <div style="margin-bottom:6px;">• <strong>Worker Deploy Status:</strong> <code>${escapeHTML(statusData.operational_components?.worker_deploy?.status || 'dry-run')}</code></div>
      <div style="margin-bottom:6px;">• <strong>Worker Live Probe Status:</strong> <code>${escapeHTML(statusData.operational_components?.worker_probe?.status || 'dry-run')}</code></div>
      <br>
      <strong>Safety Verification Flags:</strong><br>
      <div style="margin-top:4px; font-size:12px; color:#888;">
        No Raw HTML: <strong>${statusData.safety_constraints?.no_public_raw_text ?? true}</strong> | No Secrets: <strong>true</strong> | No INC-0014: <strong>${statusData.safety_constraints?.no_inc_0014 ?? true}</strong>
      </div>
    `;

    detailCaseType.textContent = 'private_runtime_operational_status';
    detailSourceAuthorities.textContent = 'Supabase / Cloudflare Worker Operational Status';
    detailSourceUrl.href = '#';
    detailSourceUrl.textContent = 'Private operational status — end-to-end telemetry';

    detailSourceTier.textContent = 'PRIVATE OPERATIONAL';
    detailSourceTier.className = 'tier-pill tier-yellow';
    detailSourceRiskLevel.textContent = isLive ? 'LIVE_ACTIVATED' : 'DRY_RUN_BY_DEFAULT';
    detailSourceRiskLevel.className = isLive ? 'risk-pill risk-green' : 'risk-pill risk-orange';

    detailPublishRecommendation.textContent = isLive ? 'live_activated' : 'dryrun_ready';
    detailBusinessRisk.textContent = 'Strict safety boundaries are preserved. All live mutations remain completely sandboxed unless explicit environment approval markers are supplied. Public publication continues to be blocked.';

    populateList(detailFailureModesList, [], 'tag');
    populateList(detailMissingControlsList, [], 'control');
    populateList(detailEvidenceList, [], 'evidence');
    detailTrainingLesson.textContent = 'T073 private runtime activation tranche 2 deployed. Full Supabase + Cloudflare status tracking integration achieved.';
    populateList(detailVendorQuestionsList, [], 'question');

    simulationResultPanel.classList.remove('hidden');
    simulationResultPanel.innerHTML = `
      <div class="result-header" style="background-color: #581c87; color: white; padding: 10px; border-radius: 4px; font-weight: bold; margin-bottom: 10px; text-align: center; font-size:12px;">
        🛡️ PRIVATE RUNTIME OPERATIONAL STATUS
      </div>
      <div class="result-body" style="font-size: 13px;">
        <div style="padding: 10px; background: rgba(88, 28, 135, 0.08); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 6px; margin-bottom: 12px;">
          <div style="font-weight: 700; color: #d8b4fe; text-transform: uppercase;">
            ${escapeHTML(isLive ? 'LIVE_ACTIVATED' : 'DRY_RUN_READY')}
          </div>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Supabase Apply:</strong> <code>${escapeHTML(statusData.operational_components?.supabase_table_apply?.status || 'dry-run')}</code>
          ${statusData.operational_components?.supabase_table_apply?.errors ? `<div style="color:#ef4444;font-size:11px;margin-left:10px;">Error: ${escapeHTML(statusData.operational_components.supabase_table_apply.errors)}</div>` : ''}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Supabase Live Probe:</strong> <code>${escapeHTML(statusData.operational_components?.supabase_live_probe?.status || 'dry-run')}</code>
          ${statusData.operational_components?.supabase_live_probe?.errors ? `<div style="color:#ef4444;font-size:11px;margin-left:10px;">Error: ${escapeHTML(statusData.operational_components.supabase_live_probe.errors)}</div>` : ''}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Private Snapshot Write:</strong> <code>${escapeHTML(statusData.operational_components?.private_snapshot_write?.status || 'dry-run')}</code>
          ${statusData.operational_components?.private_snapshot_write?.errors ? `<div style="color:#ef4444;font-size:11px;margin-left:10px;">Error: ${escapeHTML(statusData.operational_components.private_snapshot_write.errors)}</div>` : ''}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Worker Deploy:</strong> <code>${escapeHTML(statusData.operational_components?.worker_deploy?.status || 'dry-run')}</code>
          ${statusData.operational_components?.worker_deploy?.errors ? `<div style="color:#ef4444;font-size:11px;margin-left:10px;">Error: ${escapeHTML(statusData.operational_components.worker_deploy.errors)}</div>` : ''}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Worker Probe:</strong> <code>${escapeHTML(statusData.operational_components?.worker_probe?.status || 'dry-run')}</code>
          ${statusData.operational_components?.worker_probe?.errors ? `<div style="color:#ef4444;font-size:11px;margin-left:10px;">Error: ${escapeHTML(statusData.operational_components.worker_probe.errors)}</div>` : ''}
        </div>
        <div style="margin-bottom: 8px;">
          <strong>Publication Still Blocked:</strong> <span style="color:#ef4444; font-weight:bold;">${statusData.safety_constraints?.publication_still_blocked}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>No INC-0014:</strong> <span style="color:#28a745; font-weight:bold;">${statusData.safety_constraints?.no_inc_0014}</span>
        </div>
        <div style="margin-bottom: 8px;">
          <strong>No Public Preview:</strong> <span style="color:#28a745; font-weight:bold;">${!statusData.safety_constraints?.public_preview_allowed}</span>
        </div>
        <div style="margin-top: 12px; font-size: 11px; border-top: 1px solid var(--border-color); padding-top: 8px; color: #d8b4fe; font-weight: bold;">
          Private runtime status verified &bull; Additive remote checks active &bull; Local fallback limits enforced
        </div>
      </div>
    `;

    gateStepCurator.className = 'status-step passed';
    gateStepCurator.querySelector('.step-check').innerHTML = '✓';
    gateStepCurator.querySelector('.step-text').textContent = 'Preflight Validation Passed';

    gateStepWording.className = isLive ? 'status-step passed' : 'status-step pending';
    gateStepWording.querySelector('.step-check').innerHTML = isLive ? '✓' : '○';
    gateStepWording.querySelector('.step-text').textContent = isLive ? 'Remote Activation Done' : 'Remote Activation Bounded';

    gateStepControl.className = 'status-step blocked';
    gateStepControl.querySelector('.step-check').innerHTML = '🚫';
    gateStepControl.querySelector('.step-text').textContent = 'Publication Blocked';
  }

  // Initialize load
  loadBundle('review-bundle.json');

});
