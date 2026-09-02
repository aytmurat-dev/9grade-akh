import type { CSSProperties } from 'react';
import { Alert, Qator, Qobiq, Royxat } from '@/components/ds';
import { choraklarBoyicha, yonalishDarslari } from '@/lib/darslar';
import {
  CHORAK_RAQAMI,
  YONALISH_NOMI,
  YONALISH_TAVSIF,
  type Yonalish,
} from '@/lib/sozlamalar';
import uslub from './YonalishRoyxati.module.css';

/**
 * Yo'nalishning darslar ro'yxati.
 *
 * Ikki manzilda ishlatiladi: saytning kirish sahifasi ("/" — Veb) va
 * qolgan yo'nalishlar ("/mobil", "/tarmoq"). Alohida "bosh sahifa"
 * yo'q — o'quvchi saytga kirishi bilan darslar ro'yxatini ko'radi.
 */

/** Har bir yo'nalishning hero foni. Chap tomoni bo'sh — matn shu yerga tushadi. */
const HERO_RASMLARI: Record<Yonalish, string> = {
  veb: '/img/hero-veb.webp',
  mobil: '/img/hero-mobil.webp',
  tarmoq: '/img/hero-tarmoq.webp',
};

export default function YonalishRoyxati({ yonalish }: { yonalish: Yonalish }) {
  const guruhlar = choraklarBoyicha(yonalishDarslari(yonalish));

  return (
    <Qobiq keng>
      <header
        className={uslub.hero}
        style={{ '--hero-rasm': `url('${HERO_RASMLARI[yonalish]}')` } as CSSProperties}
      >
        <div className={uslub.heroIchi}>
          <h1 className={uslub.heroSarlavha}>{YONALISH_NOMI[yonalish]}</h1>
          <p className={uslub.heroTavsif}>{YONALISH_TAVSIF[yonalish]}</p>
        </div>
      </header>

      <div className={uslub.darslarQism}>
        {guruhlar.length === 0 ? (
          <Alert turi="eslatma" sarlavha="Darslar hali joylanmagan">
            <p>
              Bu yo&apos;nalish uchun videodarslar tez orada yuklanadi. Hozircha
              boshqa yo&apos;nalishlarni ko&apos;rib chiqishingiz mumkin.
            </p>
          </Alert>
        ) : (
          guruhlar.map((guruh) => (
            <section key={guruh.chorak} className={uslub.chorakBolim}>
              {/* Faqat chorak raqami — qolgan hamma narsa darslar ro'yxatida */}
              <div className={uslub.chorakBoshi}>
                <span className={uslub.chorakBadge}>
                  {CHORAK_RAQAMI[guruh.chorak] ?? guruh.chorak} chorak
                </span>
                <span className={uslub.chorakChiziq} aria-hidden="true" />
              </div>

              <Royxat>
                {guruh.darslar.map((dars) => (
                  <li key={dars.raqam}>
                    <Qator
                      href={`/${yonalish}/${dars.raqam}`}
                      raqam={dars.dars}
                      nomi={dars.mavzu}
                    />
                  </li>
                ))}
              </Royxat>
            </section>
          ))
        )}
      </div>
    </Qobiq>
  );
}
