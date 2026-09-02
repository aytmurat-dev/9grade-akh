'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Tugma } from '@/components/ds';
import {
  SLAYD_SINFI,
  slaydRejimidanChiq,
  toliqEkrandami,
  toliqEkranniSora,
} from './SlaydRejim';
import uslub from './Slider.module.css';

export type SlaydKorinishi = {
  /** Muqova slaydi — dars nomi katta yoziladi */
  muqova?: boolean;
  /** Tepa chapdagi bo'lim yorlig'i: "KIRISH", "SEGMENT 1" */
  yorliq?: string;
  /** Sarlavha ustidagi qizil qatorcha */
  ustyozuv?: string;
  sarlavha?: string;
  matn?: string;
  royxat?: string[];
  /** build paytida bo'yalgan kod HTML'i */
  kodHtml?: string;
  til?: string;
  rasm?: string;
  /** Yo'l yozilgan, fayl hali yo'q — skrinshot kutilmoqda */
  rasmKutilmoqda?: boolean;
  /** Pastdagi mono yorliqlar — 3 tadan oshmasin */
  teglar?: string[];
  /** O'ng pastdagi aylana muhr */
  muhr?: string;
  pauza?: boolean;
  topshiriq?: string;
  /** Pauza taxminiy vaqti — "1 daqiqa" */
  vaqt?: string;
};

type Props = {
  slaydlar: SlaydKorinishi[];
  mavzu: string;
  /** Tepa o'ngdagi hujjat kodi: "VEB-01" */
  darsKodi: string;
};

