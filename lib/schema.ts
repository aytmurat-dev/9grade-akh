import { z } from 'zod';
import { DARSLAR_SONI, VARIANTLAR_SONI, YONALISHLAR } from './sozlamalar';
import { parametrlarniTop } from './shablon';

export { DARSLAR_SONI, VARIANTLAR_SONI, YONALISHLAR } from './sozlamalar';
export type { Yonalish } from './sozlamalar';

/* ------------------------------------------------------------------ */
/*  Dars va segment turlari — rules/01, rules/04                       */
/* ------------------------------------------------------------------ */

export const DARS_TURLARI = ['yangi', 'amaliy', 'loyiha'] as const;
export const SEGMENT_TURLARI = ['nazariy', 'amaliy'] as const;

/**
 * Video hali yozilmagan darslar uchun o'rin egallovchi ID.
 * Sxema uni o'tkazadi (11 belgi), lekin scripts/kontent-tekshir.mjs
 * har build'da eslatib turadi.
 */
export const VIDEO_KUTILMOQDA = 'VIDEOKUTMOQ';

/** rules/01: video maqsad 8-12 daq, mutlaq shift 20 daq */
export const DAVOMIYLIK_SHIFTI = 20;
/** rules/05: CPA tartibida har segmentga 3 slayd + pauza, maksimum 16 */
export const SLAYDLAR_SHIFTI = 16;
/** rules/03: bitta videoda amaliy pauza 2 tadan oshmasin */
export const AMALIY_PAUZA_SHIFTI = 2;

/**
 * rules/07: uy vazifasi hajmi darsning hajmiga qarab belgilanadi.
 * Bitta topshiriq eng ko'pi bilan 2 segmentni qoplaydi, shuning uchun
 * topshiriqlar soni = ceil(segmentlar / 2): 1–2 segment -> 1 topshiriq,
 * 3–4 segment -> 2 topshiriq. Darsda o'tilgan har bir segment biror
 * topshiriqqa tushishi shart.
 */
export const QAMROV_SHIFTI = 2;
/** Bitta topshiriqning taxminiy vaqti (daqiqa) */
export const TOPSHIRIQ_ENG_KAM = 5;
export const TOPSHIRIQ_ENG_KOP = 25;
/** Barcha topshiriqlar jami — bir kechada bajariladigan hajm (rules/07) */
export const UY_VAZIFA_SHIFTI = 35;

/** Segmentlar soniga qarab kerakli topshiriqlar soni */
export function topshiriqlarSoni(segmentlar: number): number {
  return Math.ceil(segmentlar / QAMROV_SHIFTI);
}

/* ------------------------------------------------------------------ */
/*  Segment                                                            */
/* ------------------------------------------------------------------ */

export const segmentSchema = z.object({
  nomi: z.string().min(1, "segment nomi bo'sh bo'lmasin"),
  pauza: z
    .string()
    .regex(/^\d{1,3}:[0-5]\d$/, "vaqt 'd:dd' ko'rinishida bo'lsin, masalan 3:40"),
  tur: z.enum(SEGMENT_TURLARI, {
    message: `segment turi faqat: ${SEGMENT_TURLARI.join(' | ')}`,
  }),
});

export type Segment = z.infer<typeof segmentSchema>;

/* ------------------------------------------------------------------ */
/*  Slayd — barcha maydonlar ixtiyoriy, lekin kamida bittasi bo'lsin    */
/* ------------------------------------------------------------------ */

