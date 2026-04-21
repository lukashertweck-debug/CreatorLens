create table if not exists analyses (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  platform    text not null,
  handle      text not null,
  niche       text,
  score       integer not null,
  result      jsonb not null,
  created_at  timestamptz not null default now()
);

alter table analyses enable row level security;

create policy "Users can read own analyses"
  on analyses for select
  using (auth.uid() = user_id);

create policy "Users can insert own analyses"
  on analyses for insert
  with check (auth.uid() = user_id);

create policy "Service role has full access to analyses"
  on analyses for all
  using (true)
  with check (true);
