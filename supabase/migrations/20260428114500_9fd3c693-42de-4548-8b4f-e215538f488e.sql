
-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  business_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated-at helper
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Clients table
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  company text,
  notes text,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.clients enable row level security;
create index clients_owner_idx on public.clients(owner_id);

create policy "Users view own clients" on public.clients for select using (auth.uid() = owner_id);
create policy "Users insert own clients" on public.clients for insert with check (auth.uid() = owner_id);
create policy "Users update own clients" on public.clients for update using (auth.uid() = owner_id);
create policy "Users delete own clients" on public.clients for delete using (auth.uid() = owner_id);

create trigger clients_updated_at before update on public.clients
  for each row execute function public.set_updated_at();

-- Documents table
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  client_id uuid references public.clients(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_type text,
  file_size bigint,
  extracted_text text,
  extracted_data jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.documents enable row level security;
create index documents_owner_idx on public.documents(owner_id);
create index documents_client_idx on public.documents(client_id);

create policy "Users view own documents" on public.documents for select using (auth.uid() = owner_id);
create policy "Users insert own documents" on public.documents for insert with check (auth.uid() = owner_id);
create policy "Users update own documents" on public.documents for update using (auth.uid() = owner_id);
create policy "Users delete own documents" on public.documents for delete using (auth.uid() = owner_id);

create trigger documents_updated_at before update on public.documents
  for each row execute function public.set_updated_at();

-- Storage bucket (private)
insert into storage.buckets (id, name, public) values ('documents', 'documents', false);

create policy "Users can view own files"
  on storage.objects for select
  using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can upload own files"
  on storage.objects for insert
  with check (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Users can delete own files"
  on storage.objects for delete
  using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
