/* ==========================================================
   Reegle Giraffe Sales Presentation - Renderer
   Used by both index.html (audience) and present.html (presenter)
   ========================================================== */

// SLIDES_DATA, SCRIPTS_DATA, IMAGES will be defined by the host HTML before this script loads.

// ----- Type metadata -----
const TYPE_META = {
  municipal: { label: '自治体向け', color: '#1E5530' },
  kindergarten: { label: '幼稚園向け', color: '#2A6E3A' },
  studio: { label: '写真スタジオ向け', color: '#1E5530' },
};

const SECTION_LABELS = {
  cover: '表紙',
  intro: '会社紹介',
  icebreak: 'アイスブレイク',
  overview: 'サービス概要',
  position: '関心・ポジショニング',
  usp: '3つのメリット',
  basic: '基本サービス',
  achievement: '実績紹介',
  hearing: 'ヒアリング',
  qa: '想定Q&A',
  closing: 'クロージング',
  next: '次回日程',
  rebuttal: '切り返し',
};

// ----- Resolve image references -----
function resolveImage(ref) {
  if (!ref || !ref.startsWith('img:')) return null;
  const key = ref.slice(4);
  return (typeof IMAGES !== 'undefined' && IMAGES[key]) || null;
}

// ----- Render a single slide into the given container -----
function renderSlide(container, slide, opts = {}) {
  if (!slide) {
    container.innerHTML = '<div class="slide-empty">スライドがありません</div>';
    return;
  }
  const kind = slide.kind;
  container.innerHTML = '';
  container.className = 'slide slide-' + kind;
  const inner = document.createElement('div');
  inner.className = 'slide-inner';

  // Cover slide
  if (kind === 'cover') {
    inner.innerHTML = `
      <div class="cover-bg"></div>
      <div class="cover-content">
        <div class="cover-eyebrow">${esc(slide.eyebrow)}</div>
        <h1 class="cover-title">${nl2br(esc(slide.title))}</h1>
        <div class="cover-subtitle">${esc(slide.subtitle || '')}</div>
        <div class="cover-company">${esc(slide.company || '')}</div>
      </div>
    `;
  }
  // Intro / position / basic / closing (bullets layout)
  else if (kind === 'intro' || kind === 'position' || kind === 'basic' || kind === 'closing') {
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="bullets">
        ${(slide.bullets || []).map(b => `
          <div class="bullet-card">
            <div class="bullet-h">${esc(b.h)}</div>
            ${b.d ? `<div class="bullet-d">${esc(b.d)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }
  // Overview - product image + bullets
  else if (kind === 'overview') {
    const img = resolveImage(slide.image);
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="overview-grid">
        <div class="overview-img">${img ? `<img src="${img}" alt="">` : ''}</div>
        <div class="overview-text">
          <div class="overview-sub">${esc(slide.subtitle || '')}</div>
          ${(slide.bullets || []).map(b => `
            <div class="bullet-row">
              <div class="bullet-row-h">${esc(b.h)}</div>
              <div class="bullet-row-d">${esc(b.d)}</div>
            </div>
          `).join('')}
          ${slide.footnote ? `<div class="overview-foot">※ ${esc(slide.footnote)}</div>` : ''}
        </div>
      </div>
    `;
  }
  // USP - 3 merits + green bar
  else if (kind === 'usp') {
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="merits">
        ${(slide.merits || []).map(m => `
          <div class="merit-card">
            <div class="merit-num">${esc(m.n)}</div>
            <div class="merit-body">
              <div class="merit-h">${esc(m.h)}</div>
              <div class="merit-d">${esc(m.d)}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="merit-bar">${esc(slide.bar)}</div>
    `;
  }
  // Questions (icebreak / hearing)
  else if (kind === 'questions') {
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="questions">
        ${(slide.questions || []).map((q, i) => `
          <div class="question-item">
            <span class="question-mark">Q${i + 1}</span>
            <span class="question-text">${esc(q)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }
  // Achievement - image + bullets
  else if (kind === 'achievement') {
    const img = resolveImage(slide.image);
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="achievement-grid">
        <div class="achievement-img">${img ? `<img src="${img}" alt="">` : ''}</div>
        <div class="achievement-text">
          ${(slide.bullets || []).map(b => `
            <div class="ach-row">
              <div class="ach-h">${esc(b.h)}</div>
              ${b.d ? `<div class="ach-d">${esc(b.d)}</div>` : ''}
            </div>
          `).join('')}
          ${slide.footnote ? `<div class="ach-foot">※ ${esc(slide.footnote)}</div>` : ''}
        </div>
      </div>
    `;
  }
  // Q&A grid
  else if (kind === 'qa') {
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="qa-grid">
        ${(slide.items || []).map(it => `
          <div class="qa-card">
            <div class="qa-q">Q. ${esc(it.q)}</div>
            <div class="qa-a">A. ${esc(it.a)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  // Simple text
  else if (kind === 'simple') {
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="simple-body">${esc(slide.body)}</div>
    `;
  }
  // Rebuttal cases
  else if (kind === 'rebuttal') {
    inner.innerHTML = `
      ${headerHTML(slide)}
      <div class="rebuttal-grid">
        ${(slide.cases || []).map(c => `
          <div class="rebuttal-card">
            <div class="rebuttal-h">${esc(c.h)}</div>
            <div class="rebuttal-d">${esc(c.d)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Footer (except cover)
  if (kind !== 'cover') {
    const footer = document.createElement('div');
    footer.className = 'slide-footer';
    const typeLabel = opts.typeLabel || '';
    const pageInfo = opts.pageInfo || '';
    footer.innerHTML = `
      <div class="footer-left">Reegle株式会社${typeLabel ? ' ／ ' + esc(typeLabel) : ''}</div>
      <div class="footer-right">${esc(pageInfo)}</div>
    `;
    inner.appendChild(footer);
  }

  container.appendChild(inner);
}

// ----- Helpers -----
function headerHTML(slide) {
  return `
    <div class="slide-header">
      <div class="slide-eyebrow">${esc(slide.eyebrow || '')}</div>
      ${slide._shared ? '<div class="shared-tag">共通</div>' : ''}
    </div>
    <div class="slide-rule"></div>
    <h2 class="slide-title">${nl2br(esc(slide.title || ''))}</h2>
  `;
}
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function nl2br(s) { return s.replace(/\n/g, '<br>'); }
