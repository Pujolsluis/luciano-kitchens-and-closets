import { ArrowDown, ArrowUpRight, ArrowRight, Phone, Check, Mail, MapPin, Camera } from 'lucide-react';
import { content } from '@/lib/content';
import { business, homePath, galleryPath, path, imagePath, heroImage, closetImage, logoImage, type Language, type Gallery, type PreviewStyle } from '@/lib/site';
import { alternatePath } from '@/lib/routes';
import { ProjectImage } from './project-image';
import { Survey } from './survey';

export function Header({lang,kind,staging=false}: {lang:Language;kind:string;staging?:PreviewStyle}) {
 const c=content[lang];
 const home=path(homePath(lang,staging));
 const other=lang==='en'?'es':'en';
 return <>
  <a className="skip-link" href="#main">{c.skip}</a>
  <div className="topline"><span>{c.topline}</span><a href={'tel:'+business.telephone} data-track="phone_click"><Phone size={13}/>{business.phone}</a></div>
  <header className="header wrap">
   <a href={home} aria-label={business.name}><img className="brand" src={imagePath(logoImage,720)} width="340" height="136" alt={business.name}/></a>
   <nav aria-label={lang==='en'?'Main navigation':'Navegación principal'}>{c.nav.map((n,i)=><a key={n} href={home+['#work','#services','#story'][i]}>{n}</a>)}</nav>
   <div className="header-actions">
    <a className="language" href={path(alternatePath(other,kind,staging))} hrefLang={other} lang={other} aria-label={lang==='en'?'Ver en español':'View in English'}>{other.toUpperCase()}</a>
    <a className="button button-small" href={home+'#contact'} data-track="quote_engagement">{c.quote}<ArrowUpRight size={16}/></a>
   </div>
  </header>
 </>;
}

export function Contact({lang,staging=false}: {lang:Language;staging?:PreviewStyle}) {
 const c=content[lang];
 return <section className="contact-section" id="contact"><span className="legacy-anchor" id="contact-us" aria-hidden="true"/><div className="wrap contact-grid">
  <div><p className="eyebrow">{c.contactLabel}</p><h2>{c.contactTitle}</h2><p className="intro">{c.contactIntro}</p><div className="contact-hours"><span>{c.hours}</span><small>{c.hoursNote}</small></div></div>
  <div className="contact-card"><p>{c.contactFallback}</p>
   <a className="contact-link" href={'tel:'+business.telephone} data-track="phone_click"><span className="contact-icon"><Phone size={21}/></span><span><small>{c.call}</small><strong>{business.phone}</strong></span><ArrowUpRight size={23}/></a>
   <a className="contact-link email-link" href={'mailto:'+business.email} data-track="email_click"><span className="contact-icon"><Mail size={21}/></span><span><small>{c.email}</small><strong>{business.email}</strong></span><ArrowUpRight size={23}/></a>
   {!staging && <Survey lang={lang}/>}
  </div>
 </div></section>;
}

export function Footer({lang,staging=false}: {lang:Language;staging?:PreviewStyle}) {
 const c=content[lang];
 return <>
  <footer className="wrap footer">
   <div className="footer-top"><div><a href={path(homePath(lang,staging))}><img className="brand" src={imagePath(logoImage,720)} alt={business.name} width="180" height="72" loading="lazy"/></a><p>{c.footer}</p></div>
    <div className="footer-nav"><a href={path(galleryPath(lang,'kitchens',staging))}>{c.kitchen}</a><a href={path(galleryPath(lang,'closets',staging))}>{c.closet}</a><a href={path(homePath(lang,staging))+'#contact'}>{c.quote}</a></div>
    <div className="socials"><a href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Camera size={22}/></a><a href={business.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><span aria-hidden="true">f</span></a></div>
   </div>
   <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}. {c.allRights}</span><a href={path(alternatePath(lang,'privacy',staging))}>{c.privacy}</a></div>
  </footer>
  <div className="mobile-contact"><a href={'tel:'+business.telephone} data-track="phone_click"><Phone size={17}/>{c.call}</a><a href={path(homePath(lang,staging))+'#contact'} data-track="quote_engagement">{c.quote}<ArrowUpRight size={18}/></a></div>
 </>;
}

