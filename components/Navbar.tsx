'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import uslub from './Navbar.module.css';

/**
 * Tepa panel — faqat uchta yo'nalish, boshqa hech narsa.
 *
 * Veb saytning kirish sahifasi bo'lgani uchun uning havolasi "/".
 * "/veb" manzili ham ochiladi, shuning uchun faollik ikkalasini
 * hisobga oladi.
 */
const YONALISHLAR = [
  { href: '/', nom: 'Veb', prefiks: '/veb' },
  { href: '/mobil', nom: 'Mobil', prefiks: '/mobil' },
  { href: '/tarmoq', nom: 'Tarmoq', prefiks: '/tarmoq' },
];

export default function Navbar() {
  const joriyManzil = usePathname();

  return (
    <header className={uslub.tepa}>
      <div className={`ds-qobiq ds-qobiq--keng ${uslub.ichi}`}>
        <nav className={uslub.navigatsiya} aria-label="Yo'nalishlar">
          {YONALISHLAR.map((y) => {
            const faol =
              joriyManzil === y.href || joriyManzil.startsWith(y.prefiks);
            return (
              <Link
                key={y.href}
                href={y.href}
                className={`${uslub.havola} ${faol ? uslub.faol : ''}`}
                aria-current={faol ? 'page' : undefined}
                prefetch={false}
              >
                {y.nom}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
