/**
 * Bitta rasm — bitta prompt. rules/08-rasm-va-skrinshot.md dagi shakl.
 *
 *   node scripts/gen-image.mjs "<prompt>" <yo'l>
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

import { chiq, kalitniOl, modelniOl, rasmSora, saqla } from './rasm-yadro.mjs';

const argv = process.argv.slice(2);
const model = modelniOl(argv.find((a) => a.startsWith('--model='))?.split('=')[1]);
const erkin = argv.filter((a) => !a.startsWith('--'));
const [prompt, nishon] = erkin;

if (!prompt || !nishon) {
  chiq('Foydalanish: node scripts/gen-image.mjs "<prompt>" <yo‘l>');
}

const kalit = kalitniOl();

try {
  const xom = await rasmSora(kalit, model, prompt);
  const olcham = await saqla(xom, nishon);
  console.log(`Saqlandi: ${nishon} — ${Math.round(olcham / 1024)} KB (${model})`);
} catch (xato) {
  chiq(xato.message);
}
