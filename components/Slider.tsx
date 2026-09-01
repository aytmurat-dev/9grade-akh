'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Tugma } from '@/components/ds';
import uslub from './Slider.module.css';

export type SlaydKorinishi = {
  sarlavha?: string;
  matn?: string;
  /** build paytida bo'yalgan kod HTML'i */
  kodHtml?: string;
  rasm?: string;
  pauza?: boolean;
  topshiriq?: string;
};

type Props = {
  slaydlar: SlaydKorinishi[];
  mavzu: string;
};

/**
 * Slaydlar karuseli. To'liq ekran ko'rinishi (?slayd) alohida prop
 * emas — u <body class="slayd-rejim"> orqali faqat CSS bilan
 * yoqiladi, qarang: Slider.module.css va components/SlaydRejim.tsx.
 */
export default function Slider({ slaydlar, mavzu }: Props) {
  const [joriy, setJoriy] = useState(0);
  const teginish = useRef<{ x: number; y: number } | null>(null);

  const oxirgi = slaydlar.length - 1;
  const slayd = slaydlar[joriy];

  const oldingi = useCallback(() => setJoriy((i) => Math.max(0, i - 1)), []);
  const keyingi = useCallback(() => setJoriy((i) => Math.min(oxirgi, i + 1)), [oxirgi]);

  /* --- Klaviatura: o'qlar va taqdimot pulti (PageUp/PageDown) --- */
  useEffect(() => {
    function bosildi(hodisa: KeyboardEvent) {
      const nishon = hodisa.target as HTMLElement | null;
      if (
        nishon &&
        (nishon.tagName === 'INPUT' ||
          nishon.tagName === 'TEXTAREA' ||
          nishon.isContentEditable)
      ) {
        return;
      }

      if (hodisa.key === 'ArrowLeft' || hodisa.key === 'PageUp') {
        hodisa.preventDefault();
        oldingi();
      } else if (hodisa.key === 'ArrowRight' || hodisa.key === 'PageDown') {
        hodisa.preventDefault();
        keyingi();
      } else if (hodisa.key === 'Home') {
        hodisa.preventDefault();
        setJoriy(0);
      } else if (hodisa.key === 'End') {
        hodisa.preventDefault();
        setJoriy(oxirgi);
      }
    }

    window.addEventListener('keydown', bosildi);
    return () => window.removeEventListener('keydown', bosildi);
  }, [oldingi, keyingi, oxirgi]);

  /* --- Telefonda surish (swipe) --- */
  function teginishBoshlandi(hodisa: React.TouchEvent) {
    const nuqta = hodisa.touches[0];
    teginish.current = { x: nuqta.clientX, y: nuqta.clientY };
  }

  function teginishTugadi(hodisa: React.TouchEvent) {
    const boshi = teginish.current;
    teginish.current = null;
    if (!boshi) return;

    const nuqta = hodisa.changedTouches[0];
    const dx = nuqta.clientX - boshi.x;
    const dy = nuqta.clientY - boshi.y;

    // Vertikal scroll bilan chalkashmasin
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) keyingi();
    else oldingi();
  }

  if (!slayd) return null;

  return (
    <div
      className={uslub.slayder}
      role="region"
      aria-roledescription="slayder"
      aria-label={`${mavzu} — slaydlar`}
      onTouchStart={teginishBoshlandi}
      onTouchEnd={teginishTugadi}
    >
      <div className={uslub.chiziq} aria-hidden="true">
        <div
          className={uslub.chiziqIchi}
          style={{ width: `${((joriy + 1) / slaydlar.length) * 100}%` }}
        />
      </div>

      <div className={uslub.sahna} aria-live="polite">
        {slayd.pauza === true ? (
          <div className={uslub.pauza}>
            <p className={uslub.pauzaBelgisi} aria-hidden="true">
              ⏸
            </p>
            <p className={uslub.pauzaSarlavha}>PAUZANI BOSING</p>
            {slayd.topshiriq && <p className={uslub.pauzaTopshiriq}>{slayd.topshiriq}</p>}
            <p className={uslub.pauzaIzoh}>Bajarganingizdan keyin davom eting</p>
          </div>
        ) : (
          <div className={uslub.ichki}>
            {slayd.sarlavha && <h3 className={uslub.sarlavha}>{slayd.sarlavha}</h3>}
            {slayd.matn && <p className={uslub.matn}>{slayd.matn}</p>}
            {slayd.kodHtml && (
              <div
                className={uslub.kod}
                dangerouslySetInnerHTML={{ __html: slayd.kodHtml }}
              />
            )}
            {slayd.rasm && (
              <div className={uslub.rasmQuti}>
                <Image
                  src={slayd.rasm}
                  alt={slayd.sarlavha ?? 'Slayd rasmi'}
                  fill
                  sizes="(max-width: 780px) 100vw, 1100px"
                  className={uslub.rasm}
                  priority={joriy === 0}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className={uslub.boshqaruv}>
        <Tugma
          className={uslub.tugma}
          onClick={oldingi}
          disabled={joriy === 0}
          aria-label="Oldingi slayd"
        >
          ←
        </Tugma>

        <span
          className={uslub.hisob}
          aria-label={`${joriy + 1}-slayd, jami ${slaydlar.length} ta`}
        >
          <strong>{joriy + 1}</strong> / {slaydlar.length}
        </span>

        <Tugma
          className={uslub.tugma}
          onClick={keyingi}
          disabled={joriy === oxirgi}
          aria-label="Keyingi slayd"
        >
          →
        </Tugma>
      </div>
    </div>
  );
}
