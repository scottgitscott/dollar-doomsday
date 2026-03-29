# Dollar Doomsday — Brand Style Guide

**Version 2.0 | For use by Claude Code when building dollardoomsday.com**

---

## 01. Brand Philosophy

Dollar Doomsday is a darkly comedic, intellectually serious data journalism site about the slow-motion collapse of the US dollar. The brand lives at the intersection of **federal gravitas** and **digital decay** — it should feel like if the Bureau of Engraving and Printing built a website and then slowly watched it glitch apart.

The tone is: *"We're not panicking. We're just reading the data. You should probably panic."*

This is not a conspiracy site. It is not a meme site. It is a site that takes the most official-looking aesthetic possible — US currency design — and uses that same visual language to deliver genuinely alarming facts. The humor comes from the deadpan delivery and the contrast between official seriousness and apocalyptic content.

---

## 02. Color Palette

All colors are sourced directly from actual US currency design — the Bureau of Engraving and Printing's intaglio ink colors, Federal Reserve note paper, and security feature tones across the $1, $5, $20, and $100 denominations. The site is dark-themed (dark backgrounds always), but the foreground elements — text, borders, decorative features — should read as if printed in authentic currency ink on authentic currency paper.

### Reference: Actual US Currency Colors
- **$1 / $5 bill back green:** Deep intaglio green — the characteristic "dollar green" of BEP printing ink. Approximately `#3a7d44` darkening to `#1f4d2a` in shadow areas.
- **$100 bill blue security ribbon:** `#1b6ca8`
- **$100 gold numeral / bell:** `#c9a84c`
- **$20 / $50 peach security thread:** `#d4956a` (used sparingly for warmth accents)
- **Federal Reserve seal green:** Deeper, more official — approximately `#2d6a3f`
- **Bill paper / cream:** `#e8e0c8` — the off-white cream of actual currency paper; use for primary text so it reads like ink on a bill

### Color Tokens

| Token | Hex | Sourced From | Usage |
|---|---|---|---|
| `--color-bg` | `#080c08` | Bill viewed in dark — near-black, strong green undertone | Page background |
| `--color-surface` | `#0e140e` | Dark face of currency stock | Card/panel backgrounds |
| `--color-surface-raised` | `#141e14` | Slightly lighter currency surface | Elevated UI elements |
| `--color-border` | `#1e3320` | Dark engraving border lines on bills | Borders, dividers |
| `--color-engraving` | `#6aaa3b` | BEP intaglio printing ink — the classic dollar green | Primary green — hero color |
| `--color-engraving-dim` | `#3d7a2a` | Federal Reserve seal deep green | Secondary/muted green |
| `--color-engraving-bright` | `#8fd15a` | Highlighted bill surface under light | Hover states, highlights |
| `--color-bill-dark` | `#1f4d2a` | Shadow areas of bill back engraving | Deep green accents |
| `--color-gold` | `#c9a84c` | $100 bill gold numeral and liberty bell | Key callouts, seals, labels |
| `--color-gold-dim` | `#8a6f2e` | Aged gold on older denomination designs | Muted gold |
| `--color-red` | `#c0392b` | Emergency — use sparingly | Danger/alert only |
| `--color-red-dim` | `#7d1f15` | Background behind red elements | Secondary red |
| `--color-cream` | `#e8e0c8` | Actual US currency paper stock | **Primary text color** — reads like ink on a bill |
| `--color-text-primary` | `#e8e0c8` | Same as cream — bill paper | Main body text |
| `--color-text-secondary` | `#a8b89a` | Lighter engraving areas on bill surface | Secondary/supporting text |
| `--color-text-muted` | `#4a6a4a` | Deep shadow of bill printing | Fine print, labels |
| `--color-parchment` | `#111a11` | Bill surface — slightly warmer dark green | Alternate section backgrounds |
| `--color-white` | `#f4f0e4` | Stark white areas on currency (portrait backgrounds, borders) | Key headings, max contrast elements |

**Primary brand color:** `--color-engraving` `#6aaa3b` — authentic BEP intaglio dollar green
**Primary text color:** `--color-cream` `#e8e0c8` — currency paper stock; all body text uses this
**Danger/urgency color:** `--color-red` `#c0392b`
**Prestige/official accent:** `--color-gold` `#c9a84c` — $100 bill gold

