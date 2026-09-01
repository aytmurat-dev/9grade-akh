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
 * Chiqish — Esc. Ekranda tugma yo'q, chunki bu ko'rinish videoga
 * yozib olinadi.
 */
export default function SlaydRejim() {
  useEffect(() => {
    function tekshir() {
      const yoqilgan = new URLSearchParams(window.location.search).has('slayd');
      document.body.classList.toggle('slayd-rejim', yoqilgan);
    }

    function bosildi(hodisa: KeyboardEvent) {
      if (hodisa.key !== 'Escape') return;
      if (!document.body.classList.contains('slayd-rejim')) return;
      window.history.replaceState(null, '', window.location.pathname);
      document.body.classList.remove('slayd-rejim');
    }

    tekshir();
    window.addEventListener('popstate', tekshir);
    window.addEventListener('keydown', bosildi);

    return () => {
      window.removeEventListener('popstate', tekshir);
      window.removeEventListener('keydown', bosildi);
      document.body.classList.remove('slayd-rejim');
    };
  }, []);

  return null;
}
