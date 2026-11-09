# Jefri Junifer — 3D Personal Brand Portfolio

A responsive, interactive personal branding website featuring a WebGL 3D sculpture, modern typography and sections for profile, expertise, career journey, philosophy, and contact.

## Tech Stack
- React + Vite
- Three.js, React Three Fiber, Drei (interactive 3D hero)
- Framer Motion (scroll reveals)
- Lucide icons and responsive CSS

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Deploy to Vercel using the Vite preset. Build command: `npm run build`, output directory: `dist`.

## Customize
Edit `src/main.jsx` to change professional details and public links. The journey section uses general descriptions; verify titles and add exact years before publishing. GitHub is the contact destination until a public email or LinkedIn profile is supplied.

The 3D scene requires WebGL. Reduced-motion preferences are respected.