/**
 * Kontent ogohlantirishlari — build'ni TO'XTATMAYDI.
 *
 * Sxema (lib/schema.ts) frontmatter xatosida build'ni to'xtatadi.
 * Bu skript esa boshqa narsani tekshiradi: dars yozilgan, lekin
 * o'qituvchi hali qo'shishi kerak bo'lgan bo'laklar joyidami.
 *
 *   1. rasm: yo'li bor, fayl esa yo'q  (rules/08, 5-qoida — skrinshot kutilmoqda)
 *   2. video hali qo'yilmagan          (VIDEOKUTMOQ — o'rin egallab turuvchi ID)
 *
 * Ikkalasi ham "hali tayyor emas" holati: sayt ishlayveradi, lekin
 * o'quvchi bo'sh joyni ko'radi. Shuning uchun har build'da eslatiladi.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ILDIZ = process.cwd();
const KONTENT = path.join(ILDIZ, 'content', 'darslar');
const PUBLIC = path.join(ILDIZ, 'public');

/** lib/schema.ts dagi VIDEO_KUTILMOQDA bilan bir xil bo'lsin */
const VIDEO_KUTILMOQDA = 'VIDEOKUTMOQ';

const ogohlantirishlar = [];

/** Markdown tanasidagi ![...](/img/...) yo'llari */
function tanadagiRasmlar(tana) {
  return [...tana.matchAll(/!\[[^\]]*\]\((\/img\/[^)\s]+)\)/g)].map((m) => m[1]);
}

if (fs.existsSync(KONTENT)) {
  for (const yonalish of fs.readdirSync(KONTENT)) {
    const papka = path.join(KONTENT, yonalish);
    if (!fs.statSync(papka).isDirectory()) continue;

    for (const fayl of fs.readdirSync(papka).filter((f) => /^\d{2}\.md$/.test(f))) {
      const qisqa = `content/darslar/${yonalish}/${fayl}`;
      let data;
      let content;
      try {
        ({ data, content } = matter(fs.readFileSync(path.join(papka, fayl), 'utf8')));
      } catch {
        continue; // YAML buzuq — build paytida zod aniq xabar beradi
      }

      if (data?.video === VIDEO_KUTILMOQDA) {
        ogohlantirishlar.push(`${qisqa} — video hali yuklanmagan (${VIDEO_KUTILMOQDA})`);
      }

      const yollar = [
        ...(Array.isArray(data?.slaydlar) ? data.slaydlar : [])
          .map((s) => s?.rasm)
          .filter((r) => typeof r === 'string'),
        ...tanadagiRasmlar(content ?? ''),
      ];

      for (const yol of [...new Set(yollar)]) {
        if (!fs.existsSync(path.join(PUBLIC, yol.replace(/^\//, '')))) {
          ogohlantirishlar.push(`${qisqa} — rasm yo'q: ${yol}`);
        }
      }
    }
  }
}

if (ogohlantirishlar.length > 0) {
  console.log(`\n[kontent] ${ogohlantirishlar.length} ta eslatma:`);
  for (const o of ogohlantirishlar) console.log(`  - ${o}`);
  console.log('[kontent] Bular build’ni to‘xtatmaydi — sahifa bo‘sh joy bilan chiqadi.\n');
} else {
  console.log('[kontent] Yetishmayotgan rasm yoki video yo‘q.');
}
