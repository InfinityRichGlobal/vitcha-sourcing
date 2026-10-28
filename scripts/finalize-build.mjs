import { copyFileSync, writeFileSync } from 'node:fs';
// Preserve GitHub Pages fallback routing and serve Vite's generated assets.
copyFileSync('dist/index.html', 'dist/404.html');
writeFileSync('dist/.nojekyll', '');
