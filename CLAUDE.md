# 9-sinf informatika videodarslari

Flipped classroom sayti: o'quvchi uyda videoni ko'radi, uy vazifasini bajaradi,
darsda tahlil qilinadi. Sof statik sayt — server, ma'lumotlar bazasi, auth va
API route **yo'q**.

Dars materiallarini yozish qoidalari alohida papkada: [`rules/`](rules/00-INDEX.md).
Pedagogik yondashuv — **CPA** (aniq → tasvirli → mavhum) va **LXD**:
[`rules/01`](rules/01-model-va-ish-tartibi.md). Slayd ko'rinishi:
[`rules/11`](rules/11-slayd-dizayni.md).
Bu fayl esa saytning o'zi qanday qurilganini tushuntiradi.

## Texnologiya

- Next.js (App Router) + TypeScript, `output: 'export'`
- Styling: dizayn sistema (`styles/`) + kerak joyda CSS Modules
- Kontent: `content/darslar/` ichidagi markdown fayllar
- Vercel'ga deploy qilinadi

## Sayt tuzilishi

```
/                     Veb darslari ro'yxati — saytning kirish sahifasi
/mobil, /tarmoq       qolgan yo'nalishlar darslari
/[yonalish]/[dars]    dars sahifasi
/dizayn               dizayn sistemaning tirik ko'rgazmasi (ichki sahifa)
```

Yo'nalishlar: `veb`, `mobil`, `tarmoq`. Har birida 34 tagacha dars.

**Alohida bosh sahifa yo'q.** O'quvchi saytga kirishi bilan Veb darslarini
ko'radi, qolgan yo'nalishlar tepa paneldan ochiladi. Ro'yxatni ikkala manzil
ham bitta komponentdan chizadi: `components/YonalishRoyxati.tsx`.
Havola yasayotganda `yonalishManzili(yonalish)` dan foydalaning — u veb uchun
`/` qaytaradi. (`/veb` sahifasi ham yaratiladi, lekin unga havola berilmaydi:
u faqat manzilni qo'lda qisqartirganda 404 chiqmasligi uchun, `canonical` esa
`/` ga ishora qiladi.)

Dars sahifasidagi tartib **aynan shunday**:
sarlavha + davomiylik + chorak → YouTube iframe → slider → qo'llanma → uy vazifasi.

Fayli hali yaratilmagan darslar ro'yxatda ko'rinmaydi.

---

## Dizayn sistema

**Yangi sahifa yozayotganda yangi rang, oraliq yoki shrift o'lchami
o'ylab topmang.** Hammasi tayyor:

```
styles/tokens.css      1-qavat: rang, oraliq, shrift, radius, soya
styles/asos.css        2-qavat: h1..h6, p, ul, a, pre, table standart ko'rinishi
styles/ds.css          3-qavat: .ds-* komponent sinflari
components/ds/index.tsx  React o'ramlari
app/dizayn/            tirik ko'rgazma — brauzerda ochib ko'ring
```

Tayyor komponentlar: `Qobiq`, `Bolim`, `Karta`, `Panel`, `Tugma`, `Tanlov`,
`Belgi`, `Belgilar`, `Alert`, `Jadval`, `Royxat`, `Qator`, `Ustki`, `Yordam`.

Qoidalar:

1. Rang yoki o'lcham kerak bo'lsa — `var(--rang-…)`, `var(--joy-…)`,
   `var(--olcham-…)`. To'g'ridan-to'g'ri `#1a5fd4` yoki `16px` yozilmaydi.
2. Kerakli bo'lak yo'q bo'lsa — avval `styles/ds.css` va `components/ds/` ga
   qo'shing, keyin sahifada ishlating. Sahifa ichida bir martalik uslub yozmang.
3. Yangi bo'lakni `app/dizayn/page.tsx` ga ham qo'shing — sistema "qog'ozda"
   emas, ishlaydigan holda qolsin.
