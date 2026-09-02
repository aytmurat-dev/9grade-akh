/**
 * Frontmatterdagi yetishmayotgan slayd rasmlarini Gemini bilan yasaydi.
 *
 *   npm run rasm                          yetishmayotgan barcha rasm
 *   npm run rasm -- veb                   faqat "veb" yo'nalishi
 *   npm run rasm -- veb 01                faqat bitta dars
 *   npm run rasm -- veb 01 --qayta        bor rasmlarni ham qayta yasash
 *   npm run rasm -- --korish              promptlarni ko'rsatadi, yasamaydi
 *
 * Qaysi rasm yasalishi frontmatterdan olinadi: `rasm:` yo'li bor, lekin
 * public/ ichida fayl yo'q bo'lsa — o'sha rasm yasaladi.
 *
 *   slaydlar:
 *     - sarlavha: "head va body"
 *       rasm: "/img/veb/01/2.webp"
 *       rasmTavsif: "A page split into a faded upper zone and a white lower zone"
 *       rasmYozuv: ["head", "body"]
 *
 * `rasmTavsif` — rasmda nima bo'lishi (inglizcha yozing, natija barqarorroq).
 * `rasmYozuv`  — rasmda chiqishi mumkin bo'lgan YAGONA so'zlar. Bo'sh
 *                qoldirilsa rasm umuman yozuvsiz chiziladi.
 *
 * DIQQAT: dastur oynasi yoki brauzer natijasi kerak bo'lsa — bu skript
 * emas, haqiqiy skrinshot kerak (qarang: rules/08-rasm-va-skrinshot.md).
 * Sun'iy "Android Studio" rasmi o'quvchini adashtiradi.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { TAQIQ, chiq, kalitniOl, modelniOl, rasmSora, saqla } from './rasm-yadro.mjs';

const ILDIZ = process.cwd();
const KONTENT = path.join(ILDIZ, 'content', 'darslar');
const PUBLIC = path.join(ILDIZ, 'public');
const YONALISHLAR = ['veb', 'mobil', 'tarmoq'];

/* ------------------------------------------------------------------
   Buyruq qatori
   ------------------------------------------------------------------ */

const argv = process.argv.slice(2);
const bayroqlar = new Set(argv.filter((a) => a.startsWith('--')));
const erkin = argv.filter((a) => !a.startsWith('--'));

const QAYTA = bayroqlar.has('--qayta');
const KORISH = bayroqlar.has('--korish');
const MODEL = modelniOl(argv.find((a) => a.startsWith('--model='))?.split('=')[1]);

const tanlanganYonalish = erkin[0] ?? null;
const tanlanganDars = erkin[1] ?? null;

if (tanlanganYonalish && !YONALISHLAR.includes(tanlanganYonalish)) {
  chiq(`Noma'lum yo‘nalish: ${tanlanganYonalish}. Mavjud: ${YONALISHLAR.join(', ')}`);
}

/* ------------------------------------------------------------------
   Rasm kerak bo'lgan slaydlarni yig'ish
   ------------------------------------------------------------------ */

