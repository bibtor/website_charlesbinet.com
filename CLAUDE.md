# Charles Binet — Personal Portfolio

## Overview
Minimalist personal portfolio for a product designer. The homepage was fully redesigned (Sept 2026) in a plkv.works-inspired direction: dark-only, single accentless palette, muted text with white inline emphasis, and a 3D-animated work showcase. Quality bar: top-tier product designer portfolio.

## Tech
- Next.js 15 (Pages Router) + TypeScript + Tailwind CSS 3
- Framer Motion for all animation; **kugiri** for text line-splitting/reveals
- Inter via `next/font` (homepage); lucide-react icons
- Dev server: port 4000 (`npx next dev -p 4000`)

## Homepage design system (pages/index.tsx)
- Background `#0D0D0F`, dark only (no theme toggle on homepage)
- Panels: `rgba(255,255,255,0.04)`; opaque equivalent `#171719` (use for anything that must not see-through, e.g. fixed header squares)
- Text: white for emphasis, `text-white/50` muted body, `white/40` captions
- One content size: 19px / 1.5 line-height; component chrome 13–15px
- Letter-spacing -0.01em globally on `<main>`

## Homepage layout
- **Fixed header** (top-left, 20px margins): ID card + 3 contact buttons (LinkedIn / Cal / Dribbble). In focus mode the card collapses and the buttons crossfade to a square × close button.
- **Left column (33%)**, scrollable, content dissolves near the header via BOTH a CSS mask on the aside and a JS per-unit fade (kugiri `[data-line]` + `.fade-unit` elements): statement paragraphs (kugiri line reveals) → client logo ticker (2 counter-rotating rows) → domains grid → "Creator of" line → 2×2 apps grid (cursor 3D tilt ±14°) → prompts → quotes stack → principles → nuggets (easter egg).
- **Right column (67%)**: `WorkPile` — one slide at a time, flip-up/push-back 3D transition (direction-aware), cursor tilt, wheel momentum, ↑/↓ arrows + keys, 3s auto-swap. Click seeds **focus mode**.
- **Focus mode**: left column collapses; `WorkFeed` = forever-scrolling vertical case-study feed (3 copies + scroll wrap), per-project sections (Brickanta, Depict, Zettle, Minesquad, Datasweeper, PictoKit) with header/description/Role/Impact text and images/videos (pairs side-by-side). Arrows jump between project headers (wrap-suppression while smooth scrolling). Opens centered on the clicked asset (`initialSrc`).
- **Mobile**: vertical pile hidden; `MobileWorkStrip` (280px, auto-drifting, hand-scrollable, images only) sits after the header; app cards stack icon-above-text; focus feed goes full `100dvh`.

## Key components
- `WorkPile.tsx` — desktop slide showcase; exports `ALL_ASSETS`; SLIDES mirrors the feed's media (solo/pair layout)
- `WorkFeed.tsx` — focus-mode infinite feed; FEED is the single source of case-study content/order
- `MobileWorkStrip.tsx` — mobile horizontal marquee
- `RevealText.tsx` — kugiri masked line reveal (use `opacity:0` pre-split, never `visibility:hidden` — kugiri skips hidden content)
- `ClientTicker.tsx`, `AppsGrid.tsx`, `QuoteStack.tsx`
- Easter egg: nuggets unlock after ~3 full manual passes through the assets (WorkPile manual advances / strip hand-scroll distance)

## Gotchas
- kugiri clones DOM on split → React handlers inside `RevealText` children are lost; use delegated native listeners (see `data-open-portfolio`)
- `depictvid2.mp4` has a white line baked into its bottom edge — cropped via `clip-path: inset(0 0 2px 0 round …)` wherever rendered
- Infinite loops (feed/strip) use 3 rendered copies + scrollTop/Left wrap; suppress the wrap during programmatic smooth scrolls
- Brickanta/Daresay marks need special treatment on dark (white chip bg / invert)
- `pages/index 2.tsx`, `*.backup`, `Comp 1.mp4`, `msvid1.mp4` are local-only leftovers — do not commit (index 2.tsx would become a live route)

## Legacy
- `/portfolio` page (tabs + case components in `components/cases/`) still exists with the old light/dark design but is no longer linked from the homepage; `ThemeToggle`/`ThemeContext` only used there. Recoleta stays for that page (`font-heading`).

### Metadata
- Every page renders `<Head>` with title/description/OG tags; OG image `https://www.charlesbinet.com/avatar.jpeg`; canonical host `www.charlesbinet.com`.