### Color Usage Principles
- **Backgrounds:** Always dark (`--color-bg`, `--color-surface`, `--color-parchment`) — dark only, always
- **Text:** Cream (`--color-cream` / `--color-text-primary`) is the default for all readable text. It should feel like BEP ink on currency paper — not white, not green-tinted, but warm cream.
- **Green:** Used for decorative elements, borders, accents, data lines, the clock digits, hover states — not for body text
- **White (`--color-white`):** Reserved for the site name hero heading and maximum-contrast callouts only. Evokes the stark white of currency security borders.
- **Gold:** Sparingly — seals, section stamps, the clock ring, key data callouts

---

## 03. Typography

The type system pairs **the engraved serif tradition of US federal currency** with **machine-precision monospace** — the exact pairing found on every bill in circulation. Two families, no exceptions.

### Display / Headline Font
**`"Cormorant Garamond"`** — Google Fonts
Used for: Hero headings, section titles, the site name, the clock label, pull quotes, editorial body paragraphs
Characteristics: A high-contrast revival of Claude Garamont's 16th-century designs — the same Old Style serif tradition that directly informs Bureau of Engraving and Printing lettering. The thick-to-thin stroke contrast mimics intaglio engraving. Elegant, authoritative, slightly archaic. Feels like it was set by a government printer in 1850 and has been on every denomination since.
Load via: `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap`
Use weights: 300 (fine print, muted labels), 400 (body), 500 (section titles), 600 (hero headings)

### Data / UI / Body Font
**`"Space Mono"`** — Google Fonts
Used for: All data labels, chart annotations, numbers, the countdown clock digits, serial-number-style metadata, section stamps, copy-to-clipboard buttons, fine print
Characteristics: A geometric, fixed-width typeface built for precision — closer in spirit to the machine-punched serial number typefaces on Federal Reserve Notes than any other freely available monospace. Heavier, more authoritative than Share Tech Mono. Evokes punch-card machines, the Fed wire system, and government data terminals.
Load via: `https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap`

### Type Scale

| Role | Font | Size | Weight | Case |
|---|---|---|---|---|
| Site name / Hero | Cormorant Garamond | `clamp(3rem, 8vw, 7rem)` | 600 | Title case |
| Section headers | Cormorant Garamond | `clamp(1.8rem, 4vw, 3rem)` | 500 | Title case |
| Editorial body paragraphs | Cormorant Garamond | `1.1rem` | 400 | Sentence case |
| Subsection / UI headers | Space Mono | `0.9rem` | 700 | UPPERCASE |
| Body text / labels | Space Mono | `0.85rem` | 400 | Sentence case |
| Data labels | Space Mono | `0.72rem` | 400 | UPPERCASE |
| Clock digits | Space Mono | `clamp(5rem, 15vw, 12rem)` | 700 | — |
| Fine print / legal | Space Mono | `0.65rem` | 400 | Sentence case |

### Typography Rules
- Editorial paragraphs (clock section, timeline descriptions) use **Cormorant Garamond** — they should read like official proclamations
- All numbers, dates, percentages, and data values: always **Space Mono**
- Line-height on Cormorant Garamond body text: `1.9` — open and formal
- Line-height on Space Mono body text: `1.75`
- Tight tracking on Space Mono UI labels: `letter-spacing: 0.15em`
- Cormorant Garamond headings: `letter-spacing: 0.02em` — slight open tracking enhances the engraved feel
- Never mix the two fonts within a single sentence

---

## 04. Visual Identity & Motifs

### Dollar Bill Texture System
The visual DNA comes directly from the design language of circulating US Federal Reserve Notes — $1, $5, $20, and $100 bills. Study these bills. Every element on them exists for a reason. Use those reasons.

