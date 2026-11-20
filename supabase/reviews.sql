-- PROV 9:10: tabla y permisos para reseñas públicas compartidas.
-- Ejecuta todo este archivo una sola vez en Supabase > SQL Editor > New query.
create table if not exists public.reviews (
  id text primary key,
  display_name text not null check (char_length(display_name) between 2 and 80),
  rating integer not null check (rating between 1 and 5),
  title text not null check (char_length(title) between 2 and 120),
  body text not null check (char_length(body) between 10 and 2000),
  product_id text null check (product_id is null or product_id in ('p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15')),
  status text not null default 'approved' check (status in ('approved','pending')),
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;
drop policy if exists "Public can read approved reviews" on public.reviews;
drop policy if exists "Visitors can submit pending reviews" on public.reviews;
drop policy if exists "Anyone can read published reviews" on public.reviews;
drop policy if exists "Visitors can publish reviews" on public.reviews;
create policy "Anyone can read published reviews" on public.reviews for select to anon, authenticated using (status = 'approved');
create policy "Visitors can publish reviews" on public.reviews for insert to anon, authenticated with check (status = 'approved' and char_length(display_name) between 2 and 80 and rating between 1 and 5 and char_length(title) between 2 and 120 and char_length(body) between 10 and 2000 and (product_id is null or product_id in ('p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15')));
create index if not exists reviews_product_status_created_idx on public.reviews(product_id,status,created_at desc);
