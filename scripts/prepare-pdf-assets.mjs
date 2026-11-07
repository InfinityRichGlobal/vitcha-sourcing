import { cpSync, mkdirSync } from 'node:fs';
// Serve PDF fonts and decoders from our own origin, including on mobile/offline caches.
mkdirSync('public/pdfjs', { recursive: true });
for (const directory of ['cmaps', 'standard_fonts', 'wasm']) cpSync(`node_modules/pdfjs-dist/${directory}`, `public/pdfjs/${directory}`, { recursive: true });
cpSync('node_modules/pdfjs-dist/LICENSE', 'public/pdfjs/LICENSE');
