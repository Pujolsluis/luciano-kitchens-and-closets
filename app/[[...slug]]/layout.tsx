import '../globals.css';
import '../staging.css';
import { routeFor } from '@/lib/routes';
export default async function RootLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const route=routeFor(slug);
  return <html lang={route?.lang || 'en'}><body className={route?.staging ? 'brand-staging' : undefined} data-palette={route?.staging || undefined}>{children}</body></html>;
}
