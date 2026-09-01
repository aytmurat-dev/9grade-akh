---
fayl: 07-uy-vazifasi.md
maqsad: 12 variantli uy vazifasini generatsiya qilish
qachon: Barcha D, A, L darslarida
---

# UY VAZIFASI — 12 VARIANT

## USUL: SHABLON + PARAMETR JADVALI

To'liq matnni 12 marta yozish mumkin emas — 3 yo'nalish × 30 dars
× 12 = 1000 dan ortiq topshiriq.

```yaml
uyVazifa:
  shablon: "{SIKL} siklidan foydalanib {DIAPAZON} oralig'idagi {SHART} sonlarni chiqaring"
  minimum: "Kod ishlashi va natijani konsolga chiqarishi"
  qoshimcha: "Natijani sahifada ro'yxat ko'rinishida chiqaring"
  variantlar:
    - { n: 1,  SIKL: "for",   DIAPAZON: "1–50",  SHART: "3 ga bo'linadigan" }
    - { n: 2,  SIKL: "while", DIAPAZON: "1–40",  SHART: "juft" }
    - { n: 3,  SIKL: "for",   DIAPAZON: "1–60",  SHART: "5 ga bo'linadigan" }
    ...
    - { n: 12, SIKL: "while", DIAPAZON: "1–45",  SHART: "toq" }
```

## QOIDALAR

**1. Qiyinlik bir xil.**
1-variant 12-variantdan oson bo'lmasin. Parametrlarni tanlashda
qadamlar sonini bir xil saqlang.

**2. Mazmun bir xil.**
Hamma bir xil tushunchani mashq qiladi. Faqat mayda detallar farq
qiladi — son, nom, teg, rang, mavzu.

**3. Parametrlar mahalliy.**
Nukus, Xo'jayli, Amudaryo, Mo'ynoq, Qoraqalpog'iston, Beruniy,
Ustyurt, Orol — o'quvchiga yaqin nomlar. Umumiy "shahar1"
ishlatmang.

**4. Ikki daraja.**
`minimum` — majburiy, hamma bajaradi.
`qoshimcha` — ixtiyoriy, tez tugatganlar uchun.

**5. Nusxa ko'chirish qiyin bo'lsin.**
Ikki o'quvchining ishi yonma-yon qo'yilganda farq ko'rinishi kerak.
Faqat sonni o'zgartirish yetarli emas — struktura ham ozgina
farqlansin (masalan `for` va `while` navbatlashsin).

**6. 15–20 daqiqada bajariladigan hajm.**
Videodagi materialdan chetga chiqmasin. Yangi tushuncha talab
qiladigan topshiriq bermang.

## PARAMETR TANLASH

Yaxshi parametrlar — topshiriq mantiqini o'zgartiradigan:

| Yaxshi | Yomon |
|---|---|
| `SIKL: for / while` | `SON: 5 / 6 / 7` |
| `TEG: h2 / h3 / ul` | `RANG: qizil / ko'k` (agar rang muhim bo'lmasa) |
| `SHART: juft / 3 ga bo'linadigan` | `NOM: A / B / C` |

Kamida bitta parametr **mantiqni** o'zgartirsin, qolganlari
kontekstni.

## SAYTDA KO'RSATISH

O'quvchi birinchi kirishda raqamini kiritadi (1–12).
Raqam `localStorage` da saqlanadi (`oquvchi_raqami`).
Har darsda faqat **o'z varianti** render qilinadi.

Zaxira: `?n=7` URL parametri — localStorage'dan ustun turadi.

**MUHIM:** qolgan 11 variant HTML ichiga tushmasin.
Aks holda `Ctrl+U` bilan hammasi ko'rinadi.

## JAVOBLAR KALITI

Saytda YO'Q. Alohida faylda:

```
kalitlar/<yonalish>-<NN>.md
```

Bu papka `.gitignore` da bo'lsin — deploy'ga tushmasin.

Kalit formati:

```markdown
# veb-05 — Takrorlash operatorlari

| n | Kutilgan natija | Izoh |
|---|---|---|
| 1 | 3,6,9,...,48 | for, 16 ta son |
| 2 | 2,4,6,...,40 | while, 20 ta son |
```

## LOYIHA DARSLARI (L)

Loyihada `baholash` maydoni qo'shiladi — jami 10 ball:

```yaml
baholash:
  - { mezon: "Ishlaydi",              ball: 4 }
  - { mezon: "UI toza va tushunarli", ball: 3 }
  - { mezon: "Kod tartibli",          ball: 3 }
```

Har mezonga qisqa daraja tavsifi qo'shing — o'quvchi nima
kutilayotganini bilsin.
