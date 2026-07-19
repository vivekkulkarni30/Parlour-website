-- Shreya Beauty Parlour database schema
-- Run this in the Supabase SQL editor, then create at least one admin user
-- and insert that user's id into public.admin_users.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2),
  duration_minutes integer,
  image_url text,
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text not null,
  alt_text text,
  category text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  review text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  image_url text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.beauty_packages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2),
  features text[] not null default '{}',
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  role text not null,
  bio text,
  image_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  selected_service text not null,
  appointment_date date not null check (appointment_date >= current_date),
  appointment_time time not null,
  message text,
  booking_status text not null default 'Pending' check (booking_status in ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists appointments_active_slot_unique
  on public.appointments (appointment_date, appointment_time)
  where booking_status in ('Pending', 'Confirmed');

create index if not exists appointments_date_idx on public.appointments (appointment_date);
create index if not exists appointments_service_idx on public.appointments (selected_service);
create index if not exists appointments_status_idx on public.appointments (booking_status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_services_updated_at on public.services;
create trigger set_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists set_gallery_images_updated_at on public.gallery_images;
create trigger set_gallery_images_updated_at
before update on public.gallery_images
for each row execute function public.set_updated_at();

drop trigger if exists set_testimonials_updated_at on public.testimonials;
create trigger set_testimonials_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

drop trigger if exists set_beauty_packages_updated_at on public.beauty_packages;
create trigger set_beauty_packages_updated_at
before update on public.beauty_packages
for each row execute function public.set_updated_at();

drop trigger if exists set_team_members_updated_at on public.team_members;
create trigger set_team_members_updated_at
before update on public.team_members
for each row execute function public.set_updated_at();

drop trigger if exists set_appointments_updated_at on public.appointments;
create trigger set_appointments_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

create or replace function public.is_time_slot_available(slot_date date, slot_time time)
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select not exists (
    select 1
    from public.appointments
    where appointment_date = slot_date
      and appointment_time = slot_time
      and booking_status in ('Pending', 'Confirmed')
  );
$$;

revoke execute on function public.is_admin() from public;
revoke execute on function public.is_time_slot_available(date, time) from public;

alter table public.admin_users enable row level security;
alter table public.services enable row level security;
alter table public.gallery_images enable row level security;
alter table public.testimonials enable row level security;
alter table public.beauty_packages enable row level security;
alter table public.team_members enable row level security;
alter table public.appointments enable row level security;

drop policy if exists "Admins can view admin users" on public.admin_users;
drop policy if exists "Signed-in admin can read own admin row" on public.admin_users;
create policy "Signed-in admin can read own admin row"
on public.admin_users for select
to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Public can read active services" on public.services;
create policy "Public can read active services"
on public.services for select
to anon
using (is_active = true);

drop policy if exists "Admins manage services" on public.services;
create policy "Admins manage services"
on public.services for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active gallery images" on public.gallery_images;
create policy "Public can read active gallery images"
on public.gallery_images for select
to anon
using (is_active = true);

drop policy if exists "Admins manage gallery images" on public.gallery_images;
create policy "Admins manage gallery images"
on public.gallery_images for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active testimonials" on public.testimonials;
create policy "Public can read active testimonials"
on public.testimonials for select
to anon
using (is_active = true);

drop policy if exists "Admins manage testimonials" on public.testimonials;
create policy "Admins manage testimonials"
on public.testimonials for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active packages" on public.beauty_packages;
create policy "Public can read active packages"
on public.beauty_packages for select
to anon
using (is_active = true);

drop policy if exists "Admins manage packages" on public.beauty_packages;
create policy "Admins manage packages"
on public.beauty_packages for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read active team members" on public.team_members;
create policy "Public can read active team members"
on public.team_members for select
to anon
using (is_active = true);

drop policy if exists "Admins manage team members" on public.team_members;
create policy "Admins manage team members"
on public.team_members for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can create appointments" on public.appointments;
create policy "Public can create appointments"
on public.appointments for insert
to anon
with check (
  booking_status = 'Pending'
  and appointment_date >= current_date
);

drop policy if exists "Public can read active appointment slots" on public.appointments;
create policy "Public can read active appointment slots"
on public.appointments for select
to anon
using (booking_status in ('Pending', 'Confirmed'));

drop policy if exists "Admins can manage appointments" on public.appointments;
create policy "Admins can manage appointments"
on public.appointments for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

grant execute on function public.is_time_slot_available(date, time) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;

grant usage on schema public to anon, authenticated;

grant select on public.services to anon;
grant select on public.gallery_images to anon;
grant select on public.testimonials to anon;
grant select on public.beauty_packages to anon;
grant select on public.team_members to anon;

grant insert on public.appointments to anon;
grant select (appointment_date, appointment_time, booking_status) on public.appointments to anon;
grant select, insert, update, delete on public.appointments to authenticated;
grant select on public.admin_users to authenticated;
grant select, insert, update, delete on public.services to authenticated;
grant select, insert, update, delete on public.gallery_images to authenticated;
grant select, insert, update, delete on public.testimonials to authenticated;
grant select, insert, update, delete on public.beauty_packages to authenticated;
grant select, insert, update, delete on public.team_members to authenticated;
