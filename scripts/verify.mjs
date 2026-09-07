import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { routes } from '../lib/routes.ts';

const output = 'dist/client';
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://pujolsluis.github.io';
const surveys = JSON.parse(readFileSync('config/surveys.json', 'utf8'));
const stagingEnabled = process.env.LOCAL_STAGING === 'true' || process.env.PUBLISH_STAGING === 'true';
const liveRoutes = routes.filter((route) => !route.staging);
const stagingRoutes = routes.filter((route) => route.staging);
const palettes = ['black-gold', 'black-peach', 'white-navy'];
const palettePrefix = { 'black-gold': '/staging/', 'black-peach': '/staging/black-peach/', 'white-navy': '/staging/white-navy/' };
const phone = 'tel:+18637328482';
const email = 'mailto:info@lucianokitchensandclosets.com';
let checked = 0;
const paletteOf = (route) => typeof route.staging === 'string' ? route.staging : null;

assert.equal(liveRoutes.length, 8, 'live route count');
assert.equal(stagingRoutes.length, stagingEnabled ? 24 : 0, 'staging route count');
assert.equal(new Set(stagingRoutes.map(paletteOf)).size, stagingEnabled ? 3 : 0, 'staging palette count');
if (stagingEnabled) {
  for (const palette of palettes) assert.equal(stagingRoutes.filter((route) => paletteOf(route) === palette).length, 8, palette + ' route count');
} else {
  assert.ok(!existsSync(output + '/staging'), 'production build has no staging directory');
}

