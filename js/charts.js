/* ============================================================
   DOLLAR DOOMSDAY — js/charts.js
   Chart.js initialization — all six data panels.
   Uses IntersectionObserver for lazy init on scroll.

   X-axes use linear year scale (no date adapter required).
   ============================================================ */

/* ----------------------------------------------------------
   SHARED UTILITIES
   ---------------------------------------------------------- */

/** Reduce FRED data to one value per year (last observation). */
function annualizeData(data) {
  const yearMap = new Map();
  data.forEach(({ x, y }) => {
    const year = x.slice(0, 4);
    yearMap.set(year, y);
  });
  return Array.from(yearMap.entries())
    .map(([yr, y]) => ({ x: Number(yr), y }))
    .sort((a, b) => a.x - b.x);
}

/** Reduce CoinGecko data to one value per year (last observation). */
function annualizeDataFromISO(data) {
  return annualizeData(data); // same shape
}

function getScaleConfig(yTickCb) {
  const base = {
    grid:   { color: 'rgba(42, 58, 42, 0.45)', drawBorder: false },
    border: { color: '#2a3a2a' },
    ticks:  {
      color: '#7a9a7a',
      font:  { family: 'Share Tech Mono', size: 10 },
      maxTicksLimit: 8,
    },
  };
  if (yTickCb) base.ticks.callback = yTickCb;
  return base;
}

function xYearScale(maxTicks) {
  return {
    type: 'linear',
    grid:   { color: 'rgba(42, 58, 42, 0.45)', drawBorder: false },
    border: { color: '#2a3a2a' },
    ticks: {
      color: '#7a9a7a',
      font:  { family: 'Share Tech Mono', size: 10 },
      maxTicksLimit: maxTicks || 8,
      callback: v => Math.round(v).toString(),
    },
  };
}

function tooltipDefaults() {
  return {
    backgroundColor: '#111611',
    borderColor:     '#c9a84c',
    borderWidth:     1,
    titleColor:      '#c9a84c',
    bodyColor:       '#d4e8d4',
    titleFont:       { family: 'Share Tech Mono', size: 11 },
    bodyFont:        { family: 'Share Tech Mono', size: 11 },
    padding:         10,
  };
}

function showFallback(id, err) {
  const fb  = document.getElementById(`chart-${id}-fallback`);
  const cvs = document.getElementById(`chart-${id}`);
  if (fb)  {
    fb.hidden = false;
    if (err) {
      const msg = fb.querySelector('.fallback-error') || document.createElement('div');
      msg.className = 'fallback-error';
      msg.textContent = err;
      if (!fb.querySelector('.fallback-error')) fb.appendChild(msg);
    }
  }
  if (cvs) { cvs.style.display = 'none'; }
}

/* ----------------------------------------------------------
   APPLY GLOBAL CHART DEFAULTS
   ---------------------------------------------------------- */
function applyChartDefaults() {
  Chart.defaults.color                            = '#7a9a7a';
  Chart.defaults.font.family                      = 'Share Tech Mono';
  Chart.defaults.font.size                        = 11;
  Chart.defaults.plugins.legend.labels.color      = '#7a9a7a';
  Chart.defaults.plugins.legend.labels.font       = { family: 'Share Tech Mono', size: 11 };
  Chart.defaults.plugins.legend.labels.padding    = 20;
}

/* ----------------------------------------------------------
   CHART 1 — M2 Money Supply
   ---------------------------------------------------------- */
