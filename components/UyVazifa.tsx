'use client';

import { useCallback, useEffect, useState } from 'react';
import { Alert, Tugma } from '@/components/ds';
import { RAQAM_KALITI, VARIANTLAR_SONI } from '@/lib/sozlamalar';
import { shablonBolaklari, type Variant } from '@/lib/shablon';
import uslub from './UyVazifa.module.css';

type Props = {
  yonalish: string;
  /** "01" ko'rinishidagi dars raqami */
  raqam: string;
  shablon: string;
  minimum: string;
  qoshimcha?: string;
};

type Holat =
  | { turi: 'boshlanmoqda' }
  | { turi: 'soraladi' }
  | { turi: 'yuklanmoqda'; n: number }
  | { turi: 'tayyor'; n: number; variant: Variant; vaqtinchalik: boolean }
  | { turi: 'xato'; n: number };

/** Shablon matnini variant qiymatlari bilan chizadi (qiymatlar qalin). */
function Matn({ manba, variant }: { manba: string; variant: Variant }) {
  return (
    <>
      {shablonBolaklari(manba, variant).map((bolak, i) =>
        bolak.almashtirilgan ? (
          <strong key={i} className={uslub.qiymat}>
            {bolak.matn}
          </strong>
        ) : (
          <span key={i}>{bolak.matn}</span>
        ),
      )}
    </>
  );
}

function raqamniTekshir(qiymat: string | null): number | null {
  if (!qiymat) return null;
  const n = Number(qiymat);
  if (!Number.isInteger(n) || n < 1 || n > VARIANTLAR_SONI) return null;
  return n;
}

/**
 * Uy vazifasi. MUHIM: qolgan 11 variant sahifa kodida yo'q.
 * Variantlar build paytida alohida JSON fayllarga yoziladi
 * (scripts/uy-vazifa-json.mjs) va bu yerda faqat bittasi yuklanadi.
 */
export default function UyVazifa({ yonalish, raqam, shablon, minimum, qoshimcha }: Props) {
  const [holat, setHolat] = useState<Holat>({ turi: 'boshlanmoqda' });

  const variantniYukla = useCallback(
    async (n: number, vaqtinchalik: boolean) => {
      setHolat({ turi: 'yuklanmoqda', n });
      try {
        const javob = await fetch(`/uy/${yonalish}/${raqam}/${n}.json`, {
          cache: 'force-cache',
        });
        if (!javob.ok) throw new Error(String(javob.status));
        const variant = (await javob.json()) as Variant;
        setHolat({ turi: 'tayyor', n, variant, vaqtinchalik });
      } catch {
        setHolat({ turi: 'xato', n });
      }
    },
    [yonalish, raqam],
  );

  /* Boshlanishida: avval ?n=..., keyin localStorage */
  useEffect(() => {
    const urlRaqami = raqamniTekshir(
      new URLSearchParams(window.location.search).get('n'),
    );
    if (urlRaqami) {
      // URL localStorage'dan ustun — lekin uni saqlamaymiz, chunki bu
      // ko'pincha o'qituvchining vaqtinchalik ko'rib chiqishi.
      void variantniYukla(urlRaqami, true);
      return;
    }

    let saqlangan: number | null = null;
    try {
      saqlangan = raqamniTekshir(window.localStorage.getItem(RAQAM_KALITI));
    } catch {
      saqlangan = null; // brauzer xotirani taqiqlagan bo'lishi mumkin
    }

    if (saqlangan) void variantniYukla(saqlangan, false);
    else setHolat({ turi: 'soraladi' });
  }, [variantniYukla]);

  function raqamniTanla(n: number) {
    try {
      window.localStorage.setItem(RAQAM_KALITI, String(n));
    } catch {
      /* saqlanmasa ham davom etaveramiz */
    }
    void variantniYukla(n, false);
  }

  /* ---------------- Raqam so'rash ---------------- */

  if (holat.turi === 'soraladi') {
    return (
      <div className={uslub.soroq}>
        <h3 className={uslub.soroqSarlavha}>Raqamingizni kiriting (1–12)</h3>
        <p className="ds-yordam">
          Jurnaldagi tartib raqamingizni bosing. Har bir raqamga alohida variant
          beriladi. Bir marta tanlaysiz — brauzer eslab qoladi.
        </p>
        <div className={uslub.panjara}>
          {Array.from({ length: VARIANTLAR_SONI }, (_, i) => i + 1).map((n) => (
            <Tugma
              key={n}
              korinish="katta"
              className={uslub.raqamTugma}
              onClick={() => raqamniTanla(n)}
            >
              {n}
            </Tugma>
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- Kutish / xato ---------------- */

  if (holat.turi === 'boshlanmoqda' || holat.turi === 'yuklanmoqda') {
    return (
      <div className={uslub.kutish} aria-live="polite">
        Variantingiz yuklanmoqda…
      </div>
    );
  }

  if (holat.turi === 'xato') {
    return (
      <Alert turi="xato" sarlavha={`${holat.n}-variant yuklanmadi`}>
        <p>Internet aloqasini tekshirib, sahifani yangilang.</p>
        <Tugma korinish="sokin" onClick={() => setHolat({ turi: 'soraladi' })}>
          Boshqa raqam tanlash
        </Tugma>
      </Alert>
    );
  }

  /* ---------------- Tayyor ---------------- */

  const { n, variant, vaqtinchalik } = holat;

  return (
    <div className={uslub.vazifa}>
      <div className={uslub.tepa}>
        <span className={uslub.nishon}>
          Sizning variantingiz: <strong>№{n}</strong>
          {vaqtinchalik && <em className={uslub.vaqtinchalik}> (URL orqali)</em>}
        </span>
        <Tugma korinish="sokin" onClick={() => setHolat({ turi: 'soraladi' })}>
          Raqamni o&apos;zgartirish
        </Tugma>
      </div>

      <p className={uslub.topshiriq}>
        <Matn manba={shablon} variant={variant} />
      </p>

      <div className={uslub.talab}>
        <h4>Kamida shu bo&apos;lsin</h4>
        <p>
          <Matn manba={minimum} variant={variant} />
        </p>
      </div>

      {qoshimcha && (
        <div className={`${uslub.talab} ${uslub.qoshimcha}`}>
          <h4>Qo&apos;shimcha (ixtiyoriy)</h4>
          <p>
            <Matn manba={qoshimcha} variant={variant} />
          </p>
        </div>
      )}
    </div>
  );
}
