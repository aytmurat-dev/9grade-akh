/**
 * Bitta rasm — bitta prompt. rules/08-rasm-va-skrinshot.md dagi shakl.
 *
 *   node scripts/gen-image.mjs "<prompt>" <yo'l> [--kenglik=1600]
 *
 * Masalan:
 *   node scripts/gen-image.mjs "Two LAN segments joined by a router, flat vector, white background, thin lines" public/img/tarmoq/08/1.webp
 *
 * Kalit .env dan olinadi (GEMINI_API_KEY), model — GEMINI_IMAGE_MODEL
 * yoki --model=... bilan.
 *
 * Fayl avtomatik kichraytiriladi va siqiladi (1200px, webp) — alohida
 * `npx sharp-cli` chaqirish shart emas.
 *
 * Ko'p rasmni frontmatterdan yasash uchun: npm run rasm
 */

import { TAQIQ, chiq, kalitniOl, modelniOl, rasmSora, saqla } from './rasm-yadro.mjs';

const argv = process.argv.slice(2);
const model = modelniOl(argv.find((a) => a.startsWith('--model='))?.split('=')[1]);
const kenglik = Number(argv.find((a) => a.startsWith('--kenglik='))?.split('=')[1]) || undefined;
const erkin = argv.filter((a) => !a.startsWith('--'));
const [prompt, nishon] = erkin;

if (!prompt || !nishon) {
  chiq('Foydalanish: node scripts/gen-image.mjs "<prompt>" <yo‘l>');
}

const kalit = kalitniOl();

try {
  // Logotip/suv belgisi taqiqi har doim qo'shiladi — qarang: rasm-yadro.mjs
  const xom = await rasmSora(kalit, model, `${prompt}
${TAQIQ}`);
  const olcham = await saqla(xom, nishon, kenglik);
  console.log(`Saqlandi: ${nishon} — ${Math.round(olcham / 1024)} KB (${model})`);
} catch (xato) {
  chiq(xato.message);
}
