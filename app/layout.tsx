import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import '@/styles/tokens.css';
import '@/styles/asos.css';
import '@/styles/ds.css';
import uslub from './layout.module.css';

export const metadata: Metadata = {
  title: { default: '9-sinf Informatika videodarslari', template: '%s · 9-sinf Informatika' },
  description: "9-sinf informatika videodarslari: uyda videoni ko'ring, shaxsiy uy vazifasini bajaring va darsda birga tahlil qiling.",
};

/**
 * Slayd dizaynining yozuv mashinkasi shrifti (rules/11). next/font uni
 * build paytida yuklab, o'z domenimizdan beradi — Google'ga so'rov
 * ketmaydi va sahifa ochilishida shrift sakramaydi.
 */
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--shrift-mono-yuklangan',
  display: 'swap',
});

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#263b82' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={mono.variable}>
      <body>
        <Navbar />
        <main className={uslub.asosiy}>{children}</main>
      </body>
    </html>
  );
}
