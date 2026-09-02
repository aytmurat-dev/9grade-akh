'use client';

import { useCallback, useEffect, useId, useState } from 'react';
import { Alert, Tanlov, Tugma } from '@/components/ds';
import { RAQAM_KALITI, VARIANTLAR_SONI } from '@/lib/sozlamalar';
import { shablonBolaklari, type Variant } from '@/lib/shablon';
import uslub from './UyVazifa.module.css';

/**
 * Bitta topshiriq. Sarlavhasi (qaysi segmentni mashq qiladi) server
 * tomonida hisoblanadi — bu yerda faqat chiziladi.
 */
export type TopshiriqKorinishi = {
  shablon: string;
  minimum: string;
  qoshimcha?: string;
  daqiqa: number;
  /** "1–2-segmentlar" */
  qamrovYorliq: string;
  /** "JavaScript nima qila oladi · Konsolda birinchi buyruq" */
  qamrovNomi: string;
};

type Props = {
  yonalish: string;
  /** "01" ko'rinishidagi dars raqami */
  raqam: string;
  topshiriqlar: TopshiriqKorinishi[];
};

type Holat =
  | { turi: 'boshlanmoqda' }
  | { turi: 'soraladi' }
  | { turi: 'yuklanmoqda'; n: number }
  | { turi: 'tayyor'; n: number; variant: Variant; vaqtinchalik: boolean }
  | { turi: 'xato'; n: number };

const RAQAMLAR = Array.from({ length: VARIANTLAR_SONI }, (_, i) => i + 1);

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
 *
 * Topshiriqlar bir nechta bo'lishi mumkin (rules/07): darsda nechta
 * segment bo'lsa, shunga qarab 1 yoki 2 ta. Hammasi **bitta** variant
 * qatoridan foydalanadi — o'quvchi raqamini bir marta tanlaydi.
 *
 * Raqam bitta joydan — yuqoridagi ro'yxatdan — tanlanadi. Ilgari ikki
 * xil ko'rinish bor edi: 12 tugmali panjara va "Raqamni o'zgartirish"
 * tugmasi. Endi ikkalasi bitta <select> ga birlashtirildi.
 */
export default function UyVazifa({ yonalish, raqam, topshiriqlar }: Props) {
  const [holat, setHolat] = useState<Holat>({ turi: 'boshlanmoqda' });
  const maydonId = useId();

  const variantniYukla = useCallback(
    async (n: number, vaqtinchalik: boolean) => {
      setHolat({ turi: 'yuklanmoqda', n });
      try {
        // 'no-cache' — keshdagi nusxa ishlatiladi, lekin har safar
        // tekshiriladi. 'force-cache' bo'lganda topshiriq matni tuzatilsa,
        // sahifani ilgari ochgan o'quvchida eski variant qolib ketardi.
        const javob = await fetch(`/uy/${yonalish}/${raqam}/${n}.json`, {
          cache: 'no-cache',
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

  function raqamniTanla(qiymat: string) {
    const n = raqamniTekshir(qiymat);
    if (!n) return;
    try {
      window.localStorage.setItem(RAQAM_KALITI, String(n));
    } catch {
      /* saqlanmasa ham davom etaveramiz */
    }
    void variantniYukla(n, false);
  }

  /* Tanlangan raqam — select shuni ko'rsatadi */
  const tanlangan = holat.turi === 'boshlanmoqda' || holat.turi === 'soraladi' ? null : holat.n;
  const jamiDaqiqa = topshiriqlar.reduce((s, t) => s + t.daqiqa, 0);
  const kopmi = topshiriqlar.length > 1;

  return (
    <div className={uslub.vazifa}>
      <div className={uslub.tepa}>
        <label className={uslub.yorliq} htmlFor={maydonId}>
          Jurnaldagi raqamingiz
        </label>

        <Tanlov
          id={maydonId}
          qiymat={tanlangan ? String(tanlangan) : ''}
          ozgarganda={raqamniTanla}
          korinish={tanlangan ? 'oddiy' : 'diqqat'}
        >
          <option value="" disabled>
            tanlang…
          </option>
          {RAQAMLAR.map((n) => (
            <option key={n} value={n}>
              №{n}
            </option>
          ))}
        </Tanlov>

        <span className={uslub.hajm}>
          {topshiriqlar.length} topshiriq · ≈{jamiDaqiqa} daqiqa
        </span>

        {holat.turi === 'tayyor' && holat.vaqtinchalik && (
          <span className={uslub.vaqtinchalik}>URL orqali</span>
        )}
      </div>

      {(holat.turi === 'boshlanmoqda' || holat.turi === 'soraladi') && (
        <p className={uslub.taklif}>
          Ro&apos;yxatdagi tartib raqamingizni tanlang — shaxsiy topshiriq shu
          yerda chiqadi. Bir marta tanlaysiz, brauzer eslab qoladi.
        </p>
      )}

      {holat.turi === 'yuklanmoqda' && (
        <p className={uslub.kutish} aria-live="polite">
          Variantingiz yuklanmoqda…
        </p>
      )}

      {holat.turi === 'xato' && (
        <Alert turi="xato" sarlavha={`${holat.n}-variant yuklanmadi`}>
          <p>Internet aloqasini tekshiring.</p>
          <Tugma korinish="sokin" onClick={() => void variantniYukla(holat.n, false)}>
            Qayta urinish
          </Tugma>
        </Alert>
      )}

      {holat.turi === 'tayyor' &&
        topshiriqlar.map((topshiriq, i) => (
          <article className={uslub.topshiriq} key={i}>
            <header className={uslub.topshiriqTepa}>
              {kopmi && <span className={uslub.raqam}>{i + 1}-topshiriq</span>}
              <span className={uslub.qamrov}>
                {topshiriq.qamrovYorliq}: {topshiriq.qamrovNomi}
              </span>
              <span className={uslub.daqiqa}>≈{topshiriq.daqiqa} daqiqa</span>
            </header>

            <p className={uslub.matn}>
              <Matn manba={topshiriq.shablon} variant={holat.variant} />
            </p>

            <div className={uslub.talab}>
              <h4>Kamida shu bo&apos;lsin</h4>
              <p>
                <Matn manba={topshiriq.minimum} variant={holat.variant} />
              </p>
            </div>

            {topshiriq.qoshimcha && (
              <div className={`${uslub.talab} ${uslub.qoshimcha}`}>
                <h4>Qo&apos;shimcha (ixtiyoriy)</h4>
                <p>
                  <Matn manba={topshiriq.qoshimcha} variant={holat.variant} />
                </p>
              </div>
            )}
          </article>
        ))}
    </div>
  );
}
