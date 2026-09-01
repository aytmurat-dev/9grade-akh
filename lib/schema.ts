import { z } from 'zod';
import { DARSLAR_SONI, VARIANTLAR_SONI, YONALISHLAR } from './sozlamalar';
import { parametrlarniTop } from './shablon';

export { DARSLAR_SONI, VARIANTLAR_SONI, YONALISHLAR } from './sozlamalar';
export type { Yonalish } from './sozlamalar';

/* ------------------------------------------------------------------ */
/*  Segment                                                            */
/* ------------------------------------------------------------------ */

export const segmentSchema = z.object({
  nomi: z.string().min(1, "segment nomi bo'sh bo'lmasin"),
  pauza: z
    .string()
    .regex(/^\d{1,3}:[0-5]\d$/, "vaqt 'd:dd' ko'rinishida bo'lsin, masalan 3:40"),
  tur: z.string().min(1, "segment turi bo'sh bo'lmasin"),
});

export type Segment = z.infer<typeof segmentSchema>;

/* ------------------------------------------------------------------ */
/*  Slayd — barcha maydonlar ixtiyoriy, lekin kamida bittasi bo'lsin    */
/* ------------------------------------------------------------------ */

export const slaydSchema = z
  .object({
    sarlavha: z.string().min(1).optional(),
    matn: z.string().min(1).optional(),
    kod: z.string().min(1).optional(),
    til: z.string().min(1).optional(),
    rasm: z.string().min(1).optional(),
    /** Rasm generatoriga ko'rsatma — scripts/rasm-yasa.mjs */
    rasmTavsif: z.string().min(1).optional(),
    /**
     * Rasmda chiqishi mumkin bo'lgan yagona yozuvlar. Bo'sh qoldirilsa
     * rasm umuman yozuvsiz chiziladi — generator harflarni buzib
     * yozishi mumkin, o'quvchi esa xato yozuvni ko'rmasligi kerak.
     */
    rasmYozuv: z.array(z.string().min(1)).max(5).optional(),
    pauza: z.boolean().optional(),
    topshiriq: z.string().min(1).optional(),
  })
  .superRefine((slayd, ctx) => {
    const toldirilgan = Object.values(slayd).some((v) => v !== undefined);
    if (!toldirilgan) {
      ctx.addIssue({
        code: 'custom',
        message:
          "slayd bo'sh: sarlavha, matn, kod, rasm, pauza yoki topshiriq maydonlaridan kamida bittasi bo'lsin",
      });
    }
    if (slayd.pauza === true && !slayd.topshiriq) {
      ctx.addIssue({
        code: 'custom',
        path: ['topshiriq'],
        message: "pauza slaydida 'topshiriq' matni bo'lishi shart — o'quvchi nima qilishini bilsin",
      });
    }
  });

export type Slayd = z.infer<typeof slaydSchema>;

/* ------------------------------------------------------------------ */
/*  Uy vazifasi varianti                                               */
/* ------------------------------------------------------------------ */

export const variantSchema = z
  .object({
    n: z
      .number({ message: "variantda 'n' raqami bo'lishi shart" })
      .int("'n' butun son bo'lsin")
      .min(1, "'n' 1 dan kichik bo'lmasin")
      .max(VARIANTLAR_SONI, `'n' ${VARIANTLAR_SONI} dan katta bo'lmasin`),
  })
  .catchall(z.union([z.string(), z.number(), z.boolean()]));

export type Variant = z.infer<typeof variantSchema>;

/* ------------------------------------------------------------------ */
/*  Uy vazifasi                                                        */
/* ------------------------------------------------------------------ */

export const uyVazifaSchema = z
  .object({
    shablon: z.string({ message: "'shablon' yozilishi shart" }).min(1, "shablon bo'sh bo'lmasin"),
    minimum: z.string({ message: "'minimum' yozilishi shart" }).min(1, "minimum bo'sh bo'lmasin"),
    qoshimcha: z.string().min(1).optional(),
    variantlar: z
      .array(variantSchema, { message: "'variantlar' ro'yxati bo'lishi shart" })
      .length(
        VARIANTLAR_SONI,
        `variantlar aynan ${VARIANTLAR_SONI} ta bo'lishi shart (sinfda ${VARIANTLAR_SONI} ta raqam bor)`,
      ),
  })
  .superRefine((uy, ctx) => {
    /* --- 1. n raqamlari takrorlanmasin va 1..12 ni to'liq qoplasin --- */
    const korilgan = new Map<number, number>();
    uy.variantlar.forEach((v, i) => {
      if (typeof v?.n !== 'number') return;
      if (korilgan.has(v.n)) {
        ctx.addIssue({
          code: 'custom',
          path: ['variantlar', i, 'n'],
          message: `n=${v.n} takrorlandi (avval ${korilgan.get(v.n)}-o'rinda uchradi)`,
        });
      } else {
        korilgan.set(v.n, i);
      }
    });

    const yetishmayotgan: number[] = [];
    for (let n = 1; n <= VARIANTLAR_SONI; n++) {
      if (!korilgan.has(n)) yetishmayotgan.push(n);
    }
    if (yetishmayotgan.length > 0 && uy.variantlar.length === VARIANTLAR_SONI) {
      ctx.addIssue({
        code: 'custom',
        path: ['variantlar'],
        message: `bu raqamlar uchun variant yo'q: ${yetishmayotgan.join(', ')}`,
      });
    }

    /* --- 2. Shablondagi har bir {PARAMETR} barcha variantlarda bo'lsin --- */
    const matnlar: Array<[string, string]> = [
      ['shablon', uy.shablon],
      ['minimum', uy.minimum],
    ];
    if (uy.qoshimcha) matnlar.push(['qoshimcha', uy.qoshimcha]);

    const kerakli = new Map<string, string>(); // parametr -> qaysi maydonda uchradi
    for (const [maydon, matn] of matnlar) {
      for (const p of parametrlarniTop(matn)) {
        if (!kerakli.has(p)) kerakli.set(p, maydon);
      }
    }

    for (const [parametr, maydon] of kerakli) {
      const bosh: number[] = [];
      uy.variantlar.forEach((v, i) => {
        const qiymat = (v as Record<string, unknown>)[parametr];
        if (qiymat === undefined || qiymat === null || qiymat === '') {
          bosh.push(typeof v?.n === 'number' ? v.n : i + 1);
        }
      });
      if (bosh.length > 0) {
        ctx.addIssue({
          code: 'custom',
          path: ['variantlar'],
          message:
            `'${maydon}' ichida {${parametr}} ishlatilgan, lekin bu variantlarda ${parametr} yo'q: ` +
            `n = ${bosh.join(', ')}. Aks holda o'quvchi topshiriqda "{${parametr}}" so'zini ko'radi.`,
        });
      }
    }
  });