async function initM2Chart() {
  const canvas = document.getElementById('chart-m2');
  if (!canvas) return;

  try {
    const raw  = await window.FRED.fetchSeries('M2SL', '1960-01-01');
    const data = annualizeData(raw);

    new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'M2 MONEY SUPPLY (BILLIONS USD)',
          data,
          borderColor:     '#85bb65',
          backgroundColor: 'rgba(133, 187, 101, 0.12)',
          fill:            true,
          borderWidth:     1.5,
          pointRadius:     0,
          tension:         0.35,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: xYearScale(9),
          y: {
            ...getScaleConfig(v => `$${(v / 1000).toFixed(0)}T`),
            type: 'linear',
          },
        },
        plugins: {
          legend:  { display: false },
          tooltip: {
            ...tooltipDefaults(),
            callbacks: {
              title: ctx => ctx[0].parsed.x.toString(),
              label: ctx => ` M2: $${ctx.parsed.y.toLocaleString()}B`,
            },
          },
        },
      },
    });
  } catch (e) {
    console.error('M2 chart:', e);
    showFallback('m2', e.message);
  }
}

/* ----------------------------------------------------------
   CHART 2 — Purchasing Power of $1 (1913 = $1.00)
   ---------------------------------------------------------- */
async function initCPIChart() {
  const canvas = document.getElementById('chart-cpi');
  if (!canvas) return;

  try {
    const raw  = await window.FRED.fetchSeries('CPIAUCSL', '1913-01-01');
    const ann  = annualizeData(raw);
    const base = ann[0].y;

    const data = ann.map(d => ({
      x: d.x,
      y: parseFloat((base / d.y).toFixed(4)),
    }));

    const current = data[data.length - 1]?.y?.toFixed(3) ?? '—';

    // Update the aria-label with current value
    canvas.setAttribute(
      'aria-label',
      `Purchasing power of $1 USD since 1913. Current value: $${current}`
    );

    new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: `PURCHASING POWER OF $1 USD (1913 = $1.00) — CURRENT: $${current}`,
          data,
          borderColor:     '#c0392b',
          backgroundColor: 'rgba(192, 57, 43, 0.10)',
          fill:            true,
          borderWidth:     1.5,
          pointRadius:     0,
          tension:         0.35,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: xYearScale(9),
          y: {
            ...getScaleConfig(v => `$${v.toFixed(2)}`),
            type: 'linear',
          },
        },
        plugins: {
          legend:  { display: false },
          tooltip: {
            ...tooltipDefaults(),
            callbacks: {
              title: ctx => ctx[0].parsed.x.toString(),
              label: ctx => ` Purchasing power: $${ctx.parsed.y.toFixed(3)}`,
            },
          },
        },
      },
    });
  } catch (e) {
    console.error('CPI chart:', e);
    showFallback('cpi', e.message);
  }
}

/* ----------------------------------------------------------
   CHART 3 — US Dollar Index (DXY / Trade-Weighted)
   ---------------------------------------------------------- */
async function initDXYChart() {
  const canvas = document.getElementById('chart-dxy');
  if (!canvas) return;

  try {
    const raw  = await window.FRED.fetchSeries('DTWEXBGS', '1973-01-01');
    const data = annualizeData(raw);

    new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'US DOLLAR INDEX — TRADE WEIGHTED',
          data,
          borderColor:     '#85bb65',
          backgroundColor: 'rgba(133, 187, 101, 0.08)',
          fill:            true,
          borderWidth:     1.5,
          pointRadius:     0,
          tension:         0.35,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: xYearScale(9),
          y: getScaleConfig(),
        },
        plugins: {
          legend:  { display: false },
          tooltip: {
            ...tooltipDefaults(),
            callbacks: {
              title: ctx => ctx[0].parsed.x.toString(),
              label: ctx => ` DXY: ${ctx.parsed.y.toFixed(2)}`,
            },
          },
        },
      },
    });
  } catch (e) {
    console.error('DXY chart:', e);
    showFallback('dxy', e.message);
  }
}

/* ----------------------------------------------------------
   CHART 4 — Federal Debt as % of GDP
   ---------------------------------------------------------- */
