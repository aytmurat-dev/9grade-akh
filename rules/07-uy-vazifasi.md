---
fayl: 07-uy-vazifasi.md
maqsad: Uy vazifasi — hajmi, qamrovi va 12 variantli generatsiyasi
qachon: Barcha D, A, L darslarida
---

# UY VAZIFASI

Ikki savolga javob beriladi: **nechta topshiriq** va **nimani qoplaydi**.
Ikkalasi ham darsning o'zidan chiqadi, "his-tuyg'u bilan" belgilanmaydi.

## 1. NECHTA TOPSHIRIQ — DARS HAJMIGA QARAB

Bitta topshiriq eng ko'pi bilan **2 segmentni** mashq qiladi. Undan
ortiq bo'lsa topshiriq bir kechada bajarilmaydigan aralashmaga aylanadi.

```
topshiriqlar soni = ceil(segmentlar soni / 2)
```

| Segment | Topshiriq | Odatdagi taqsimot |
|---|---|---|
| 1–2 | 1 ta | `qamrov: [1, 2]` |
| 3 | 2 ta | `[1, 2]` va `[3]` |
| 4 | 2 ta | `[1, 2]` va `[3, 4]` |

Kichik dars — bitta topshiriq. Katta dars — ikkita. Sxema buni
tekshiradi: soni mos kelmasa build to'xtaydi (`lib/schema.ts`).

**Nega segment bo'yicha, daqiqa bo'yicha emas.** Segment — bu darsdagi
mustaqil mavzu. 12 daqiqalik ikki segmentli dars bitta mashqni,
12 daqiqalik uch segmentli dars ikkitasini talab qiladi: gap videoning
uzunligida emas, o'quvchi nechta yangi narsa o'rganganida.

## 2. HAR SEGMENT MASHQ QILINADI

`qamrov` — topshiriq qaysi segment(lar)ni mashq qilishini ko'rsatadi.

```yaml
- qamrov: [1, 2]   # 1 va 2-segment
- qamrov: [3]      # 3-segment
```

Uchta qoida, uchalasini ham sxema tekshiradi:

1. Darsdagi **har bir segment** biror topshiriqqa tushadi. Tushmagani
   qolsa — o'quvchi o'sha mavzuni umuman mashq qilmaydi va keyingi
   darsga teshik bilan boradi.
2. Bitta segment **ikki topshiriqda takrorlanmaydi**.
3. Bitta topshiriq **2 tadan ko'p** segmentni qoplamaydi.

Sayt topshiriq tepasida segment nomini ko'rsatadi ("1–2-segmentlar:
JavaScript nima qila oladi · Konsolda birinchi buyruq") — o'quvchi
qaysi bo'limni qayta o'qishni bilib turadi.

## 3. VAQT

| Narsa | Chegara |
|---|---|
| Bitta topshiriq | 5–25 daqiqa (`daqiqa` maydoni) |
| Barcha topshiriqlar jami | **35 daqiqadan oshmasin** |

`daqiqa` — taxminiy vaqt, sahifada ko'rinadi. O'quvchi kechqurun
qancha vaqt kerakligini oldindan bilsin.

Jami vaqt oshib ketsa **topshiriqni qisqartiring, mavzuni emas**:
qamrovni saqlab, natija hajmini kamaytiring (3 ta ma'lumot o'rniga 2 ta).

## 4. USUL: SHABLON + PARAMETR JADVALI

To'liq matnni 12 marta yozish mumkin emas — 3 yo'nalish × 30 dars
× 12 = 1000 dan ortiq topshiriq.

```yaml
uyVazifa:
  topshiriqlar:
    - qamrov: [1, 2]
      daqiqa: 10
      shablon: "{SIKL} siklidan foydalanib {DIAPAZON} oralig'idagi {SHART} sonlarni chiqaring"
      minimum: "Kod ishlashi va natijani konsolga chiqarishi"
      qoshimcha: "Natijani sahifada ro'yxat ko'rinishida chiqaring"

    - qamrov: [3]
      daqiqa: 15
      shablon: "Shu siklga {AMAL} qo'shing va natijani {JOY} nomi bilan chiqaring"
      minimum: "Sikl to'xtaydigan shart ko'rinib tursin"

  variantlar:
    - { n: 1,  SIKL: "for",   DIAPAZON: "1–50", SHART: "3 ga bo'linadigan", AMAL: "break",    JOY: "Nukus" }
    - { n: 2,  SIKL: "while", DIAPAZON: "1–40", SHART: "juft",              AMAL: "continue", JOY: "Xo'jayli" }
    ...
    - { n: 12, SIKL: "while", DIAPAZON: "1–45", SHART: "toq",               AMAL: "break",    JOY: "Mo'ynoq" }
```

