import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
// Dizayn sistema — tartib muhim: tokenlar -> asos -> komponentlar
import '@/styles/tokens.css';
import '@/styles/asos.css';
import '@/styles/ds.css';
import uslub from './layout.module.css';

export const metadata: Metadata = {
  title: {
    default: 'Informatika 9-sinf — videodarslar',
    template: '%s · Informatika 9-sinf',
  },
  description:
    "9-sinf informatika videodarslari: uyda video ko'riladi, uy vazifasi bajariladi, darsda tahlil qilinadi.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <header className={uslub.tepa}>
          <div className="ds-qobiq">
            <Link href="/" className={uslub.logo} prefetch={false}>
              Informatika <span>9-sinf</span>
            </Link>
          </div>
        </header>

        <main>{children}</main>

        <footer className={uslub.past}>
          <div className="ds-qobiq">
            <p>
              Videodarsni uyda ko&apos;ring, uy vazifasini bajaring — darsda birga
              tahlil qilamiz.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
