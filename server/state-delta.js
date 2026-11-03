// Transport only changes, retaining the existing JSON database format. Array
// references are indexes in the *expected* snapshot, protected by SQL CAS.
export function stateDelta(previous, next) {
  if (previous === next) return null;
  if (Array.isArray(previous) && Array.isArray(next)) {
    const key = value => value && typeof value === 'object' && !Array.isArray(value) && typeof value.id === 'string'
      ? `id:${value.id}` : `json:${JSON.stringify(value)}`;
    const indexes = new Map(previous.map((value, index) => [key(value), index]));
    let changed = previous.length !== next.length;
    const items = next.map((value, index) => {
      const from = indexes.get(key(value));
      if (from === undefined) { changed = true; return { value }; }
      const change = stateDelta(previous[from], value);
      if (from !== index || change) changed = true;
      return change ? { from, change } : { from };
    });
    return changed ? { items } : null;
  }
  if (previous && next && typeof previous === 'object' && typeof next === 'object' && !Array.isArray(previous) && !Array.isArray(next)) {
    const fields = Object.create(null);
    const remove = Object.keys(previous).filter(key => !Object.hasOwn(next, key));
    for (const key of Object.keys(next)) {
      const change = Object.hasOwn(previous, key) ? stateDelta(previous[key], next[key]) : { value: next[key] };
      if (change) fields[key] = change;
    }
    return remove.length || Object.keys(fields).length ? { fields, remove } : null;
  }
  return { value: next };
}