export const slaydSchema = z
  .object({
    /** Muqova slaydi — dars nomi katta yoziladi (rules/11) */
    muqova: z.boolean().optional(),
    /** Tepa chapdagi bo'lim yorlig'i: "KIRISH", "SEGMENT 1" */
    yorliq: z.string().min(1).max(24).optional(),
    /** Sarlavha ustidagi qizil qatorcha */
    ustyozuv: z.string().min(1).max(48).optional(),
    sarlavha: z.string().min(1).optional(),
    matn: z.string().min(1).optional(),
    /** Punktlar ro'yxati — "Nima o'rganamiz" kabi slaydlar uchun (rules/05) */
    royxat: z.array(z.string().min(1)).max(6).optional(),
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
    /** Pastdagi mono yorliqlar — 3 tadan oshmasin (rules/11) */
    teglar: z.array(z.string().min(1).max(20)).max(3).optional(),
    /** O'ng pastdagi aylana muhr — 2 so'zdan oshmasin */
    muhr: z.string().min(1).max(24).optional(),
    pauza: z.boolean().optional(),
    topshiriq: z.string().min(1).optional(),
    /** Pauza taxminiy vaqti — "1 daqiqa" (rules/05) */
    vaqt: z.string().min(1).optional(),
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

export const topshiriqSchema = z.object({
  /**
   * Topshiriq qaysi segment(lar)ni mashq qiladi — segment raqamlari,
   * 1 dan boshlab. Darsda o'tilgan har bir segment biror topshiriqqa
   * tushishi shart (rules/07); buni darsSchema tekshiradi, chunki
   * segmentlar soni faqat o'sha yerda ma'lum.
   */
  qamrov: z
    .array(z.number().int().positive(), {
      message: "'qamrov' — segment raqamlari ro'yxati, masalan [1, 2]",
    })
    .min(1, "'qamrov' bo'sh bo'lmasin — topshiriq qaysi segmentni mashq qilishini ko'rsating")
    .max(
      QAMROV_SHIFTI,
      `bitta topshiriq ${QAMROV_SHIFTI} tadan ko'p segmentni qoplamasin — ikkiga bo'ling (rules/07)`,
    ),
  /** Taxminiy bajarish vaqti — o'quvchi hajmni oldindan bilsin */
  daqiqa: z
    .number({ message: "'daqiqa' — taxminiy bajarish vaqti, raqam bilan yozilsin" })
    .int("'daqiqa' butun son bo'lsin")
    .min(TOPSHIRIQ_ENG_KAM, `'daqiqa' ${TOPSHIRIQ_ENG_KAM} dan kam bo'lmasin`)
    .max(
      TOPSHIRIQ_ENG_KOP,
      `'daqiqa' ${TOPSHIRIQ_ENG_KOP} dan oshmasin — bunchalik katta topshiriq ikkiga bo'linadi`,
    ),
  shablon: z.string({ message: "'shablon' yozilishi shart" }).min(1, "shablon bo'sh bo'lmasin"),
  minimum: z.string({ message: "'minimum' yozilishi shart" }).min(1, "minimum bo'sh bo'lmasin"),
  qoshimcha: z.string().min(1).optional(),
});

export type Topshiriq = z.infer<typeof topshiriqSchema>;

/* ------------------------------------------------------------------ */
/*  Uy vazifasi                                                        */
/* ------------------------------------------------------------------ */

export const uyVazifaSchema = z
  .object({
    topshiriqlar: z
      .array(topshiriqSchema, { message: "'topshiriqlar' ro'yxati bo'lishi shart" })
      .min(1, "kamida bitta topshiriq bo'lsin"),
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

    /* --- 2. Har bir topshiriqdagi {PARAMETR} barcha variantlarda bo'lsin --- */
    // Barcha topshiriqlar bitta variantlar jadvalidan foydalanadi: o'quvchi
    // raqamini bir marta tanlaydi, qatoridagi qiymatlar hamma topshiriqqa
    // yetadi (scripts/uy-vazifa-json.mjs bitta JSON yozadi).
    const kerakli = new Map<string, string>(); // parametr -> qaysi maydonda uchradi
    uy.topshiriqlar.forEach((t, i) => {
      const matnlar: Array<[string, string]> = [
        [`topshiriqlar[${i}].shablon`, t.shablon],
        [`topshiriqlar[${i}].minimum`, t.minimum],
      ];
      if (t.qoshimcha) matnlar.push([`topshiriqlar[${i}].qoshimcha`, t.qoshimcha]);
      for (const [maydon, matn] of matnlar) {
        for (const p of parametrlarniTop(matn)) {
          if (!kerakli.has(p)) kerakli.set(p, maydon);
        }
      }
    });

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
  /** rules/04: yangi | amaliy | loyiha. Yozilmasa — "yangi" */
  tur: z
    .enum(DARS_TURLARI, {
      message: `'tur' faqat quyidagilardan biri: ${DARS_TURLARI.join(' | ')}`,
    })
    .optional(),
  video: z
    .string({ message: "'video' — YouTube ID bo'lishi shart" })
    .regex(
      /^[A-Za-z0-9_-]{11}$/,
      "'video' — 11 belgili YouTube ID bo'lsin, to'liq havola emas. Masalan: dQw4w9WgXcQ",
    ),
  davomiylik: z
    .number({ message: "'davomiylik' daqiqada, raqam bilan yozilsin" })
    .int("'davomiylik' butun son bo'lsin (daqiqa)")
    .positive("'davomiylik' musbat bo'lsin")
    .max(
      DAVOMIYLIK_SHIFTI,
      `'davomiylik' ${DAVOMIYLIK_SHIFTI} daqiqadan oshmasin — uzun bo'lsa mavzuni ikkiga bo'ling (rules/01)`,
    ),
  segmentlar: z
    .array(segmentSchema, { message: "'segmentlar' ro'yxati bo'lishi shart" })
    .min(1, "kamida bitta segment bo'lsin"),
  slaydlar: z
    .array(slaydSchema, { message: "'slaydlar' ro'yxati bo'lishi shart" })
    .min(1, "kamida bitta slayd bo'lsin")
    .max(SLAYDLAR_SHIFTI, `slaydlar ${SLAYDLAR_SHIFTI} tadan oshmasin (rules/05)`),
  uyVazifa: uyVazifaSchema,
}).superRefine((dars, ctx) => {
  /* --- A va L darslari: sxema ham, sahifa qolipi ham hali yo'q --- */
  if (dars.tur && dars.tur !== 'yangi') {
    ctx.addIssue({
      code: 'custom',
      path: ['tur'],
      message:
        `'${dars.tur}' turidagi dars hali qo'llanmagan. Bu tur uchun video, segment va ` +
        `slayd bo'lmaydi (rules/04), sxema va sahifa qolipi esa faqat "yangi" ni biladi. ` +
        `Avval qolipni yozing, keyin bu darsni qo'shing.`,
    });
  }

  /* --- rules/03: bitta videoda amaliy pauza 2 tadan oshmasin --- */
  const amaliy = dars.segmentlar.filter((s) => s.tur === 'amaliy');
  if (amaliy.length > AMALIY_PAUZA_SHIFTI) {
    ctx.addIssue({
      code: 'custom',
      path: ['segmentlar'],
      message:
        `amaliy pauza ${amaliy.length} ta — ${AMALIY_PAUZA_SHIFTI} tadan oshmasin. ` +
        `Aks holda uydagi vaqt 40 daqiqadan oshadi va vazifa bajarilmay qoladi (rules/03).`,
    });
  }

  /* --- rules/05: har segmentga bitta pauza slaydi --- */
  const pauzalar = dars.slaydlar.filter((s) => s.pauza === true).length;
  if (pauzalar !== dars.segmentlar.length) {
    ctx.addIssue({
      code: 'custom',
      path: ['slaydlar'],
      message:
        `pauza slaydlari ${pauzalar} ta, segmentlar esa ${dars.segmentlar.length} ta — ` +
        `teng bo'lishi shart: har segment o'z pauzasi bilan tugaydi (rules/05).`,
    });
  }

  /* --- rules/07: uy vazifasi hajmi darsning hajmiga qarab --- */
  const segmentSoni = dars.segmentlar.length;
  const topshiriqlar = dars.uyVazifa.topshiriqlar;
  const kerak = topshiriqlarSoni(segmentSoni);

  if (topshiriqlar.length !== kerak) {
    ctx.addIssue({
      code: 'custom',
      path: ['uyVazifa', 'topshiriqlar'],
      message:
        `topshiriqlar ${topshiriqlar.length} ta, ${segmentSoni} segmentli darsda esa ${kerak} ta ` +
        `bo'lishi kerak (bitta topshiriq ${QAMROV_SHIFTI} tadan ko'p segmentni qoplamaydi, rules/07).`,
    });
  }

  /* --- Har segment aynan bitta topshiriqqa tushsin --- */
  const egasi = new Map<number, number>(); // segment raqami -> topshiriq indeksi
  topshiriqlar.forEach((t, i) => {
    for (const raqam of t.qamrov) {
      if (raqam > segmentSoni) {
        ctx.addIssue({
          code: 'custom',
          path: ['uyVazifa', 'topshiriqlar', i, 'qamrov'],
          message: `${raqam}-segment yo'q — darsda ${segmentSoni} ta segment bor`,
        });
      } else if (egasi.has(raqam)) {
        ctx.addIssue({
          code: 'custom',
          path: ['uyVazifa', 'topshiriqlar', i, 'qamrov'],
          message:
            `${raqam}-segment ${(egasi.get(raqam) as number) + 1}-topshiriqda ham bor — ` +
            `bitta segment ikki marta mashq qilinmaydi (rules/07).`,
        });
      } else {
        egasi.set(raqam, i);
      }
    }
  });

  const qoplanmagan: string[] = [];
  for (let i = 1; i <= segmentSoni; i++) {
    if (!egasi.has(i)) qoplanmagan.push(`${i} ("${dars.segmentlar[i - 1].nomi}")`);
  }
  if (qoplanmagan.length > 0) {
    ctx.addIssue({
      code: 'custom',
      path: ['uyVazifa', 'topshiriqlar'],
      message:
        `bu segmentlar uy vazifasiga tushmagan: ${qoplanmagan.join(', ')}. ` +
        `Darsda o'tilgan har bir mavzu mashq qilinishi shart (rules/07).`,
    });
  }

  /* --- Jami vaqt: bir kechada bajariladigan hajm --- */
  const jami = topshiriqlar.reduce((s, t) => s + t.daqiqa, 0);
  if (jami > UY_VAZIFA_SHIFTI) {
    ctx.addIssue({
      code: 'custom',
      path: ['uyVazifa', 'topshiriqlar'],
      message:
        `uy vazifasi jami ${jami} daqiqa — ${UY_VAZIFA_SHIFTI} daqiqadan oshmasin. ` +
        `Uzun bo'lsa topshiriqni qisqartiring, mavzuni emas (rules/07).`,
    });
  }
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
