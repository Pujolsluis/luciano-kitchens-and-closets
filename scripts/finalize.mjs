import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync } from 'node:fs';
import { routes } from '../lib/routes.ts';
const output='dist/client';
const base=process.env.NEXT_PUBLIC_BASE_PATH || '';
const origin=process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://pujolsluis.github.io';
if (base && !/^\/[a-zA-Z0-9_-]+$/.test(base)) throw new Error('BASE_PATH must be empty or a single repository path without a trailing slash');
if(new URL(origin).origin!==origin || !origin.startsWith('https://')) throw new Error('SITE_ORIGIN must be an HTTPS origin without a trailing slash');
if(!existsSync(output+'/index.html')) throw new Error('Static export missing dist/client/index.html');
for(const r of routes.filter(r=>r.slug.length)) {
 const target=output+'/'+r.slug.join('/');
 if(existsSync(target+'.html')) {
  mkdirSync(target,{recursive:true});
  renameSync(target+'.html',target+'/index.html');
 }
}
const url=(slug)=>origin+base+'/'+(slug.length?slug.join('/')+'/':'');
const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+routes.map(r=>'  <url><loc>'+url(r.slug)+'</loc></url>').join('\n')+'\n</urlset>\n';
writeFileSync(output+'/sitemap.xml',xml);
const production=['https://www.lucianokitchensandclosets.com','https://lucianokitchensandclosets.com'].includes(origin);
writeFileSync(output+'/robots.txt',production?'User-agent: *\nAllow: /\nSitemap: '+origin+base+'/sitemap.xml\n':'User-agent: *\nDisallow: /\n');
writeFileSync(output+'/.nojekyll','');
const home=base+'/';
mkdirSync(output+'/sample-page',{recursive:true});
writeFileSync(output+'/sample-page/index.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><link rel="canonical" href="'+origin+home+'"><title>Luciano Kitchens & Closets</title><p><a href="'+home+'">Continue to Luciano Kitchens & Closets</a></p><script>location.replace('+JSON.stringify(home)+'+location.hash)</script></html>');
writeFileSync(output+'/404.html','<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Luciano</title><style>body{font:18px/1.6 Arial,sans-serif;max-width:700px;padding:80px 24px;margin:auto;color:#202a27}a{color:#284e40}</style><h1>Let’s get you back home.</h1><p>This page could not be found. / No encontramos esta página.</p><p><a href="'+home+'">English home</a> · <a href="'+home+'es/">Inicio en español</a></p></html>');
for(const r of routes) {
 const file=output+'/'+(r.slug.length?r.slug.join('/')+'/':'')+'index.html';
 if(!existsSync(file)) throw new Error('Missing exported route '+file);
 let html=readFileSync(file,'utf8');
 // Staging remains publicly reviewable without competing with the live business domain.
 if(!production) html=html.replace('</head>','<meta name="robots" content="noindex, nofollow"></head>');
 writeFileSync(file,html);
}
console.log('Prepared '+routes.length+' static pages, sitemap, robots.txt, and 404 page in '+output);
