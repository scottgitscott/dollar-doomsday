/* ============================================================
   DOLLAR DOOMSDAY — js/timeline.js
   Renders the timeline section from structured data.
   ============================================================ */

const TIMELINE_EVENTS = [
  {
    year: 1913,
    title: 'The Federal Reserve Act',
    description:
      'Congress creates the Federal Reserve System, establishing the first central bank in American history. For the first time, a quasi-private institution gains statutory authority over the nation\'s money supply. The dollar has not been the same since. The Fed\'s founding mandate includes price stability. The results are, at this point, a matter of historical record.',
    impact: null,
  },
  {
    year: 1933,
    title: 'Executive Order 6102: Gold Confiscation',
    description:
      'President Roosevelt orders US citizens to surrender their gold coins, bullion, and certificates to the Federal Reserve — on penalty of fine or imprisonment. Citizens receive $20.67 per troy ounce. The official rate is subsequently raised to $35. The government books an immediate profit on the spread. This is called monetary policy.',
    impact: '–41% overnight devaluation vs. gold',
  },
  {
    year: 1944,
    title: 'Bretton Woods: The Dollar Becomes the World',
    description:
      '44 nations convene in New Hampshire and agree to peg their currencies to the US dollar, which is itself pegged to gold at $35/oz. The United States becomes the world\'s reserve banker. The privilege is extraordinary. The implied obligation — to maintain fiscal discipline commensurate with that privilege — is observed with declining enthusiasm.',
    impact: 'Dollar becomes global reserve currency',
  },
  {
    year: 1971,
    title: 'The Nixon Shock',
    description:
      'President Nixon unilaterally suspends the dollar\'s convertibility into gold, ending the Bretton Woods system. In a fifteen-minute Sunday evening television address, 27 years of monetary architecture is dissolved. Every major currency in the world instantly becomes fiat — backed by nothing but government credibility. This is the hinge point. Everything before was decline. Everything after is acceleration.',
    impact: 'Gold peg severed permanently',
  },
  {
    year: 1973,
    title: 'The Petrodollar Agreement',
    description:
      'The United States and Saudi Arabia reach an arrangement: oil will be priced and sold exclusively in US dollars. In exchange, the US provides military protection and arms purchases. The petrodollar system creates artificial global demand for dollars, supporting their value after the gold anchor is removed. The arrangement is not written into any treaty. It is simply understood.',
    impact: 'Dollar demand structurally maintained',
  },
  {
    year: 1980,
    title: 'The Stagflation Crisis',
    description:
      'Consumer price inflation reaches 14.8%. Interest rates climb to 20% under Federal Reserve Chairman Paul Volcker. The recession that follows is severe. The dollar is stabilized — but the underlying mechanism of inflationary deficit financing is now established and politically normalized. The medicine works. The disease is not cured.',
    impact: '–52% purchasing power in the 1970s',
  },
  {
    year: 2001,
    title: 'Post-9/11 Deficit Expansion',
    description:
      'The United States enters two simultaneous overseas conflicts funded entirely by deficit spending. The federal debt begins a new, steeper trajectory. Congress passes emergency spending authorizations with bipartisan consensus. The wars last two decades. The bills will be paid later. Later is, technically, ongoing.',
    impact: 'Debt trajectory inflects permanently upward',
  },
  {
    year: 2008,
    title: 'The Financial Crisis & Quantitative Easing',
    description:
      'The Federal Reserve introduces a novel monetary tool: Quantitative Easing — the direct purchase of financial assets using newly created dollars. The Fed balance sheet expands from $900 billion to $4.5 trillion between 2008 and 2015. The stated purpose is to prevent systemic collapse. The mechanism involves printing money. Officials prefer other language.',
    impact: 'Fed balance sheet: $900B → $4.5T',
  },
  {
    year: 2009,
    title: 'Bitcoin: The First Credible Alternative',
    description:
      'An anonymous developer publishes a peer-to-peer electronic cash system with a fixed supply cap of 21 million units. The genesis block contains a newspaper headline about bank bailouts. The timing is not accidental. Whether it ultimately succeeds or fails as money, the existence of a credible scarce alternative is itself a data point worth noting.',
    impact: 'Hard-capped monetary alternative emerges',
  },
  {
    year: 2020,
    title: 'COVID Stimulus: The 40% Expansion',
    description:
      'In response to the COVID-19 pandemic, the United States injects approximately $6 trillion into the economy through direct transfers, loan programs, and Federal Reserve asset purchases. The M2 money supply increases by approximately 40% in 24 months. This is the largest peacetime monetary expansion in recorded American history. Inflation follows. Officials describe this as unexpected.',
    impact: 'M2 money supply +40% in 24 months',
  },
  {
    year: 2022,
    title: 'Peak Inflation: 9.1%',
    description:
      'Consumer price inflation reaches 9.1% — the highest rate in 40 years. The Federal Reserve, which characterized inflation as "transitory" throughout 2021, begins an aggressive rate-hiking cycle, raising the federal funds rate from near zero to over 5% in 18 months. The purchasing power losses are not recovered. Inflation, once experienced, is permanent.',
    impact: 'Highest inflation since 1981',
  },
  {
    year: 2024,
    title: 'Dedollarization Accelerates',
    description:
      'BRICS nations — Brazil, Russia, India, China, South Africa, and six newly admitted members — formally advance discussions of a settlement currency to bypass the dollar. China and Russia settle bilateral trade in yuan and rubles at scale. Global central bank dollar reserves fall to 58%, the lowest share in 25 years. The process is gradual. Gradual is how these things end.',
    impact: 'USD reserve share: lowest in 25 years',
  },
];

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;

  TIMELINE_EVENTS.forEach((event) => {
    const el = document.createElement('div');
    el.className = 'timeline-event reveal-target';

    el.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-year">${event.year}</div>
        <h3 class="timeline-title">${event.title}</h3>
        <p class="timeline-desc">${event.description}</p>
        ${event.impact
          ? `<span class="timeline-impact">${event.impact}</span>`
          : ''}
      </div>
    `;

    container.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', renderTimeline);
