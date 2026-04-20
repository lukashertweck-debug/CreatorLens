-- Run this in the Supabase SQL editor to set up the profiles table.
-- https://supabase.com/dashboard/project/<your-project>/sql/new

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  plan text check (plan in ('starter', 'pro', 'agency')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Only service role can write (webhook handler uses service role key)
create policy "Service role can manage profiles"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
