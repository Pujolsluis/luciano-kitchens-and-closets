import manifest from '@/public/images/manifest.json';
import { path } from '@/lib/site';
export function ProjectImage({id,alt,className,eager=false,sizes='(max-width: 760px) 100vw, 50vw'}: {
 id:string;alt:string;className?:string;eager?:boolean;sizes?:string;
}) {
 const asset=manifest.find(a=>a.id===id);
 if (!asset) throw new Error('Missing project image: '+id);
 const variants=Array.from(new Map(asset.variants.map(v=>[v.width,v])).values());
 const largest=variants[variants.length-1];
 return <img className={className} src={path(largest.path)} srcSet={variants.map(v=>path(v.path)+' '+v.width+'w').join(', ')} sizes={sizes}
   width={largest.width} height={largest.height} alt={alt} loading={eager?'eager':'lazy'} fetchPriority={eager?'high':undefined}/>;
}
