import assert from 'node:assert/strict';
import { existsSync,readFileSync } from 'node:fs';
import { routes } from '../lib/routes.ts';
const output='dist/client';
const base=process.env.NEXT_PUBLIC_BASE_PATH || '';
const origin=process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://pujolsluis.github.io';
const surveys=JSON.parse(readFileSync('config/surveys.json','utf8'));
let checked=0;
for(const r of routes) {
 const pathname='/'+(r.slug.length?r.slug.join('/')+'/':'');
 const file=output+pathname+'index.html';
 const html=readFileSync(file,'utf8');
 assert.match(html,new RegExp('<html[^>]*lang="'+r.lang+'"'),file+' language');
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,file+' has one H1');
 assert.ok(html.includes('rel="canonical" href="'+origin+base+pathname+'"'),file+' canonical');
 for(const lang of ['en','es','x-default']) assert.ok(html.includes('hreflang="'+lang+'"') || html.includes('hrefLang="'+lang+'"'),file+' alternate '+lang);
 assert.ok(html.includes('tel:+18637328482') && html.includes('mailto:info@lucianokitchensandclosets.com'),file+' contact links');
 assert.ok(!html.includes('Untitled site') && !html.includes('Building your site'),file+' no starter copy');
 for(const m of html.matchAll(/<(?:img|script|link|a|iframe)\b[^>]*\b(?:src|href)="([^"]+)"/g)) {
  const raw=m[1].replaceAll('&amp;','&');
  if(!raw.startsWith('/') || raw.startsWith('//')) continue;
  const pathname=raw.split(/[?#]/)[0];
  assert.ok(!base || pathname===base || pathname.startsWith(base+'/'),file+' escaped base path: '+raw);
  const relative=pathname.slice(base.length);
  const target=output+relative;
  assert.ok(existsSync(target) || existsSync(target+'/index.html'),file+' broken local URL: '+raw);
  checked++;
 }
 for(const m of html.matchAll(/<img\b[^>]*>/g)) assert.match(m[0],/\balt="[^"]+"/,file+' image alt');
 for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
  const schema=JSON.parse(m[1]);assert.equal(schema.telephone,'+18637328482');assert.ok(!schema.aggregateRating);assert.ok(!schema.address);
 }
 if(!surveys[r.lang].url && !surveys[r.lang].embedFile) assert.ok(!html.includes('class="survey-frame"'),file+' unconfigured survey is hidden');
}
for(const [lang,s] of Object.entries(surveys)) {
 if(s.url) {
  const u=new URL(s.url);
  assert.equal(u.protocol,'https:');
  assert.ok(/(^|\.)(surveymonkey\.com|research\.net)$/.test(u.hostname),lang+' survey must use an official collector URL');
 }
 if(s.embedFile) {
  assert.ok(s.url,lang+' embedded survey requires a direct collector fallback link');
  assert.match(s.embedFile,/^\/surveys\/[a-zA-Z0-9_-]+\.html$/);
  assert.ok(existsSync('public'+s.embedFile),lang+' missing embed document');
  const embed=readFileSync('public'+s.embedFile,'utf8');
  assert.ok(embed.includes('surveymonkey.com') || embed.includes('research.net'),lang+' missing official embed');
  assert.match(embed,new RegExp('lang="'+lang+'"'),lang+' embed document language');
 }
}
assert.ok(existsSync(output+'/.nojekyll'));
assert.ok(existsSync(output+'/404.html'));
assert.ok(existsSync(output+'/sample-page/index.html'));
for(const anchor of ['about-us','our-services','past-projects','testimonials','contact-us']) {
 assert.ok(readFileSync(output+'/index.html','utf8').includes('id="'+anchor+'"'),'missing legacy anchor '+anchor);
}
assert.ok(readFileSync(output+'/sitemap.xml','utf8').includes(origin+base+'/es/'));
const analytics=readFileSync('components/analytics.tsx','utf8');
assert.ok(analytics.includes('G-SZBVF0E902'));
assert.ok(!analytics.includes('generate_lead'));
console.log('PASS: '+routes.length+' routes, '+checked+' local references, bilingual metadata, contact fallbacks, static hosting, survey configuration.');
