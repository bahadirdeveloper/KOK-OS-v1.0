-- 1. Tabloyu Oluştur (Eğer yoksa)
create table if not exists public.intakes (
  id bigint generated always as identity primary key,
  created_at timestamptz default now(),
  business_name text,
  contact_email text,
  payload jsonb, -- Tüm dinamik form cevapları (37 soru) burada tutulur
  status text default 'pending'
);

-- 2. RLS (Satır Düzeyinde Güvenlik) Aktifleştir
alter table public.intakes enable row level security;

-- 3. Anonim Kullanıcıların Form Göndermesine İzin Ver
-- (Önce eski politikayı temizleyelim ki hata vermesin)
drop policy if exists "Herkes form gönderebilir" on public.intakes;

create policy "Herkes form gönderebilir"
on public.intakes for insert
to anon
with check (true);

-- 4. Okuma İzni (Sadece servis rolü veya adminler okuyabilir)
-- Anonim kullanıcılar kendi gönderdikleri dahil verileri okuyamazlar (Güvenlik için)
drop policy if exists "Sadece adminler okuyabilir" on public.intakes;

create policy "Sadece adminler okuyabilir"
on public.intakes for select
to service_role
using (true);
