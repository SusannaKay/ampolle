// Build step for Vercel: copies index.html to dist/ and injects the
// project-specific Web Analytics script path that Vercel only exposes at build time.
const fs = require('fs');

const DEFAULT_SRC = '/_vercel/insights/script.js';
let scriptSrc = DEFAULT_SRC;

try {
  const cfg = JSON.parse(process.env.VERCEL_OBSERVABILITY_CLIENT_CONFIG || '{}');
  if (cfg.analytics && cfg.analytics.scriptSrc) scriptSrc = cfg.analytics.scriptSrc;
} catch (e) {
  console.warn('Could not parse VERCEL_OBSERVABILITY_CLIENT_CONFIG:', e.message);
}

const html = fs.readFileSync('index.html', 'utf8').split(DEFAULT_SRC).join(scriptSrc);
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Web Analytics script:', scriptSrc);
