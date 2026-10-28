import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../src/utils/englishMapStyle.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { withEnglishLabels, ENGLISH_MAP_LABEL } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
test('map language removes native-script name fallback while keeping road numbers and styles', () => {
  const original = { version: 8, sources: {}, layers: [
    { id: 'city', type: 'symbol', layout: { 'text-field': ['concat', ['get', 'name_en'], '\n', ['get', 'name:nonlatin']], 'text-size': 14 } },
    { id: 'road-number', type: 'symbol', layout: { 'text-field': ['get', 'ref'] } },
    { id: 'water', type: 'fill', paint: { 'fill-color': '#abc' } },
  ] };
  const english = withEnglishLabels(original);
  assert.deepEqual(english.layers[0].layout['text-field'], ENGLISH_MAP_LABEL);
  assert.equal(english.layers[0].layout['text-size'], 14);
  assert.deepEqual(english.layers[1], original.layers[1]);
  assert.deepEqual(english.layers[2], original.layers[2]);
  assert.ok(!JSON.stringify(ENGLISH_MAP_LABEL).includes('nonlatin'));
  assert.equal(original.layers[0].layout['text-field'][0], 'concat');
});

test('provider labels with untranslated Chinese are omitted, including mixed-script names', async () => {
  const { createExpression } = await import('@maplibre/maplibre-gl-style-spec');
  const result = createExpression(ENGLISH_MAP_LABEL, 'layers[0].layout.text-field');
  assert.equal(result.result, 'success', JSON.stringify(result.value));
  const render = properties => result.value.evaluate({ zoom: 10 }, { type: 1, properties });
  assert.equal(render({ 'name:en': 'Guangzhou', name_en: '广州' }), 'Guangzhou');
  assert.equal(render({ name_en: 'Dongguan' }), 'Dongguan');
  assert.equal(render({ name_en: '立沙岛' }), '');
  assert.equal(render({ name_en: 'Guangzhou 广州' }), '');
  assert.equal(render({ name: '广州', 'name:latin': '广州' }), '');
  assert.equal(render({ name_en: 'St. John’s Island' }), 'St. John’s Island');
  assert.equal(render({ name_en: 'a'.repeat(97) }), '');
});