function vazifalarniYig() {
  const vazifalar = [];

  for (const yonalish of tanlanganYonalish ? [tanlanganYonalish] : YONALISHLAR) {
    const papka = path.join(KONTENT, yonalish);
    if (!fs.existsSync(papka)) continue;

    const fayllar = fs
      .readdirSync(papka)
      .filter((f) => /^\d{2}\.md$/.test(f))
      .filter((f) => !tanlanganDars || f.startsWith(tanlanganDars));

    for (const fayl of fayllar) {
      let data;
      try {
        ({ data } = matter(fs.readFileSync(path.join(papka, fayl), 'utf8')));
      } catch {
        continue; // YAML buzuq — build paytida zod aniq xabar beradi
      }

      const slaydlar = Array.isArray(data?.slaydlar) ? data.slaydlar : [];
      slaydlar.forEach((slayd, i) => {
        if (!slayd?.rasm || typeof slayd.rasm !== 'string') return;

        const nishon = path.join(PUBLIC, slayd.rasm.replace(/^\//, ''));
        if (fs.existsSync(nishon) && !QAYTA) return;

        // Tavsifsiz rasm — ehtimol skrinshot uchun joy ajratilgan.
        // Uni generatsiya qilmaymiz, faqat eslatib qo'yamiz.
        if (!slayd.rasmTavsif) {
          vazifalar.push({ otkazib: true, manzil: slayd.rasm, fayl, yonalish });
          return;
        }

        vazifalar.push({
          otkazib: false,
          fayl: `content/darslar/${yonalish}/${fayl}`,
          mavzu: String(data.mavzu ?? ''),
          slaydRaqami: i + 1,
          tavsif: slayd.rasmTavsif,
          yozuvlar: Array.isArray(slayd.rasmYozuv) ? slayd.rasmYozuv : [],
          nishon,
          manzil: slayd.rasm,
        });
      });
    }
  }

  return vazifalar;
}

/* ------------------------------------------------------------------
   Prompt — uslub barcha darslar uchun bir xil, slaydlar bir sinfdek
   ko'rinsin.
   ------------------------------------------------------------------ */

const USLUB = [
  'Flat vector educational illustration for a printed dossier document.',
  'Warm paper background (#f0ebe2), generous whitespace, simple geometric shapes.',
  'Strictly three colours: near-black ink (#1c1a17), warm grey (#8b8578)',
  'and a single red accent (#b32b26) used only on the one element that matters.',
  'No gradients, no 3D, no shadows, no photorealism, no clutter.',
  'Wide 16:9 composition, centered, readable from a distance.',
  'The subject fills most of the frame — no large empty margins.',
  TAQIQ,
].join(' ');

/**
 * Yozuvlar — eng nozik joy. Generator harflarni buzib yozishi mumkin
 * ("STRUKSYA" kabi), o'quvchi esa xato yozuvni to'g'ri deb o'rganib
 * qoladi. Shuning uchun sukut bo'yicha rasmda umuman yozuv bo'lmaydi.
 */
function matnQoidasi(yozuvlar) {
  if (!yozuvlar || yozuvlar.length === 0) {
    return [
      'CRITICAL: the image must contain NO text whatsoever — no words, no letters,',
      'no numbers, no labels, no captions, no watermarks. Convey the idea with',
      'shapes, colour and layout only.',
    ].join(' ');
  }
  return [
    'CRITICAL: the ONLY text allowed in the image is exactly these labels,',
    `copied character by character: ${yozuvlar.map((y) => `"${y}"`).join(', ')}.`,
    'Do not add any other word, letter, number, caption or watermark.',
    'Spell them exactly as given.',
  ].join(' ');
}

function promptYasa(v) {
  return [
    `Subject: ${v.tavsif}`,
    `Context: a computer science lesson for 9th-grade students about "${v.mavzu}".`,
    USLUB,
    matnQoidasi(v.yozuvlar),
  ].join('\n');
}

/* ------------------------------------------------------------------
   Asosiy
   ------------------------------------------------------------------ */

const hammasi = vazifalarniYig();
const otkazilgan = hammasi.filter((v) => v.otkazib);
const vazifalar = hammasi.filter((v) => !v.otkazib);

for (const v of otkazilgan) {
  console.log(`[rasm-yasa] o‘tkazildi (rasmTavsif yo‘q — skrinshot?): ${v.manzil}`);
}

if (vazifalar.length === 0) {
  console.log('[rasm-yasa] Yasaladigan rasm yo‘q.');
  process.exit(0);
}

console.log(`[rasm-yasa] ${vazifalar.length} ta rasm, model: ${MODEL}\n`);

if (KORISH) {
  for (const v of vazifalar) {
    console.log(`${v.manzil}  (${v.fayl}, ${v.slaydRaqami}-slayd)`);
    console.log(promptYasa(v));
    console.log('');
  }
  console.log('[rasm-yasa] --korish rejimi: hech narsa yasalmadi.');
  process.exit(0);
}

const kalit = kalitniOl();
let boldi = 0;
const xatolar = [];

for (const [i, v] of vazifalar.entries()) {
  const belgi = `[${i + 1}/${vazifalar.length}] ${v.manzil}`;
  try {
    const xom = await rasmSora(kalit, MODEL, promptYasa(v));
    const olcham = await saqla(xom, v.nishon);
    console.log(`${belgi} — ${Math.round(olcham / 1024)} KB`);
    boldi++;
  } catch (xato) {
    console.log(`${belgi} — XATO: ${xato.message}`);
    xatolar.push(v.manzil);
  }
}

console.log(`\n[rasm-yasa] Tayyor: ${boldi} ta.`);
if (xatolar.length > 0) {
  console.log(`[rasm-yasa] Yasalmadi: ${xatolar.length} ta — ${xatolar.join(', ')}`);
  process.exitCode = 1;
}
console.log('[rasm-yasa] Rasmlarni ko‘zdan kechiring: soxta matn yoki noto‘g‘ri element bo‘lmasin.');
