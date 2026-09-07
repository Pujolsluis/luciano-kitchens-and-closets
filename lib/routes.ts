import type { Language, Gallery } from './site';
export const routes = [
 { slug: [], lang:'en', kind:'home' },
 { slug:['es'], lang:'es', kind:'home' },
 { slug:['2022','01','kitchens'], lang:'en', kind:'kitchens' },
 { slug:['2022','01','closets'], lang:'en', kind:'closets' },
 { slug:['es','2022','01','kitchens'], lang:'es', kind:'kitchens' },
 { slug:['es','2022','01','closets'], lang:'es', kind:'closets' },
 { slug:['privacy'], lang:'en', kind:'privacy' },
 { slug:['es','privacy'], lang:'es', kind:'privacy' },
] satisfies {slug:string[];lang:Language;kind:'home'|'privacy'|Gallery}[];
export function routeFor(slug: string[] = []) { return routes.find(r=>r.slug.join('/')===slug.join('/')); }
export function alternatePath(lang: Language, kind: string) {
 const r=routes.find(r=>r.lang===lang && r.kind===kind)!;
 return '/' + (r.slug.length ? r.slug.join('/')+'/' : '');
}
