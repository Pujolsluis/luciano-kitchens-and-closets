import { palettes, previewPrefix, type Language, type Gallery, type PreviewStyle } from './site.ts';
const liveRoutes = [
 { slug: [], lang:'en', kind:'home' },
 { slug:['es'], lang:'es', kind:'home' },
 { slug:['2022','01','kitchens'], lang:'en', kind:'kitchens' },
 { slug:['2022','01','closets'], lang:'en', kind:'closets' },
 { slug:['es','2022','01','kitchens'], lang:'es', kind:'kitchens' },
 { slug:['es','2022','01','closets'], lang:'es', kind:'closets' },
 { slug:['privacy'], lang:'en', kind:'privacy' },
 { slug:['es','privacy'], lang:'es', kind:'privacy' },
] satisfies {slug:string[];lang:Language;kind:'home'|'privacy'|Gallery}[];
export const routes = [
 ...liveRoutes.map(r=>({...r,staging:false as const})),
 ...(process.env.LOCAL_STAGING==='true' || process.env.PUBLISH_STAGING==='true' ? palettes.flatMap(staging=>liveRoutes.map(r=>({
  ...r,slug:[...previewPrefix(staging).slice(1).split('/'),...r.slug],staging,
 }))) : []),
];
export function routeFor(slug: string[] = []) { return routes.find(r=>r.slug.join('/')===slug.join('/')); }
export function alternatePath(lang: Language, kind: string, staging:PreviewStyle=false) {
 const r=routes.find(r=>r.lang===lang && r.kind===kind && r.staging===staging)!;
 return '/' + (r.slug.length ? r.slug.join('/')+'/' : '');
}
