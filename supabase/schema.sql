create table if not exists public.leads (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 email text not null,
 consent boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.leads enable row level security;
create policy "Allow anonymous lead signup with consent" on public.leads for insert to anon, authenticated with check (consent = true);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id),
 stripe_session_id text unique not null,
 amount_total integer not null,
 currency text not null default 'eur',
 payment_status text not null default 'pending',
 items jsonb not null,
 created_at timestamptz not null default now()
);
alter table public.orders enable row level security;
create policy "Users can read their own orders" on public.orders for select to authenticated using (auth.uid() = user_id);
