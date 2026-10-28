-- Server-only storage. No browser/anonymous user can read member credentials.
begin;
create table if not exists public.vitcha_state (
  id text primary key check (id = 'main'),
  version bigint not null default 1 check (version > 0),
  body jsonb not null check (jsonb_typeof(body) = 'object'),
  updated_at timestamptz not null default now()
);
create table if not exists public.vitcha_commits (
  id uuid primary key,
  version bigint not null,
  created_at timestamptz not null default now()
);
create table if not exists public.vitcha_runtime (
  key text primary key,
  value jsonb not null
);
create table if not exists public.vitcha_media (
  id text primary key check (id ~ '^[a-f0-9]{48}$'),
  provider text not null check (provider in ('drive', 'supabase')),
  file_id text not null,
  mime_type text not null,
  bytes bigint not null check (bytes > 0),
  sha256 text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.vitcha_import_chunks (part integer primary key, content text not null);
alter table public.vitcha_import_chunks enable row level security;
revoke all on public.vitcha_import_chunks from public, anon, authenticated;
alter table public.vitcha_state enable row level security;
alter table public.vitcha_commits enable row level security;
alter table public.vitcha_runtime enable row level security;
alter table public.vitcha_media enable row level security;
revoke all on public.vitcha_state, public.vitcha_commits, public.vitcha_runtime, public.vitcha_media from public, anon, authenticated;
grant select, insert, update, delete on public.vitcha_state, public.vitcha_commits, public.vitcha_runtime, public.vitcha_media to service_role;

create or replace function public.vitcha_commit(expected_version bigint, next_body jsonb, commit_id uuid)
returns bigint language plpgsql security invoker set search_path = '' as $$
declare result_version bigint;
begin
  perform pg_advisory_xact_lock(748302910);
  select version into result_version from public.vitcha_commits where id = commit_id;
  if found then return result_version; end if;
  if jsonb_typeof(next_body->'users') is distinct from 'array'
     or jsonb_typeof(next_body->'invites') is distinct from 'array'
     or jsonb_typeof(next_body->'suppliers') is distinct from 'array'
     or jsonb_typeof(next_body->'drinkStores') is distinct from 'array' then
    raise exception sqlstate 'PT400' using message = 'Incomplete database';
  end if;
  update public.vitcha_state set body = next_body, version = version + 1, updated_at = now()
    where id = 'main' and version = expected_version returning version into result_version;
  if not found then raise exception sqlstate 'PT409' using message = 'Stale database revision'; end if;
  insert into public.vitcha_commits(id, version) values (commit_id, result_version);
  delete from public.vitcha_commits where created_at < now() - interval '7 days';
  return result_version;
end;
$$;
revoke all on function public.vitcha_commit(bigint,jsonb,uuid) from public, anon, authenticated;
grant execute on function public.vitcha_commit(bigint,jsonb,uuid) to service_role;
commit;
