# Audiophile — Project Overview

This repository contains a compact, responsive e-commerce front end for premium audio gear. It’s written in TypeScript with React and styled with Tailwind. The site integrates with Convex for order storage and Resend for transactional email delivery.

Why this project exists

- A focused example of a modern, component-driven storefront.
- Clean, mobile-first styling with practical accessibility considerations.
- A minimal backend (Convex) to demonstrate storing orders and sending confirmation emails.

Quick badges

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4.1.16-38B2AC?logo=tailwind-css)

Core capabilities

- Responsive product catalog with individual product pages.
- Persistent shopping cart (localStorage).
- Checkout with form validation and basic payment options (e‑money / cash on delivery).
- Order persistence in Convex and optional email confirmations via Resend.

Tech summary

- Frontend
  - React 18.3.1
  - TypeScript 5.9.x
  - TailwindCSS 4.x
  - Vite for development and production builds

- Backend
  - Convex for serverless actions and persistent storage

Getting started (local)

1. Clone this repository and enter the project folder:

```powershell
git clone <repository-url>
cd Audiophile
```

2. Install dependencies:

```powershell
npm install
```

3. Start Convex locally (recommended while developing the checkout flow):

```powershell
npx convex dev
```

4. Add runtime environment variables. Create a `.env` file in the project root with the following keys:

```env
VITE_CONVEX_URL=<the-url-from-convex>
RESEND_API_KEY=<your_resend_api_key>
```

Note: when running `npx convex dev` the CLI will often write `.env.local` for you with `VITE_CONVEX_URL` set.

Run locally

```powershell
npm run dev
# open http://localhost:5173
```

Production build

```powershell
npm run build
npm run preview
```

The compiled static site is placed in `dist/` for deployment.

Environment variables and services

- VITE_CONVEX_URL — required for Convex reads/writes from the frontend.
- RESEND_API_KEY — required by Convex server actions that send order emails.

Deployment notes

You can host the static output on any static hosting provider. Recommended flow:

- Push to GitHub and deploy with Vercel or Netlify.
- Configure the build command as `npm run build` and the publish directory as `dist`.
- Add `VITE_CONVEX_URL` (and any other required secrets) to your deployment environment variables.

Convex

- Use the Convex CLI to deploy the backend schema and serverless actions:

```powershell
npx convex deploy
```

- After deploying Convex, copy the project URL and set it as `VITE_CONVEX_URL` in your hosting platform.

Troubleshooting

- If frontend cannot reach Convex, verify `VITE_CONVEX_URL` is correctly set and the Convex project is active.
- Emails not sending: ensure `RESEND_API_KEY` is configured in Convex environment and that your Resend account is active.

Project layout (high level)

```
convex/       # Convex backend files (schema, actions)
src/          # React app source
   components/ # UI components
   pages/      # Page components and routes
dist/         # Built static site (generated)
package.json
vite.config.ts
```

License & credits

This project was created as part of a training submission. The code and assets included here are intended for learning and demonstration.

— Thanks for checking it out.