async function initDebtChart() {
  const canvas = document.getElementById('chart-debt');
  if (!canvas) return;

  try {
    const raw  = await window.FRED.fetchSeries('GFDEGDQ188S', '1940-01-01');
    const data = annualizeData(raw);

    new Chart(canvas, {
      type: 'line',
      data: {
        datasets: [{
          label: 'FEDERAL DEBT AS % OF GDP',
          data,
          borderColor:     '#c0392b',
          backgroundColor: 'rgba(192, 57, 43, 0.10)',
          fill:            true,
          borderWidth:     1.5,
          pointRadius:     0,
          tension:         0.35,
        }],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: xYearScale(9),
          y: getScaleConfig(v => `${v}%`),
        },
        plugins: {
          legend:  { display: false },
          tooltip: {
            ...tooltipDefaults(),
            callbacks: {
              title: ctx => ctx[0].parsed.x.toString(),
              label: ctx => ` Debt/GDP: ${ctx.parsed.y.toFixed(1)}%`,
            },
          },
        },
      },
    });
  } catch (e) {
    console.error('Debt/GDP chart:', e);
    showFallback('debt', e.message);
  }
}

/* ----------------------------------------------------------
   CHART 5 — Major Currencies vs. USD (indexed to 1973 = 100)
   ---------------------------------------------------------- */
