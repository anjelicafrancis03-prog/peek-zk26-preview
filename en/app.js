import { MEDIA_CONFIG, CONTACT_CONFIG } from './config.js';
import {
  NOT_PEEK_BLOCK,
  AREAS_A_LIST,
  GRID_8_TILES,
  MATERIALS_TABLE,
  PROCESS_STEPS,
  YOUTUBE_EPISODES,
  SELF_HANDLED_6,
  BOUNDARY_12_ITEMS,
  APPS_8_LIST,
  RISK_10_TOPICS,
} from './content-data.js';
import { PRICING_DATA, STORIES_DATA } from './data-catalog.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function caseKeyToSrc(key) {
  return '../assets/cases/' + key.replace(/^cases\./, '').replace(/\./g, '-') + '.webp';
}

/* ---------- Modal Lightbox ---------- */
const modalBackdrop = $('#modal-backdrop');
const modalTitle = $('#modal-title');
const modalContent = $('#modal-content');

function openModal(title, html) {
  modalTitle.textContent = title;
  modalContent.innerHTML = html;
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBackdrop.hidden = true;
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
}

$('#modal-close').addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalBackdrop.hidden) closeModal();
});

/* ---------- 1. Single Video Swap Point ---------- */
function initFilm() {
  const video = $('#peek-film-video');
  video.poster = MEDIA_CONFIG.PEEK_FILM_POSTER;
  const source = document.createElement('source');
  source.src = MEDIA_CONFIG.PEEK_FILM_SRC;
  source.type = 'video/mp4';
  video.appendChild(source);
}

/* ---------- 2. 3D Skull Viewer + Hotspots + 2D Fallback ---------- */
function initHero3D() {
  const viewer = $('#peek-skull-viewer');
  const img2d = $('#viewer-2d-img');
  const pillsWrap = $('#hero-area-pills');

  // Register Meshopt decoder on the defined ModelViewerElement BEFORE setting src
  customElements.whenDefined('model-viewer').then(() => {
    const MV = customElements.get('model-viewer');
    if (MV) {
      MV.meshoptDecoderLocation = 'https://cdn.jsdelivr.net/npm/meshoptimizer@0.20.0/meshopt_decoder.js';
    }
    viewer.src = MEDIA_CONFIG.MODEL_GLB_SRC;
  });

  // Inject 7 clickable Cömert-style hotspots on the 3D skull
  AREAS_A_LIST.forEach((area) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot-dot';
    btn.setAttribute('slot', `hotspot-${area.id}`);
    btn.setAttribute('data-position', area.hotspot.position);
    btn.setAttribute('data-normal', area.hotspot.normal);
    btn.setAttribute('aria-label', `Inspect ${area.name}`);
    btn.innerHTML = `<span class="hotspot-label">${esc(area.name)}</span>`;
    btn.addEventListener('click', () => {
      selectAreaOnMap(area.id, true);
    });
    viewer.appendChild(btn);

    // Quick-access area chip below viewer
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'area-chip-dark';
    chip.textContent = area.name;
    chip.dataset.areaId = area.id;
    chip.addEventListener('click', () => {
      selectAreaOnMap(area.id, true);
    });
    pillsWrap.appendChild(chip);
  });

  // View mode switcher: 3D vs Oblique/Front/Side 2D
  $$('[data-view-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.viewMode;
      $$('[data-view-mode]').forEach((b) => b.classList.toggle('is-active', b === btn));
      if (mode === '3d') {
        viewer.hidden = false;
        img2d.hidden = true;
      } else {
        viewer.hidden = true;
        img2d.hidden = false;
        img2d.src = MEDIA_CONFIG.VIEWS[mode] || MEDIA_CONFIG.VIEWS.oblique;
        img2d.alt = `Demonstrator skull ${mode} 2D view`;
      }
    });
  });
}

