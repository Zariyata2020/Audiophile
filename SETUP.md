# Setup Instructions for Convex & Email Integration

## Prerequisites

# Convex & Email Setup — Quick Guide

This short guide helps you configure the Convex backend and Resend email service used by the app.

Prerequisites

- Node.js (recommended: modern LTS, or >= 20.19 for full compatibility)
- npm or yarn
- A Convex account (free tier available)
- A Resend account for sending emails

Install the Convex CLI

```powershell
npm install -g convex
# or use: npx convex <command> if you prefer not to install globally
```

Initialize Convex (local dev)

From the project root run:

```powershell
npx convex dev
```

What this does

- Creates or connects to a Convex project for you.
- Generates a `convex.json` configuration file in the repo.
- Emits a project URL (the value you will use as `VITE_CONVEX_URL`).

Environment variables

Create a `.env` file in the project root with the following values:

```env
VITE_CONVEX_URL=https://<your-project>.convex.cloud
RESEND_API_KEY=your_resend_api_key_here
```

Tip: the Convex CLI often writes a `.env.local` containing `VITE_CONVEX_URL` when you run `npx convex dev` locally.

Getting a Resend API key

1. Create an account at https://resend.com
2. Go to API Keys in your dashboard and create a key
3. Add that key to your `.env` as `RESEND_API_KEY`

Deploying Convex schema and functions

The database schema and server actions live in `convex/`. To push them to Convex:

```powershell
npx convex deploy
```

During development you can keep `npx convex dev` running — it will watch files in `convex/` and regenerate types.

Email setup notes

- For development you can test emails with Resend’s sandbox or test addresses.
- For production, verify a sending domain in Resend and update the `from` address in `convex/email.ts` to a verified address.

Running the app

```powershell
npm run dev
```

Make sure `npx convex dev` is running while you interact with the checkout flow otherwise order saving and email sending will be disabled or warn in the console.

Troubleshooting

- Convex features not working: confirm `VITE_CONVEX_URL` is set and that the Convex project is running or deployed.
- Emails failing: check `RESEND_API_KEY`, Resend dashboard logs, and that `convex/email.ts` uses a verified `from` address for production.
- Type issues: run `npx convex dev` to regenerate `_generated` types used by the frontend.

Repository pointers

- `convex/schema.ts` — database models
- `convex/orders.ts` — mutations and queries for orders
- `convex/email.ts` — action that sends confirmation emails via Resend

Next steps (suggested)

- Replace the sample `from` address in `convex/email.ts` with your verified domain before sending real emails.
- Deploy the Convex project with `npx convex deploy` and copy the deployment URL to your hosting platform env vars.
- Add `RESEND_API_KEY` to Convex environment via `npx convex env set RESEND_API_KEY <key>` for server-side access.

### Email not sending
