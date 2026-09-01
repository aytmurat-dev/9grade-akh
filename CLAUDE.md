# 9-sinf informatika videodarslari

Flipped classroom sayti: o'quvchi uyda videoni ko'radi, uy vazifasini bajaradi,
darsda tahlil qilinadi. Sof statik sayt — server, ma'lumotlar bazasi, auth va
API route **yo'q**.

Dars materiallarini yozish qoidalari alohida papkada: [`rules/`](rules/00-INDEX.md).
Bu fayl esa saytning o'zi qanday qurilganini tushuntiradi.

## Texnologiya

- Next.js (App Router) + TypeScript, `output: 'export'`
- Styling: dizayn sistema (`styles/`) + kerak joyda CSS Modules
- Kontent: `content/darslar/` ichidagi markdown fayllar
- Vercel'ga deploy qilinadi

## Sayt tuzilishi

```
/                     3 ta yo'nalish kartasi
/[yonalish]           darslar ro'yxati, chorak bo'yicha guruhlangan
/[yonalish]/[dars]    dars sahifasi
/dizayn               dizayn sistemaning tirik ko'rgazmasi (ichki sahifa)
```

Yo'nalishlar: `veb`, `mobil`, `tarmoq`. Har birida 34 tagacha dars.

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

Tayyor komponentlar: `Qobiq`, `Bolim`, `Karta`, `Panel`, `Tugma`, `Belgi`,
`Belgilar`, `Alert`, `Jadval`, `Royxat`, `Qator`, `Ustki`, `Yordam`.

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

---

## Kontent formati

Fayllar: `content/darslar/<yonalish>/<NN>.md` (NN = 01..34)

```yaml
---
dars: 1
mavzu: "HTML hujjat tuzilishi"
yonalish: "veb"
chorak: 1
video: "dQw4w9WgXcQ"
davomiylik: 11

segmentlar:
  - nomi: "Hujjat skeleti"
    pauza: "3:40"
    tur: "nazariy"
  - nomi: "Teglar va atributlar"
    pauza: "7:15"
    tur: "amaliy"

slaydlar:
  - sarlavha: "HTML nima?"
    matn: "Sahifaning skeleti — mazmun, dizayn emas"
    rasm: "/img/veb/01/1.svg"
  - sarlavha: "Asosiy teglar"
    kod: |
      <h1>Sarlavha</h1>
      <p>Matn</p>
    til: "html"
  - sarlavha: "PAUZA"
    pauza: true
    topshiriq: "Ushbu kod brauzerda nima ko'rsatadi?"

uyVazifa:
  shablon: "{TEG} tegidan foydalanib {MAVZU} haqida sahifa yarating"
  minimum: "Sarlavha, ikkita paragraf, bitta rasm"
  qoshimcha: "Ro'yxat qo'shing"
  variantlar:
    - { n: 1, TEG: "h2", MAVZU: "Nukus" }
    - { n: 2, TEG: "h3", MAVZU: "Amudaryo" }
---

## Nima o'rganamiz
Markdown tanasi — qo'llanma matni. Sarlavhalar, kod bloklari,
rasmlar, jadvallar.
```

Slayd maydonlari ixtiyoriy: `sarlavha`, `matn`, `kod`, `til`, `rasm`,
`rasmTavsif`, `rasmYozuv`, `pauza`, `topshiriq`. Slayd ular bor bo'lganini
chizadi. `til` — kod bo'yalishi uchun (`html`, `css`, `js`, `python`, ...).

Rasmlar `public/img/<yonalish>/<NN>/` papkasida. Next.js `<Image>`
ishlatiladi, `unoptimized: true` (statik eksport uchun).

---

## Frontmatter tekshiruvi — MAJBURIY

Zod sxemasi: `lib/schema.ts`. Build paytida har bir `.md` fayl tekshiriladi.
Xato bo'lsa build **to'xtaydi** va qaysi fayl, qaysi maydon ekanini aytadi.

Majburiy maydonlar: `dars`, `mavzu`, `yonalish`, `chorak`, `video`,
`davomiylik`, `segmentlar`, `slaydlar`, `uyVazifa`.

Qo'shimcha qoidalar:

- `uyVazifa.variantlar` uzunligi aynan **12** bo'lishi shart
- `yonalish` faqat `veb | mobil | tarmoq`
- `chorak` 1..4
- `dars` 1..34
- Har bir variantda `n` maydoni bo'lsin, 1..12, takrorlanmasin
- `shablon` ichidagi har bir `{PARAMETR}` barcha variantlarda mavjud bo'lsin
  (`minimum` va `qoshimcha` ham shu qoidaga bo'ysunadi)

Oxirgi ikkitasi muhim — shablon `{MAVZU}` deb yozilib, variantda `MAVZU`
yo'q bo'lsa, o'quvchi topshiriqda `{MAVZU}` so'zini ko'radi.

Bundan tashqari tekshiriladi: `video` — 11 belgili YouTube ID (to'liq havola
emas), `pauza` vaqti `d:dd` ko'rinishida, fayl nomi `NN.md`, frontmatterdagi
`dars` va `yonalish` fayl joylashuviga mos.

### MA'LUM CHEKLOV

Sxema hozircha faqat **D (yangi mavzu)** darsini biladi. `rules/04` da
tasvirlangan **A (amaliy)** va **L (loyiha)** darslarida `video`,
`davomiylik`, `segmentlar`, `slaydlar` yo'q — bunday fayl build'ni
to'xtatadi. `tur`, `bogliqDars`, `muddat`, `baholash`, slayddagi `vaqt`
maydonlari ham hali qo'llanmagan. A/L darslarini yozishdan oldin sxemani
kengaytirish kerak.

---

## Muhim qarorlar

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
| `SlaydRejim` | `?slayd` uchun `<body>` ga sinf qo'yish |
| `QollanmaXulq` | kod nusxasi va rasm lupasi |

Sarlavha, video, segmentlar, qo'llanma matni va navigatsiya — sof HTML.
Qo'llanma HTML'i **mijoz komponentiga prop qilib berilmaydi**
(`components/Qollanma.tsx` server, `QollanmaXulq.tsx` esa unga faqat klik
tinglovchisini ulaydi).

**Markdown build paytida HTML'ga aylantiriladi** (`lib/markdown.ts`) — brauzerga
markdown kutubxonasi, zod yoki syntax highlighter tushmaydi. Kod bloklarining
"Nusxa olish" tugmasi ham shu yerda HTML ichiga qo'shiladi.

**`?slayd` rejimi** — `/[yonalish]/[dars]?slayd` faqat slayderni to'liq ekranda
ko'rsatadi. Rejim `<body class="slayd-rejim">` orqali, sof CSS bilan ishlaydi
(`styles/ds.css` va `Slider.module.css`), shuning uchun sahifa mijoz
komponentiga aylanmaydi. Esc bilan chiqiladi.

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
