import { 
  DEMO_PROPERTIES, 
  getPropertiesByBudget, 
  formatCurrencyAED 
} from './data/properties.js';
import { submitEnquiry } from './services/enquiries.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarAndDrawer();
  initInvestPageInteractions();
  initCinematicScrollEngine();
  initCinematicOverlays();
});

// Navigation Bar & Mobile Drawer for Inner Pages
function initNavbarAndDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
}

const DIMENSION_DATA = {
  tax: {
    title: 'Tax & Fiscal Environment',
    traditional: {
      label: 'Global Metropolitan Metros',
      headline: 'Progressive Fiscal Drag',
      desc: 'Top marginal personal income tax rates typically reach 45%–54% (e.g. UK, France, California/NYC). Coupled with capital gains taxation (20%–37%), wealth taxes, and municipal levies, compounding capital faces constant friction.',
      takeaway: 'Substantial annual fiscal leakage on personal income and asset sales.'
    },
    dubai: {
      label: 'The Dubai Framework',
      headline: 'Targeted Sovereign Efficiency',
      desc: '0% personal income tax on salaries and worldwide earnings, with 0% capital gains tax on personal property and investments. Corporate tax is set at a transparent 9% strictly for taxable profits over AED 375,000 (with Free Zone qualifying exemptions). Single 4% DLD transfer fee upon acquisition with 0% recurring municipal property taxes.',
      takeaway: 'Personal capital and returns compound without recurring personal tax drag.'
    }
  },
  lifestyle: {
    title: 'Daily Cadence & Security',
    traditional: {
      label: 'Global Metropolitan Metros',
      headline: 'Urban Friction & Strain',
      desc: 'Legacy capitals offer immense history, yet frequently struggle with deteriorating civic safety indices, transit strikes, property theft, and severe winters that constrain outdoor active living.',
      takeaway: 'Everyday safety and convenience require perpetual calculation.'
    },
    dubai: {
      label: 'The Dubai Framework',
      headline: 'World-Class Safety & Seamless Living',
      desc: 'Consistently ranked among the top 3 safest cities worldwide (Numbeo Safety Index). Clean public environments, 300+ days of annual sunshine, world-class beach clubs, and an effortless service economy across Jumeirah and the Marina.',
      takeaway: 'A daily rhythm defined by peace of mind, year-round sun, and frictionless convenience.'
    }
  },
  connectivity: {
    title: 'Global Connectivity & Reach',
    traditional: {
      label: 'Global Metropolitan Metros',
      headline: 'Regional Isolation',
      desc: 'Traditional Western metropolises operate on time zones misaligned with Asia, making simultaneous coordination between Tokyo, Singapore, and Europe challenging in a single working day.',
      takeaway: 'Geographic distance from the highest-velocity emerging growth corridors.'
    },
    dubai: {
      label: 'The Dubai Framework',
      headline: 'The Natural Global Bridge (GMT+4)',
      desc: 'DXB connects directly to over 260 destinations globally, placing you within 8 hours flight radius of two-thirds of the world’s population. GMT+4 enables active market trading across London, Singapore, Hong Kong, and New York in the same day.',
      takeaway: 'Direct physical and digital access to the world’s most dynamic markets.'
    }
  },
  business: {
    title: 'Business Setup & Governance',
    traditional: {
      label: 'Global Metropolitan Metros',
      headline: 'Regulatory Red Tape',
      desc: 'Heavy bureaucracy, shifting regulatory mandates, and rising compliance overhead increase friction for international founders, family offices, and executives.',
      takeaway: 'Administrative drag and slower commercial dispute resolutions.'
    },
    dubai: {
      label: 'The Dubai Framework',
      headline: 'Frictionless Pro-Growth Jurisdictions',
      desc: '100% foreign business ownership across mainland and free zones. DIFC operates under an independent English common-law legal system with specialized commercial courts and rapid digital corporate incorporation.',
      takeaway: 'A sovereign jurisdiction built around commercial speed and private facilitation.'
    }
  },
  'real-estate': {
    title: 'Real Estate Value & Quality',
    traditional: {
      label: 'Global Metropolitan Metros',
      headline: 'High Price-Per-SqFt & Aging Assets',
      desc: 'Prime central locations in London, New York, or Paris trade at $2,000 to $4,500+/sqft for historic housing stock with limited private amenities, strict tenant eviction laws, and low rental yields (typically 2.5%–4%).',
      takeaway: 'Compressed yields and recurring capital expenditure on legacy structures.'
    },
    dubai: {
      label: 'The Dubai Framework',
      headline: 'Contemporary Architectural Excellence',
      desc: 'Prime and super-prime waterfront residences trade at an attractive entry valuation ($600 to $1,500/sqft) with resort-grade amenities (private concierges, infinity pools, wellness centers). High demand supports attractive rental yields backed by strict RERA escrow security.',
      takeaway: 'Superior space, architectural innovation, and strong rental demand.'
    }
  },
  wealth: {
    title: 'Wealth Preservation & Succession',
    traditional: {
      label: 'Global Metropolitan Metros',
      headline: 'High Estate & Inheritance Taxes',
      desc: 'Inheritance and death duties reach up to 40% in the UK and 45% in France, alongside wealth taxes and capital controls that significantly erode multi-generational assets.',
      takeaway: 'Intergenerational transfers encounter severe fiscal loss.'
    },
    dubai: {
      label: 'The Dubai Framework',
      headline: 'Generational Continuity & Trust Structures',
      desc: '0% inheritance tax on UAE assets for non-Muslim expatriates via registered DIFC Wills and Probate registries. Sophisticated DIFC and ADGM foundations provide robust mechanisms for multi-generational wealth governance.',
      takeaway: 'Preservation of family capital protected by sovereign common-law certainty.'
    }
  }
};