/* ---------- 3. 8-Grid Simulation Showcase ---------- */
function renderSimTile(tile) {
  const card = document.createElement('article');
  card.className = 'sim-tile';
  card.dataset.tileId = tile.id;

  const mediaInner = tile.isPlaceholder
    ? `
      <div class="sim-placeholder-layer">
        <div class="sim-placeholder-icon">3D</div>
        <div class="sim-placeholder-text" data-ph-text>${esc(tile.placeholderBefore)}</div>
      </div>
    `
    : `
      <img class="sim-img-layer sim-img-before" src="${esc(tile.beforeImg)}" alt="${esc(tile.beforeCaption)}" loading="lazy" />
      <img class="sim-img-layer sim-img-after" src="${esc(tile.afterImg)}" alt="${esc(tile.afterCaption)}" loading="lazy" />
    `;

  card.innerHTML = `
    <div style="position:relative;">
      <button type="button" class="sim-media-btn" aria-pressed="false" aria-label="Toggle ${esc(tile.areaName)} before and simulated after">
        ${mediaInner}
        <span class="sim-state-badge" data-state-badge>Before</span>
        <span class="sim-tap-hint">Tap to compare simulated after</span>
      </button>
      <button type="button" class="sim-expand-btn" aria-label="Enlarge ${esc(tile.areaName)} simulation" title="Enlarge">⤢</button>
    </div>
    <div class="sim-body">
      <div class="sim-area-name">${esc(tile.areaName)}</div>
      <div class="sim-area-sub">${esc(tile.subtitle)}</div>
      <button type="button" class="sim-case-btn" data-open-gallery="${esc(tile.areaId)}">See cases</button>
    </div>
  `;

  const mediaBtn = $('.sim-media-btn', card);
  const badge = $('[data-state-badge]', card);
  const phText = $('[data-ph-text]', card);

  const setAfter = (isAfter) => {
    card.classList.toggle('is-after', isAfter);
    mediaBtn.setAttribute('aria-pressed', String(isAfter));
    badge.textContent = isAfter ? 'Simulated after' : 'Before';
    if (phText) {
      phText.textContent = isAfter ? tile.placeholderAfter : tile.placeholderBefore;
    }
  };

  mediaBtn.addEventListener('click', () => {
    setAfter(!card.classList.contains('is-after'));
  });

  // Hover preview on pointer devices
  mediaBtn.addEventListener('mouseenter', () => {
    if (window.matchMedia('(hover: hover)').matches) setAfter(true);
  });
  mediaBtn.addEventListener('mouseleave', () => {
    if (window.matchMedia('(hover: hover)').matches) setAfter(false);
  });

  // Lightbox inspect
  $('.sim-expand-btn', card).addEventListener('click', () => {
    if (tile.isPlaceholder) {
      openModal(
        `${tile.areaName} — Female simulation (pending shoot)`,
        `<p style="color:#b0b5c0;margin:0 0 12px;">${esc(tile.placeholderAfter)}</p>
         <p style="font-size:13px;color:#b0b5c0;">Illustrative 3D simulation placeholder. Not a medical promise. Final implant geometry follows the in-person assessment and factory CAD modelling.</p>`
      );
    } else {
      openModal(
        `${tile.areaName} — Before vs. Simulated after`,
        `<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));margin-bottom:12px;">
           <div>
             <div style="font-size:12px;color:#d0b076;margin-bottom:6px;">Before (Reference demonstrator)</div>
             <img class="modal-img" src="${esc(tile.beforeImg)}" alt="${esc(tile.beforeCaption)}" style="margin:0;" />
           </div>
           <div>
             <div style="font-size:12px;color:#d0b076;margin-bottom:6px;">Simulated after (Illustrative only)</div>
             <img class="modal-img" src="${esc(tile.afterImg)}" alt="${esc(tile.afterCaption)}" style="margin:0;" />
           </div>
         </div>
         <p style="font-size:12.5px;color:#b0b5c0;margin:0;">Demonstrator model, not patient data. Simulation for illustration only — not a medical promise.</p>`
      );
    }
  });

  // Deep link to embedded PEEK gallery
  $('[data-open-gallery]', card).addEventListener('click', () => {
    openPeekGalleryArea(tile.areaId);
  });

  return card;
}