function routePath(route) { return '/' + (route.slug.length ? route.slug.join('/') + '/' : ''); }
function readPage(route) {
  const file = output + routePath(route) + 'index.html';
  assert.ok(existsSync(file), file + ' exists');
  return [file, readFileSync(file, 'utf8')];
}
function assertLocalReferences(file, html, route) {
  for (const match of html.matchAll(/<(?:img|script|link|a|iframe)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
    const raw = match[1].replaceAll('&amp;', '&');
    if (!raw.startsWith('/') || raw.startsWith('//')) continue;
    const pathname = raw.split(/[?#]/)[0];
    assert.ok(!base || pathname === base || pathname.startsWith(base + '/'), file + ' escaped base path: ' + raw);
    const relative = pathname.slice(base.length);
    assert.ok(existsSync(output + relative) || existsSync(output + relative + '/index.html'), file + ' broken local URL: ' + raw);
    checked++;
  }
  if (route.staging) {
    for (const match of html.matchAll(/<a\b([^>]*?)\bhref="([^"]+)"[^>]*>/g)) {
      const href = match[2].replaceAll('&amp;', '&').split(/[?#]/)[0];
      if (href.startsWith(base+'/staging/')) {
        const target=routes.find(candidate=>base+routePath(candidate)===href);
        assert.equal(target?.staging,route.staging,file+' escaped selected palette: '+href);
      }
    }
  }
}

for (const route of routes) {
  const [file, html] = readPage(route);
  const pathname = routePath(route);
  assert.match(html, new RegExp('<html[^>]*lang="' + route.lang + '"'), file + ' language');
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, file + ' has one H1');
  assert.ok(html.includes('rel="canonical" href="' + origin + base + pathname + '"'), file + ' canonical');
  for (const lang of ['en', 'es', 'x-default']) assert.ok(html.includes('hreflang="' + lang + '"') || html.includes('hrefLang="' + lang + '"'), file + ' alternate ' + lang);
  assert.ok(html.includes(phone) && html.includes(email), file + ' contact links');
  assert.ok(!html.includes('Untitled site') && !html.includes('Building your site'), file + ' no starter copy');
  assert.equal(html.includes('class="brand-staging"'), Boolean(route.staging), file + ' isolates staging style');
  assertLocalReferences(file, html, route);
  for (const match of html.matchAll(/<img\b[^>]*>/g)) assert.match(match[0], /\balt="[^"]+"/, file + ' image alt');
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const schema = JSON.parse(match[1]); assert.equal(schema.telephone, '+18637328482'); assert.ok(!schema.aggregateRating); assert.ok(!schema.address);
  }
  if (route.staging) {
    const prefix = palettePrefix[paletteOf(route)];
    assert.ok(prefix, file + ' has a supported palette');
    assert.match(html, /<meta name="robots" content="noindex[^"]*"/, file + ' staging is noindex');
    assert.ok(!html.includes('G-SZBVF0E902'), file + ' staging omits analytics');
    assert.ok(!html.includes('class="survey-frame"'), file + ' staging omits survey embeds');
    assert.ok(html.includes(route.lang==='en'?'Phone and email links contact the business':'Los enlaces de teléfono y correo contactan al negocio'),file+' labels real business contacts');
    assert.ok(html.includes('data-palette="' + paletteOf(route) + '"'), file + ' selected palette marker');
    const select = html.match(/<select[^>]*class="palette-select"[^>]*>([\s\S]*?)<\/select>/);
    assert.ok(select, file + ' palette dropdown');
    assert.ok(select[0].includes('data-current="' + paletteOf(route) + '"'), file + ' selected palette marker');
    const options = [...select[1].matchAll(/<option[^>]*>/g)].map((match) => match[0]);
    assert.equal(options.length, 3, file + ' palette options');
    assert.ok(options.some((option) => option.includes('value="' + base + pathname + '"') && option.includes('data-palette="' + paletteOf(route) + '"')), file + ' selected palette href');
    for (const palette of palettes) {
      const target=routes.find(candidate=>candidate.staging===palette && candidate.lang===route.lang && candidate.kind===route.kind);
      assert.ok(options.some((option)=>option.includes('value="'+base+routePath(target)+'"') && option.includes('data-palette="'+palette+'"')),file+' palette navigation '+palette);
    }
    assert.ok(html.includes('href="' + base + prefix + (route.lang === 'es' ? 'es/' : '') + '"'), file + ' staging home link');
    assert.ok(!readFileSync(output + '/sitemap.xml', 'utf8').includes(origin + base + pathname), file + ' staging excluded from sitemap');
  }
  if (!route.staging && !stagingEnabled) assert.ok(!html.includes('palette-select') && !html.includes('brand-staging'), file + ' production omits staging picker');
  if (!surveys[route.lang].url && !surveys[route.lang].embedFile) assert.ok(!html.includes('class="survey-frame"'), file + ' unconfigured survey is hidden');
}

for (const [lang, survey] of Object.entries(surveys)) {
  if (survey.url) { const url = new URL(survey.url); assert.equal(url.protocol, 'https:'); assert.ok(/(^|\.)(surveymonkey\.com|research\.net)$/.test(url.hostname), lang + ' survey must use an official collector URL'); }
  if (survey.embedFile) {
    assert.ok(survey.url, lang + ' embedded survey requires a direct collector fallback link'); assert.match(survey.embedFile, /^\/surveys\/[a-zA-Z0-9_-]+\.html$/); assert.ok(existsSync('public' + survey.embedFile), lang + ' missing embed document');
    const embed = readFileSync('public' + survey.embedFile, 'utf8'); assert.ok(embed.includes('surveymonkey.com') || embed.includes('research.net'), lang + ' missing official embed'); assert.match(embed, new RegExp('lang="' + lang + '"'), lang + ' embed document language');
  }
}

assert.ok(existsSync(output + '/.nojekyll')); assert.ok(existsSync(output + '/404.html')); assert.ok(existsSync(output + '/sample-page/index.html'));
for (const anchor of ['about-us', 'our-services', 'past-projects', 'testimonials', 'contact-us']) assert.ok(readFileSync(output + '/index.html', 'utf8').includes('id="' + anchor + '"'), 'missing legacy anchor ' + anchor);
const sitemap = readFileSync(output + '/sitemap.xml', 'utf8'); assert.ok(sitemap.includes(origin + base + '/es/')); assert.ok(!sitemap.includes(origin + base + '/staging/'));
const analytics = readFileSync('components/analytics.tsx', 'utf8'); assert.ok(analytics.includes('G-SZBVF0E902')); assert.ok(!analytics.includes('generate_lead'));
if (stagingEnabled) {
  const css = readFileSync('app/staging.css', 'utf8');
  for (const url of css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) {
    const asset = url[2];
    if (asset.startsWith('/')) assert.ok(existsSync('public' + asset), 'missing local staging font or asset: ' + asset);
    else if (!/^(?:https?:|data:)/.test(asset)) assert.ok(existsSync('app/' + asset), 'missing local staging font or asset: ' + asset);
  }
}
console.log('PASS: ' + routes.length + ' routes, ' + checked + ' local references, bilingual metadata, contact fallbacks, static hosting, survey configuration.');
