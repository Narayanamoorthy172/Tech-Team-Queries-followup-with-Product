# Product Follow-up Tracker

A lightweight issue/email/follow-up tracker for everything you send to your
Product Team — so you always know what's open, what's overdue, and what ETA
you were promised.

**Status: Phase 1 of 11 complete — Project setup + UI shell.**

This README will be replaced with the full project guide (setup, Supabase,
deployment, troubleshooting) at the end of Phase 11. For now, here's how to
run what exists today.

## What's built so far (Phase 1)

- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- A hand-built shadcn/ui-style component library (button, input, select,
  dialog, table, badge, tabs, etc.) in `components/ui/`
- The full navigation shell: sidebar (desktop) + mobile menu + top bar
- Every page in the app, showing sample/preview data:
  - `/dashboard`, `/requests`, `/requests/new`, `/requests/[id]`,
    `/requests/[id]/edit`, `/follow-ups`, `/reports`, `/settings`
  - `/login`, `/signup`, `/forgot-password`

Nothing is connected to a real database yet — every button and form works
visually but only shows a preview message. Supabase (database + real
authentication) is Phase 2.

## Running it on your own computer

1. Install [Node.js](https://nodejs.org) version 20.9 or later (the LTS
   version is fine).
2. Unzip this project and open a terminal in this folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

You should land on the Dashboard with sample numbers, and be able to click
through Requests, Follow-ups, Reports, Settings, and the Login/Signup pages.

## What's next

Phase 2 adds a real Supabase database and real login/signup, so your data
is actually saved and private to you.
