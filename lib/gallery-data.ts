import manifest from '@/public/images/manifest.json';
import { path, type Language, type Gallery } from './site';
import type { Photo } from '@/components/gallery';
function caption(id:string,lang:Language) {
 const es=lang==='es';
 if(id.includes('kitchen')) {
  if(id.includes('wood')) return es?'Gabinetes de madera y encimeras de cuarzo':'Wood cabinetry and quartz countertops';
  if(id.includes('blue')) return es?'Cocina a medida con gabinetes azules':'Custom kitchen with blue cabinetry';
  if(id.includes('kitchenette')) return es?'Cocina compacta con gabinetes blancos':'Compact kitchen with white cabinetry';
  return es?'Cocina blanca a medida con acabados contemporáneos':'Custom white kitchen with contemporary finishes';
 }
 if(id.includes('gray')) return es?'Clóset gris a medida con almacenamiento integrado':'Custom gray closet with integrated storage';
 if(id.includes('wood')) return es?'Clóset de madera con detalles tapizados':'Wood closet with upholstered details';
 if(id.includes('shoesrack')) return es?'Almacenamiento a medida para zapatos':'Custom shoe storage';
 if(id.includes('lights')) return es?'Clóset blanco con estantes iluminados':'White closet with illuminated shelving';
 return es?'Clóset blanco a medida con estantes y barras':'Custom white closet with shelving and hanging space';
}
export function galleryPhotos(gallery:Gallery,lang:Language): Photo[] {
 return manifest.filter(a=>a.categories.includes(gallery) && !a.id.includes('logo') && !a.id.includes('banner')).map(a=>{
  const variants=Array.from(new Map(a.variants.map(v=>[v.width,v])).values());
  const large=variants[variants.length-1];
  return {src:path(large.path),srcSet:variants.map(v=>path(v.path)+' '+v.width+'w').join(', '),width:large.width,height:large.height,alt:caption(a.id,lang)};
 });
}
