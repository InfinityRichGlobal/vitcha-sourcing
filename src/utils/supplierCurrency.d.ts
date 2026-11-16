import type { CountryOrigin } from '../types';

interface SupplierPriceFields {
  priceRmb?: number;
  priceThb?: number;
}

export function getSupplierPrice(item: SupplierPriceFields, country?: CountryOrigin):
  { amount: number; currency: 'THB' | 'CNY' } | undefined;

export function normalizeSupplierCatalogItem<T extends SupplierPriceFields>(item: T, country?: CountryOrigin): T;
