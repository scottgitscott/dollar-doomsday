# CLAUDE.md — Dollar Doomsday Project

**Read this file completely before writing a single line of code.**  
This is the authoritative project reference. All decisions should align with this document.

---

## Project Overview

**Site name:** Dollar Doomsday  
**Domain:** dollardoomsday.com (Cloudflare Pages deployment)  
**Purpose:** A single-page data journalism website that tracks and visualizes the decline of the US dollar through real economic data, historical context, and darkly comedic editorial framing.  
**Owner:** Scott (non-technical builder — prioritize clean, maintainable code and clear file structure)

This is not a conspiracy site. It is a serious, data-backed editorial product with a distinctive satirical voice. Think: *The Economist* if it were written by someone who had also read the Book of Revelation.

---

## Brand Reference

**ALWAYS consult `BRAND_STYLE_GUIDE.md` before building any UI component.**  
All color tokens, typography choices, motion rules, copywriting voice, and visual motifs are defined there. Do not deviate from the brand guide without explicit instruction.

Key brand principles to internalize:
- Colors: near-black background, dollar-bill green (`#85bb65`) as primary, gold (`#c9a84c`) as accent, red (`#c0392b`) for danger — sparingly
- Fonts: `IM Fell English` (headings/display) + `Share Tech Mono` (everything data/UI) — no others
- Aesthetic: US federal currency design language + digital decay/glitch overlay
- Tone: Formally deadpan. Data-first. Darkly funny without being a joke.
- No rounded corners. No stock photos. No UI frameworks. Custom CSS only.

---

## Tech Stack & Architecture

### Deployment
- **Platform:** Cloudflare Pages (static site)
- **Build:** No build step required unless complexity demands it. Default to plain HTML/CSS/JS.
- If a build step becomes necessary (e.g., for module bundling), use **Vite** with vanilla JS — not React, not Next.js.
- Output must be fully static — no SSR, no Node.js runtime.

### File Structure
```
/
├── index.html              # Single page — all sections live here
├── CLAUDE.md               # This file
├── BRAND_STYLE_GUIDE.md    # Design reference
├── css/
│   ├── main.css            # All styles — organized by section
│   └── animations.css      # Glitch, scroll-reveal, clock glow
├── js/
│   ├── clock.js            # Doomsday Clock logic
│   ├── charts.js           # Chart.js initialization & API data fetching
│   ├── timeline.js         # Timeline section rendering
│   ├── animations.js       # Scroll-reveal, glitch triggers
│   └── api/
│       ├── fred.js         # FRED API fetch functions
│       └── coingecko.js    # CoinGecko API fetch functions
├── assets/
│   └── svg/
│       ├── guilloche.svg   # Background texture patterns
│       ├── filigree.svg    # Border decorations
│       └── seal.svg        # Federal seal watermark motif
└── _headers                # Cloudflare security headers
```

### External Libraries (CDN only — no npm unless build step introduced)
- **Chart.js** `4.x` — all graphs and data visualizations
- **Google Fonts** — `IM Fell English` and `Share Tech Mono`
- No other external libraries without explicit approval.

### APIs
- **FRED (Federal Reserve Economic Data):** `https://api.stlouisfed.org/fred/`
  - API key: stored in Cloudflare environment variable `FRED_API_KEY`
  - If direct browser API calls are blocked by CORS, route through a Cloudflare Worker proxy
- **CoinGecko:** `https://api.coingecko.com/api/v3/` (public endpoints, no key required for free tier)
- All API calls are client-side fetch with graceful fallback to cached/hardcoded data if the call fails

### Performance Requirements
- Lighthouse score target: 90+ performance on desktop
- Fonts: `preconnect` and `preload` Google Fonts
- Charts: lazy-initialize on scroll into viewport (IntersectionObserver)
- No blocking scripts in `<head>` — all JS deferred or at bottom of body

---

## Page Architecture — Section by Section

### SECTION 0: Site Header / Hero
- Site name: **"DOLLAR DOOMSDAY"** — IM Fell English, hero size, green, centered
- Tagline beneath: `"The United States Dollar: 1792 – ????"`  — Share Tech Mono, muted, smaller
- Subtle guilloche pattern background
- Navigation anchors: `[CLOCK] [HISTORY] [DATA] [ESCAPE]`
- On scroll, header collapses to a sticky minimal top bar

