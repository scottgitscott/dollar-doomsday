# Dollar Doomsday — Brand Style Guide

**Version 1.0 | For use by Claude Code when building dollardoomsday.com**

---

## 01. Brand Philosophy

Dollar Doomsday is a darkly comedic, intellectually serious data journalism site about the slow-motion collapse of the US dollar. The brand lives at the intersection of **federal gravitas** and **digital decay** — it should feel like if the Bureau of Engraving and Printing built a website and then slowly watched it glitch apart.

The tone is: *"We're not panicking. We're just reading the data. You should probably panic."*

This is not a conspiracy site. It is not a meme site. It is a site that takes the most official-looking aesthetic possible — US currency design — and uses that same visual language to deliver genuinely alarming facts. The humor comes from the deadpan delivery and the contrast between official seriousness and apocalyptic content.

---

## 02. Color Palette

All colors reference US dollar bill design and federal document aesthetics, then push them into a digital/decay direction.

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#0a0e0a` | Page background — near-black with green undertone |
| `--color-surface` | `#111611` | Card/panel backgrounds |
| `--color-surface-raised` | `#161d16` | Elevated UI elements |
| `--color-border` | `#2a3a2a` | Borders, dividers |
| `--color-engraving` | `#85bb65` | Primary green — dollar bill ink, the hero color |
| `--color-engraving-dim` | `#4d7a3a` | Secondary/muted green |
| `--color-engraving-bright` | `#a8d97a` | Highlight green, hover states |
| `--color-gold` | `#c9a84c` | Gold accent — for key callouts, seals, important labels |
| `--color-gold-dim` | `#8a6f2e` | Muted gold |
| `--color-red` | `#c0392b` | Danger/alert — use sparingly, maximum impact |
| `--color-red-dim` | `#7d1f15` | Secondary red, backgrounds behind red text |
| `--color-text-primary` | `#d4e8d4` | Main body text — slightly green-tinted white |
| `--color-text-secondary` | `#7a9a7a` | Secondary/supporting text |
| `--color-text-muted` | `#4a6a4a` | Fine print, labels |
| `--color-parchment` | `#1a1f14` | Subtle warm parchment layer — use for section backgrounds |

**Primary brand color:** `--color-engraving` `#85bb65`  
**Danger/urgency color:** `--color-red` `#c0392b`  
**Prestige/official accent:** `--color-gold` `#c9a84c`

---

## 03. Typography

The type system pairs **official federal document gravitas** with **cold digital precision**. Two families, no exceptions.

### Display / Headline Font
**`"IM Fell English"`** — Google Fonts  
Used for: Hero headings, section titles, the site name, the clock label, pull quotes  
Characteristics: Authentic historical serif with ink-press texture — evokes 18th-century proclamations, the Declaration of Independence, Federal Reserve notes  
Load via: `https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1`

### Data / UI / Body Font
**`"Share Tech Mono"`** — Google Fonts  
Used for: All body text, data labels, graph annotations, numbers, the countdown clock digits, metadata, legal-style fine print  
Characteristics: Monospaced, technical, slightly military — evokes terminal readouts, ticker tape, classified documents  
Load via: `https://fonts.googleapis.com/css2?family=Share+Tech+Mono`

### Type Scale

| Role | Font | Size | Weight | Case |
|---|---|---|---|---|
| Site name / Hero | IM Fell English | `clamp(3rem, 8vw, 7rem)` | 400 | Title case |
| Section headers | IM Fell English | `clamp(1.8rem, 4vw, 3rem)` | 400 | Title case |
| Subsection headers | Share Tech Mono | `1.1rem` | 400 | UPPERCASE |
| Body text | Share Tech Mono | `0.95rem` | 400 | Sentence case |
| Data labels | Share Tech Mono | `0.75rem` | 400 | UPPERCASE |
| Clock digits | Share Tech Mono | `clamp(5rem, 15vw, 12rem)` | 400 | — |
| Fine print / legal | Share Tech Mono | `0.7rem` | 400 | Sentence case |

