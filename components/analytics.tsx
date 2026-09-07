'use client';
import { useEffect } from 'react';
const measurementId = 'G-SZBVF0E902';
declare global {
 interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
}
export function Analytics() {
 useEffect(()=>{
  const hosts=['www.lucianokitchensandclosets.com','lucianokitchensandclosets.com'];
  if (!hosts.includes(window.location.hostname) || navigator.doNotTrack === '1') return;
  window.dataLayer ??= [];
  // oxlint-disable-next-line prefer-rest-params -- Google's gtag queue consumes an Arguments object.
  window.gtag ??= function(..._args: unknown[]) { window.dataLayer!.push(arguments); };
  // Never forward arbitrary query strings, hashes, or form content.
  window.gtag('js',new Date());
  window.gtag('config',measurementId,{
   page_location:location.origin+location.pathname,page_referrer:document.referrer ? new URL(document.referrer).origin : '',
   allow_google_signals:false,allow_ad_personalization_signals:false
  });
  let script=document.getElementById('luciano-analytics');
  if (!script) {
   script=document.createElement('script'); script.id='luciano-analytics';
   (script as HTMLScriptElement).async=true;
   (script as HTMLScriptElement).src='https://www.googletagmanager.com/gtag/js?id='+measurementId;
   document.head.appendChild(script);
  }
  const track=(event: MouseEvent)=>{
   const link=(event.target as Element).closest<HTMLAnchorElement>('a[data-track]');
   const name=link?.dataset.track;
   if (!name || !['phone_click','email_click','quote_open','quote_engagement'].includes(name)) return;
   window.gtag?.('event',name,{language:document.documentElement.lang, page_location:location.origin+location.pathname});
  };
  document.addEventListener('click',track);
  return ()=>document.removeEventListener('click',track);
 },[]);
 return null;
}
