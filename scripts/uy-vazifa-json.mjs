/**
 * Har bir uy vazifasi variantini alohida JSON faylga chiqaradi:
 *
 *   public/uy/<yonalish>/<NN>/<n>.json   ->   { "n": 7, "TEG": "h2", ... }
 *
 * Nima uchun? Sahifada faqat o'sha o'quvchining varianti ko'rinishi kerak.
 * Agar 12 ta variant sahifaga (yoki JS to'plamiga) qo'shilsa, o'quvchi
 * sahifa kodini ochib hammasini o'qib oladi. Shuning uchun brauzer
 * ishlash paytida faqat bitta JSON faylni yuklab oladi.
 *
 * Bu skript `npm run build` va `npm run dev` dan oldin avtomatik ishlaydi.
 * U ataylab "yumshoq": frontmatter buzuq bo'lsa, xato bermay o'tkazib
 * yuboradi — haqiqiy, tushunarli xatoni zod sxemasi build paytida beradi.
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ILDIZ = process.cwd();
const KONTENT = path.join(ILDIZ, 'content', 'darslar');
const CHIQISH = path.join(ILDIZ, 'public', 'uy');

const YONALISHLAR = ['veb', 'mobil', 'tarmoq'];

// Har safar noldan — o'chirilgan darsning eski varianti qolib ketmasin.
fs.rmSync(CHIQISH, { recursive: true, force: true });

let darslar = 0;
let variantlar = 0;

for (const yonalish of YONALISHLAR) {
  const papka = path.join(KONTENT, yonalish);
  if (!fs.existsSync(papka)) continue;

  for (const fayl of fs.readdirSync(papka).filter((f) => /^\d{2}\.md$/.test(f))) {
    let data;
    try {
      ({ data } = matter(fs.readFileSync(path.join(papka, fayl), 'utf8')));
    } catch {
      continue; // YAML buzuq — zod aniq xabar beradi
    }

    const royxat = data?.uyVazifa?.variantlar;
    if (!Array.isArray(royxat)) continue;

    const raqam = fayl.slice(0, 2);
    const manzil = path.join(CHIQISH, yonalish, raqam);
    fs.mkdirSync(manzil, { recursive: true });

    for (const variant of royxat) {
      if (!variant || typeof variant.n !== 'number') continue;
      fs.writeFileSync(
        path.join(manzil, `${variant.n}.json`),
        JSON.stringify(variant),
        'utf8',
      );
      variantlar++;
    }
    darslar++;
  }
}

console.log(`[uy-vazifa] ${darslar} ta darsdan ${variantlar} ta variant JSON yozildi.`);