function renderDimension(dimKey) {
  const panel = document.getElementById('dim-display-panel');
  if (!panel || !DIMENSION_DATA[dimKey]) return;
  const d = DIMENSION_DATA[dimKey];
  panel.innerHTML = `
    <div class="dim-display-grid">
      <div class="dim-col-traditional">
        <span class="dim-perspective-badge traditional">${d.traditional.label}</span>
        <h3 class="dim-col-title">${d.traditional.headline}</h3>
        <p class="dim-col-desc">${d.traditional.desc}</p>
        <div class="dim-takeaway-box">
          <strong>Context:</strong> ${d.traditional.takeaway}
        </div>
      </div>
      <div class="dim-col-dubai">
        <span class="dim-perspective-badge dubai">${d.dubai.label}</span>
        <h3 class="dim-col-title">${d.dubai.headline}</h3>
        <p class="dim-col-desc">${d.dubai.desc}</p>
        <div class="dim-takeaway-box" style="border-left-color: var(--champagne-gold-light);">
          <strong>Dubai Advantage:</strong> ${d.dubai.takeaway}
        </div>
      </div>
    </div>
  `;
}

function setupDimensionSelector() {
  const tabBtns = document.querySelectorAll('.dim-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const dim = btn.getAttribute('data-dim');
      renderDimension(dim);
    });
  });
  renderDimension('tax');
}