---

### SECTION 1: The Doomsday Clock

**This is the first thing a user sees when the page loads. It is the hero of the site.**

#### Clock Specifications
- **Format:** Digital countdown display — `MM:SS`
- **Current value:** `09:00` — STATIC (hardcoded). This represents the site owner's editorial judgment of how far from "zero hour" the dollar is. It is not a live countdown.
- **Important framing:** The clock is NOT ticking down in real time. It is frozen like the nuclear Doomsday Clock — a position statement, updated manually by the site owner. Make this explicit in small print beneath the clock.
- **Visual:** Large circular instrument face, dark bg, green digits with CRT glow, gold ring border with tick marks, guilloche radiating background pattern
- **Label above digits:** `DOLLAR DOOMSDAY CLOCK` — IM Fell English
- **Label below digits:** `MINUTES REMAINING` — Share Tech Mono, uppercase, muted
- **Fine print:** `"Clock position set editorially. Updated periodically by the site author. Last updated: [DATE]."` — tiny monospace

#### Clock Surrounding Context
Below the clock (still within Section 1), include a brief editorial statement — 2–3 short paragraphs, IM Fell English body text, centered, max-width 700px:
- What the clock represents
- The editorial methodology (based on Fed policy, purchasing power data, debt trajectory)
- A deliberately understated acknowledgment of how bad it is

#### Editability
The clock value (`09:00`) should be set via a single JS constant at the top of `clock.js`:
```javascript
const CLOCK_MINUTES = 9;
const CLOCK_SECONDS = 0;
const CLOCK_LAST_UPDATED = "2025-01-01"; // Update this when position changes
```
This makes it trivial for the site owner to update without touching anything else.

---

### SECTION 2: The Timeline

**Narrative history of how the dollar lost its value.**

#### Content
A vertical timeline of key events in the dollar's decline. Each event has:
- Year (large, gold, monospace)
- Event title (IM Fell English, medium)
- 2–3 sentence description (Share Tech Mono, body size, slightly muted)
- Optional: percentage impact callout (e.g., `"–32% purchasing power"`)

#### Key Timeline Events to Include (research and expand as needed)
| Year | Event |
|------|-------|
| 1913 | Creation of the Federal Reserve |
| 1933 | FDR ends gold convertibility for citizens (Executive Order 6102) |
| 1944 | Bretton Woods — dollar becomes world reserve currency |
| 1971 | Nixon Shock — dollar fully leaves gold standard |
| 1973 | Petrodollar system established (USD for oil) |
| 1980s | Stagflation era — dollar purchasing power crisis |
| 2001 | 9/11 leads to deficit spending surge |
| 2008 | Financial crisis — first round of Quantitative Easing |
| 2009 | Bitcoin created — the first alternative |
| 2020 | COVID stimulus — M2 money supply increases 40% in 2 years |
| 2022 | Inflation peaks at 9.1% — highest in 40 years |
| 2024+ | Dedollarization accelerates — BRICS nations reduce USD holdings |

#### Visual Design
- Vertical line down the center (desktop) or left-aligned (mobile), in `--color-border`
- Events alternate left/right on desktop, all right on mobile
- Each event card styled like a classified document excerpt
- Section background: subtle parchment tone shift from main bg

---

### SECTION 3: The Data

**Six data visualizations. Each is a Chart.js chart loaded with live API data.**

All charts share the same brand-compliant config — define a `brandChartDefaults` object in `charts.js` and merge it into every chart:
- Background: `#111611`
- Grid lines: `#2a3a2a`
- Font: `Share Tech Mono`
- Tick color: `#7a9a7a`
- Tooltip: dark bg, gold border

#### Chart 1: M2 Money Supply (1960–Present)
- **Source:** FRED series `M2SL`
- **Chart type:** Area chart
- **Color:** `#85bb65` fill with 30% opacity, solid line
- **Label:** `"US M2 MONEY SUPPLY — BILLIONS USD"`
- **Callout:** Annotate the 2020 spike with a vertical red line and label: `"COVID Stimulus: +$4.8T printed in 24 months"`

