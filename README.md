# Informatika 9-sinf — videodarslar

Flipped classroom sayti. O'quvchi uyda videoni ko'radi va uy vazifasini
bajaradi, darsda esa ishlar birga tahlil qilinadi.

## Ishga tushirish

```bash
npm install
npm run dev       # http://localhost:3000
```

Statik saytni yig'ish:

```bash
npm run build     # natija: out/ papkasida
```

## Yangi dars qo'shish

1. `content/darslar/<yonalish>/NN.md` faylini yarating (NN — 01 dan 34 gacha).
   Namuna: [`content/darslar/veb/01.md`](content/darslar/veb/01.md).
2. Rasmlarni `public/img/<yonalish>/NN/` papkasiga soling yoki
   `npm run rasm` bilan yasating.
3. `npm run build` — xato bo'lsa terminal qaysi fayl va qaysi maydon
   ekanini aytadi.

Frontmatter qoidalari [`CLAUDE.md`](CLAUDE.md) da, dars materiali yozish
qoidalari [`rules/`](rules/00-INDEX.md) papkasida.

## Dizayn

Barcha sahifalar bitta dizayn sistemadan yig'iladi. Uni brauzerda ko'rish
uchun: **`/dizayn`**. Rang, oraliq va shrift o'lchamlari
[`styles/tokens.css`](styles/tokens.css) da — biror narsani butun sayt
bo'ylab o'zgartirish uchun shu faylni tahrirlang.

## Rasm yasash

`.env` faylida `GEMINI_API_KEY` bo'lishi kerak (git'ga tushmaydi).

```bash
npm run rasm                 # frontmatterda yo'li bor, lekin fayli yo'q rasmlar
npm run rasm -- veb 01       # faqat bitta dars
npm run rasm -- --korish     # nima yasalishini ko'rsatadi, yasamaydi
```

Slaydga `rasmTavsif` yozilgan bo'lsa — rasm yasaladi. Yozilmagan bo'lsa,
u joy skrinshot uchun deb hisoblanadi va tegilmaydi.

Yasalgan rasmni **albatta ko'zdan kechiring**: chiroyli, lekin mazmunan
noto'g'ri sxema o'quvchini adashtiradi.

## Video yozib olish

`/veb/01?slayd` manzilini oching — ekranda faqat slayder qoladi:
oq fon, katta shrift, boshqa hech narsa yo'q. Ekranni yozib oling.

- `→` / `←` yoki taqdimot pulti (PageUp / PageDown) — slaydlarni almashtirish
- `Home` / `End` — birinchi va oxirgi slayd
- `Esc` — rejimdan chiqish

## O'quvchilar uchun uy vazifasi

Har bir o'quvchi birinchi kirishda jurnaldagi raqamini (1–12) tanlaydi.
Raqam brauzerda saqlanadi (`localStorage`, kalit `oquvchi_raqami`) va har
darsda faqat **o'sha o'quvchining varianti** ko'rsatiladi.

Qolgan 11 variant sahifa kodida yo'q — o'quvchi sahifa manbasini ochsa ham
boshqalarning topshirig'ini ko'ra olmaydi.

Bitta variantni ko'rish uchun: `/veb/01?n=7` (raqam saqlanmaydi).

## Deploy

Vercel loyihani `out/` papkasidan tarqatadi. Repozitoriyni Vercel'ga ulang —
`npm run build` avtomatik ishlaydi.