function initInvestPageInteractions() {
  setupDimensionSelector();
  setupObjectiveSelector();
  setupBudgetSelector();
  setupScenarioSlider();
  setupPlanModal();

  // Explore Why Dubai scroll
  const exploreBtn = document.getElementById('btn-explore-why-dubai');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('four-pillars');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Scroll to opportunities
  const viewOppBtn = document.getElementById('btn-view-opps');
  if (viewOppBtn) {
    viewOppBtn.addEventListener('click', () => {
      const target = document.getElementById('investment-opportunities-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Build plan buttons open modal
  const heroPlanBtn = document.getElementById('btn-hero-build-plan');
  const closePlanBtn = document.getElementById('btn-close-build-plan');
  if (heroPlanBtn) heroPlanBtn.addEventListener('click', openPlanModal);
  if (closePlanBtn) closePlanBtn.addEventListener('click', openPlanModal);
}

// --------------------------------------------------------------------------
// SECTION — WHAT IS YOUR OBJECTIVE?
// --------------------------------------------------------------------------
function setupObjectiveSelector() {
  const cards = document.querySelectorAll('.objective-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// --------------------------------------------------------------------------
// SECTION — INVESTMENT BUDGET SELECTOR
// --------------------------------------------------------------------------
function setupBudgetSelector() {
  const buttons = document.querySelectorAll('.budget-tier-btn');
  const grid = document.getElementById('budget-properties-grid');

  function renderTier(tier) {
    if (!grid) return;
    const properties = getPropertiesByBudget(tier);
    grid.innerHTML = properties.map(prop => `
      <a href="/properties/${prop.id}" class="property-editorial-card" data-id="${prop.id}">
        <div class="card-media-wrapper">
          <img src="${prop.coverImage || prop.images.exterior[0]}" alt="${prop.name}" class="card-property-img" loading="lazy" />
          <span class="card-subtle-badge">DEMO DATA</span>
        </div>
        <div class="card-details-panel">
          <div class="invest-card-profile-tag">
            <span>●</span> ${prop.investmentProfile.toUpperCase()} STRATEGY
          </div>
          <h3 class="card-property-name">${prop.name}</h3>
          <p class="card-property-location">${prop.location}</p>
          <div class="card-property-price">${prop.priceDisplay}</div>
          <div class="invest-card-yield">
            Illustrative Yield: ~${prop.illustrativeYield}%*
          </div>
        </div>
      </a>
    `).join('');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tier = btn.getAttribute('data-tier');
      renderTier(tier);
    });
  });

  // Default to 3-10M
  renderTier('3-10m');
}

// --------------------------------------------------------------------------
// SECTION — SEE THE POTENTIAL (SCENARIO SLIDER)
// --------------------------------------------------------------------------
function setupScenarioSlider() {
  const slider = document.getElementById('potential-range-slider');
  const valInvest = document.getElementById('pot-val-investment');
  const valRent = document.getElementById('pot-val-rent');
  const valYield = document.getElementById('pot-val-yield');

  if (!slider) return;

  function updateScenario() {
    const capital = parseFloat(slider.value);
    // Illustrative baseline model for demonstration: 6.8% gross yield
    const yieldPct = 6.8;
    const annualRent = capital * (yieldPct / 100);

    if (valInvest) valInvest.textContent = `AED ${(capital / 1000000).toFixed(1)}M`;
    if (valRent) valRent.textContent = formatCurrencyAED(Math.round(annualRent));
    if (valYield) valYield.textContent = `${yieldPct.toFixed(1)}%`;
  }

  slider.addEventListener('input', updateScenario);
  updateScenario();
}


// --------------------------------------------------------------------------
// INVESTMENT PLAN MODAL
// --------------------------------------------------------------------------
function setupPlanModal() {
  let modal = document.getElementById('invest-plan-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'invest-plan-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-medium">
        <button type="button" class="modal-close-btn" id="plan-modal-close-btn" aria-label="Close modal">✕</button>
        <div class="modal-content modal-padded">
          <span class="visual-eyebrow">Advisory Consultation</span>
          <h3 class="modal-title">Build Your Investment Plan</h3>
          <p class="modal-desc">
            Share your allocation target and strategy. Our private portfolio directors will prepare a bespoke acquisition scenario.
          </p>
          <form id="invest-plan-form" class="minimal-clean-form">
            <div class="form-row-compact">
              <input type="text" id="plan-name" required placeholder="Full Name" />
              <input type="text" id="plan-contact" required placeholder="Email or WhatsApp" />
            </div>
            <div class="form-row-compact">
              <select id="plan-objective-select" class="sheet-custom-select" style="margin-bottom: 0;">
                <option value="income">Objective: Income & Rental Yield</option>
                <option value="growth">Objective: Long-Term Capital Growth</option>
                <option value="balanced">Objective: Balanced Hybrid Strategy</option>
              </select>
              <select id="plan-budget-select" class="sheet-custom-select" style="margin-bottom: 0;">
                <option value="1-3m">Target: AED 1M – 3M</option>
                <option value="3-10m" selected>Target: AED 3M – 10M</option>
                <option value="10m-plus">Target: AED 10M+</option>
              </select>
            </div>
            <textarea id="plan-notes" rows="3" placeholder="Timeline, preferred communities, or residency interest..."></textarea>
            <button type="submit" class="btn-dark btn-submit-full" id="plan-submit-btn">
              Request Confidential Strategy Call
            </button>
          </form>
          <div id="plan-success-box" class="form-success-box" style="display: none; margin-top: 20px;">
            <h4>Investment Request Received</h4>
            <p>A Senior Portfolio Advisory Director will contact you within 24 business hours.</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('plan-modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closePlanModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePlanModal();
    });

    const form = document.getElementById('invest-plan-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = document.getElementById('plan-name')?.value || '';
        const contact = document.getElementById('plan-contact')?.value || '';
        const objSelect = document.getElementById('plan-objective-select');
        const budgetSelect = document.getElementById('plan-budget-select');
        const notes = document.getElementById('plan-notes')?.value || '';

        const objective = objSelect ? objSelect.options[objSelect.selectedIndex].text : 'Portfolio Strategy';
        const budget = budgetSelect ? budgetSelect.options[budgetSelect.selectedIndex].text : 'AED 3M – 10M';

        const isEmail = contact.includes('@');
        try {
          await submitEnquiry({
            fullName,
            email: isEmail ? contact : '',
            phone: !isEmail ? contact : '',
            type: 'Investment Strategy Advisory',
            budget: budget,
            propertyTitle: 'Portfolio Allocation Plan',
            notes: `Objective: ${objective}\nBudget: ${budget}\nNotes: ${notes}`
          });
        } catch (err) {
          console.warn('Investment enquiry stored in local vault:', err);
        }

        const success = document.getElementById('plan-success-box');
        if (success) success.style.display = 'block';
        form.style.display = 'none';
      });
    }
  }
}