async function initCurrencyChart() {
  const canvas = document.getElementById('chart-currencies');
  if (!canvas) return;

  // FRED series, display label, color, invert flag
  // invert=true: series is USD per foreign unit → higher = stronger USD
  // invert=false: series is foreign per USD → higher = stronger foreign
  const SERIES = [
    { id: 'DEXUSEU', label: 'EUR', color: '#c9a84c', invert: true  },
    { id: 'DEXJPUS', label: 'JPY', color: '#85bb65', invert: false },
    { id: 'DEXUSUK', label: 'GBP', color: '#a8d97a', invert: true  },
    { id: 'DEXSZUS', label: 'CHF', color: '#7a9a7a', invert: false },
    { id: 'DEXCHUS', label: 'CNY', color: '#c0392b', invert: false },
  ];

  try {
    const results = await Promise.all(
      SERIES.map(s =>
        window.FRED.fetchSeries(s.id, '1973-01-01').catch(() => null)
      )
    );

    const datasets = results
      .map((raw, i) => {
        if (!raw || raw.length === 0) return null;
        const ann  = annualizeData(raw);
        const base = ann[0].y;
        const { invert } = SERIES[i];

        const indexed = ann.map(d => ({
          x: d.x,
          // Normalise: rising = foreign currency gaining vs USD
          y: parseFloat(
            ((invert ? base / d.y : d.y / base) * 100).toFixed(2)
          ),
        }));

        return {
          label:       SERIES[i].label,
          data:        indexed,
          borderColor: SERIES[i].color,
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          pointRadius: 0,
          tension:     0.35,
        };
      })
      .filter(Boolean);

    if (!datasets.length) throw new Error('No currency data');

    new Chart(canvas, {
      type: 'line',
      data: { datasets },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: xYearScale(10),
          y: {
            ...getScaleConfig(v => v.toFixed(0)),
            type: 'linear',
          },
        },
        plugins: {
          legend: {
            display:  true,
            position: 'top',
            labels: {
              color:  '#7a9a7a',
              font:   { family: 'Share Tech Mono', size: 11 },
              padding: 20,
              boxWidth: 20,
            },
          },
          tooltip: {
            ...tooltipDefaults(),
            callbacks: {
              title: ctx => ctx[0].parsed.x.toString(),
              label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}`,
            },
          },
        },
      },
    });
  } catch (e) {
    console.error('Currency chart:', e);
    showFallback('currencies', e.message);
  }
}

/* ----------------------------------------------------------
   CHART 6 — Bitcoin & Gold vs. M2 (dual-axis, log BTC)
   ---------------------------------------------------------- */
async function initBTCChart() {
  const canvas = document.getElementById('chart-btc');
  if (!canvas) return;

  try {
    const [btcRaw, goldRaw, m2Raw] = await Promise.all([
      window.CoinGecko.fetchBitcoinHistory().catch(() => null),
      window.FRED.fetchSeries('GOLDAMGBD228NLBM', '2010-01-01').catch(() => null),
      window.FRED.fetchSeries('M2SL', '2010-01-01').catch(() => null),
    ]);

    const datasets = [];

    if (btcRaw?.length) {
      datasets.push({
        label:           'BTC (USD)',
        data:            annualizeData(btcRaw),
        borderColor:     '#f7931a',
        backgroundColor: 'transparent',
        borderWidth:     1.5,
        pointRadius:     0,
        tension:         0.35,
        yAxisID:         'y1',
      });
    }

    if (goldRaw?.length) {
      datasets.push({
        label:           'GOLD (USD/oz)',
        data:            annualizeData(goldRaw),
        borderColor:     '#c9a84c',
        backgroundColor: 'transparent',
        borderWidth:     1.5,
        pointRadius:     0,
        tension:         0.35,
        yAxisID:         'y1',
      });
    }

    if (m2Raw?.length) {
      datasets.push({
        label:           'M2 SUPPLY (BILLIONS)',
        data:            annualizeData(m2Raw),
        borderColor:     '#85bb65',
        backgroundColor: 'rgba(133, 187, 101, 0.08)',
        fill:            true,
        borderWidth:     1.5,
        pointRadius:     0,
        tension:         0.35,
        yAxisID:         'y2',
      });
    }

    if (!datasets.length) throw new Error('No store-of-value data');

    new Chart(canvas, {
      type: 'line',
      data: { datasets },
      options: {
        responsive:          true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: xYearScale(8),
          y1: {
            type:     'logarithmic',
            position: 'left',
            grid:     { color: 'rgba(42, 58, 42, 0.45)', drawBorder: false },
            border:   { color: '#2a3a2a' },
            ticks: {
              color: '#7a9a7a',
              font:  { family: 'Share Tech Mono', size: 10 },
              callback: v =>
                v >= 100000 ? `$${(v / 1000).toFixed(0)}k`
                : v >= 1000  ? `$${(v / 1000).toFixed(1)}k`
                :              `$${v.toFixed(0)}`,
            },
          },
          y2: {
            type:     'linear',
            position: 'right',
            grid:     { drawOnChartArea: false, color: 'rgba(42,58,42,0.3)' },
            border:   { color: '#2a3a2a' },
            ticks: {
              color: '#85bb65',
              font:  { family: 'Share Tech Mono', size: 10 },
              callback: v => `$${(v / 1000).toFixed(0)}T`,
            },
          },
        },
        plugins: {
          legend: {
            display:  true,
            position: 'top',
            labels: {
              color:   '#7a9a7a',
              font:    { family: 'Share Tech Mono', size: 11 },
              padding: 20,
              boxWidth: 20,
            },
          },
          tooltip: {
            ...tooltipDefaults(),
            callbacks: {
              title: ctx => ctx[0].parsed.x.toString(),
            },
          },
        },
      },
    });
  } catch (e) {
    console.error('BTC/Gold/M2 chart:', e);
    showFallback('btc', e.message);
  }
}

/* ----------------------------------------------------------
   LAZY INITIALISATION via IntersectionObserver
   ---------------------------------------------------------- */
function initCharts() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded — charts will not render.');
    return;
  }

  applyChartDefaults();

  const chartInits = [
    { id: 'chart-m2',         fn: initM2Chart       },
    { id: 'chart-cpi',        fn: initCPIChart       },
    { id: 'chart-dxy',        fn: initDXYChart       },
    { id: 'chart-debt',       fn: initDebtChart      },
    { id: 'chart-currencies', fn: initCurrencyChart  },
    { id: 'chart-btc',        fn: initBTCChart       },
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const item = chartInits.find(c => c.id === entry.target.id);
        if (item) {
          item.fn();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
  );

  chartInits.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initCharts);
