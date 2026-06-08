/* Reegle Giraffe v4 Renderer — Lacquer & Vermillion */

const TYPE_META = {
  municipal: { label: '自治体向け', color: '#1A4A2A', coverEyebrow: 'FOR LOCAL GOVERNMENT', coverChapter: 'A Proposal for Municipal Resilience' },
  kindergarten: { label: '幼稚園向け', color: '#2A6E3A', coverEyebrow: 'FOR KINDERGARTEN', coverChapter: 'A Proposal for Daily & Disaster Resilience' },
  studio: { label: '写真スタジオ向け', color: '#1A4A2A', coverEyebrow: 'FOR PHOTO STUDIO', coverChapter: 'A Proposal for Crafted Studio Spaces' },
};

const SECTION_LABELS = {
  cover: '表紙', intro: '会社紹介', icebreak: 'アイスブレイク',
  overview: 'サービス概要', position: '関心・ポジショニング', usp: '3つのメリット',
  basic: '基本サービス', achievement: '実績紹介', hearing: 'ヒアリング',
  qa: '想定Q&A', closing: 'クロージング', next: '次回日程', rebuttal: '切り返し',
};

// Roman numeral chapter marks per section (for editorial flair)
const SECTION_CHAPTER = {
  intro: 'I', icebreak: 'II', overview: 'III', position: 'IV',
  usp: 'V', basic: 'VI', achievement: 'VII', hearing: 'VIII',
  qa: 'IX', closing: 'X', next: 'XI', rebuttal: 'XII',
};

const SECTION_IMG = { intro: 'parts', icebreak: 'parts', hearing: 'detail_kids' };

