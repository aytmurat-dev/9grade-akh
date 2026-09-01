/**
 * Rasm generatsiyasining umumiy yadrosi.
 *
 * Ikkita skript shundan foydalanadi:
 *   scripts/gen-image.mjs   — bitta prompt, bitta fayl (rules/08 dagi shakl)
 *   scripts/rasm-yasa.mjs   — frontmatterdagi barcha yetishmayotgan rasmlar
 */

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ILDIZ = process.cwd();

/** rules/08: 1200x675 (16:9) */
export const KENGLIK = 1200;
export const SIFAT = 82;
export const SUKUT_MODEL = 'gemini-3.1-flash-image';

export function chiq(xabar) {
  console.error(`\n[rasm] ${xabar}\n`);
  process.exit(1);
}

/**
 * .env dan qiymat o'qiydi. GEMINI_API_KEY ham, gemini_api_key ham
 * ishlaydi — katta-kichik harf va bo'shliqlarga e'tibor bermaymiz.
 */
export function envQiymati(nom) {
  if (process.env[nom]) return process.env[nom];

  const yol = path.join(ILDIZ, '.env');
  if (!fs.existsSync(yol)) return null;

  const moslik = fs
    .readFileSync(yol, 'utf8')
    .match(new RegExp(`^\\s*${nom}\\s*=\\s*(.+)$`, 'im'));
  return moslik ? moslik[1].trim().replace(/^["']|["']$/g, '') : null;
}

export function kalitniOl() {
  const kalit = envQiymati('GEMINI_API_KEY');
  if (!kalit) {
    chiq('.env ichida GEMINI_API_KEY topilmadi.');
  }
  return kalit;
}

export function modelniOl(buyruqdan) {
  return buyruqdan || envQiymati('GEMINI_IMAGE_MODEL') || SUKUT_MODEL;
}

/** Gemini'dan rasm so'raydi va xom baytlarni qaytaradi. */
export async function rasmSora(kalit, model, prompt) {
  const javob = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: 'POST',
      headers: { 'x-goog-api-key': kalit, 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ['IMAGE'],
          imageConfig: { aspectRatio: '16:9' },
        },
      }),
    },
  );

  const natija = await javob.json();
  if (natija.error) {
    throw new Error(
      `${natija.error.status ?? natija.error.code}: ${natija.error.message}` +
        (/not found|not supported/i.test(natija.error.message)
          ? '\n  Model nomi o‘zgargan bo‘lishi mumkin. .env ga GEMINI_IMAGE_MODEL=... qo‘shing.'
          : ''),
    );
  }

  const qism = (natija.candidates?.[0]?.content?.parts ?? []).find((p) => p.inlineData);
  if (!qism) {
    const sabab = natija.candidates?.[0]?.finishReason ?? 'noma’lum';
    throw new Error(`rasm qaytmadi (${sabab})`);
  }
  return Buffer.from(qism.inlineData.data, 'base64');
}

/**
 * Gemini ~270 KB JPEG qaytaradi. Uni kichraytirib saqlaymiz — .webp
 * bo'lsa 15-40 KB ga tushadi, o'quvchi telefonda tez ochadi.
 * Alohida siqish buyrug'i kerak emas.
 */
export async function saqla(xom, nishon) {
  fs.mkdirSync(path.dirname(nishon), { recursive: true });
  const kengaytma = path.extname(nishon).toLowerCase();

  let quvur = sharp(xom).resize({ width: KENGLIK, withoutEnlargement: true });
  if (kengaytma === '.png') quvur = quvur.png({ compressionLevel: 9 });
  else if (kengaytma === '.jpg' || kengaytma === '.jpeg') quvur = quvur.jpeg({ quality: SIFAT });
  else quvur = quvur.webp({ quality: SIFAT });

  await quvur.toFile(nishon);
  return fs.statSync(nishon).size;
}
