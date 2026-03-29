/* ============================================================
   DOLLAR DOOMSDAY — js/clock.js

   To update the clock position, change only these constants:
   ============================================================ */

const CLOCK_MINUTES      = 9;
const CLOCK_SECONDS      = 0;
const CLOCK_LAST_UPDATED = '2025-01-01';

/* ---------------------------------------------------------- */

function initClock() {
  const minutesEl  = document.getElementById('clock-minutes');
  const secondsEl  = document.getElementById('clock-seconds');
  const finePrint  = document.getElementById('clock-last-updated');
  const digitsEl   = document.getElementById('clock-digits');

  if (minutesEl) {
    minutesEl.textContent = String(CLOCK_MINUTES).padStart(2, '0');
  }
  if (secondsEl) {
    secondsEl.textContent = String(CLOCK_SECONDS).padStart(2, '0');
  }
  if (digitsEl) {
    digitsEl.setAttribute(
      'aria-label',
      `${CLOCK_MINUTES} minutes ${CLOCK_SECONDS} seconds`
    );
  }
  if (finePrint) {
    const d = new Date(CLOCK_LAST_UPDATED + 'T12:00:00'); // avoid timezone shift
    const formatted = d.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    finePrint.textContent =
      `Clock position set editorially. Updated periodically by the site author. Last updated: ${formatted}.`;
  }

  generateTickMarks();
}

/**
 * Renders 60 SVG tick marks around the clock bezel.
 * Major ticks every 5 seconds, minor ticks otherwise.
 */
function generateTickMarks() {
  const ring = document.querySelector('.clock-ring');
  if (!ring) return;

  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', '0 0 100 100');
  svg.setAttribute('aria-hidden', 'true');

  const TICKS = 60;

  for (let i = 0; i < TICKS; i++) {
    const angleDeg = (i / TICKS) * 360 - 90;
    const rad      = (angleDeg * Math.PI) / 180;
    const isMajor  = i % 5 === 0;

    const outerR = 49;
    const innerR = isMajor ? 45.5 : 47;

    const x1 = 50 + innerR * Math.cos(rad);
    const y1 = 50 + innerR * Math.sin(rad);
    const x2 = 50 + outerR * Math.cos(rad);
    const y2 = 50 + outerR * Math.sin(rad);

    const line = document.createElementNS(NS, 'line');
    line.setAttribute('x1', x1.toFixed(3));
    line.setAttribute('y1', y1.toFixed(3));
    line.setAttribute('x2', x2.toFixed(3));
    line.setAttribute('y2', y2.toFixed(3));
    line.setAttribute('stroke', isMajor ? '#c9a84c' : '#2a3a2a');
    line.setAttribute('stroke-width', isMajor ? '0.9' : '0.45');

    svg.appendChild(line);
  }

  ring.appendChild(svg);
}

document.addEventListener('DOMContentLoaded', initClock);
