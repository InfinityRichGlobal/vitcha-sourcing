// Opt-in wire format: transmit each embedded image once, without changing stored records.
export function packSnapshot(snapshot) {
  const images = [], indexes = new Map();
  const visit = value => {
    if (typeof value === 'string' && value.startsWith('data:image/')) {
      if (!indexes.has(value)) { indexes.set(value, images.length); images.push(value); }
      return { $vitchaImage: indexes.get(value) };
    }
    if (Array.isArray(value)) return value.map(visit);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, visit(item)]));
    return value;
  };
  return { wireFormat: 'images-v1', snapshot: visit(snapshot), images };
}