4. CSS Modules faqat bir joyda ishlatiladigan joylashuv uchun (slayder,
   segmentlar ro'yxati, sahifa gridi). Ular ham faqat tokenlardan foydalanadi.

Dizayn sistema global CSS (`ds-*` sinflari), CSS Modules emas. Sababi ikkita:
markdown'dan yasalgan qo'llanma HTML'i ham shu sinflardan foydalanadi, va
bitta umumiy CSS fayl 100+ sahifada bir marta keshlanadi.

Dark mode **yo'q** — ataylab.

### Slayd — alohida ko'rinish

Saytning qolgan qismi iliq "editorial" uslubda, slayd esa **"dossier"**
(arxiv fayli) konsepsiyasida: qog'oz fon, ichki ramka, burchak qavslari,
mono yozuvlar va bitta qizil aksent. Sababi — slayd videoga tushadi va
sayt bezagidan mustaqil bo'lishi kerak.

- Konsepsiya va yozish qoidalari: [`rules/11`](rules/11-slayd-dizayni.md)
- Ranglar: `styles/tokens.css` dagi `--slayd-*` guruhi
- Kod: `components/Slider.module.css`

Slayd ichidagi o'lchamlar **`cqw`** (quti kengligining foizi) bilan
beriladi — shuning uchun saytdagi kichik karusel va to'liq ekrandagi kadr
bir xil ko'rinadi. Piksel bilan o'lcham yozilmaydi; yagona istisno —
`max()` ichidagi pol qiymati.

Mono shrift (IBM Plex Mono) `next/font` orqali build paytida yuklanadi va
o'z domenimizdan beriladi — Google'ga so'rov ketmaydi.

---

## Kontent formati

Fayllar: `content/darslar/<yonalish>/<NN>.md` (NN = 01..34)

```yaml
---
dars: 5
mavzu: "Takrorlash operatorlari"
yonalish: "veb"
chorak: 1
tur: "yangi"
video: "dQw4w9WgXcQ"
davomiylik: 11

segmentlar:
  - nomi: "for sikli"
    pauza: "3:40"
    tur: "nazariy"
  - nomi: "while sikli"
    pauza: "7:15"
    tur: "amaliy"

slaydlar:
  - sarlavha: "Nima o'rganamiz"
    royxat:
      - "for sikli"
      - "while sikli"
  - sarlavha: "for sikli"
    kod: |
      for (let i = 0; i < 5; i++) {
        console.log(i);
      }
    til: "javascript"
  - sarlavha: "PAUZA"
    pauza: true
    topshiriq: "Bu sikl nechta marta ishlaydi?"
    vaqt: "1 daqiqa"

uyVazifa:
  topshiriqlar:
    - qamrov: [1, 2]        # qaysi segmentlarni mashq qiladi
      daqiqa: 10
      shablon: "{SIKL} siklidan foydalanib 1..50 dagi {SHART} sonlarni chiqaring"
      minimum: "Kod ishlashi va natijani konsolga chiqarishi"
      qoshimcha: "Natijani sahifada ro'yxat ko'rinishida chiqaring"
    - qamrov: [3]
      daqiqa: 15
      shablon: "Shu siklga {AMAL} qo'shing va nima o'zgarganini yozing"
      minimum: "Sikl to'xtaydigan shart ko'rinib tursin"
  variantlar:               # jadval bitta — hamma topshiriq uchun
    - { n: 1, SIKL: "for",   SHART: "juft", AMAL: "break" }
    - { n: 2, SIKL: "while", SHART: "toq",  AMAL: "continue" }
---

## Nima o'rganamiz
Markdown tanasi — qo'llanma matni. Sarlavhalar, kod bloklari,
rasmlar, jadvallar.
```

Slayd maydonlari ixtiyoriy: `muqova`, `yorliq`, `ustyozuv`, `sarlavha`,
`matn`, `royxat`, `kod`, `til`, `rasm`, `rasmTavsif`, `rasmYozuv`, `teglar`,
`muhr`, `pauza`, `topshiriq`, `vaqt`. Slayd ular bor bo'lganini chizadi.
`til` — kod bo'yalishi uchun (`html`, `css`, `javascript`, ...). `vaqt`
faqat pauza slaydida ko'rinadi. Har birining vazifasi va uzunlik
chegarasi: [`rules/11`](rules/11-slayd-dizayni.md).

Rasmlar `public/img/<yonalish>/<NN>/` papkasida. Next.js `<Image>`
ishlatiladi, `unoptimized: true` (statik eksport uchun).

---

## Frontmatter tekshiruvi — MAJBURIY

Zod sxemasi: `lib/schema.ts`. Build paytida har bir `.md` fayl tekshiriladi.
Xato bo'lsa build **to'xtaydi** va qaysi fayl, qaysi maydon ekanini aytadi.

Majburiy maydonlar: `dars`, `mavzu`, `yonalish`, `chorak`, `video`,
`davomiylik`, `segmentlar`, `slaydlar`, `uyVazifa`. `tur` yozilmasa
`"yangi"` deb hisoblanadi.

Qo'shimcha qoidalar:

- `uyVazifa.variantlar` uzunligi aynan **12** bo'lishi shart
- `yonalish` faqat `veb | mobil | tarmoq`
- `chorak` 1..4
- `dars` 1..34
- Har bir variantda `n` maydoni bo'lsin, 1..12, takrorlanmasin
- `shablon` ichidagi har bir `{PARAMETR}` barcha variantlarda mavjud bo'lsin
  (`minimum` va `qoshimcha` ham shu qoidaga bo'ysunadi)
- `davomiylik` ≤ 20 daqiqa (`rules/01`)
- segmentdagi `tur` faqat `nazariy | amaliy`, amaliylari 2 tadan oshmasin
  (`rules/03`)
- `slaydlar` 16 tadan oshmasin (`rules/05`)
- `pauza: true` slaydlar soni segmentlar soniga teng (`rules/05`)
- `uyVazifa.topshiriqlar` soni = ceil(segmentlar / 2) — kichik darsda
  bitta, kattasida ikkita (`rules/07`)
- har segment aynan bitta topshiriqning `qamrov` ida bo'lsin: tushib
  qolgani ham, ikki marta kelgani ham xato
- bitta `qamrov` da 2 tadan ko'p segment bo'lmasin
- `daqiqa` 5..25, barcha topshiriqlar jami 35 daqiqadan oshmasin

Shablon qoidasi muhim — `{MAVZU}` deb yozilib, variantda `MAVZU`
yo'q bo'lsa, o'quvchi topshiriqda `{MAVZU}` so'zini ko'radi.
Qamrov qoidasi ham shunday muhim: darsda o'tilgan, lekin uy vazifasida
mashq qilinmagan mavzu esda qolmaydi.

Bundan tashqari tekshiriladi: `video` — 11 belgili YouTube ID (to'liq havola
emas), `pauza` vaqti `d:dd` ko'rinishida, fayl nomi `NN.md`, frontmatterdagi
`dars` va `yonalish` fayl joylashuviga mos.

### Video hali yo'q bo'lsa

`video: "VIDEOKUTMOQ"` — o'rin egallovchi ID. Sxema uni o'tkazadi, lekin
`scripts/kontent-tekshir.mjs` har build'da eslatib turadi. Shu skript
yetishmayotgan rasm (skrinshot) yo'llarini ham sanaydi — bular build'ni
**to'xtatmaydi**, chunki `rules/08` bo'yicha yo'l darrov yoziladi, fayl
keyin paydo bo'ladi.

### MA'LUM CHEKLOV

Sahifa qolipi va sxema faqat **D (yangi mavzu)** darsini biladi.
`tur: "amaliy"` yoki `tur: "loyiha"` yozilsa build to'xtaydi va shuni
tushuntiradi. `rules/04` bo'yicha bu turlarda `video`, `segmentlar`,
`slaydlar` bo'lmaydi, o'rniga `bogliqDars`, `muddat`, `baholash` keladi —
ular hali qo'llanmagan. A/L darsini yozishdan oldin avval sahifa qolipini
yozish kerak.

---

## Muhim qarorlar

**Uy vazifasi hajmi darsdan chiqadi.** Topshiriqlar soni segmentlar
soniga bog'langan (`ceil(segmentlar / 2)`) va har segment aynan bitta
topshiriqda mashq qilinadi — buni sxema tekshiradi. Sayt topshiriq
tepasida qaysi segment ekanini yozib qo'yadi, shuning uchun o'quvchi
qaysi bo'limni qayta o'qishni biladi. Variantlar jadvali esa **bitta** —
raqam bir marta tanlanadi, qiymatlar hamma topshiriqqa yetadi.

**O'quvchi raqamini bitta joydan tanlaydi.** Uy vazifasi kartasining
tepasidagi ro'yxat (`Tanlov` — native `<select>`) ham birinchi so'rov, ham
keyingi o'zgartirish uchun ishlatiladi. Ilgari ikki xil ko'rinish bor edi:
12 tugmali panjara va alohida "Raqamni o'zgartirish" tugmasi.

**Uy vazifasi variantlari sahifa kodiga tushmaydi.** `scripts/uy-vazifa-json.mjs`
build oldidan har bir variantni alohida faylga yozadi:
`public/uy/<yonalish>/<NN>/<n>.json`. Sahifa faqat bittasini yuklaydi.
Shuning uchun **`variantlar` hech qachon mijoz komponentiga prop sifatida
berilmaydi** — `app/[yonalish]/[dars]/page.tsx` da u ataylab ajratib olinadi.

**Dars sahifasi — server komponenti.** Brauzerga faqat uchta kichik orolcha
tushadi:

| Orolcha | Vazifasi |
|---|---|
| `Slider` | slaydlarni almashtirish |
| `UyVazifa` | variantni yuklash, raqamni saqlash |
| `SlaydRejim` | slayd rejimi: `<body>` sinfi, Esc, to'liq ekran |
| `QollanmaXulq` | kod nusxasi va rasm lupasi |

Sarlavha, video, segmentlar, qo'llanma matni va navigatsiya — sof HTML.
Qo'llanma HTML'i **mijoz komponentiga prop qilib berilmaydi**
(`components/Qollanma.tsx` server, `QollanmaXulq.tsx` esa unga faqat klik
tinglovchisini ulaydi).

**Markdown build paytida HTML'ga aylantiriladi** (`lib/markdown.ts`) — brauzerga
markdown kutubxonasi, zod yoki syntax highlighter tushmaydi. Kod bloklarining
"Nusxa olish" tugmasi ham shu yerda HTML ichiga qo'shiladi.

**Slayd rejimi** — faqat slayder, butun ekranda. Uch xil yo'l bilan
yoqiladi: slayderning o'ng yuqori burchagidagi tugma, **F** tugmasi va
`/[yonalish]/[dars]?slayd` manzili. Chiqish — **Esc**.

Ko'rinishni `<body class="slayd-rejim">` sinfi beradi, sof CSS bilan
(`styles/ds.css` va `Slider.module.css`) — shuning uchun sahifa mijoz
komponentiga aylanmaydi. Tugma bundan tashqari brauzerning Fullscreen
API'sini ham chaqiradi, ya'ni brauzer panellari ham yo'qoladi. iPhone
Safari elementni to'liq ekranga chiqarmaydi — u yerda faqat CSS rejimi
qoladi, va bu yetarli.

Rejimning egasi — `components/SlaydRejim.tsx`: sinf, Esc, `?slayd`
tekshiruvi va to'liq ekran yordamchilari shu yerda. Slayder o'sha
funksiyalarni import qiladi (teskarisi emas — aylanma import bo'lmasin).

Burchakdagi tugma slayd rejimida **ko'rinmaydi**, sichqoncha slayder
ustiga kelgandagina paydo bo'ladi: bu ko'rinish videoga yozib olinadi,
kadrda ortiqcha tugma turmasin.

**Slayder o'lchami qat'iy** — 16:9, xuddi video kabi. Slaydda uch so'z bormi
yoki yigirma qator kodmi, quti bir xil qoladi. `Slider.module.css` dagi
`.sahna` ga `width: 100%` yozilgan: usiz brauzer `aspect-ratio` ni teskari
hisoblab, kenglikni `min-height` dan chiqaradi va sahifa gorizontal toshadi.

**Havolalarda `prefetch={false}`.** Darslar ro'yxatida 34 ta havola bor;
har birining navigatsiya faylini oldindan yuklash telefon trafigini behuda
sarflaydi. Sahifalar statik, o'tish shusiz ham tez.

**`scripts/win-segment-fix.mjs`** — Windows'da `next build` navigatsiya keshi
fayllarini noto'g'ri nom bilan yozadi (`/` o'rniga `\` bilan). Bu skript
`postbuild` da uni to'g'rilaydi. Linux'da (Vercel) hech narsa qilmaydi.

---

## Rasm generatsiyasi

Kalit `.env` da: `GEMINI_API_KEY` (model: `GEMINI_IMAGE_MODEL`, sukut bo'yicha
`gemini-3.1-flash-image`). `.env` git'ga tushmaydi.

```bash
npm run rasm                    # frontmatterdagi yetishmayotgan rasmlar
npm run rasm -- veb 01          # faqat bitta dars
npm run rasm -- --korish        # promptlarni ko'rsatadi, yasamaydi

node scripts/gen-image.mjs "<prompt>" public/img/tarmoq/08/1.webp   # bitta rasm
```

Rasm 1200px WebP ga siqiladi (270 KB JPEG → 15–40 KB). Alohida siqish
buyrug'i kerak emas.

Slaydda ikkita maydon boshqaradi:

```yaml
rasmTavsif: "A page split into a faded upper zone and a white lower zone"
rasmYozuv: ["head", "body"]
```

- `rasmTavsif` — inglizcha yozing, natija barqarorroq. Bu maydon bo'lmasa
  rasm generatsiya qilinmaydi (skrinshot uchun joy deb hisoblanadi).
- `rasmYozuv` — rasmda chiqishi mumkin bo'lgan **yagona** so'zlar. Bo'sh
  qoldirilsa rasm umuman yozuvsiz chiziladi. Bu ataylab shunday: generator
  harflarni buzib yozadi ("STRUKSYA"), o'quvchi esa xato yozuvni to'g'ri deb
  o'rganib qoladi.

Har bir promptga logotip/suv belgisi taqiqi avtomatik qo'shiladi
(`TAQIQ`, `scripts/rasm-yadro.mjs`) — generator burchakka o'z yulduzchasini
yoki imzosini chizib qo'ymasin.

**Yasalgan rasmni albatta ko'zdan kechiring.** Chiroyli, lekin mazmunan
noto'g'ri sxema — eng xavfli natija. Oddiy blok-sxema uchun SVG qo'lda
chizilgani aniqroq va yengilroq (namuna: `public/img/veb/01/1.svg`).

Dastur oynasi, brauzer natijasi kabi rasmlar generatsiya qilinmaydi — ular
skrinshot bo'lishi kerak (`rules/08`).

---

## Buyruqlar

```bash
npm run dev      # ishlab chiqish serveri
npm run build    # statik sayt -> out/
npm run lint     # tsc --noEmit
npm run rasm     # yetishmayotgan slayd rasmlarini yasash
```

`dev` va `build` dan oldin ikkita skript o'ziyurar ishlaydi:
`uy-vazifa-json.mjs` (variant JSON'lari) va `kontent-tekshir.mjs`
(yetishmayotgan rasm/video eslatmasi).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
