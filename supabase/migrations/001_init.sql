-- ========================================
-- profiles
-- ========================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles: self read"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles: self update"
  on public.profiles for update
  using (auth.uid() = id);

-- auth.users 登録時に profile を自動作成するトリガー
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ========================================
-- products
-- ========================================
create table public.products (
  id text primary key,
  name text not null,
  description text not null default '',
  price_jpy integer not null,
  stripe_price_id text not null default '',
  audio_path text not null default '',
  sample_audio_path text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "products: public read active"
  on public.products for select
  using (is_active = true);

-- 商品マスタ初期データ
insert into public.products (id, name, description, price_jpy) values
  ('morning-detox', 'Morning-Detox', 'スマホを触らない朝が、一日を変える。', 2480),
  ('night-detox', 'Night-Detox', '寝る1時間前にスマホを置く、その習慣から。', 2480);

-- ========================================
-- purchases
-- ========================================
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id text not null references public.products(id),
  stripe_session_id text not null unique,
  stripe_payment_intent_id text,
  amount_paid integer not null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'refunded')),
  purchased_at timestamptz not null default now()
);

alter table public.purchases enable row level security;

create policy "purchases: self read"
  on public.purchases for select
  using (auth.uid() = user_id);

-- Webhook からの書き込みは service_role が担うためポリシー不要
