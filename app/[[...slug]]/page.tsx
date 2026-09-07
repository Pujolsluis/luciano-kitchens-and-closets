import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Home, Contact, Footer, Privacy } from '@/components/website';
import { Analytics } from '@/components/analytics';
import { GalleryGrid } from '@/components/gallery';
import { PalettePicker } from '@/components/palette-picker';
import { galleryPhotos } from '@/lib/gallery-data';
import { content } from '@/lib/content';
import { routes, routeFor, alternatePath } from '@/lib/routes';
import { business, homePath, path, siteOrigin, imagePath, palettes } from '@/lib/site';

type Props={params:Promise<{slug?:string[]}>};
export const dynamicParams=false;
export function generateStaticParams() { return routes.map(({slug})=>({slug})); }
export async function generateMetadata({params}:Props):Promise<Metadata> {
 const {slug}=await params;
 const route=routeFor(slug);
 if(!route) return {};
 const c=content[route.lang];
 const title=route.kind==='home'?c.title:(route.kind==='privacy'?c.privacy:route.kind==='kitchens'?c.kitchen:c.closet)+' | Luciano';
 const url=siteOrigin+path(alternatePath(route.lang,route.kind,route.staging));
 return {
  title,description:c.description,robots:route.staging?{index:false,follow:false}:undefined,alternates:{canonical:url,languages:{
   en:siteOrigin+path(alternatePath('en',route.kind,route.staging)),es:siteOrigin+path(alternatePath('es',route.kind,route.staging)),
   'x-default':siteOrigin+path(alternatePath('en',route.kind,route.staging)),
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
 const {lang,kind,staging}=route;
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
  {staging && <>
   <aside className="staging-notice"><span>{lang==='en'?'Staging preview · Phone and email links contact the business':'Vista de preproducción · Los enlaces de teléfono y correo contactan al negocio'}</span><span className="staging-links"><a href={'tel:'+business.telephone}>{business.phone}</a><a href={'mailto:'+business.email}>{business.email}</a><a href={path(alternatePath(lang,kind))}>{lang==='en'?'Compare current design':'Comparar diseño actual'} ↗</a></span></aside>
   <PalettePicker lang={lang} current={staging} options={palettes.map((palette)=>({palette,href:path(alternatePath(lang,kind,palette))}))}/>
  </>}
  <Header lang={lang} kind={kind} staging={staging}/>
  <main id="main">
   {kind==='home'?<Home lang={lang} staging={staging}/>:kind==='privacy'?<Privacy lang={lang} staging={staging}/>:<>
    <section className="wrap gallery-heading"><a className="text-link" href={path(homePath(lang,staging))}>← {c.back}</a><p className="eyebrow">{c.galleryLabel}</p><h1>{kind==='kitchens'?c.kitchen:c.closet}</h1><p className="intro">{c.galleryIntro}</p></section>
    <section className="wrap gallery-section" aria-label={kind==='kitchens'?c.kitchen:c.closet}><GalleryGrid lang={lang} photos={galleryPhotos(kind,lang)}/></section>
    <Contact lang={lang} staging={staging}/>
   </>}
  </main>
  <Footer lang={lang} staging={staging}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
  {!staging && <Analytics/>}
 </>;
}
