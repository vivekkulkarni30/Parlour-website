# Shreya Beauty Parlour

A production-ready React + Vite website for Shreya Beauty Parlour with a premium responsive public site, Supabase-backed booking form, and authenticated admin dashboard.

## Features

- White and sky-blue luxury salon design with responsive sections for hero, about, services, packages, transformations, team, testimonials, gallery, FAQ, booking, contact, Google Maps, and WhatsApp.
- React Router page splitting with lazy-loaded public, admin, login, and 404 routes.
- Framer Motion section entrances, carousel, lightbox, before-and-after slider, scroll progress, back-to-top control, toast notifications, and loading states.
- Appointment form built with React Hook Form and Zod validation.
- Supabase Auth protected admin dashboard with appointment search, filters, status updates, deletes, statistics, and CSV export.
- Supabase SQL schema with RLS policies, content-management tables, active-slot uniqueness, and a secure availability RPC.

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Add your Supabase project values to `.env`:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
VITE_SALON_PHONE=919876543210
VITE_GOOGLE_MAPS_EMBED_URL=https://www.google.com/maps?q=Shreya%20Beauty%20Parlour&output=embed
```

## Supabase Setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](/Users/vivekkulkarni/Documents/Parlour_project/supabase/schema.sql) in the Supabase SQL editor.
3. Create an admin user through Supabase Authentication.
4. Add that user to `public.admin_users`:

```sql
insert into public.admin_users (user_id)
values ('00000000-0000-0000-0000-000000000000');
```

Replace the UUID with the admin user's `auth.users.id`.

## Build

```bash
npm run build
```

The output is generated in `dist/` and can be deployed to Vercel, Netlify, or any static host. Configure the same environment variables in your deployment platform.
