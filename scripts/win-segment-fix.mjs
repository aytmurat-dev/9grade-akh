/**
 * Windows'da `next build` (output: 'export') navigatsiya keshi fayllarini
 * noto'g'ri nom bilan yozadi.
 *
 *   Kerak:  out/veb/__next.$d$yonalish.__PAGE__.txt
 *   Yozadi: out/veb/__next.$d$yonalish/__PAGE__.txt
 *
 * Sababi Next'ning o'zida: fayl nomini yasashda faqat "/" belgisi "." ga
 * almashtiriladi, Windows esa yo'lni "\" bilan beradi. Natijada brauzer
 * sahifalarni oldindan yuklay olmaydi (konsolda 404 chiqadi).
 *
 * Linux'da (Vercel shu yerda build qiladi) bu muammo yo'q — u yerda bu
 * skript hech narsani o'zgartirmaydi.
 */

import fs from 'node:fs';
import path from 'node:path';

const CHIQISH = path.join(process.cwd(), 'out');

if (!fs.existsSync(CHIQISH)) {
  console.log('[segment-fix] out/ papkasi yo‘q, o‘tkazib yuborildi.');
  process.exit(0);
}

/** Papka ichidagi barcha fayllarni nisbiy yo'li bilan qaytaradi. */
function fayllar(papka, asos = papka) {
  return fs.readdirSync(papka, { withFileTypes: true }).flatMap((kirish) => {
    const toliq = path.join(papka, kirish.name);
    return kirish.isDirectory()
      ? fayllar(toliq, asos)
      : [{ nisbiy: path.relative(asos, toliq), toliq }];
  });
}

let tuzatilgan = 0;

function yur(papka) {
  for (const kirish of fs.readdirSync(papka, { withFileTypes: true })) {
    if (!kirish.isDirectory()) continue;
    const toliq = path.join(papka, kirish.name);

    if (kirish.name.startsWith('__next.')) {
      for (const fayl of fayllar(toliq)) {
        const yangiNom = `${kirish.name}.${fayl.nisbiy.split(path.sep).join('.')}`;
        fs.renameSync(fayl.toliq, path.join(papka, yangiNom));
        tuzatilgan++;
      }
      fs.rmSync(toliq, { recursive: true, force: true });
    } else {
      yur(toliq);
    }
  }
}

yur(CHIQISH);

console.log(
  tuzatilgan > 0
    ? `[segment-fix] ${tuzatilgan} ta navigatsiya fayli to‘g‘rilandi (Windows).`
    : '[segment-fix] Tuzatish kerak emas.',
);
