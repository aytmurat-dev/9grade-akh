---
fayl: 08-rasm-va-skrinshot.md
maqsad: Skrinshot va generatsiya qilinadigan rasmlar bilan ishlash
---

# RASM VA SKRINSHOT

Ikki xil rasm bor va ular **butunlay boshqacha** ishlanadi.

| Turi | Kim tayyorlaydi | Misol |
|---|---|---|
| **Skrinshot** | Foydalanuvchi | Android Studio oynasi, Packet Tracer, brauzer natijasi |
| **Generatsiya** | Claude (Gemini API) | Sxema, diagramma, tushuncha illyustratsiyasi, ikonka |

**Hech qachon skrinshotni generatsiya qilishga urinmang.**
Sun'iy "Android Studio" rasmi soxta menyular va o'qib bo'lmaydigan
matn beradi — o'quvchini adashtiradi.

---

## 1. SKRINSHOTLAR

### Ro'yxat berish

Segment xaritasi tasdiqlangach, aniq ro'yxat bering:

```
SKRINSHOT 1
  Segment:      1
  Ekran:        Android Studio — New Project oynasi
  Ochiq:        "Empty Views Activity" tanlangan
  Belgilangan:  Language = Java, Minimum SDK = API 24
  Ko'rinishi:   Butun dialog oynasi
  Fayl:         public/img/mobil/01/1.png

SKRINSHOT 2
  ...
```

### Fayl nomi

```
public/img/<yonalish>/<NN>/<tartib>.png
```

Masalan: `public/img/mobil/01/1.png`

Frontmatter'da yo'l `/img/mobil/01/1.png` (public'siz).

### Qoidalar

1. Papkani oldindan yarating — foydalanuvchi faylni tashlashi uchun
2. Frontmatter'ga yo'lni **darrov** yozing, fayl keyin paydo bo'ladi
3. Bitta darsda 5–6 tadan oshmasin
4. O'quvchi ismi, maktab nomi, ichki ma'lumot ko'rinmasin — sayt ochiq
5. Skrinshot yo'q bo'lsa build to'xtamasin, lekin ogohlantirish chiqsin

---

## 2. GENERATSIYA QILINADIGAN RASMLAR

### Qachon kerak

- Tarmoq topologiyasi sxemasi
- Ma'lumot oqimi diagrammasi
- Tushuncha illyustratsiyasi (masalan "so'rov va javob")
- Solishtirish sxemasi
- Muqova rasmi

### Qachon KERAK EMAS

- Dastur interfeysi → skrinshot
- Kod → kod bloki
- Jadval → markdown jadval
- Oddiy sxema → SVG yoki HTML/CSS bilan chizish yaxshiroq

**Avval SVG ni ko'rib chiqing.** Oddiy blok-sxema, o'q, quti —
bularni SVG bilan chizish aniqroq, yengilroq va tahrirlash oson.
Gemini faqat rasm kerak bo'lganda ishlatiladi.

### Kalit

`.env` faylida:

```
GEMINI_API_KEY=...
```

**Kalitni hech qachon kodga, markdownga yoki commitga yozmang.**
`.env` `.gitignore` da bo'lsin.

### Skript

`scripts/gen-image.mjs`:

```javascript
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import 'dotenv/config';

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error('GEMINI_API_KEY topilmadi (.env faylini tekshiring)');
  process.exit(1);
}

const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const [prompt, outPath] = process.argv.slice(2);

if (!prompt || !outPath) {
  console.error('Foydalanish: node scripts/gen-image.mjs "<prompt>" <yo\'l>');
  process.exit(1);
}

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  }
);

if (!res.ok) {
  console.error('API xatosi:', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const part = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData);

if (!part) {
  console.error('Rasm qaytmadi:', JSON.stringify(data).slice(0, 500));
  process.exit(1);
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.from(part.inlineData.data, 'base64'));
console.log('Saqlandi:', outPath);
```

Ishga tushirish:

```bash
node scripts/gen-image.mjs "Ikkita LAN router orqali ulangan tarmoq sxemasi, oq fon, sodda chiziqlar, yorliqlar lotin harflarida" public/img/tarmoq/08/1.png
```

**Model nomi o'zgargan bo'lishi mumkin.** Xato chiqsa,
`ai.google.dev` dagi joriy model ro'yxatini tekshiring va
`.env` ga `GEMINI_IMAGE_MODEL=...` qo'shing.

### Prompt yozish qoidalari

1. **Ingliz tilida yozing** — natija barqarorroq
2. **Matn kam bo'lsin.** Rasmda matn yozilishi ishonchsiz —
   yorliqlarni SVG bilan ustiga qo'yish yaxshiroq
3. **Oq yoki shaffof fon** — sayt foniga mos tushadi
4. **Uslub bir xil bo'lsin** — rasm slaydda "dossier" varag'i ustida
   turadi (`rules/11`), shuning uchun palitra ham o'sha: qog'oz
   `#f0ebe2`, siyoh `#1c1a17`, kulrang `#8b8578` va bitta qizil
   aksent `#b32b26`. Tayyor ta'rif `scripts/rasm-yasa.mjs` dagi
   `USLUB` da — qo'lda yozganda ham shundan nusxa oling
5. **O'lcham:** 1200×675 (16:9) yoki 800×800

### Generatsiyadan keyin

1. Rasmni ko'ring — soxta matn, noto'g'ri element bormi
2. Siqing: `npx sharp-cli -i in.png -o out.webp --quality 80`
3. Frontmatter'ga yo'lni yozing

---

## 3. TEKSHIRISH

Dars fayli tayyor bo'lgach:

- Barcha `rasm:` yo'llari mavjud fayllarga ishora qiladimi
- Skrinshot papkalari yaratilganmi
- `.env` commitga tushmaganmi (`git status` bilan tekshiring)