export type UyVazifa = z.infer<typeof uyVazifaSchema>;

/* ------------------------------------------------------------------ */
/*  Dars frontmatter                                                   */
/* ------------------------------------------------------------------ */

export const darsSchema = z.object({
  dars: z
    .number({ message: "'dars' raqami bo'lishi shart" })
    .int("'dars' butun son bo'lsin")
    .min(1, `'dars' 1..${DARSLAR_SONI} oralig'ida bo'lsin`)
    .max(DARSLAR_SONI, `'dars' 1..${DARSLAR_SONI} oralig'ida bo'lsin`),
  mavzu: z.string({ message: "'mavzu' yozilishi shart" }).min(1, "'mavzu' bo'sh bo'lmasin"),
  yonalish: z.enum(YONALISHLAR, {
    message: `'yonalish' faqat quyidagilardan biri: ${YONALISHLAR.join(' | ')}`,
  }),
  chorak: z
    .number({ message: "'chorak' raqami bo'lishi shart" })
    .int("'chorak' butun son bo'lsin")
    .min(1, "'chorak' 1..4 oralig'ida bo'lsin")
    .max(4, "'chorak' 1..4 oralig'ida bo'lsin"),
  video: z
    .string({ message: "'video' — YouTube ID bo'lishi shart" })
    .regex(
      /^[A-Za-z0-9_-]{11}$/,
      "'video' — 11 belgili YouTube ID bo'lsin, to'liq havola emas. Masalan: dQw4w9WgXcQ",
    ),
  davomiylik: z
    .number({ message: "'davomiylik' daqiqada, raqam bilan yozilsin" })
    .int("'davomiylik' butun son bo'lsin (daqiqa)")
    .positive("'davomiylik' musbat bo'lsin"),
  segmentlar: z
    .array(segmentSchema, { message: "'segmentlar' ro'yxati bo'lishi shart" })
    .min(1, "kamida bitta segment bo'lsin"),
  slaydlar: z
    .array(slaydSchema, { message: "'slaydlar' ro'yxati bo'lishi shart" })
    .min(1, "kamida bitta slayd bo'lsin"),
  uyVazifa: uyVazifaSchema,
});

export type DarsMeta = z.infer<typeof darsSchema>;

export type Dars = DarsMeta & {
  /** Markdown tanasi — qo'llanma matni */
  qollanma: string;
  /** "01" ko'rinishidagi fayl raqami */
  raqam: string;
  /** content/darslar/veb/01.md */
  fayl: string;
};

/* ------------------------------------------------------------------ */
/*  Xato matnini o'zbekcha va aniq qilib chiqarish                      */
/* ------------------------------------------------------------------ */

function yolMatni(yol: PropertyKey[]): string {
  if (yol.length === 0) return '(frontmatter ildizi)';
  return yol
    .map((k, i) => (typeof k === 'number' ? `[${k}]` : i === 0 ? String(k) : `.${String(k)}`))
    .join('');
}

function xabarniTarjimaQil(issue: z.core.$ZodIssue): string {
  if (issue.code === 'invalid_type' && 'input' in issue && issue.input === undefined) {
    return "maydon yo'q (majburiy)";
  }
  return issue.message;
}

export class DarsXatosi extends Error {
  constructor(fayl: string, muammolar: string[]) {
    super(
      [
        '',
        '='.repeat(66),
        '  FRONTMATTER XATOSI — build to\'xtatildi',
        `  Fayl: ${fayl}`,
        '='.repeat(66),
        ...muammolar.map((m) => `  [x] ${m}`),
        '='.repeat(66),
        '',
      ].join('\n'),
    );
    this.name = 'DarsXatosi';
  }
}

/**
 * Frontmatter'ni tekshiradi. Xato bo'lsa DarsXatosi tashlaydi —
 * build shu yerda to'xtaydi va qaysi fayl, qaysi maydon ekanini aytadi.
 */
export function darsniTekshir(fayl: string, xom: unknown): DarsMeta {
  const natija = darsSchema.safeParse(xom);
  if (natija.success) return natija.data;

  const muammolar = natija.error.issues.map(
    (issue) => `${yolMatni(issue.path as PropertyKey[])} — ${xabarniTarjimaQil(issue)}`,
  );
  throw new DarsXatosi(fayl, muammolar);
}
