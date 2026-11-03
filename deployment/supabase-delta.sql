-- Apply before deploying the delta writer. Additive: existing full commits and
-- stored documents remain compatible. No data migration or client grants.
begin;
create or replace function public.vitcha_apply_delta(previous jsonb, delta jsonb)
returns jsonb language plpgsql immutable security invoker set search_path = '' as $$
declare result jsonb; entry jsonb; source_index integer;
begin
  if delta = 'null'::jsonb then return previous; end if;
  if jsonb_typeof(delta) is distinct from 'object' then
    raise exception sqlstate 'PT400' using message = 'Invalid state delta';
  end if;
  if delta ? 'value' then return delta->'value'; end if;
  if delta ? 'items' and jsonb_typeof(previous) = 'array' and jsonb_typeof(delta->'items') = 'array' then
    -- Validate references before aggregation. JSON null is a value, never deletion.
    for entry in select value from jsonb_array_elements(delta->'items') loop
      if not entry ? 'value' then
        if jsonb_typeof(entry->'from') is distinct from 'number' or (entry->>'from') !~ '^[0-9]+$' then
          raise exception sqlstate 'PT400' using message = 'Invalid array reference';
        end if;
        source_index := (entry->>'from')::integer;
        if source_index >= jsonb_array_length(previous) then
          raise exception sqlstate 'PT400' using message = 'Array reference out of range';
        end if;
      end if;
    end loop;
    select coalesce(jsonb_agg(case when value ? 'value' then value->'value'
      when value ? 'change' then public.vitcha_apply_delta(previous->((value->>'from')::integer), value->'change')
      else previous->((value->>'from')::integer) end order by ordinal), '[]'::jsonb)
      into result from jsonb_array_elements(delta->'items') with ordinality as items(value, ordinal);
    return result;
  end if;
  if delta ? 'fields' and jsonb_typeof(previous) = 'object'
     and jsonb_typeof(delta->'fields') = 'object' and jsonb_typeof(delta->'remove') = 'array' then
    -- Rebuild a changed object once, not once per field in a multi-MB document.
    select coalesce(jsonb_object_agg(key, value), '{}'::jsonb) into result from (
      select key, value from jsonb_each(previous)
        where not (delta->'fields') ? key and not (delta->'remove') ? key
      union all
      select key, public.vitcha_apply_delta(previous->key, value) from jsonb_each(delta->'fields')
    ) as fields;
    return result;
  end if;
  raise exception sqlstate 'PT400' using message = 'Invalid state delta shape';
end;
$$;
revoke all on function public.vitcha_apply_delta(jsonb,jsonb) from public, anon, authenticated;
grant execute on function public.vitcha_apply_delta(jsonb,jsonb) to service_role;

create or replace function public.vitcha_commit_delta(expected_version bigint, delta jsonb, commit_id uuid)
returns bigint language plpgsql security invoker set search_path = '' as $$
declare result_version bigint; previous jsonb; next_body jsonb;
begin
  perform pg_advisory_xact_lock(748302910);
  select version into result_version from public.vitcha_commits where id = commit_id;
  if found then return result_version; end if;
  select body into previous from public.vitcha_state where id = 'main' and version = expected_version;
  if not found then raise exception sqlstate 'PT409' using message = 'Stale database revision'; end if;
  next_body := public.vitcha_apply_delta(previous, delta);
  -- Reuse the same validation, atomic version update and receipt as old writers.
  return public.vitcha_commit(expected_version, next_body, commit_id);
end;
$$;
revoke all on function public.vitcha_commit_delta(bigint,jsonb,uuid) from public, anon, authenticated;
grant execute on function public.vitcha_commit_delta(bigint,jsonb,uuid) to service_role;
notify pgrst, 'reload schema';
commit;
