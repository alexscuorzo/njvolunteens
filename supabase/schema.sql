-- NJVolunteens listings table.
-- Run this once in the Supabase SQL Editor (Dashboard > SQL Editor > New query).

create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  org_name text not null,
  description text not null,
  address text,
  city text,
  county text not null,
  cause_areas text[] not null default '{}',
  minimum_age int not null default 14,
  hour_eligible boolean not null default true,
  currently_accepting boolean not null default true,
  urgent_need boolean not null default false,
  contact_name text,
  contact_email text not null,
  contact_phone text,
  signup_url text,
  edit_token text unique not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'archived')),
  last_verified_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists listings_county_idx on listings (county) where status = 'approved';
create index if not exists listings_status_idx on listings (status);

-- All access goes through the app's server using the service role key.
-- Enabling RLS with no policies blocks the public anon key entirely.
alter table listings enable row level security;
