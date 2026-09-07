'use client';
import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { content } from '@/lib/content';
import { type Language } from '@/lib/site';
export type Photo = {src:string;srcSet:string;width:number;height:number;alt:string};
export function GalleryGrid({photos,lang}: {photos:Photo[];lang:Language}) {
 const [selected,setSelected]=useState<number|null>(null);
 const c=content[lang];
 const current=selected === null ? null : photos[selected];
 return <>
  <div className="gallery-grid">{photos.map((p,index)=><figure key={p.src}>
   <button className="photo-button" onClick={()=>setSelected(index)} aria-label={c.openPhoto+': '+p.alt}>
    <img src={p.src} srcSet={p.srcSet} sizes="(max-width:760px) 100vw, 50vw" width={p.width} height={p.height} alt={p.alt} loading={index<2?'eager':'lazy'}/>
    <span className="photo-expand"><ArrowUpRight size={18}/></span>
   </button><figcaption><span>{p.alt}</span><span>{String(index+1).padStart(2,'0')}</span></figcaption>
  </figure>)}</div>
  <Dialog open={selected!==null} onOpenChange={(open)=>{if(!open)setSelected(null);}}>
   <DialogContent className="photo-dialog" showCloseButton={false}>
    <DialogTitle className="sr-only">{current?.alt || c.photo}</DialogTitle>
    <DialogClose render={<Button variant="ghost" size="icon" className="photo-close" aria-label={c.close}/>}><X size={22}/></DialogClose>
    {current && <img src={current.src} alt={current.alt} width={current.width} height={current.height}/>}
    <p>{current?.alt}</p>
   </DialogContent>
  </Dialog>
 </>;
}
