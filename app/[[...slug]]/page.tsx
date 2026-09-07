import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Home, Contact, Footer, Privacy } from '@/components/website';
import { Analytics } from '@/components/analytics';
import { GalleryGrid } from '@/components/gallery';
import { galleryPhotos } from '@/lib/gallery-data';
import { content } from '@/lib/content';
import { routes, routeFor, alternatePath } from '@/lib/routes';
import { business, homePath, path, siteOrigin, imagePath } from '@/lib/site';

type Props={params:Promise<{slug?:string[]}>};
export const dynamicParams=false;
export function generateStaticParams() { return routes.map(({slug})=>({slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata> {
 const {slug}=await params;
 const route=routeFor(slug);
 if(!route) return {};
 const c=content[route.lang];
 const title=route.kind==='home'?c.title:(route.kind==='privacy'?c.privacy:route.kind==='kitchens'?c.kitchen:c.closet)+' | Luciano';
 const url=siteOrigin+path(alternatePath(route.lang,route.kind));
 return {
  title,description:c.description,alternates:{canonical:url,languages:{
   en:siteOrigin+path(alternatePath('en',route.kind)),es:siteOrigin+path(alternatePath('es',route.kind)),
   'x-default':siteOrigin+path(alternatePath('en',route.kind)),
  }},
  icons:{icon:imagePath('icono-logo-PNG-28',720)},
  openGraph:{title,description:c.description,url,siteName:business.name,type:'website',locale:route.lang==='es'?'es_US':'en_US',alternateLocale:route.lang==='es'?'en_US':'es_US'},
  twitter:{card:'summary',title,description:c.description},
 };
}
export default async function Page({params}:Props) {
 const {slug}=await params;
 const route=routeFor(slug);
 if(!route) notFound();
 const {lang,kind}=route;
 const c=content[lang];
 const schema={
  '@context':'https://schema.org','@type':'HomeAndConstructionBusiness',
  '@id':siteOrigin+path('/')+'#business',name:business.name,url:siteOrigin+path('/'),
  telephone:business.telephone,email:business.email,
  logo:siteOrigin+imagePath('horizontal-logo-luciano-kitchens-and-closets',720),
  areaServed:business.areas.map(name=>({'@type':'Place',name})),
  sameAs:[business.instagram,business.facebook,business.reviews],
 };
 return <>
  <Header lang={lang} kind={kind}/>
  <main id="main">
   {kind==='home'?<Home lang={lang}/>:kind==='privacy'?<Privacy lang={lang}/>:<>
    <section className="wrap gallery-heading"><a className="text-link" href={path(homePath(lang))}>← {c.back}</a><p className="eyebrow">{c.galleryLabel}</p><h1>{kind==='kitchens'?c.kitchen:c.closet}</h1><p className="intro">{c.galleryIntro}</p></section>
    <section className="wrap gallery-section" aria-label={kind==='kitchens'?c.kitchen:c.closet}><GalleryGrid lang={lang} photos={galleryPhotos(kind,lang)}/></section>
    <Contact lang={lang}/>
   </>}
  </main>
  <Footer lang={lang}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
  <Analytics/>
 </>;
}
