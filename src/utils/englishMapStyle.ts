import type { StyleSpecification, ExpressionSpecification } from 'maplibre-gl';

export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

// The provider sometimes fills even English fields with an untranslated local name.
// Keep Latin letters, numbers and English punctuation; omit untranslated labels.
// Limit the scan to 96 characters and omit longer names instead of truncating them.
const label: ExpressionSpecification = ['var', 'englishLabel'];
export const ENGLISH_MAP_LABEL: ExpressionSpecification = [
  'let', 'englishLabel', ['to-string', ['coalesce', ['get', 'name:en'], ['get', 'name_en'], '']],
  ['case', ['all', ['<=', ['length', label], 96],
    ...Array.from({ length: 96 }, (_, index): ExpressionSpecification => {
      const char: ExpressionSpecification = ['slice', label, index, index + 1];
      return ['any', ['<', char, '\u0250'], ['in', char, '’–—“”']];
    }),
  ], label, ''],
];

export function withEnglishLabels(style: StyleSpecification): StyleSpecification {
  return {
    ...style,
    layers: style.layers.map(layer => {
      if (layer.type !== 'symbol' || !layer.layout?.['text-field']) return layer;
      // Keep route numbers (ref) and other non-name labels intact.
      if (!JSON.stringify(layer.layout['text-field']).includes('name')) return layer;
      return { ...layer, layout: { ...layer.layout, 'text-field': ENGLISH_MAP_LABEL } };
    }),
  };
}
