'use client';

import { useEffect } from 'react';

/**
 * ?slayd rejimi — ekranni yozib olish uchun.
 *
 * Bu orolcha hech narsa chizmaydi: u faqat <body> ga "slayd-rejim"
 * sinfini qo'yadi, qolganini CSS bajaradi (styles/ds.css). Shu sababli
 * dars sahifasi butunlay server tomonida chiziladi va o'quvchining
 * telefoniga ortiqcha JavaScript tushmaydi.
 *
 * Chiqish — Esc. Rejimni slayderdagi burchak tugmasi ham yoqadi
 * (components/Slider.tsx), o'sha tugma yozib olishda ko'rinmasin deb
 * sichqoncha slayder ustiga kelgandagina paydo bo'ladi.
 */
export const SLAYD_SINFI = 'slayd-rejim';

/* ------------------------------------------------------------------
   To'liq ekran

   Brauzerning Fullscreen API'si + mavjud "slayd-rejim" sinfi birga
   ishlatiladi: API brauzer panellarini olib tashlaydi, sinf esa
   slayderni butun ekranga yoyib, shriftni kattalashtiradi (CSS allaqachon
   yozilgan, qarang: styles/ds.css va shu fayl).

   iPhone Safari elementni to'liq ekranga chiqarmaydi — u yerda faqat
   CSS rejimi qoladi, bu ham yetarli.
   ------------------------------------------------------------------ */

type EkranHujjati = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type EkranElementi = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

export function toliqEkrandami() {
  const hujjat = document as EkranHujjati;
  return Boolean(hujjat.fullscreenElement ?? hujjat.webkitFullscreenElement);
}

/** Kira oldikmi — shuni qaytaradi. Rad etilsa CSS rejimi qoladi. */
export function toliqEkranniSora(): Promise<boolean> {
  const element = document.documentElement as EkranElementi;
  try {
    const soralgan = element.requestFullscreen
      ? element.requestFullscreen()
      : element.webkitRequestFullscreen?.();
    return Promise.resolve(soralgan).then(
      () => toliqEkrandami(),
      () => false,
    );
  } catch {
    return Promise.resolve(false);
  }
}

function toliqEkrandanChiq() {
  const hujjat = document as EkranHujjati;
  const chiqish = hujjat.exitFullscreen
    ? hujjat.exitFullscreen()
    : hujjat.webkitExitFullscreen?.();
  void Promise.resolve(chiqish).catch(() => {});
}

/**
 * Rejimdan chiqish. Ikki joydan chaqiriladi: shu yerdagi Esc va
 * slayderdagi "to'liq ekran" tugmasi — shuning uchun alohida funksiya.
 */
export function slaydRejimidanChiq() {
  document.body.classList.remove(SLAYD_SINFI);
  if (new URLSearchParams(window.location.search).has('slayd')) {
    window.history.replaceState(null, '', window.location.pathname);
  }
  // Brauzer to'liq ekranda qolib ketmasin: Esc'ni ba'zan brauzerning
  // o'zi yutadi, ba'zan sahifaga yetkazadi — ikkalasida ham chiqamiz.
  if (toliqEkrandami()) toliqEkrandanChiq();
}

export default function SlaydRejim() {
  useEffect(() => {
    function tekshir() {
      const yoqilgan = new URLSearchParams(window.location.search).has('slayd');
      document.body.classList.toggle(SLAYD_SINFI, yoqilgan);
    }

    function bosildi(hodisa: KeyboardEvent) {
      if (hodisa.key !== 'Escape') return;
      if (!document.body.classList.contains(SLAYD_SINFI)) return;
      slaydRejimidanChiq();
    }

    tekshir();
    window.addEventListener('popstate', tekshir);
    window.addEventListener('keydown', bosildi);

    return () => {
      window.removeEventListener('popstate', tekshir);
      window.removeEventListener('keydown', bosildi);
      document.body.classList.remove(SLAYD_SINFI);
    };
  }, []);

  return null;
}