### Typography Rules
- Generous line-height on body text: `1.8`
- Tight tracking on monospace UI labels: `letter-spacing: 0.15em`
- IM Fell English headings: `letter-spacing: -0.01em`
- All numbers and data values: always `Share Tech Mono`
- Never mix the two fonts within a single sentence

---

## 04. Visual Identity & Motifs

### Dollar Bill Texture System
The visual DNA comes from US currency design elements. These should appear throughout as subtle overlays, borders, and background patterns:

- **Guilloche patterns** — the fine-line repeating rosette/spiral patterns found in currency backgrounds. Use as SVG overlays at 5–8% opacity on dark section backgrounds.
- **Engraving crosshatch lines** — diagonal line textures that simulate intaglio printing. Apply as CSS patterns on hero sections.
- **Security border filigree** — the ornate rectangular borders found on currency. Use as section dividers and card borders. Should be SVG-based.
- **Federal seal motif** — circular seal imagery (eagle, stars, radiating lines) used sparingly as a watermark or loading indicator.
- **Microprint lines** — extremely small text used as decorative rules (in real dollars these say "THE UNITED STATES OF AMERICA" repeatedly). Can render as a border element.

### Digital Decay Layer
On top of the federal aesthetic, apply controlled digital corruption:

- **Glitch effect** — occasional horizontal scan-line displacement on headings and the clock. CSS-only animation, triggered on hover or on interval (every 8–12 seconds). Subtle — 2–3px displacement, 80–150ms duration.
- **Scan lines** — very subtle repeating horizontal lines at 1px height, 2px gap, 2% opacity over hero sections.
- **CRT glow** — text-shadow on the clock digits and key numbers: `0 0 10px var(--color-engraving), 0 0 30px var(--color-engraving-dim)`
- **Noise grain** — 3% SVG noise overlay on backgrounds to add analog texture.

### The Doomsday Clock Visual Spec
This is the hero element. Design rules:
- **Shape:** Circular clock face, dark background, minimal bezel
- **Clock hands:** Not traditional — this is a **digital countdown display** styled to look like an official instrument
- **Numerals:** `Share Tech Mono`, large, green `#85bb65`, with CRT glow effect
- **Format displayed:** `MM:SS` — currently **`09:00`** (static)
- **Surrounding ring:** Thin gold `#c9a84c` circular border with tick marks at each second position
- **Label below clock:** `"MINUTES TO ZERO VALUE"` in `Share Tech Mono`, uppercase, muted green
- **Subtext:** `"Estimated time remaining before the US dollar becomes worthless"` — small, italic, IM Fell English
- **Background:** Guilloche pattern radiating from clock center

---

## 05. UI Component Patterns

### Section Structure
Each of the four main sections should feel like a **classified federal document** or **official government report**:
- Top border: thin gold line with section number stamp (e.g., `[SECTION 02]`) in monospace
- Section header in IM Fell English
- Subtle guilloche background at low opacity
- Content padding: generous — `80px 0` vertical minimum

### Cards / Data Panels
- Background: `--color-surface`
- Border: `1px solid var(--color-border)`
- Left accent border: `3px solid var(--color-engraving)` — like a classified document tab
- Slight inner shadow for depth
- Label in uppercase monospace at top: acts like a document section header

### Graphs & Charts
- Background: `--color-surface`
- Grid lines: `--color-border` at 50% opacity
- Primary data line/bar color: `--color-engraving` `#85bb65`
- Comparison data: `--color-gold` for gold, `#f7931a` for Bitcoin (native BTC orange), `--color-red` for alarming trends
- Tooltips: styled like classified document callouts — dark bg, gold border, monospace text
- Axis labels: `Share Tech Mono`, `--color-text-muted`, uppercase

### Buttons / CTAs
- Primary: filled `--color-engraving` background, dark text, monospace label, uppercase
- Secondary: transparent, `--color-engraving` border, green text
- Hover state: slight glow `box-shadow: 0 0 15px var(--color-engraving-dim)`
- No border-radius — sharp corners only. Currency has no rounded corners.

### Dividers
- Use thin horizontal rules with the federal filigree pattern
- Or: a row of asterisks/stars in gold monospace: `✦ ✦ ✦` centered

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
