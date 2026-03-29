/* ============================================================
   DOLLAR DOOMSDAY — js/animations.js
   Sticky nav, scroll-reveal, glitch, copy-to-clipboard
   ============================================================ */

/* ----------------------------------------------------------
   1. STICKY NAV — show after hero leaves viewport
   ---------------------------------------------------------- */
function initStickyNav() {
  const nav    = document.getElementById('sticky-nav');
  const header = document.getElementById('site-header');
  if (!nav || !header) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        nav.classList.remove('visible');
      } else {
        nav.classList.add('visible');
      }
    },
    { threshold: 0.05 }
  );

  observer.observe(header);
}

/* ----------------------------------------------------------
   2. SCROLL REVEAL — fade-up on viewport entry
   ---------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal-target');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Timeline events observed once then unobserved for performance
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------
   3. GLITCH — interval-based, applied to .glitch-target
   ---------------------------------------------------------- */
function initGlitch() {
  const targets = document.querySelectorAll('.glitch-target');
  if (!targets.length) return;

  // Set data-glitch = text content so ::before/::after can mirror it
  targets.forEach(el => {
    el.setAttribute('data-glitch', el.textContent.trim());
  });

  function trigger() {
    targets.forEach(el => {
      el.classList.add('glitching');
      setTimeout(() => el.classList.remove('glitching'), 200);
    });
  }

  // Schedule with slight randomness every 10–14 seconds
  function schedule() {
    const delay = 10000 + Math.random() * 4000;
    setTimeout(() => {
      trigger();
      schedule();
    }, delay);
  }

  // Initial fire after 3 seconds
  setTimeout(() => { trigger(); schedule(); }, 3000);
}

/* ----------------------------------------------------------
   4. COPY TO CLIPBOARD — wallet addresses
   ---------------------------------------------------------- */
function initCopyButtons() {
  const buttons = document.querySelectorAll('.copy-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId  = btn.getAttribute('data-target');
      const addressEl = document.getElementById(targetId);
      if (!addressEl) return;

      const text = addressEl.textContent.trim();

      function onSuccess() {
        const original = btn.textContent;
        btn.textContent = 'COPIED';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 2000);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => legacyCopy(text, onSuccess));
      } else {
        legacyCopy(text, onSuccess);
      }
    });
  });
}

function legacyCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    onSuccess();
  } catch (e) {
    console.warn('Copy failed:', e);
  }
  document.body.removeChild(ta);
}

/* ----------------------------------------------------------
   5. FOOTER YEAR — keep copyright current
   ---------------------------------------------------------- */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ----------------------------------------------------------
   INIT
   ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initStickyNav();
  initScrollReveal();
  initGlitch();
  initCopyButtons();
  initFooterYear();
});