function initGrid8() {
  const maleWrap = $('#grid-male');
  const femaleWrap = $('#grid-female');
  GRID_8_TILES.forEach((tile) => {
    const el = renderSimTile(tile);
    if (tile.group === 'male') maleWrap.appendChild(el);
    else femaleWrap.appendChild(el);
  });
}

/* ---------- 4. Embedded PEEK Real-Cases Gallery ---------- */
function initPeekGallery() {
  const toggleBtn = $('#peek-gallery-toggle');
  const panel = $('#peek-gallery-panel');
  const list = $('#peek-gallery-areas');

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });

  AREAS_A_LIST.forEach((area) => {
    const item = document.createElement('div');
    item.className = 'gallery-sub-item';
    item.id = `gallery-area-${area.id}`;
    item.innerHTML = `
      <button type="button" class="gallery-sub-btn" aria-expanded="false" aria-controls="gallery-panel-${area.id}">
        <span>${esc(area.name)}</span>
        <span style="display:flex;align-items:center;gap:8px;">
          <span class="badge-pending">PEEK cases: 0</span>
          <span class="acc-chevron" aria-hidden="true">▾</span>
        </span>
      </button>
      <div id="gallery-panel-${area.id}" class="gallery-sub-panel" hidden>
        <div class="empty-case-frame">
          <strong style="color:#f5f3ee;margin-bottom:4px;">${esc(area.name)} — PEEK patient photography pending authorization</strong>
          <span>Current PEEK case count: 0. Authorized clinical photography will be published here once partner institution &amp; separate patient consent records are archived.</span>
        </div>
      </div>
    `;
    const subBtn = $('.gallery-sub-btn', item);
    const subPanel = $('.gallery-sub-panel', item);
    subBtn.addEventListener('click', () => {
      const open = subBtn.getAttribute('aria-expanded') === 'true';
      subBtn.setAttribute('aria-expanded', String(!open));
      subPanel.hidden = open;
    });
    list.appendChild(item);
  });
}

