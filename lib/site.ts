export type Language = 'en' | 'es';
export type Gallery = 'kitchens' | 'closets';
export const business = {
  name: 'Luciano Custom Kitchens & Closets',
  phone: '(863) 732-8482', telephone: '+18637328482',
  email: 'info@lucianokitchensandclosets.com',
  instagram: 'https://www.instagram.com/lucianokitchensandclosets/',
  facebook: 'https://www.facebook.com/lucianokitchensandclosets',
  reviews: 'https://www.thumbtack.com/fl/hollywood/kitchen-remodeling/luciano-custom-kitchens-closets/service/419896949646868483',
  areas: ['Broward', 'Miami-Dade', 'Pembroke Pines', 'Davie', 'Aventura', 'Brickell'],
};
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://pujolsluis.github.io';
export const path = (value: string) => basePath + value;
export const homePath = (lang: Language) => lang === 'es' ? '/es/' : '/';
export const galleryPath = (lang: Language, gallery: Gallery) => (lang === 'es' ? '/es' : '') + '/2022/01/' + gallery + '/';
export const imagePath = (name: string, width = 1280) => path('/images/' + name + '-' + width + '.webp');
export const heroImage = 'kitchen-whitecs-luciano-kitchens-and-closets';
export const closetImage = 'luciano_custom_walkin_closet_white_lights_front';
export const logoImage = 'horizontal-logo-luciano-kitchens-and-closets';