export function Home({lang,staging=false}: {lang:Language;staging?:PreviewStyle}) {
 const c=content[lang];
 return <>
  <section className="hero wrap">
   <div className="hero-copy"><p className="eyebrow">{c.eyebrow}</p><h1>{c.headline[0]}<br/><em>{c.headline[1]}</em></h1><p className="intro">{c.intro}</p>
    <div className="hero-actions"><a className="button" href="#contact" data-track="quote_engagement">{c.quote}<ArrowUpRight size={18}/></a><a className="text-link" href="#work">{c.explore}<ArrowDown size={16}/></a></div>
    <div className="hero-note"><span className="mini-rule"/>{c.note}</div>
   </div>
   <div className="hero-visual">
    <ProjectImage id={heroImage} alt={lang==='en'?'Custom white kitchen with waterfall island and warm cabinet lighting':'Cocina blanca a medida con isla y luces cálidas en los gabinetes'} eager sizes="(max-width:760px) 100vw, 58vw"/>
    <a className="image-caption" href={path(galleryPath(lang,'kitchens',staging))}><span>{c.photoLabel}</span><ArrowUpRight size={22}/></a>
    <div className="experience"><strong>30<span>+</span></strong><span>{c.years}</span></div>
   </div>
  </section>
  <div className="trust wrap">{c.trust.map(t=><span key={t}><Check size={17}/>{t}</span>)}</div>
  <section className="section wrap" id="work"><span className="legacy-anchor" id="past-projects" aria-hidden="true"/>
   <div className="section-heading"><div><p className="eyebrow">{c.projectsLabel}</p><h2>{c.projectsTitle}</h2></div><p className="intro">{c.projectsIntro}</p></div>
   <div className="project-grid">{(['kitchens','closets'] as Gallery[]).map((g,i)=><a className="project-card" href={path(galleryPath(lang,g,staging))} key={g}>
    <div className="project-photo"><ProjectImage id={i===0?'luciano_custom_kitchen_wood_quartz_island':closetImage} alt={i===0?(lang==='en'?'Wood kitchen cabinetry with a white quartz island':'Gabinetes de madera con isla de cuarzo blanco'):(lang==='en'?'Custom walk-in closet with illuminated shelving':'Clóset a medida con estantes iluminados')}/><span className="round-arrow"><ArrowUpRight size={25}/></span></div>
    <div className="project-meta"><div><h3>{i===0?c.kitchen:c.closet}</h3><p>{i===0?c.kitchenDetail:c.closetDetail}</p></div><span className="gallery-link">{c.viewGallery}</span></div>
   </a>)}</div>
  </section>
  <section className="services-section" id="services"><span className="legacy-anchor" id="our-services" aria-hidden="true"/><div className="wrap section">
   <div className="section-heading"><div><p className="eyebrow">{c.servicesLabel}</p><h2>{c.servicesTitle}</h2></div><a className="text-link" href="#contact" data-track="quote_engagement">{c.quote}<ArrowUpRight size={17}/></a></div>
   <div className="services-grid">{c.services.map(([title,description],i)=><article key={title}><span className="service-number">0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
  </div></section>
  <section className="story-section section wrap" id="story"><span className="legacy-anchor" id="about-us" aria-hidden="true"/><div className="story-photo"><ProjectImage id="luciano_custom_kitchen_wood_quartz_closeup" alt={lang==='en'?'Detail of wood cabinetry and quartz countertop by Luciano':'Detalle de gabinetes de madera y encimera de cuarzo de Luciano'}/><span>{lang==='en'?'CRAFTSMANSHIP YOU CAN SEE.':'CALIDAD QUE SE VE.'}</span></div><div className="story-copy"><p className="eyebrow">{c.storyLabel}</p><h2>{c.storyTitle}</h2><p>{c.story}</p><p>{c.storySecond}</p><a className="text-link" href="#contact" data-track="quote_engagement">{c.quote}<ArrowRight size={17}/></a></div></section>
  <section className="reviews-section" id="testimonials"><div className="wrap section"><p className="eyebrow">{c.reviewsLabel}</p><div className="section-heading"><h2>{c.reviewsTitle}</h2><a className="text-link" href={business.reviews} target="_blank" rel="noopener noreferrer">{c.reviewsLink}<ArrowUpRight size={17}/></a></div><div className="reviews-grid">{c.reviews.map(([name,quote])=><figure key={name}><span className="quote-mark" aria-hidden="true">“</span><blockquote>{quote}</blockquote><figcaption><span className="review-initial">{name[0]}</span><span>{name}<small>Thumbtack</small></span></figcaption></figure>)}</div>{c.translation && <p className="translation-note">{c.translation}</p>}</div></section>
  <section className="area-section section wrap"><div><p className="eyebrow">{c.areaLabel}</p><h2>{c.areaTitle}</h2></div><div><p className="intro">{c.areaIntro}</p><ul className="area-list">{business.areas.map(a=><li key={a}><MapPin size={15}/>{a}</li>)}</ul></div></section>
  <Contact lang={lang} staging={staging}/>
 </>;
}

export function Privacy({lang,staging=false}: {lang:Language;staging?:PreviewStyle}) {
 const c=content[lang];
 return <section className="wrap section prose"><a className="text-link" href={path(homePath(lang,staging))}>← {c.back}</a><h1>{c.privacy}</h1><p>{c.privacyIntro}</p><p>{c.privacySurvey}</p><p>{c.privacyAnalytics}</p><p>{c.privacyContact} <a href={'mailto:'+business.email}>{business.email}</a>.</p><p>{lang==='en'?'Hosting providers may collect technical access logs for security.':'Los proveedores de alojamiento pueden recopilar registros técnicos de acceso por motivos de seguridad.'}</p></section>;
}
