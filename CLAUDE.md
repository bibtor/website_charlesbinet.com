# Charles Binet — Personal Portfolio

## Overview
Minimalist personal portfolio site for a product designer. Every detail is intentional. The quality bar is a top-tier product designer portfolio — clean, confident, understated.

## Tech
- Next.js 15 (Pages Router) + TypeScript + Tailwind CSS 3
- Framer Motion for all animations
- lucide-react for icons
- No external state management — local `useState` only
- Dev server runs on port 4000 (`next dev -p 4000`)

## Design Principles
1. **Minimalism** — remove anything that doesn't earn its place
2. **Dark/light parity** — every element must look intentional in both modes
3. **Motion with purpose** — animations guide attention, never decorate
4. **Typography hierarchy** — Recoleta (serif) for headings, system sans for body
5. **Whitespace is a feature** — generous spacing, never cramped

## Color Tokens
| Token | Value | Usage |
|-------|-------|-------|
| `bg-light-bg` | `#E8E8E8` | Light mode background |
| `bg-dark-bg` | `#181818` | Dark mode background |
| `text-gray-900` | Tailwind default | Light mode primary text |
| `dark:text-white` | `#FFFFFF` | Dark mode primary text |
| Secondary text | `#75777A` | Subheadings, muted text, back links |

Always use `style={{ color: "#75777A" }}` for secondary text (inline, not a Tailwind class).

## Typography
- **Headings**: `font-heading` class → Recoleta, "Noto Serif", Georgia, serif
- **Body**: system `font-sans` (Tailwind default)
- Sizes: `text-4xl` for page titles, `text-2xl` for section headings, `text-lg` for body, `text-sm` for tab labels and small UI

## Animation Conventions (Framer Motion)
- **Page load entrance**: `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`, duration 0.5s
- **Stagger**: 0.2s increments on `delay` (0, 0.2, 0.4, 0.6...)
- **Content transitions**: `AnimatePresence mode="wait"` with fade in/out
- **Tab underline**: `layoutId="tab-underline"` with spring physics (`stiffness: 500, damping: 35`)
- **Hover**: `whileHover`, `whileTap` for interactive elements
- **Theme toggle**: 180° rotation + opacity fade

## Layout
- Max width: `max-w-[640px]` centered with `mx-auto`
- Padding: `p-8`
- Section spacing: `mb-12` between major sections
- Full height: `min-h-screen`

## Component Patterns

### Pages
- Every page: `<main>` with `min-h-screen bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-300`
- `<ThemeToggle />` fixed top-right on every page

### Portfolio Tabs
- Tab data defined as `const projects = [{ slug, label }] as const`
- Active tab synced to URL query param `?project=slug` via `router.replace` (shallow)
- Selected tab: full text color + animated underline via `layoutId`
- Unselected tab: `#75777A` with hover transition to full color

### Case Studies
- Each case study is a separate component in `components/cases/`
- Naming: `CaseStudy[Name].tsx` (e.g., `CaseStudyDepict.tsx`)
- Must accept `key` prop for `AnimatePresence` transitions
- Wrap content in `motion.div` with enter/exit animations

### Links
- Internal: `<Link href="/">` from `next/link`
- External: `<a>` with `target="_blank" rel="noopener noreferrer"`
- Back links: `ArrowLeft` icon from lucide + "Back" text, `#75777A` color, hover to full color

## File Structure
```
pages/
  index.tsx          — homepage
  portfolio.tsx      — portfolio with tabbed case studies
  _app.tsx           — ThemeProvider wrapper
  _document.tsx      — theme flash prevention
components/
  ThemeContext.tsx    — dark/light mode context + hook
  ThemeToggle.tsx    — fixed sun/moon toggle button
  cases/             — case study components
hooks/
  useMediaQuery.ts   — responsive breakpoint hook
styles/
  globals.css        — Tailwind base + Recoleta font
```