- **Guilloche patterns** — the fine-line repeating rosette/wave patterns that fill the background of every bill denomination. On the $1 bill back, these radiate behind "ONE." Use as SVG overlays at 5–8% opacity on dark section backgrounds. The lines should be `--color-engraving` or `--color-engraving-dim`.
- **Engraving crosshatch (intaglio texture)** — the raised-ink diagonal line crosshatch that makes currency feel textured to the touch. Simulate as CSS repeating-linear-gradient patterns. The $100 portrait area is the reference.
- **Security border filigree** — the ornate rectangular scrollwork borders on all denominations. On the $1 bill, these run along all four edges. Use as section dividers and card borders in SVG. Color: `--color-engraving-dim`.
- **Federal Reserve seal** — the circular seal (left side of face on all bills) with radiating lines, serrated edge, and letter identifying the issuing bank. Use sparingly as watermark at low opacity. Color: `--color-engraving`.
- **Treasury seal** — the circular seal on the right of bill faces, with scales and key. Same treatment as Federal Reserve seal.
- **Microprint** — extremely small repeating text used as security feature on modern bills ($100: "THE UNITED STATES OF AMERICA" along Franklin's collar; $20: "USA20" in the numeral). Render as a CSS/SVG decorative border element at 5–6px font size, nearly illegible, in `--color-engraving-dim`.
- **Serial number aesthetic** — the green serial number typeface on bills (a specific monospace style). Use `Share Tech Mono` with `letter-spacing: 0.2em` for section stamps and classification labels to evoke this.
- **"In God We Trust" / "Federal Reserve Note" label styling** — the small-cap serif labels above and below portrait areas. Use `IM Fell English` at small sizes, centered, for section sub-labels.
- **Portrait oval** — the oval framing device around bill portraits. Can be used as a container motif for callout boxes.

### Digital Decay Layer
On top of the federal aesthetic, apply controlled digital corruption:

- **Glitch effect** — occasional horizontal scan-line displacement on headings and the clock. CSS-only animation, triggered on hover or on interval (every 8–12 seconds). Subtle — 2–3px displacement, 80–150ms duration.
- **Scan lines** — very subtle repeating horizontal lines at 1px height, 2px gap, 2% opacity over hero sections.
- **CRT glow** — text-shadow on the clock digits and key numbers: `0 0 10px var(--color-engraving), 0 0 30px var(--color-engraving-dim)`
- **Noise grain** — 3% SVG noise overlay on backgrounds to add analog texture.

### The Doomsday Clock Visual Spec
This is the hero element. Design rules:
- **Shape:** Circular clock face — styled as an official Federal Reserve instrument. Evoke the circular seals and medallions found on currency.
- **Clock hands:** Not traditional — this is a **digital countdown display** styled to look like an official instrument
- **Numerals:** `Share Tech Mono`, large, `--color-engraving` `#6aaa3b`, with CRT glow effect
- **Format displayed:** `MM:SS` — currently **`09:00`** (static)
- **Surrounding ring:** Thin gold `#c9a84c` circular border with tick marks — like the serrated edge of a Federal Reserve seal
- **Label above digits:** `"Dollar Doomsday Clock"` in `IM Fell English`, gold — like the text ring on a Federal Reserve seal
- **Label below digits:** `"MINUTES TO ZERO VALUE"` in `Share Tech Mono`, uppercase, `--color-text-muted`
- **Subtext:** `"Estimated time remaining before the US dollar becomes worthless"` — small, italic, `IM Fell English`, cream
- **Background:** Guilloche pattern radiating from clock center, `--color-engraving` at 4–6% opacity

---

## 05. UI Component Patterns

### Section Structure
Each of the four main sections should feel like a **denomination of currency** or **official Federal Reserve document**:
- Top border: thin gold rule with section number stamp in monospace — styled like the "FEDERAL RESERVE NOTE" designation band on a bill
- Section header in `IM Fell English` — like the "THE UNITED STATES OF AMERICA" text on bill faces
- Subtle guilloche background at low opacity — like the security background of a denomination's back design
- Content padding: generous — `80px 0` vertical minimum

### Cards / Data Panels
- Background: `--color-surface`
- Border: `1px solid var(--color-border)`
- Left accent border: `3px solid var(--color-engraving-dim)` — like the edge color bands on currency
- Label in uppercase `Share Tech Mono` at top — evokes the "SERIES 2017A" / "THIS NOTE IS LEGAL TENDER" label style

### Graphs & Charts
- Background: `--color-surface`
- Grid lines: `--color-border` at 50% opacity
- Primary data line/bar color: `--color-engraving` `#6aaa3b` — BEP intaglio green
- Comparison data: `--color-gold` for gold, `#f7931a` for Bitcoin (native BTC orange), `--color-red` for alarming trends
- Tooltips: dark bg (`--color-surface`), gold border (`--color-gold`), cream text (`--color-cream`), monospace font
- Axis labels: `Share Tech Mono`, `--color-text-muted`, uppercase

### Buttons / CTAs
- Primary: filled `--color-engraving` background, `--color-bg` dark text, monospace label, uppercase
- Secondary: transparent, `--color-engraving` border, `--color-engraving` text
- Hover state: slight glow `box-shadow: 0 0 15px var(--color-engraving-dim)`
- No border-radius — sharp corners only. US currency has no rounded corners.

### Dividers
- Use the filigree SVG pattern — styled after the scrollwork borders on bill edges
- Or: a row of stars in gold monospace: `✦ ✦ ✦` centered, in `--color-gold-dim`
- Thin horizontal rule: `1px solid` with gradient from transparent → `--color-gold-dim` → transparent

---

## 06. Imagery & Icons

- **No photography.** This site does not use stock images.
- **All visuals are SVG-based** — data viz, icons, decorative elements, the clock.
- **Icon style:** Line icons only, stroke-based, in `--color-engraving`. If using an icon library, use Feather Icons or similar minimal stroke set.
- **The dollar sign `$`** — used as a decorative element, never for irony. It's the symbol of what's being lost.
- **Federal Eagle** — can be used as a watermark/seal motif, rendered as SVG line art.

---

## 07. Motion & Animation Principles

- **Slow is serious.** Fast animations feel cheap. Default to `400–600ms` easing.
- **Easing:** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — ease out, feels like weight
- **Scroll reveals:** Elements fade up as they enter viewport. `opacity: 0 → 1`, `translateY(20px → 0)`, `600ms`
- **The clock:** Static display, no animation on the digits themselves (it is frozen at 9:00 to represent the current position). The surrounding ring/glow can pulse slowly — `3s` ease-in-out infinite.
- **Glitch:** Applied to main heading and clock label only. Interval-based, not constant. Code a CSS keyframe with 3-4 micro-displacement steps. Fire every 10–15 seconds via JS `setInterval`.
- **Graph load animation:** Data lines draw in left-to-right on scroll entry — `stroke-dashoffset` animation, `1200ms`.
- **No parallax.** Keep it clean and purposeful.

---

## 08. Copywriting Voice & Tone

**The Dollar Doomsday editorial voice:**

- **Formal but devastating.** Write like a government report that accidentally predicted the apocalypse.
- **Dry wit, not jokes.** The humor comes from understatement and contrast — official language describing catastrophic facts.
- **Data-first.** Every claim is anchored to a real number, date, or source.
- **Never hysterical.** The page is calm. The data is not.
- **Active voice, short sentences.** Maximum one subordinate clause per sentence in body copy.

**Examples of voice in practice:**

✅ *"Since 1913, the US dollar has lost approximately 97% of its purchasing power. The Federal Reserve considers this progress."*

✅ *"The national debt stands at $35 trillion. The good news: it's someone else's problem. The bad news: that someone is you."*

✅ *"Gold has existed as money for 5,000 years. The US dollar has existed for 250. One of these things is not like the other."*

❌ Avoid: exclamation points, slang, ALL CAPS body text, emoji, phrases like "wake up sheeple"

---

## 09. Donation & CTA Section

**Crypto donation block:**
- Styled like a "CONTRIBUTE TO THE CAUSE" government grant application section
- Display wallet address in monospace with a copy-to-clipboard button
- Placeholder: `[CRYPTO WALLET ADDRESS]`
- Small subtext: "Your donation supports independent research into the dollar's decline."
- Accept: BTC, ETH — wallets to be added by site owner

**maybeportugal.com CTA (page footer):**
- Positioned as the final element on the page
- Styled as a classified document final line or emergency broadcast footer
- Copy: *"Looking for a way out of the US?"*
- Followed by: `→ maybeportugal.com` as a styled link
- Tone: Deadpan. No urgency. Just... a door, left open.

---

## 10. Technical Brand Constraints for Claude Code

- **Deployment target:** Cloudflare Pages — static output only, no server-side rendering required
- **No external UI frameworks** (no Bootstrap, Tailwind, Material) — custom CSS only using these design tokens
- **CSS custom properties** for all colors and spacing — defined in `:root` at top of stylesheet
- **All SVG assets** inline or in `/assets/svg/` — no raster images except chart outputs
- **Fonts loaded via Google Fonts** — preconnect and preload for performance
- **Chart library:** Chart.js (CDN) — configured to match brand colors exactly
- **API calls:** Client-side fetch to FRED API and CoinGecko — keys stored in environment variables or Cloudflare Workers secrets
- **No cookies, no tracking, no analytics scripts** — this site is not watching you (unlike the government)
- **Responsive:** Mobile-first. The clock must be legible at 320px width. Graphs must scroll horizontally on mobile rather than compress.
