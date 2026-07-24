import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const angularJsonPath = join(rootDir, 'angular.json');
if (!existsSync(angularJsonPath)) {
  console.error(`angular.json not found at ${angularJsonPath}`);
  process.exit(1);
}

const angularConfig = JSON.parse(readFileSync(angularJsonPath, 'utf-8'));
const buildStorybook = angularConfig.projects?.cli?.architect?.['build-storybook'];
if (!buildStorybook) {
  console.error('build-storybook target not found in angular.json');
  process.exit(1);
}

const outputDir = buildStorybook.options?.outputDir;
if (!outputDir) {
  console.error('outputDir not found in build-storybook options');
  process.exit(1);
}

const buildDir = resolve(rootDir, outputDir);
const indexPath = join(buildDir, 'index.json');

if (!existsSync(indexPath)) {
  console.error(`index.json not found at ${indexPath}`);
  process.exit(1);
}

const index = JSON.parse(readFileSync(indexPath, 'utf-8'));
const entries = Object.values(index.entries).filter(e => e.type === 'docs');

const BASE_URL = 'https://kstepien3.github.io/ng-zen';
const today = new Date().toISOString().split('T')[0];

const xmlUrls = [
  { loc: BASE_URL, priority: '1.0' },
  ...entries.map(e => ({
    loc: `${BASE_URL}/?path=/docs/${e.id}`,
    priority: '0.8',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const sitemapPath = join(buildDir, 'sitemap.xml');
writeFileSync(sitemapPath, sitemap, 'utf-8');
console.log(`sitemap.xml written to ${sitemapPath}`);

console.log(`\nDone. ${entries.length} docs pages + homepage added.`);
