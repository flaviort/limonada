# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (uses Turbopack)
npm run build     # Build for production (runs next-sitemap as postbuild)
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

**Limonada** is a Next.js 15 App Router site (Portuguese, Brazil) for a boutique consultancy/events agency at `alimonada.com.br`.

### Data layer

Portfolio content is fetched from a headless WordPress instance via GraphQL (`graphql-request`). The WP GraphQL endpoint is set via `WP_GRAPHQL` env var. See [`src/lib/wordpress/`](src/lib/wordpress/) for typed query functions.

### Routing

Pages live under `src/app/` using App Router conventions. The canonical route list and social/contact constants are maintained in [`src/utils/routes.js`](src/utils/routes.js) — update this file when adding pages.

### Styling

- CSS is written in PostCSS (`.pcss` files) under `src/assets/css/base/`, imported by [`src/assets/css/global.css`](src/assets/css/global.css).
- TailwindCSS v4 is used alongside PostCSS.
- Two fonts: `Public Sans` (Google) and `NetworkFreeVersion` (local woff2), exposed as CSS variables `--font-public-sans` and `--font-network-free`.
- A third font (Adobe Typekit) is loaded via `<link>` in the layout head.

### SVG handling

SVGs are imported as React components by default via `@svgr/webpack`. To import as a URL, append `?url` to the import. Inline SVG components live in `src/components/Svg/`.

### Animations

GSAP (with `@gsap/react`) is the primary animation library. Reusable animation wrappers live in `src/components/Utils/Animations/` (e.g. `AnimatedText`, `TextReveal`, `StaggerUp`, `ImageReveal`, `MagneticButton`, `Counter`).

`motion` (Framer Motion) is also a dependency, used for page transitions via `next-transition-router`.

### Key layout wrappers (applied globally in `src/app/layout.tsx`)

- `SmoothScroller` — wraps all page content for smooth scroll behavior
- `PageTransition` — handles animated route transitions
- `ViewportHeight` — sets `--vh` CSS variable for mobile viewport fix
- `Preloader` — shown on production only (skipped in dev)
- `Guidelines` — dev-only grid overlay
- `#portal` div — used by `Portal` component for modals/dialogs

### Portfolio blocks

Individual portfolio project pages (`/portfolio/[project]`) are composed of block components in `src/components/PortfolioBlocks/` (e.g. `Banner`, `BigMedia`, `FullscreenMedia`, `TwoMedia`, `ExpandingGrid`, `StoriesSlider`). The `PortfolioBlock` dispatcher maps block type strings to components.

### Email

Contact form submissions are handled by `src/app/api/resend/route.ts` using the Resend SDK. Requires `RESEND_API_KEY` env var.

### Image optimization

`next/image` is configured with `unoptimized: true` and remote patterns allowing `wp.alimonada.com.br` (WordPress media). Preferred formats are AVIF and WebP.
