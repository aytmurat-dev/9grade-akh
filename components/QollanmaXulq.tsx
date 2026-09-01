'use client';

import { useCallback, useEffect, useState } from 'react';
import uslub from './QollanmaXulq.module.css';

type Props = {
  /** Qo'llanma HTML'i turgan elementning id'si */
  nishon: string;
};

type Katta = { src: string; alt: string };

/**
 * Qo'llanmaning JS qismi — kod nusxasi va rasmni kattalashtirish.
 *
 * DIQQAT: bu komponent qo'llanma HTML'ini o'zi chizmaydi. HTML server
 * tomonida chiziladi (components/Qollanma.tsx), bu orolcha esa unga
 * faqat bitta klik tinglovchisini ulaydi.
 *
 * Sababi tejamkorlik: HTML'ni mijoz komponentiga prop qilib bersak, u
 * sahifada ikki marta ketardi — bir marta ko'rinadigan HTML sifatida,
 * bir marta React uchun ma'lumot sifatida. Dars sahifasi shu bilan
 * ikki barobar og'irlashardi.
 */
export default function QollanmaXulq({ nishon }: Props) {
  const [katta, setKatta] = useState<Katta | null>(null);

  const nusxaOl = useCallback(async (tugma: HTMLElement) => {
    const blok = tugma.closest('.ds-kod-blok');
    const kod = blok?.querySelector('pre code') ?? blok?.querySelector('pre');
    const matn = kod?.textContent ?? '';
    if (!matn) return;

    let boldi = false;
    try {
      await navigator.clipboard.writeText(matn);
      boldi = true;
    } catch {
      // https bo'lmagan holat uchun eski usul
      const maydon = document.createElement('textarea');
      maydon.value = matn;
      maydon.setAttribute('readonly', '');
      maydon.style.position = 'fixed';
      maydon.style.opacity = '0';
      document.body.appendChild(maydon);
      maydon.select();
      try {
        boldi = document.execCommand('copy');
      } catch {
        boldi = false;
      }
      document.body.removeChild(maydon);
    }

    const eski = tugma.dataset.eskiMatn ?? tugma.textContent ?? 'Nusxa olish';
    tugma.dataset.eskiMatn = eski;
    tugma.textContent = boldi ? 'Nusxa olindi ✓' : 'Nusxa olinmadi';
    if (boldi) tugma.dataset.holat = 'boldi';

    window.setTimeout(() => {
      tugma.textContent = eski;
      delete tugma.dataset.holat;
    }, 1800);
  }, []);

  useEffect(() => {
    const element = document.getElementById(nishon);
    if (!element) return;

    function bosildi(hodisa: MouseEvent) {
      const manba = hodisa.target as HTMLElement | null;
      if (!manba) return;

      const tugma = manba.closest<HTMLElement>('[data-nusxa]');
      if (tugma) {
        void nusxaOl(tugma);
        return;
      }

      const rasm = manba.closest<HTMLImageElement>('img[data-katta]');
      if (rasm) setKatta({ src: rasm.currentSrc || rasm.src, alt: rasm.alt });
    }

    element.addEventListener('click', bosildi);
    return () => element.removeEventListener('click', bosildi);
  }, [nishon, nusxaOl]);

  /* Kattalashtirilgan rasm: Esc bilan yopiladi, orqa fon scroll qilmaydi */
  useEffect(() => {
    if (!katta) return;

    function bosildi(hodisa: KeyboardEvent) {
      if (hodisa.key === 'Escape') setKatta(null);
    }

    const eskiOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', bosildi);

    return () => {
      document.body.style.overflow = eskiOverflow;
      window.removeEventListener('keydown', bosildi);
    };
  }, [katta]);

  if (!katta) return null;

  return (
    <div
      className={uslub.lupa}
      role="dialog"
      aria-modal="true"
      aria-label="Kattalashtirilgan rasm"
      onClick={() => setKatta(null)}
    >
      <button
        type="button"
        className={uslub.yopish}
        onClick={() => setKatta(null)}
        aria-label="Yopish"
      >
        ✕
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={katta.src} alt={katta.alt} className={uslub.rasm} />
    </div>
  );
}