function openPlanModal() {
  setupPlanModal();
  const modal = document.getElementById('invest-plan-modal');
  const form = document.getElementById('invest-plan-form');
  const success = document.getElementById('plan-success-box');

  if (form) form.style.display = 'block';
  if (success) success.style.display = 'none';

  if (modal) {
    modal.classList.add('is-open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closePlanModal() {
  const modal = document.getElementById('invest-plan-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}


// ==========================================================================
// CINEMATIC FULL-SCREEN SCROLL ENGINE
// Smooth sticky 4-scene progression: 01 Tax -> 02 Rental -> 03 Market -> 04 Access
// Full 100svh viewport coverage with seamless dissolve transition effect
// ==========================================================================
function initCinematicScrollEngine() {
  const container = document.getElementById('why-dubai-cinematic') || document.querySelector('.cinematic-why-dubai');
  if (!container) return;

  const stage = container.querySelector('.cinematic-sticky-stage');
  const bgLayers = Array.from(container.querySelectorAll('.cinematic-bg-layer'));
  const scenes = Array.from(container.querySelectorAll('.cinematic-scene'));
  const progressSteps = Array.from(container.querySelectorAll('.progress-step'));
  const navbar = document.getElementById('site-header');

  const totalScenes = scenes.length;
  if (totalScenes === 0) return;

  let ticking = false;

  function updateScroll() {
    ticking = false;
    const containerTop = container.offsetTop || 0;
    const stageHeight = stage ? stage.offsetHeight : window.innerHeight;
    const totalScrollable = container.offsetHeight - stageHeight;

    if (totalScrollable <= 0) return;

    // Support static scene inspection via query param ?scene=0..3 or native scroll progress
    let progress = 0;
    const urlParams = new URLSearchParams(window.location.search);
    const forcedScene = urlParams.has('scene') ? parseInt(urlParams.get('scene'), 10) : null;

    if (forcedScene !== null && !isNaN(forcedScene) && forcedScene >= 0 && forcedScene < totalScenes) {
      progress = forcedScene / totalScenes;
    } else {
      const currentScrollY = window.pageYOffset || window.scrollY || 0;
      const scrolled = Math.max(0, currentScrollY - containerTop);
      progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
    }

    // Calculate current active scene index directly from scroll position
    let activeIndex;
    if (forcedScene !== null && !isNaN(forcedScene) && forcedScene >= 0 && forcedScene < totalScenes) {
      activeIndex = forcedScene;
    } else {
      activeIndex = Math.min(totalScenes - 1, Math.floor(progress * totalScenes));
    }

    if (stage) {
      stage.setAttribute('data-active-scene', String(activeIndex));
    }

    // Update progress steps
    progressSteps.forEach((step, idx) => {
      if (idx === activeIndex) {
        step.classList.add('is-active');
        step.setAttribute('aria-current', 'step');
      } else {
        step.classList.remove('is-active');
        step.removeAttribute('aria-current');
      }
    });

    // Render active card normally without overlapping transition effects
    for (let i = 0; i < totalScenes; i++) {
      const bg = bgLayers[i];
      const scene = scenes[i];

      if (!bg || !scene) continue;

      const isCurrent = (i === activeIndex);

      scene.style.opacity = isCurrent ? '1' : '0';
      scene.style.display = isCurrent ? 'flex' : 'none';
      scene.style.visibility = isCurrent ? 'visible' : 'hidden';
      scene.style.transform = 'none';
      scene.style.pointerEvents = isCurrent ? 'auto' : 'none';
      scene.classList.toggle('is-active', isCurrent);

      bg.style.opacity = isCurrent ? '1' : '0';
      bg.style.display = isCurrent ? 'block' : 'none';
      bg.style.visibility = isCurrent ? 'visible' : 'hidden';
      bg.style.transform = 'none';
      bg.classList.toggle('is-active', isCurrent);
    }
  }

  // Click on progress steps to jump directly to corresponding card
  progressSteps.forEach((step, idx) => {
    step.addEventListener('click', () => {
      const stageHeight = stage ? stage.offsetHeight : window.innerHeight;
      const totalScrollable = container.offsetHeight - stageHeight;
      const targetScroll = container.offsetTop + (idx / totalScenes) * totalScrollable + 2;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Bridge button click to smooth scroll into Why Property
  const bridgeBtn = container.querySelector('.cinematic-scene-bridge');
  if (bridgeBtn) {
    bridgeBtn.style.cursor = 'pointer';
    bridgeBtn.addEventListener('click', () => {
      const target = document.getElementById('credibility-discipline');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial calculation
  updateScroll();
}

// ==========================================================================
// DYNAMIC IN-PLACE EXPANDED CARDS (OVERLAYS OVER OUTSIDE LAYER)
// When user clicks the expand button, the detailed brief opens over the outside layer.
// This keeps the transition effect perfectly and looks dramatically dynamic.
// ==========================================================================
function initCinematicOverlays() {
  const stage = document.getElementById('cinematic-sticky-stage');
  const triggerBtns = document.querySelectorAll('.inv-expand-trigger-btn');
  const overlays = document.querySelectorAll('.cinematic-expanded-overlay');

  if (!triggerBtns.length || !overlays.length) return;

  let activeOverlay = null;
  let lastActiveTrigger = null;

  function openOverlay(overlayId, triggerBtn) {
    const overlay = document.getElementById(overlayId);
    if (!overlay) return;

    if (activeOverlay && activeOverlay !== overlay) {
      closeOverlay(activeOverlay);
    }

    activeOverlay = overlay;
    lastActiveTrigger = triggerBtn;

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    if (stage) stage.classList.add('has-overlay-open');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'true');

    // Scroll overlay panel to top
    const panel = overlay.querySelector('.inv-expanded-panel');
    if (panel) {
      panel.scrollTop = 0;
      panel.focus();
    }
  }

  function closeOverlay(overlay) {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');

    if (stage) stage.classList.remove('has-overlay-open');
    if (lastActiveTrigger) {
      lastActiveTrigger.setAttribute('aria-expanded', 'false');
      lastActiveTrigger.focus();
    }
    activeOverlay = null;
  }

  // Bind trigger buttons
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target') || btn.getAttribute('aria-controls');
      if (targetId) {
        const overlay = document.getElementById(targetId);
        if (overlay && overlay.classList.contains('is-open')) {
          closeOverlay(overlay);
        } else {
          openOverlay(targetId, btn);
        }
      }
    });
  });

  // Bind all close buttons inside overlays (top bar and footer)
  const closeBtns = document.querySelectorAll('.inv-close-btn');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetId = btn.getAttribute('data-close');
      const targetOverlay = targetId ? document.getElementById(targetId) : btn.closest('.cinematic-expanded-overlay');
      closeOverlay(targetOverlay);
    });
  });

  // Backdrop click closes overlay
  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOverlay(overlay);
      }
    });
  });

  // Escape key closes overlay
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeOverlay) {
      closeOverlay(activeOverlay);
    }
  });
}