/** "3" -> "03" — dossier uslubidagi raqamlash */
function ikkiXona(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Slaydlar karuseli.
 *
 * Ko'rinish — "dossier" (arxiv fayli) konsepsiyasi: qog'oz fon,
 * ichki ramka, burchak qavslari, mono yozuvlar va qizil aksent.
 * To'liq ta'rifi: rules/11-slayd-dizayni.md
 *
 * To'liq ekran ko'rinishi (?slayd) alohida prop emas — u
 * <body class="slayd-rejim"> orqali faqat CSS bilan yoqiladi,
 * qarang: Slider.module.css va components/SlaydRejim.tsx.
 */
export default function Slider({ slaydlar, mavzu, darsKodi }: Props) {
  const [joriy, setJoriy] = useState(0);
  const [toliq, setToliq] = useState(false);
  const teginish = useRef<{ x: number; y: number } | null>(null);
  /* Haqiqiy to'liq ekranga kira oldikmi — CSS rejimidan farqli */
  const ekranda = useRef(false);

  const oxirgi = slaydlar.length - 1;
  const slayd = slaydlar[joriy];

  const oldingi = useCallback(() => setJoriy((i) => Math.max(0, i - 1)), []);
  const keyingi = useCallback(() => setJoriy((i) => Math.min(oxirgi, i + 1)), [oxirgi]);

  const toliqEkran = useCallback(() => {
    if (document.body.classList.contains(SLAYD_SINFI)) {
      slaydRejimidanChiq();
      setToliq(false);
      return;
    }
    document.body.classList.add(SLAYD_SINFI);
    setToliq(true);
    void toliqEkranniSora().then((boldi) => {
      ekranda.current = boldi;
    });
  }, []);

  /* --- ?slayd bilan ochilgan bo'lsa, tugma darrov "chiqish" holatida --- */
  useEffect(() => {
    setToliq(new URLSearchParams(window.location.search).has('slayd'));
  }, []);

  /* --- Esc bilan to'liq ekrandan chiqilsa, CSS rejimi ham yopilsin --- */
  useEffect(() => {
    function ozgardi() {
      if (toliqEkrandami()) {
        ekranda.current = true;
        return;
      }
      // Brauzer to'liq ekranni bermagan bo'lsa (iPhone Safari) shu hodisa
      // bekorga chiqadi — CSS rejimini yopib yubormaymiz.
      if (!ekranda.current) return;
      ekranda.current = false;
      slaydRejimidanChiq();
      setToliq(false);
    }

    document.addEventListener('fullscreenchange', ozgardi);
    document.addEventListener('webkitfullscreenchange', ozgardi);
    return () => {
      document.removeEventListener('fullscreenchange', ozgardi);
      document.removeEventListener('webkitfullscreenchange', ozgardi);
    };
  }, []);

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
      } else if (hodisa.key === 'f' || hodisa.key === 'F') {
        hodisa.preventDefault();
        toliqEkran();
      }
    }

    window.addEventListener('keydown', bosildi);
    return () => window.removeEventListener('keydown', bosildi);
  }, [oldingi, keyingi, oxirgi, toliqEkran]);

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

  const qora = slayd.pauza === true;
  const yorliq =
    slayd.yorliq ?? (qora ? 'PAUZA' : slayd.muqova ? 'DARS' : 'SLAYD');
  const ajratgichBormi =
    Boolean(slayd.sarlavha) &&
    Boolean(
      slayd.matn || slayd.royxat?.length || slayd.kodHtml || slayd.rasm || slayd.topshiriq,
    );

  return (
    <div
      className={uslub.slayder}
      role="region"
      aria-roledescription="slayder"
      aria-label={`${mavzu} — slaydlar`}
      onTouchStart={teginishBoshlandi}
      onTouchEnd={teginishTugadi}
    >
      <div className={uslub.sahna} aria-live="polite">
        <article className={uslub.varaq} data-qora={qora ? '' : undefined}>
          {/* Ichki ramka va burchak qavslari — dossier belgisi */}
          <span className={uslub.ramka} aria-hidden="true" />
          <span className={uslub.burchakChap} aria-hidden="true" />
          <span className={uslub.burchakOng} aria-hidden="true" />

          <div className={uslub.ichki}>
            <header className={uslub.tepaQator}>
              <span className={uslub.yorliq}>
                <i className={uslub.nuqta} aria-hidden="true" />
                {yorliq}
              </span>
              <span>{darsKodi}</span>
            </header>

            <div className={slayd.muqova ? uslub.tanaMuqova : uslub.tana}>
              {slayd.ustyozuv && <p className={uslub.ustyozuv}>{slayd.ustyozuv}</p>}

              {slayd.sarlavha &&
                (slayd.muqova ? (
                  <h3 className={uslub.muqovaSarlavha}>{slayd.sarlavha}</h3>
                ) : (
                  <h3 className={uslub.sarlavha}>{slayd.sarlavha}</h3>
                ))}

              {ajratgichBormi && <span className={uslub.ajratgich} aria-hidden="true" />}

              {slayd.matn && <p className={uslub.matn}>{slayd.matn}</p>}

              {slayd.royxat && slayd.royxat.length > 0 && (
                <ol className={uslub.royxat}>
                  {slayd.royxat.map((punkt, i) => (
                    <li key={i}>
                      <span className={uslub.royxatRaqam} aria-hidden="true">
                        {ikkiXona(i + 1)}
                      </span>
                      {punkt}
                    </li>
                  ))}
                </ol>
              )}

              {slayd.kodHtml && (
                <div className={uslub.kodQuti}>
                  <span className={uslub.kodYorliq}>{(slayd.til ?? 'kod').toUpperCase()}</span>
                  <div
                    className={uslub.kod}
                    dangerouslySetInnerHTML={{ __html: slayd.kodHtml }}
                  />
                </div>
              )}

              {slayd.rasmKutilmoqda && (
                <figure className={`${uslub.rasmQuti} ${uslub.rasmKutilmoqda}`}>
                  <span>Skrinshot kutilmoqda</span>
                </figure>
              )}

              {slayd.rasm && (
                <figure className={uslub.rasmQuti}>
                  <Image
                    src={slayd.rasm}
                    alt={slayd.sarlavha ?? 'Slayd rasmi'}
                    fill
                    sizes="(max-width: 780px) 100vw, 1100px"
                    className={uslub.rasm}
                    priority={joriy === 0}
                  />
                </figure>
              )}

              {slayd.topshiriq && <p className={uslub.topshiriq}>{slayd.topshiriq}</p>}

              {slayd.teglar && slayd.teglar.length > 0 && (
                <div className={uslub.teglar}>
                  {slayd.teglar.map((teg, i) => (
                    <span key={i}>{teg}</span>
                  ))}
                </div>
              )}
            </div>

            <footer className={uslub.pastQator}>
              <span>
                SLAYD · {ikkiXona(joriy + 1)} / {ikkiXona(slaydlar.length)}
              </span>
              {(slayd.muhr || slayd.vaqt) && (
                <span className={uslub.muhr}>{slayd.muhr ?? slayd.vaqt}</span>
              )}
            </footer>
          </div>
        </article>
      </div>

      <div className={uslub.boshqaruv}>
        <Tugma
          className={uslub.toliqTugma}
          onClick={toliqEkran}
          aria-label={toliq ? "To'liq ekrandan chiqish (Esc)" : "To'liq ekran (F)"}
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {toliq ? (
              <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" />
            ) : (
              <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" />
            )}
          </svg>
        </Tugma>

        <div className={uslub.varaqlash}>
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
            <strong>{ikkiXona(joriy + 1)}</strong> / {ikkiXona(slaydlar.length)}
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

        <span className={uslub.boshqaruvKod} aria-hidden="true">
          {darsKodi}
        </span>
      </div>
    </div>
  );
}
