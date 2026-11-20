-- PROV 9:10 | Reseñas públicas compartidas
-- Pega este archivo completo en Supabase > SQL Editor y pulsa Run.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  rating integer not null check (rating between 1 and 5),
  title text not null,
  body text not null,
  product_id text,
  status text not null default 'approved',
  created_at timestamptz not null default now()
);

alter table public.reviews add column if not exists product_id text;
alter table public.reviews add column if not exists status text not null default 'approved';
alter table public.reviews alter column status set default 'approved';
alter table public.reviews add column if not exists created_at timestamptz not null default now();
alter table public.reviews drop constraint if exists reviews_product_id_check;
alter table public.reviews add constraint reviews_product_id_check check (product_id is null or product_id in ('p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15'));

alter table public.reviews enable row level security;
grant usage on schema public to anon, authenticated;
grant select, insert on table public.reviews to anon, authenticated;

drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews" on public.reviews
for select to anon, authenticated using (status = 'approved');

drop policy if exists "Visitors can submit pending reviews" on public.reviews;
create policy "Visitors can submit pending reviews" on public.reviews
for insert to anon, authenticated
with check (status in ('pending','approved') and rating between 1 and 5);

create or replace function public.approve_new_review()
returns trigger language plpgsql as $$
begin
  new.status := 'approved';
  return new;
end;
$$;

drop trigger if exists approve_review_before_insert on public.reviews;
create trigger approve_review_before_insert
before insert on public.reviews
for each row execute function public.approve_new_review();

create index if not exists reviews_product_status_created_idx
on public.reviews(product_id, status, created_at desc);