function resolveImage(ref) {
  if (!ref || !ref.startsWith('img:')) return null;
  const key = ref.slice(4);
  return (typeof IMAGES !== 'undefined' && IMAGES[key]) || null;
}
function imgFor(section) {
  if (!SECTION_IMG[section]) return null;
  return resolveImage('img:' + SECTION_IMG[section]);
}

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

  const chapter = SECTION_CHAPTER[slide._section] || '';

  if (kind === 'cover') {
    const heroImg = resolveImage('img:hero_unit') || resolveImage('img:unit_pair');
    const typeEyebrow = (opts.coverEyebrow) || (slide.eyebrow || '').toUpperCase();
    const chapterText = opts.coverChapter || 'A Proposal in Wood';
    inner.innerHTML = `
      <div class="cover-bg" style="background-image:url('${heroImg || ''}')"></div>
      <div class="cover-content">
        <div class="cover-top">${esc(typeEyebrow)} ／ REEGLE PROPOSAL</div>
        <div class="cover-title-block">
          <div class="cover-chapter">${esc(chapterText)}</div>
          <h1 class="cover-title">${nl2br(esc(slide.title))}</h1>
          <div class="cover-subtitle">${esc(slide.subtitle || '')}</div>
        </div>
        <div class="cover-bottom">
          <div>
            <div class="cover-brand">REEGLE</div>
            <div class="cover-brand-sub">${esc(slide.company || 'Reegle Co., Ltd.')}</div>
          </div>
          <div class="cover-meta">木製ユニット「ジラフユニット」のご提案</div>
        </div>
      </div>
    `;
  }
  else if (kind === 'intro') {
    const img = imgFor('intro');
    const bullets = slide.bullets || [];
    const pullquote = '木材を、暮らしの空間に、もういちど。';
    inner.innerHTML = `
      <div class="intro-shell">
        <div class="intro-img">
          ${img ? `<img src="${img}" alt="">` : ''}
          <div class="intro-chapter-vert">${esc(chapter)} ／ ${esc(slide.eyebrow || '')}</div>
          <div class="intro-bignum-display">${esc(chapter)}</div>
        </div>
        <div class="intro-content">
          ${slide._shared ? '<div class="intro-shared-tag">共通</div>' : ''}
          <div class="intro-eyebrow">${esc(slide.eyebrow || '')}</div>
          <h2 class="slide-title">${nl2br(esc(slide.title || ''))}</h2>
          <div class="intro-pullquote">"${esc(pullquote)}"</div>
          <div class="intro-details">
            ${bullets.map(b => `
              <div class="intro-detail">
                <div class="intro-detail-label">${esc(b.h)}</div>
                <div class="intro-detail-body">${esc(b.d)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  else if (kind === 'questions') {
    const img = imgFor(slide._section) || resolveImage('img:parts');
    const bigNum = chapter;
    inner.innerHTML = `
      <div class="questions-shell">
        <div class="questions-img">
          ${img ? `<img src="${img}" alt="">` : ''}
          <div class="questions-img-eyebrow">${esc(chapter)} ／ ${esc(slide.eyebrow || '')}</div>
          <div class="questions-img-bignum">${bigNum}</div>
        </div>
        <div class="questions-content">
          ${slide._shared ? '<div class="questions-shared-tag">共通</div>' : ''}
          <h2 class="slide-title">${nl2br(esc(slide.title || ''))}</h2>
          <div class="questions-editorial">
            ${(slide.questions || []).map((q, i) => `
              <div class="question-item">
                <span class="question-mark">${String(i + 1).padStart(2, '0')}.</span>
                <span class="question-text">${esc(q)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
  else if (kind === 'overview') {
    const img = resolveImage(slide.image);
    inner.innerHTML = `
      <div class="chapter-mark">${esc(chapter)}</div>
      ${headerHTML(slide)}
      <div class="overview-grid">
        <div class="overview-img">${img ? `<img src="${img}" alt="">` : ''}</div>
        <div class="overview-text">
          <div class="overview-sub">${esc(slide.subtitle || '')}</div>
          ${(slide.bullets || []).map(b => `
            <div class="spec-row">
              <div class="spec-h">${esc(b.h)}</div>
              <div class="spec-d">${esc(b.d)}</div>
            </div>
          `).join('')}
          ${slide.footnote ? `<div class="overview-foot">— ${esc(slide.footnote)}</div>` : ''}
        </div>
      </div>
    `;
  }
  else if (kind === 'position') {
    const img = resolveImage('img:hero_usage') || resolveImage('img:usage_scene');
    inner.innerHTML = `
      <div class="position-shell">
        <div class="position-content">
          ${slide._shared ? '<div class="position-shared-tag">共通</div>' : ''}
          <div class="position-eyebrow">${esc(slide.eyebrow || '')}</div>
          <h2 class="slide-title">${nl2br(esc(slide.title || ''))}</h2>
          <div class="position-grid">
            ${(slide.bullets || []).map((b, i) => `
              <div class="position-card">
                <div class="position-num">${String(i + 1).padStart(2, '0')}</div>
                <div class="position-body">
                  <div class="position-h">${esc(b.h)}</div>
                  ${b.d ? `<div class="position-d">${esc(b.d)}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="position-img">
          ${img ? `<img src="${img}" alt="">` : ''}
          <div class="position-img-mark">${esc(chapter)}</div>
        </div>
      </div>
    `;
  }
  else if (kind === 'usp') {
    inner.innerHTML = `
      <div class="usp-header">
        ${slide._shared ? '<div class="usp-tag">共通</div>' : ''}
        <div class="usp-eyebrow">${esc(slide.eyebrow || '')}</div>
        <h2 class="usp-title">${nl2br(esc(slide.title || ''))}</h2>
      </div>
      <div class="usp-merits">
        ${(slide.merits || []).map(m => `
          <div class="merit-panel">
            <div class="merit-num">${esc(m.n)}</div>
            <div class="merit-h">${esc(m.h)}</div>
            <div class="merit-d">${esc(m.d)}</div>
          </div>
        `).join('')}
      </div>
      <div class="merit-bar">${esc(slide.bar)}</div>
    `;
  }
  else if (kind === 'basic') {
    inner.innerHTML = `
      <div class="chapter-mark">${esc(chapter)}</div>
      ${headerHTML(slide)}
      <div class="basic-grid">
        ${(slide.bullets || []).map((b, i) => `
          <div class="basic-card">
            <div class="basic-marker">${String(i + 1).padStart(2, '0')}</div>
            <div>
              <div class="basic-h">${esc(b.h)}</div>
              <div class="basic-d">${esc(b.d)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  else if (kind === 'achievement') {
    const img = resolveImage(slide.image) || resolveImage('img:hero_usage');
    inner.innerHTML = `
      <div class="achievement-fullbleed">
        ${img ? `<img src="${img}" alt="">` : ''}
        <div class="achievement-overlay">
          <div class="achievement-eyebrow">${esc(chapter)} ／ ${esc(slide.eyebrow || '')}</div>
          <div class="ach-tagline">"Crafted spaces, considered details."</div>
          <h2 class="achievement-title">${nl2br(esc(slide.title || ''))}</h2>
          <div class="ach-list">
            ${(slide.bullets || []).map(b => `
              <div class="ach-row">
                <div>
                  <div class="ach-h">${esc(b.h)}</div>
                  ${b.d ? `<div class="ach-d">${esc(b.d)}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          ${slide.footnote ? `<div class="ach-foot">※ ${esc(slide.footnote)}</div>` : ''}
        </div>
      </div>
    `;
  }
  else if (kind === 'qa') {
    inner.innerHTML = `
      <div class="chapter-mark">${esc(chapter)}</div>
      ${headerHTML(slide)}
      <div class="qa-grid">
        ${(slide.items || []).map(it => `
          <div class="qa-card">
            <div class="qa-q">${esc(it.q)}</div>
            <div class="qa-a">${esc(it.a)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  else if (kind === 'closing') {
    const bullets = slide.bullets || [];
    inner.innerHTML = `
      <div class="closing-statement-panel">
        ${slide._shared ? '<div class="closing-shared-tag">共通</div>' : ''}
        <div class="closing-eyebrow">${esc(chapter)} ／ ${esc(slide.eyebrow || '')}</div>
        <h2 class="closing-title-big">${nl2br(esc(slide.title || ''))}</h2>
        <div class="closing-statement">御社の体制やご要望を伺いながら、施設・用途に合わせた最適プランを具体化させていただきます。</div>
      </div>
      <div class="closing-cards">
        ${bullets.map((b, i) => `
          <div class="closing-card">
            <div class="closing-card-num">${String(i + 1).padStart(2, '0')}</div>
            <div class="closing-card-h">${esc(b.h)}</div>
            <div class="closing-card-d">${esc(b.d)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  else if (kind === 'simple') {
    inner.innerHTML = `
      <div class="chapter-mark">${esc(chapter)}</div>
      ${headerHTML(slide)}
      <div class="simple-body">${esc(slide.body)}</div>
    `;
  }
  else if (kind === 'rebuttal') {
    const tagLabels = ['CASE I', 'CASE II', 'CASE III'];
    inner.innerHTML = `
      <div class="rebuttal-header-panel">
        ${slide._shared ? '<div class="rebuttal-shared-tag">共通</div>' : ''}
        <div class="rebuttal-eyebrow">${esc(chapter)} ／ ${esc(slide.eyebrow || '')}</div>
        <h2 class="rebuttal-title-big">${nl2br(esc(slide.title || ''))}</h2>
      </div>
      <div class="rebuttal-grid">
        ${(slide.cases || []).map((c, i) => `
          <div class="rebuttal-card">
            <div class="rebuttal-tag">${tagLabels[i] || ''}</div>
            <div class="rebuttal-h">${esc(c.h)}</div>
            <div class="rebuttal-d">${esc(c.d)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (kind !== 'cover' && kind !== 'intro' && kind !== 'questions' && kind !== 'position' && kind !== 'achievement') {
    const footer = document.createElement('div');
    footer.className = 'slide-footer';
    const typeLabel = opts.typeLabel || '';
    const pageInfo = opts.pageInfo || '';
    footer.innerHTML = `
      <div class="footer-left">REEGLE ${typeLabel ? '／ ' + esc(typeLabel) : ''}</div>
      <div class="footer-right">${esc(pageInfo)}</div>
    `;
    inner.appendChild(footer);
  }

  container.appendChild(inner);
}

function headerHTML(slide) {
  return `
    <div class="slide-header">
      <div class="slide-eyebrow">${esc(slide.eyebrow || '')}</div>
      ${slide._shared ? '<div class="shared-tag">共通</div>' : ''}
    </div>
    <h2 class="slide-title">${nl2br(esc(slide.title || ''))}</h2>
  `;
}
function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function nl2br(s) { return s.replace(/\n/g, '<br>'); }
