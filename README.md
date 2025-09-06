# Hashbranch Onboarding (React + Vite)

This is the React rebuild of the onboarding page. It produces static assets suitable for any static host (S3/CloudFront, Netlify, Vercel, Nginx, etc.).

## Install

```bash
npm install
```

## Develop

```bash
npm run dev
```

## Build (static files)

```bash
npm run build
```

Artifacts are emitted to `dist/`. Deploy the entire `dist/` directory.

## Preview the production build

```bash
npm run preview
```

## Structure

- src/global.css — brand variables and UI styles
- src/App.jsx — hero + animated word + layout and composition
- src/components/ — sections and navigation
- index.html — SEO meta, Open Graph, Twitter card, and favicon

## Notes

- The animated rotating word is implemented in React and CSS. For richer effects, we can swap in Framer Motion.
- Progress nav, section reveal animations, copy buttons, and scenario content selection are implemented with lightweight hooks and vanilla APIs.