#### Chart 2: US Dollar Purchasing Power (1913–Present)
- **Source:** FRED series `CPIAUCSL` — invert to show purchasing power decline
- **Chart type:** Line chart, downward slope
- **Color:** `--color-red` `#c0392b`
- **Label:** `"PURCHASING POWER OF $1 USD (1913 = $1.00)"`
- **Callout:** Start value `$1.00` in 1913, current value displayed dynamically

#### Chart 3: US Dollar Index / DXY (1973–Present)
- **Source:** FRED series `DTWEXBGS` or `DXYFF`
- **Chart type:** Line chart
- **Color:** `#85bb65`
- **Label:** `"US DOLLAR INDEX (DXY) — TRADE WEIGHTED"`
- **Note:** Show the overall weakening trend

#### Chart 4: Major Currency Strength vs. USD (1973–Present)
- **Source:** FRED exchange rate series for EUR, JPY, GBP, CHF, CNY
- **Chart type:** Multi-line chart
- **Colors:** EUR `#c9a84c` (gold), JPY `#85bb65`, GBP `#a8d97a`, CHF `#7a9a7a`, CNY `#c0392b`
- **Label:** `"MAJOR CURRENCIES vs. USD — INDEXED TO 1973"`
- **Note:** Index all to 100 at start date for fair comparison. This tells the story of relative strength.

#### Chart 5: US National Debt as % of GDP (1940–Present)
- **Source:** FRED series `GFDEGDQ188S`
- **Chart type:** Area chart
- **Color:** `--color-red`
- **Label:** `"FEDERAL DEBT AS % OF GDP"`
- **Callout:** Annotate WWII peak and 2020 peak — note current trajectory exceeds WWII levels

#### Chart 6: Bitcoin & Gold vs. M2 Expansion (2010–Present)
- **Source:** CoinGecko for BTC price history; FRED for M2 and gold (`GOLDAMGBD228NLBM`)
- **Chart type:** Multi-axis line chart (BTC/Gold on right axis, M2 on left)
- **Colors:** BTC `#f7931a` (native Bitcoin orange), Gold `#c9a84c`, M2 `#85bb65`
- **Label:** `"STORE OF VALUE RACE — BTC + GOLD vs. M2 MONEY SUPPLY"`
- **Note:** The visual point is that BTC and Gold rise as M2 rises — they are inflation gauges

#### Chart Section Layout
- 2-column grid on desktop, 1-column on mobile
- Chart 4 (currency comparison) spans full width — it's the most complex and important
- Each chart has: category label, title, data source credit (`SOURCE: FRED / COINGECKO`) in tiny muted monospace

---

### SECTION 4: Donate / CTA / Exit

**This is the final section. It has three elements.**

#### 4A: Donate
- Header: `"SUPPORT INDEPENDENT RESEARCH"` — styled like a government grant program
- Brief copy (1 paragraph, Share Tech Mono): deadpan explanation of why the site exists and that it's run independently
- Crypto wallet display block:
  - Label: `BITCOIN (BTC)` / `ETHEREUM (ETH)`
  - Address display: monospace, styled like a classified document field
  - Placeholder value: `[CRYPTO WALLET ADDRESS]` — to be replaced by site owner
  - Copy-to-clipboard button on each address
- Small print: `"Your contribution supports independent research. Not tax deductible. Obviously."` 

#### 4B: maybeportugal.com CTA
- Positioned below the donation block
- Single line, centered, IM Fell English italic:  
  *"Looking for a way out of the US?"*
- Followed immediately by: `→ maybeportugal.com` — styled as a link in `--color-engraving`
- No further explanation. The understatement is the point.

#### 4C: Footer
- Thin gold rule above
- Site name in small monospace
- `"© [YEAR] Dollar Doomsday. All data sourced from public federal records. The irony is not lost on us."`
- No other footer content

---

## Data & API Implementation Notes