**Variantlar jadvali bitta — barcha topshiriqlar uchun umumiy.**
O'quvchi raqamini bir marta tanlaydi, o'sha qator hamma topshiriqqa
yetadi. Shu sababli parametr nomlari topshiriqlar orasida
takrorlanmasin: `JOY` ikki topshiriqda ham ishlatilsa, ikkalasida bir
xil qiymat chiqadi (ba'zan bu ataylab kerak bo'ladi — masalan o'quvchi
bitta shahar haqida ishlaganda).

## 5. QOIDALAR

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

**6. Yangi tushuncha talab qilinmasin.**
Topshiriq videodagi va qo'llanmadagi materialdan chetga chiqmasin.
O'quvchi internetdan qidirishga majbur bo'lsa — topshiriq noto'g'ri.

**7. Tekshiriladigan natija.**
`minimum` da "nima ko'rinishi kerak" yozilsin: fayl, skrinshot,
konsoldagi javob. "Tushunib oling" degan topshiriq tekshirilmaydi.

## 6. PARAMETR TANLASH

Yaxshi parametrlar — topshiriq mantiqini o'zgartiradigan:

| Yaxshi | Yomon |
|---|---|
| `SIKL: for / while` | `SON: 5 / 6 / 7` |
| `TEG: h2 / h3 / ul` | `RANG: qizil / ko'k` (agar rang muhim bo'lmasa) |
| `SHART: juft / 3 ga bo'linadigan` | `NOM: A / B / C` |

Kamida bitta parametr **mantiqni** o'zgartirsin, qolganlari
kontekstni.

**Parametr qiymati kodga tushadimi — tekshiring.** Qoraqalpog'iston
nomlarida apostrof ko'p (`Qo'ng'irot`, `Mo'ynoq`). Agar qiymat matn
sifatida kodga yoziladigan bo'lsa, qo'llanmada ikki tirnoq qoidasi
tushuntirilgan bo'lsin — aks holda o'quvchi `SyntaxError` ga qoqiladi.

## 7. SAYTDA KO'RSATISH

O'quvchi birinchi kirishda raqamini kiritadi (1–12).
Raqam `localStorage` da saqlanadi (`oquvchi_raqami`).
Har darsda faqat **o'z varianti** render qilinadi.

Zaxira: `?n=7` URL parametri — localStorage'dan ustun turadi.

**MUHIM:** qolgan 11 variant HTML ichiga tushmasin.
Aks holda `Ctrl+U` bilan hammasi ko'rinadi.

Shablon matnlari (hamma uchun bir xil) sahifada bo'ladi, qiymatlar
esa build paytida alohida JSON fayllarga yoziladi:
`public/uy/<yonalish>/<NN>/<n>.json` (`scripts/uy-vazifa-json.mjs`).

## 8. JAVOBLAR KALITI

Saytda YO'Q. Alohida faylda:

```
kalitlar/<yonalish>-<NN>.md
```

Bu papka `.gitignore` da bo'lsin — deploy'ga tushmasin.

Kalitda **har topshiriq alohida** yoziladi:

```markdown
# veb-05 — Takrorlash operatorlari

## 1-topshiriq (1–2-segment, 10 daq)

| n | Kutilgan natija | Izoh |
|---|---|---|
| 1 | 3,6,9,...,48 | for, 16 ta son |

## 2-topshiriq (3-segment, 15 daq)

| n | Kutilgan natija | Izoh |
|---|---|---|
| 1 | 12 dan keyin to'xtaydi | break ishlatilgan |
```

## 9. LOYIHA DARSLARI (L)

Loyihada `baholash` maydoni qo'shiladi — jami 10 ball:

```yaml
baholash:
  - { mezon: "Ishlaydi",              ball: 4 }
  - { mezon: "UI toza va tushunarli", ball: 3 }
  - { mezon: "Kod tartibli",          ball: 3 }
```

Har mezonga qisqa daraja tavsifi qo'shing — o'quvchi nima
kutilayotganini bilsin.

L va A darslarida segment yo'q, shuning uchun `qamrov` ham
ishlatilmaydi. Bu turlar hali qo'llanmagan (`rules/04`): sxema ularni
aniq xabar bilan rad etadi.
