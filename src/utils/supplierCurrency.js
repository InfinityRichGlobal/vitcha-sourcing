// The former supplier form saved every price in priceRmb, even for Thailand.
// Thai legacy values are baht amounts: relabel them without applying an FX rate.
export function getSupplierPrice(item, country) {
  if (country === 'TH') {
    const amount = item.priceThb ?? item.priceRmb;
    return amount == null ? undefined : { amount, currency: 'THB' };
  }
  if (item.priceRmb != null) return { amount: item.priceRmb, currency: 'CNY' };
  if (item.priceThb != null) return { amount: item.priceThb, currency: 'THB' };
  return undefined;
}

export function normalizeSupplierCatalogItem(item, country) {
  if (country !== 'TH') return item;
  const { priceRmb, ...rest } = item;
  const price = getSupplierPrice(item, country);
  return price ? { ...rest, priceThb: price.amount } : rest;
}