function openPeekGalleryArea(areaId) {
  const toggleBtn = $('#peek-gallery-toggle');
  const panel = $('#peek-gallery-panel');
  toggleBtn.setAttribute('aria-expanded', 'true');
  panel.hidden = false;

  $$('.gallery-sub-item').forEach((el) => el.classList.remove('is-highlighted'));
  const target = $(`#gallery-area-${areaId}`);
  if (target) {
    const btn = $('.gallery-sub-btn', target);
    const subPanel = $('.gallery-sub-panel', target);
    btn.setAttribute('aria-expanded', 'true');
    subPanel.hidden = false;
    target.classList.add('is-highlighted');
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* ---------- 5. 7-Area Interactive Map + B-03(b) Cautions ---------- */
function selectAreaOnMap(areaId, shouldScroll = false) {
  const area = AREAS_A_LIST.find((a) => a.id === areaId) || AREAS_A_LIST[0];
  $$('#area-map-pills .area-pill-light').forEach((btn) => {
    const active = btn.dataset.areaId === area.id;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  $$('#hero-area-pills .area-chip-dark').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.areaId === area.id);
  });

  const detail = $('#area-map-detail');
  const cautionContent = area.caution
    ? `<p style="margin:0;font-size:14px;color:var(--light-text);">${esc(area.caution)}</p>
       <div style="margin-top:8px;"><span class="badge-pending">${esc(area.cautionTag)}</span></div>`
    : `<p class="muted" style="margin:0;font-size:14px;">${esc(area.cautionTag)} — area-specific clinical cautions will be added once provided and reviewed by our partner surgical team.</p>`;

  detail.innerHTML = `
    <div style="display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:10px;">
      <div>
        <h3 style="font-family:var(--font-serif);font-size:28px;">${esc(area.name)}</h3>
        <div class="muted" style="font-size:13px;margin-top:2px;">${esc(area.categoryNote)}</div>
      </div>
      <button type="button" class="btn btn-outline-light" id="map-to-gallery-btn">See cases in PEEK gallery</button>
    </div>
    <p style="margin:0;font-size:14.5px;color:var(--light-text);">${esc(area.focus)}</p>
    <div class="caution-box">
      <div class="caution-box-title">Key area cautions &amp; considerations (B-03 draft)</div>
      ${cautionContent}
    </div>
  `;

  $('#map-to-gallery-btn', detail).addEventListener('click', () => {
    openPeekGalleryArea(area.id);
  });

  if (shouldScroll) {
    $('#area-map').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initAreaMap() {
  const pills = $('#area-map-pills');
  AREAS_A_LIST.forEach((area) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.role = 'tab';
    btn.className = 'area-pill-light';
    btn.dataset.areaId = area.id;
    btn.textContent = area.name;
    btn.addEventListener('click', () => selectAreaOnMap(area.id, false));
    pills.appendChild(btn);
  });
  selectAreaOnMap(AREAS_A_LIST[0].id, false);
}

/* ---------- 6. 5-Material Table & 6-Step Process & Shared "Not PEEK" Block ---------- */
function initMaterialsAndProcess() {
  const tbody = $('#materials-tbody');
  MATERIALS_TABLE.forEach((m) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Material"><strong>${esc(m.name)}</strong></td>
      <td data-label="Customisation & fit">${esc(m.customFit)}</td>
      <td data-label="Imaging (CT / MRI)">${esc(m.imaging)}</td>
      <td data-label="Mechanical & structural profile">${esc(m.stability)}</td>
      <td data-label="Key limitations"><span class="badge-pending">${esc(m.limitation)}</span></td>
    `;
    tbody.appendChild(tr);
  });

  const pGrid = $('#process-grid');
  PROCESS_STEPS.forEach((step) => {
    const card = document.createElement('article');
    card.className = 'process-card';
    card.innerHTML = `
      <div class="process-num">${esc(step.num)}</div>
      <h3>${esc(step.title)}</h3>
      <p>${esc(step.desc)}</p>
    `;
    pGrid.appendChild(card);
  });

  // Render single-source "When PEEK is not the answer" in both Section 1 FAQ and Section 3
  const renderNotPeekHtml = () => `
    <p class="eyebrow">Candid suitability check</p>
    <h3 style="margin-bottom:10px;">${esc(NOT_PEEK_BLOCK.heading)}</h3>
    <ul style="margin:0;padding-left:20px;display:grid;gap:8px;font-size:14px;">
      ${NOT_PEEK_BLOCK.items
        .map((it) => `<li><strong>${esc(it.issue)}:</strong> <span class="muted">${esc(it.direction)}</span></li>`)
        .join('')}
    </ul>
    <p style="margin:12px 0 0;font-size:14px;font-weight:600;">
      ${esc(NOT_PEEK_BLOCK.closing)}
      <span class="badge-pending" style="font-weight:500;margin-left:6px;">${esc(NOT_PEEK_BLOCK.statusNote)}</span>
    </p>
  `;
  $('#not-peek-faq-mount').innerHTML = renderNotPeekHtml();
  $('#not-peek-section3-mount').innerHTML = renderNotPeekHtml();
}

/* ---------- 7. Section 2: Why Shanghai (3 Default-Expanded Episodes) ---------- */
function initEpisodes() {
  const wrap = $('#youtube-episodes');
  YOUTUBE_EPISODES.forEach((ep) => {
    const card = document.createElement('article');
    card.className = 'episode-card';

    const featuredHtml = ep.featuredLines.length
      ? `<div style="display:grid;gap:6px;padding:10px 12px;background:#faf7f0;border-left:3px solid var(--bronze);border-radius:0 8px 8px 0;font-size:13.5px;">
           ${ep.featuredLines.map((l) => `<div>${esc(l)}</div>`).join('')}
         </div>`
      : '';

    const scheduleHtml = ep.scheduleBar
      ? `<div class="schedule-bar" aria-label="Recovery-first schedule">
           ${ep.scheduleBar.map((s) => `<span>${esc(s)}</span>`).join('<span class="schedule-arrow">→</span>')}
         </div>`
      : '';

    card.innerHTML = `
      <div class="episode-cover">
        <div class="episode-cover-meta">
          <span class="ep-badge">${esc(ep.ep)} · ${esc(ep.theme)}</span>
          <span style="opacity:.8;">${esc(ep.duration)} · Allevia</span>
        </div>
        <div style="margin:18px 0;">
          <div style="font-family:var(--font-serif);font-size:22px;line-height:1.25;">${esc(ep.title)}</div>
        </div>
        <div style="font-size:12px;color:#b0b5c0;border-top:1px solid rgba(255,255,255,0.14);padding-top:10px;">
          ${esc(ep.coverLabel)}<br />
          <span style="color:var(--gold);">${esc(ep.coverTag)}</span>
        </div>
      </div>
      <div class="episode-body">
        <p class="episode-quote">${esc(ep.openingQuote)}</p>
        ${featuredHtml}
        ${scheduleHtml}
        <ul class="episode-bullets">
          ${ep.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}
        </ul>
        <p class="muted" style="margin:0;font-size:13px;">${esc(ep.supportNote)}</p>
        <div class="episode-actions">
          <span class="media-stub">▶ ${esc(ep.highlightPlaceholder)}</span>
          <span class="media-stub">Full episode: ${esc(ep.fullVideoStatus)}</span>
        </div>
      </div>
    `;
    wrap.appendChild(card);
  });
}

/* ---------- 8. Section 3 Structured Lists ---------- */
function initSection3Data() {
  const selfList = $('#self-handled-list');
  SELF_HANDLED_6.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    selfList.appendChild(li);
  });

  const bTbody = $('#boundary-tbody');
  BOUNDARY_12_ITEMS.forEach((row) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Item"><strong>${esc(row.item)}</strong></td>
      <td data-label="Included">${esc(row.included)}</td>
      <td data-label="Not included">${esc(row.notIncluded)}</td>
      <td data-label="Paid extra">${esc(row.paidExtra)}</td>
      <td data-label="Assist only">${esc(row.assistOnly)}</td>
    `;
    bTbody.appendChild(tr);
  });

  const appsGrid = $('#apps-8-grid');
  APPS_8_LIST.forEach((app) => {
    const box = document.createElement('div');
    box.style.cssText = 'padding:12px;border:1px solid var(--light-border);border-radius:var(--radius-sm);font-size:13.5px;';
    box.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:baseline;">
        <strong>${esc(app.name)}</strong>
        <span style="font-size:11.5px;color:var(--bronze);font-weight:600;">${esc(app.timing)}</span>
      </div>
      <p class="muted" style="margin:5px 0 0;font-size:13px;">${esc(app.note)}</p>
    `;
    appsGrid.appendChild(box);
  });

  const riskList = $('#risk-10-list');
  RISK_10_TOPICS.forEach((topic) => {
    const li = document.createElement('li');
    li.textContent = topic;
    riskList.appendChild(li);
  });
}

/* ---------- 9. Section 4: Other Procedures (8 Stories / 42 Untouched Photos) ---------- */
function initStories() {
  const filterWrap = $('#story-filters');
  const grid = $('#stories-grid');
  let activeCat = 'all';

  function renderStories() {
    grid.innerHTML = '';
    const filtered =
      activeCat === 'all'
        ? STORIES_DATA.stories
        : STORIES_DATA.stories.filter((s) => s.category === activeCat);

    filtered.forEach((st) => {
      const card = document.createElement('article');
      card.className = 'story-card';

      const mainPhotos = ['before', 'immediate', 'after']
        .filter((k) => st.photos[k])
        .map((k) => ({
          label: STORIES_DATA.stageLabels[k] || k,
          src: caseKeyToSrc(st.photos[k]),
        }));

      const suppPhotos = (st.photos.supplementary || []).map((k, idx) => ({
        label: `Clinical view ${idx + 1}`,
        src: caseKeyToSrc(k),
      }));

      card.innerHTML = `
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px;">
          <span class="eyebrow" style="margin:0;">${esc(st.categoryLabel)}</span>
          ${st.trackingBadge ? `<span class="badge-pending">${esc(st.trackingBadge)}</span>` : ''}
        </div>
        <h3 style="font-family:var(--font-serif);font-size:24px;">${esc(st.title)}</h3>
        <div class="story-photos-main">
          ${mainPhotos
            .map(
              (p) => `
            <button type="button" class="story-photo-btn" data-lightbox-src="${esc(p.src)}" data-lightbox-title="${esc(st.title)} — ${esc(p.label)}">
              <img src="${esc(p.src)}" alt="${esc(st.categoryLabel)} ${esc(p.label)}" loading="lazy" />
              <span class="story-photo-label">${esc(p.label)}</span>
            </button>
          `
            )
            .join('')}
        </div>
        ${
          suppPhotos.length
            ? `<div>
                 <div class="muted" style="font-size:12px;font-weight:600;margin-bottom:4px;">${esc(STORIES_DATA.supplementaryLabel)} (${suppPhotos.length})</div>
                 <div class="story-supp-row">
                   ${suppPhotos
                     .map(
                       (p) => `
                     <button type="button" class="story-supp-btn" data-lightbox-src="${esc(p.src)}" data-lightbox-title="${esc(st.title)} — ${esc(p.label)}">
                       <img src="${esc(p.src)}" alt="${esc(st.categoryLabel)} ${esc(p.label)}" loading="lazy" />
                     </button>
                   `
                     )
                     .join('')}
                 </div>
               </div>`
            : ''
        }
        <details>
          <summary style="cursor:pointer;font-weight:600;font-size:14px;color:var(--bronze);">Read full journey notes (before · experience · recovery)</summary>
          <div style="margin-top:10px;display:grid;gap:10px;font-size:13.5px;color:var(--light-muted);">
            <div><strong style="color:var(--light-text);">${esc(st.story.concernsTitle)}:</strong> ${esc(st.story.concerns)}</div>
            <div><strong style="color:var(--light-text);">${esc(st.story.experienceTitle)}:</strong> ${esc(st.story.experience)}</div>
            <div><strong style="color:var(--light-text);">${esc(st.story.recoveryTitle)}:</strong> ${esc(st.story.recovery)}</div>
          </div>
        </details>
        <p class="muted" style="margin:0;font-size:12px;">${esc(st.note)}</p>
      `;

      $$('[data-lightbox-src]', card).forEach((btn) => {
        btn.addEventListener('click', () => {
          openModal(
            btn.dataset.lightboxTitle,
            `<img class="modal-img" src="${esc(btn.dataset.lightboxSrc)}" alt="${esc(btn.dataset.lightboxTitle)}" />
             <p style="font-size:12px;color:#b0b5c0;margin:0;">${esc(STORIES_DATA.lightboxFooterNote)}</p>`
          );
        });
      });

      grid.appendChild(card);
    });
  }

  STORIES_DATA.categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.role = 'tab';
    btn.className = 'filter-tab' + (cat.id === 'all' ? ' is-active' : '');
    btn.textContent = cat.label;
    btn.addEventListener('click', () => {
      activeCat = cat.id;
      $$('.filter-tab', filterWrap).forEach((b) => b.classList.toggle('is-active', b === btn));
      renderStories();
    });
    filterWrap.appendChild(btn);
  });

  renderStories();
}

/* ---------- 10. Section 5: 54-Item Standard Treatment Price Directory ---------- */
function initPricing() {
  const filterWrap = $('#pricing-filters');
  const tbody = $('#pricing-tbody');
  const searchInput = $('#pricing-search');
  let activeCat = 'all';
  let query = '';

  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = 'filter-tab is-active';
  allBtn.textContent = `All (${PRICING_DATA.categories.reduce((acc, c) => acc + c.items.length, 0)})`;
  allBtn.addEventListener('click', () => {
    activeCat = 'all';
    $$('.filter-tab', filterWrap).forEach((b) => b.classList.toggle('is-active', b === allBtn));
    renderRows();
  });
  filterWrap.appendChild(allBtn);

  PRICING_DATA.categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-tab';
    btn.textContent = `${cat.name} (${cat.items.length})`;
    btn.addEventListener('click', () => {
      activeCat = cat.id;
      $$('.filter-tab', filterWrap).forEach((b) => b.classList.toggle('is-active', b === btn));
      renderRows();
    });
    filterWrap.appendChild(btn);
  });

  function renderRows() {
    tbody.innerHTML = '';
    const q = query.trim().toLowerCase();
    let count = 0;
    PRICING_DATA.categories.forEach((cat) => {
      if (activeCat !== 'all' && cat.id !== activeCat) return;
      cat.items.forEach((item) => {
        if (q && !item.name.toLowerCase().includes(q) && !cat.name.toLowerCase().includes(q)) return;
        count++;
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td data-label="Category">${esc(cat.name)}</td>
          <td data-label="Procedure">${esc(item.name)}</td>
          <td data-label="Reference Fee (CNY)" class="price-num">${esc(item.formattedPrice)}</td>
          <td data-label="Stay / Hospital"><span class="badge-pending">[Pending clinic]</span></td>
        `;
        tbody.appendChild(tr);
      });
    });
    if (count === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="4" class="muted">No matching procedures found.</td>`;
      tbody.appendChild(tr);
    }
  }

  searchInput.addEventListener('input', (e) => {
    query = e.target.value;
    renderRows();
  });

  renderRows();
}

/* ---------- 11. Unified Section Accordions & Deep-Link Triggers ---------- */
function setSectionAccordion(bodyId, expand) {
  const body = document.getElementById(bodyId);
  const btn = document.querySelector(`[data-acc-target="${bodyId}"]`);
  if (!body || !btn) return;
  body.hidden = !expand;
  btn.setAttribute('aria-expanded', String(expand));
  const label = $('.toggle-label', btn);
  if (label) {
    if (expand) label.textContent = 'Collapse';
    else if (bodyId === 'other-body') label.textContent = 'View 8 stories';
    else if (bodyId === 'prices-body') label.textContent = 'View full pricing & 54 items';
    else label.textContent = 'Expand details';
  }
}

function initAccordions() {
  $$('[data-acc-target]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.accTarget;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      setSectionAccordion(targetId, !isExpanded);
    });
  });

  // Preview 3-question line -> expands Section 3 and scrolls to Risks & Recovery
  $('#preview-three-questions').addEventListener('click', () => {
    setSectionAccordion('before-body', true);
    $('#risks-recovery').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Section 1 anchor link -> expands Section 3 and scrolls to Risks & Recovery
  $('#jump-pain-recovery').addEventListener('click', (e) => {
    e.preventDefault();
    setSectionAccordion('before-body', true);
    $('#risks-recovery').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Simulation 299 button -> preselects simulation topic in contact form
  $('#sim-299-cta').addEventListener('click', () => {
    const topicSelect = $('#f-topic');
    if (topicSelect) topicSelect.value = 'PEEK simulation design enquiry';
  });

  // Auto-expand when navigating via TOC or URL hash
  const hashMap = {
    '#before-you-decide': 'before-body',
    '#risks-recovery': 'before-body',
    '#other-procedures': 'other-body',
    '#prices': 'prices-body',
  };

  function handleHash() {
    const bodyId = hashMap[window.location.hash];
    if (bodyId) setSectionAccordion(bodyId, true);
  }
  window.addEventListener('hashchange', handleHash);
  handleHash();
}

/* ---------- 12. Sticky TOC Active State & Dark/Light Header Transition ---------- */
function initScrollChrome() {
  const header = $('#site-header');
  const toc = $('#toc-bar');
  const zoneLight = $('#zone-light');
  const tocLinks = $$('.toc-link');
  const sections = ['peek', 'why-shanghai', 'before-you-decide', 'other-procedures', 'prices']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    const lightTop = zoneLight.getBoundingClientRect().top;
    const isLight = lightTop <= 112;
    header.classList.toggle('is-light', isLight);
    toc.classList.toggle('is-light', isLight);

    let currentId = 'peek';
    for (const sec of sections) {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 160) currentId = sec.id;
    }
    tocLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.section === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- 13. Free Consultation Form & Footer Partner Modal ---------- */
function initContactAndPartner() {
  const form = $('#enquiry-form');
  const feedback = $('#form-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#f-name').value.trim();
    const contact = $('#f-contact').value.trim();
    const country = $('#f-country').value.trim();
    const lang = $('#f-lang').value;
    const topic = $('#f-topic').value;
    const month = $('#f-month').value.trim();
    const notes = $('#f-notes').value.trim();
    const agreed = $('#f-privacy').checked;

    if (!name || !contact || !country || !agreed) {
      feedback.hidden = false;
      feedback.style.background = '#fdf2f2';
      feedback.style.borderColor = '#e6b8b8';
      feedback.textContent = 'Please complete all required fields (*) and confirm the Privacy Notice.';
      return;
    }

    const lines = [
      CONTACT_CONFIG.whatsappPrefill,
      `Name: ${name}`,
      `Contact: ${contact}`,
      `Country/Region: ${country}`,
      `Language: ${lang}`,
      `Topic: ${topic}`,
      month ? `Preferred travel month: ${month}` : '',
      notes ? `Notes: ${notes}` : '',
    ].filter(Boolean);

    const encoded = encodeURIComponent(lines.join('\n'));
    const waBase = CONTACT_CONFIG.whatsappNumber
      ? `https://wa.me/${CONTACT_CONFIG.whatsappNumber}`
      : 'https://wa.me/';
    const waUrl = `${waBase}?text=${encoded}`;
    const mailUrl = `mailto:${CONTACT_CONFIG.email}?subject=${encodeURIComponent('Consultation enquiry — ' + topic)}&body=${encoded}`;

    feedback.hidden = false;
    feedback.style.background = '#eef6f0';
    feedback.style.borderColor = '#b8d8c0';
    feedback.innerHTML = `
      <strong>Your message is ready to send.</strong> Nothing is stored on this website.<br />
      <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:8px;">
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-light" style="min-height:38px;padding:6px 14px;font-size:13px;">Open WhatsApp</a>
        <a href="${mailUrl}" class="btn btn-outline-light" style="min-height:38px;padding:6px 14px;font-size:13px;">Send by email instead</a>
      </div>
    `;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });

  // Footer "Working with institutions" modal (kept strictly out of the 5 consumer sections)
  $('#open-partner-modal').addEventListener('click', () => {
    openModal(
      'Working with institutions',
      `<div style="display:grid;gap:12px;font-size:14px;color:#d6d9e0;">
         <p style="margin:0;"><strong>What we bring:</strong> International client coordination, bilingual support, and PEEK simulation design capability.</p>
         <p style="margin:0;"><strong>Who we are looking for:</strong> Accredited medical institutions and implant manufacturers interested in a long-term working relationship.</p>
         <p style="margin:0;"><strong>First step:</strong> Send us a short introduction of your institution, and we will arrange an initial conversation.</p>
         <div style="margin-top:6px;">
           <a href="mailto:${CONTACT_CONFIG.email}?subject=Partnership%20enquiry" class="btn btn-gold">Send partnership enquiry (${CONTACT_CONFIG.email})</a>
         </div>
       </div>`
    );
  });
}

/* ---------- Boot ---------- */
initFilm();
initHero3D();
initGrid8();
initPeekGallery();
initAreaMap();
initMaterialsAndProcess();
initEpisodes();
initSection3Data();
initStories();
initPricing();
initAccordions();
initScrollChrome();
initContactAndPartner();
