-- Ejecuta este archivo en Supabase > SQL Editor. Es seguro volver a ejecutarlo.
alter table public.reviews add column if not exists product_id text;
alter table public.reviews drop constraint if exists reviews_product_id_check;
alter table public.reviews add constraint reviews_product_id_check check (product_id is null or product_id in ('p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15'));
create index if not exists reviews_product_status_created_idx on public.reviews(product_id,status,created_at desc);
alter table public.reviews enable row level security;
drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews" on public.reviews for select to anon, authenticated using (status = 'approved');
drop policy if exists "Visitors can submit pending reviews" on public.reviews;
create policy "Visitors can submit pending reviews" on public.reviews for insert to anon, authenticated with check (status = 'pending' and (product_id is null or product_id in ('p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15')));
-- El público solo puede leer reseñas aprobadas y enviar reseñas pendientes.
