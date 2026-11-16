import test from 'node:test';
import assert from 'node:assert/strict';
import { getSupplierPrice, normalizeSupplierCatalogItem } from '../src/utils/supplierCurrency.js';

test('Thai prices use the baht quote first, including zero, and reinterpret legacy values without conversion', () => {
  assert.deepEqual(getSupplierPrice({ priceThb: 2000, priceRmb: 250 }, 'TH'), { amount: 2000, currency: 'THB' });
  assert.deepEqual(getSupplierPrice({ priceThb: 0, priceRmb: 250 }, 'TH'), { amount: 0, currency: 'THB' });
  assert.deepEqual(getSupplierPrice({ priceRmb: 1234.5 }, 'TH'), { amount: 1234.5, currency: 'THB' });
  assert.deepEqual(getSupplierPrice({ priceRmb: 0 }, 'TH'), { amount: 0, currency: 'THB' });
  assert.equal(getSupplierPrice({}, 'TH'), undefined);
});

test('Chinese and default-country suppliers preserve yuan priority and baht-only quotes', () => {
  for (const country of ['CN', undefined]) {
    assert.deepEqual(getSupplierPrice({ priceRmb: 88, priceThb: 440 }, country), { amount: 88, currency: 'CNY' });
    assert.deepEqual(getSupplierPrice({ priceRmb: 0, priceThb: 440 }, country), { amount: 0, currency: 'CNY' });
    assert.deepEqual(getSupplierPrice({ priceThb: 440 }, country), { amount: 440, currency: 'THB' });
    assert.equal(getSupplierPrice({}, country), undefined);
  }
});

test('Thai catalog normalization removes the misleading yuan field without changing source records or amounts', () => {
  const legacy = { id: 'legacy', name: 'Machine', priceRmb: 1234.5, memo: 'original quote' };
  const normalized = normalizeSupplierCatalogItem(legacy, 'TH');
  assert.deepEqual(normalized, { id: 'legacy', name: 'Machine', priceThb: 1234.5, memo: 'original quote' });
  assert.equal(legacy.priceRmb, 1234.5);
  assert.equal(legacy.priceThb, undefined);
  assert.deepEqual(normalizeSupplierCatalogItem({ id: 'zero', priceThb: 0, priceRmb: 250 }, 'TH'), { id: 'zero', priceThb: 0 });
  assert.deepEqual(normalizeSupplierCatalogItem({ id: 'unpriced' }, 'TH'), { id: 'unpriced' });
  assert.equal(normalizeSupplierCatalogItem(legacy, 'CN'), legacy);
});