### FRED API
- Base URL: `https://api.stlouisfed.org/fred/series/observations`
- Required params: `series_id`, `api_key`, `file_type=json`, `observation_start`
- Data returns as array of `{date, value}` — transform to Chart.js `{x, y}` format
- CORS: FRED allows browser requests with API key. If issues arise, proxy through a Cloudflare Worker.
- **Error handling:** If FRED fetch fails, display chart with a graceful message: `"DATA TEMPORARILY UNAVAILABLE — SOURCE: FRED"` in brand style. Do not show a broken chart.

### CoinGecko API
- BTC history endpoint: `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`
- Params: `vs_currency=usd&days=max&interval=monthly`
- Free tier has rate limits — cache the response in `sessionStorage` so it's not re-fetched on every chart render

### Data Caching Strategy
```javascript
// Pattern to use for all API calls
async function fetchWithCache(key, fetchFn, ttlMinutes = 60) {
  const cached = sessionStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < ttlMinutes * 60 * 1000) return data;
  }
  const data = await fetchFn();
  sessionStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  return data;
}
```

---

## Glitch Effect Implementation

Apply to: site name heading, clock label, section headers (on scroll entry).

```css
@keyframes glitch {
  0%, 100% { transform: translate(0); clip-path: none; }
  20% { transform: translate(-2px, 1px); clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); }
  40% { transform: translate(2px, -1px); clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%); }
  60% { transform: translate(-1px, 2px); clip-path: none; }
  80% { transform: translate(1px, -2px); clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); }
}
```

Trigger via JS `setInterval` every 12 seconds — add class `glitching` for 200ms then remove.

---

## Scroll-Reveal Animation

Use `IntersectionObserver` to trigger reveals. Elements start at `opacity: 0; transform: translateY(20px)` and transition to `opacity: 1; transform: translateY(0)` over `600ms ease-out` when they enter the viewport. Apply to: section headers, timeline events, chart panels, the donation block.

---

## Accessibility & SEO

- Semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>` with `aria-label` on each section
- All charts: `<canvas>` with `aria-label` describing the data
- Meta tags: `<title>`, `<meta name="description">`, Open Graph tags for social sharing
- OG description: `"The US dollar has lost 97% of its purchasing power since 1913. Here's how it happened, and what comes next."`
- OG image: Generate a static 1200x630 PNG of the clock face for social previews
- `lang="en"` on `<html>`

---

## Security & Cloudflare Config

`_headers` file for Cloudflare Pages:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' cdn.jsdelivr.net fonts.googleapis.com; style-src 'self' fonts.googleapis.com fonts.gstatic.com; font-src fonts.gstatic.com; connect-src api.stlouisfed.org api.coingecko.com; img-src 'self' data:;
```

---

## Editorial Content Voice — Quick Reference

When writing any copy for the site, apply this voice test:

**Ask:** Does this sound like a government document that accidentally predicted the apocalypse?  
**Ask:** Is there at least one data point or date in every substantive claim?  
**Ask:** Is the humor coming from understatement, not from trying to be funny?

**Do:** Short sentences. Active voice. Specific numbers. Deadpan delivery.  
**Don't:** Exclamation points. Slang. ALL CAPS body text. Conspiracy framing. Speculative claims without sources.

---

## What NOT to Build

- No user accounts, no login, no database
- No comments section, no social features
- No cookies, no analytics, no tracking pixels
- No newsletter signup (keep it pure)
- No blog or multi-page structure — single page only
- No dark/light mode toggle — dark only, always

---

## Definition of Done

The site is complete when:
- [ ] All four sections are built and responsive (320px to 1440px+)
- [ ] All six charts load live data from FRED and CoinGecko with graceful error fallback
- [ ] The Doomsday Clock displays correctly at all screen sizes
- [ ] The glitch animation fires on the hero heading and clock label
- [ ] Scroll-reveal animations work on all section entries
- [ ] Crypto wallet placeholder is visible and copy-to-clipboard works
- [ ] maybeportugal.com link is in the footer
- [ ] Lighthouse performance score ≥ 90 on desktop
- [ ] `_headers` security config is in place
- [ ] `CLAUDE.md` and `BRAND_STYLE_GUIDE.md` are in the project root
