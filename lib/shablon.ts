/**
 * Uy vazifasi shabloni bilan ishlash. zod yo'q — mijoz tomonida ham ishlaydi.
 *
 *   shablon: "{TEG} tegidan foydalanib {MAVZU} haqida sahifa yarating"
 *   variant: { n: 1, TEG: "h2", MAVZU: "Nukus" }
 *   natija:  "h2 tegidan foydalanib Nukus haqida sahifa yarating"
 *            (h2 va Nukus — almashtirilgan bo'laklar, qalin ko'rsatiladi)
 */

export const PARAMETR_REGEX = /\{([A-Za-z_][A-Za-z0-9_]*)\}/g;

export type VariantQiymati = string | number | boolean;
export type Variant = { n: number } & Record<string, VariantQiymati>;

export function parametrlarniTop(matn: string): string[] {
  return [...matn.matchAll(PARAMETR_REGEX)].map((m) => m[1]);
}

export type Bolak = {
  matn: string;
  /** true bo'lsa — variantdan kelgan qiymat, vizual ajratiladi */
  almashtirilgan: boolean;
};

export function shablonBolaklari(shablon: string, variant: Variant | null): Bolak[] {
  const bolaklar: Bolak[] = [];
  let oxirgi = 0;

  for (const moslik of shablon.matchAll(PARAMETR_REGEX)) {
    const boshi = moslik.index ?? 0;
    if (boshi > oxirgi) {
      bolaklar.push({ matn: shablon.slice(oxirgi, boshi), almashtirilgan: false });
    }

    const qiymat = variant ? variant[moslik[1]] : undefined;
    bolaklar.push({
      // Qiymat topilmasa shablonni o'z holicha qoldiramiz — sxema buni
      // build paytida ushlab qoladi, bu yerda faqat himoya chorasi.
      matn: qiymat === undefined ? moslik[0] : String(qiymat),
      almashtirilgan: qiymat !== undefined,
    });
    oxirgi = boshi + moslik[0].length;
  }

  if (oxirgi < shablon.length) {
    bolaklar.push({ matn: shablon.slice(oxirgi), almashtirilgan: false });
  }
  return bolaklar;
}
