import '../globals.css';
export default async function RootLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <html lang={slug?.[0] === 'es' ? 'es' : 'en'}><body>{children}</body></html>;
}
