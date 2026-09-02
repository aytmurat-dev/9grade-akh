import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { DarsXatosi, darsniTekshir, type Dars } from './schema';
import { YONALISHLAR, type Yonalish } from './sozlamalar';

export { yonalishmi } from './sozlamalar';

const KONTENT = path.join(process.cwd(), 'content', 'darslar');
const PUBLIC = path.join(process.cwd(), 'public');

/**
 * Rasm fayli haqiqatan bormi.
 *
 * Skrinshotni o'qituvchi keyin joylaydi (rules/08), yo'l esa
 * frontmatter'ga darrov yoziladi. Shu oraliqda slayd buzuq rasm
 * belgisini emas, "kutilmoqda" qutisini ko'rsatsin.
 */
export function rasmBormi(yol: string): boolean {
  return fs.existsSync(path.join(PUBLIC, yol.replace(/^\//, '')));
}

/**
 * Bir marta o'qib, build davomida qayta ishlatamiz.
 *
 * Ishlab chiqish serverida kesh o'chirilgan: `.md` faylni tahrirlab
 * sahifani yangilaganda o'zgarish darrov ko'rinsin. Aks holda dars
 * yozayotganda har safar serverni qayta ishga tushirishga to'g'ri
 * keladi — 102 ta dars uchun bu ko'p vaqt.
 */
const KESHLASH = process.env.NODE_ENV === 'production';
const kesh = new Map<string, Dars>();

/**
 * Yo'nalish papkasidagi dars fayllari: ["01.md", "02.md", ...].
 * Nomi noto'g'ri fayl bo'lsa build to'xtaydi — jimgina tashlab ketmaymiz,
 * aks holda o'qituvchi darsi nega ko'rinmayotganini tushunmaydi.
 */
export function darsFayllari(yonalish: Yonalish): string[] {
  const papka = path.join(KONTENT, yonalish);
  if (!fs.existsSync(papka)) return [];

  const barchasi = fs.readdirSync(papka).filter((f) => f.endsWith('.md'));
  for (const fayl of barchasi) {
    if (!/^\d{2}\.md$/.test(fayl)) {
      throw new DarsXatosi(`content/darslar/${yonalish}/${fayl}`, [
        "fayl nomi 'NN.md' ko'rinishida bo'lsin (01.md, 02.md ... 34.md)",
      ]);
    }
  }
  return barchasi.sort();
}

function faylniOqi(yonalish: Yonalish, fayl: string): Dars {
  const kalit = `${yonalish}/${fayl}`;
  const keshda = KESHLASH ? kesh.get(kalit) : undefined;
  if (keshda) return keshda;

  const nisbiy = `content/darslar/${kalit}`;
  const xom = fs.readFileSync(path.join(KONTENT, yonalish, fayl), 'utf8');
  const { data, content } = matter(xom);

  const meta = darsniTekshir(nisbiy, data);
  const raqam = fayl.slice(0, 2);

  // Frontmatter fayl joylashuviga mos kelsin — chalkashlik chiqmasin.
  if (meta.yonalish !== yonalish) {
    throw new DarsXatosi(nisbiy, [
      `yonalish — faylda "${meta.yonalish}" yozilgan, lekin fayl "${yonalish}" papkasida turibdi`,
    ]);
  }
  if (meta.dars !== Number(raqam)) {
    throw new DarsXatosi(nisbiy, [
      `dars — faylda ${meta.dars} yozilgan, lekin fayl nomi ${raqam}.md`,
    ]);
  }

  const dars: Dars = { ...meta, qollanma: content.trim(), raqam, fayl: nisbiy };
  if (KESHLASH) kesh.set(kalit, dars);
  return dars;
}

/** Bitta dars. Fayl yo'q bo'lsa null. */
export function darsniOl(yonalish: Yonalish, raqam: string): Dars | null {
  const fayl = `${raqam}.md`;
  if (!fs.existsSync(path.join(KONTENT, yonalish, fayl))) return null;
  return faylniOqi(yonalish, fayl);
}

/** Yo'nalishdagi mavjud darslar, dars raqami bo'yicha tartiblangan. */
export function yonalishDarslari(yonalish: Yonalish): Dars[] {
  return darsFayllari(yonalish)
    .map((fayl) => faylniOqi(yonalish, fayl))
    .sort((a, b) => a.dars - b.dars);
}

/** Barcha yo'nalishlardagi barcha darslar — build paytida hammasi tekshiriladi. */
export function barchaDarslar(): Dars[] {
  return YONALISHLAR.flatMap((y) => yonalishDarslari(y));
}

export type ChorakGuruhi = { chorak: number; darslar: Dars[] };

export function choraklarBoyicha(darslar: Dars[]): ChorakGuruhi[] {
  const guruhlar = new Map<number, Dars[]>();
  for (const dars of darslar) {
    const royxat = guruhlar.get(dars.chorak) ?? [];
    royxat.push(dars);
    guruhlar.set(dars.chorak, royxat);
  }
  return [...guruhlar.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([chorak, royxat]) => ({
      chorak,
      darslar: royxat.sort((a, b) => a.dars - b.dars),
    }));
}

/** Oldingi / keyingi dars — sahifa oxiridagi navigatsiya uchun. */
export function qoshnilar(yonalish: Yonalish, dars: Dars) {
  const barchasi = yonalishDarslari(yonalish);
  const i = barchasi.findIndex((d) => d.dars === dars.dars);
  return {
    oldingi: i > 0 ? barchasi[i - 1] : null,
    keyingi: i >= 0 && i < barchasi.length - 1 ? barchasi[i + 1] : null,
  };
}
