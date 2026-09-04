---
fayl: 03-segment-xaritasi.md
maqsad: Segment xaritasi — barcha materiallarning yagona manbasi
qachon: Faqat D (yangi mavzu) darslarida
---

# SEGMENT XARITASI

Slayd ham, qo'llanma ham, uy vazifasi ham, kirish chiptasi ham
shundan chiqadi. Xarita tasdiqlanmaguncha dars fayli yozilmaydi.

## FORMAT

```
DARS: <yo'nalish> — <NN> — <mavzu>
CHORAK: <I-IV>
VIDEO DAVOMIYLIGI: <daqiqa>

SEGMENT 1: <nomi>
  Tushuncha:          <bir gapda>
  Misol:              <aniq misol — kod, ekran, harakat>
  Skrinshot:          <bor / yo'q>
  Rasm (generatsiya): <bor / yo'q — sxema, diagramma>
  Pauza turi:         <nazariy | amaliy>
  Pauza vaqti:        <daqiqa>
  Pauza topshirig'i:  <matn>
  Kutilgan javob:     <matn>

SEGMENT 2: ...
SEGMENT 3: ...

UY VAZIFASI:
  Shablon:      <parametrli matn>
  Parametrlar:  <{X}, {Y}>
  Minimum:      <majburiy qism>
  Qo'shimcha:   <ixtiyoriy qism>

KIRISH CHIPTASI: <3-4 savol, har segmentdan kamida bittadan>
```

## SEGMENTGA BO'LISH

Bir segment = bir tugallangan tushuncha. O'quvchi uni o'zlashtirib,
mashq qilib, keyingisiga o'tadi.

Yaxshi bo'linish belgisi: har segment oxirida o'quvchi
**mustaqil bajara oladigan** narsa paydo bo'ladi.

Yomon bo'linish: "nazariya" / "amaliyot" / "xulosa" —
bu bo'linish emas, dars qismlari.

### Misol — Veb 05 (Takrorlash operatorlari)

```
SEGMENT 1: for sikli
  Tushuncha: Ma'lum sondagi takrorlash uchun
  Misol:     1 dan 10 gacha sonlarni chiqarish
  Pauza:     nazariy, 1 daq
  Topshiriq: for (let i=0; i<5; i++) nechta marta ishlaydi?
  Javob:     5 marta, i = 0,1,2,3,4

SEGMENT 2: while sikli
  Tushuncha: Shart to'g'ri bo'lguncha takrorlash
  Misol:     Foydalanuvchi to'g'ri javob berguncha so'rash
  Pauza:     nazariy, 2 daq
  Topshiriq: Bu kod cheksiz ishlaydimi? Nega?
  Javob:     Ha — i o'zgarmayapti

SEGMENT 3: break va continue
  Tushuncha: Siklni to'xtatish va qadamni o'tkazib yuborish
  Misol:     Massivdan birinchi juft sonni topish
  Pauza:     amaliy, 5 daq
  Topshiriq: 1..20 dan 3 ga bo'linadiganlarni chiqaring
```

## SEGMENT NOMINING UZUNLIGI

Segment nomi uch joyda bir xil yoziladi: frontmatter, A-slaydining
sarlavhasi va qo'llanma sarlavhasi (`rules/10`, 8-punkt). Ya'ni nom
**slayd sarlavhasi sifatida ham ishlaydi** — shuning uchun u
**~28 belgidan oshmasin**.

Uzun nom kadrda ikki qatorga chiqadi va sarlavha ustidagi qizil
yozuvni yuqoriga, teglarni esa pastki qatorga siqib chiqaradi.

| Yaxshi | Uzun |
|---|---|
| `O'zgaruvchi va qiymat` | `O'zgaruvchi — qiymatni eslab qolish` |
| `prompt bilan son olish` | `Foydalanuvchidan son so'rash` |
| `Gradle va AndroidManifest` | — |

Nom qisqa bo'lsa ham mazmunli bo'lsin: o'quvchi videoning o'sha
joyini qo'llanmadan shu nom bo'yicha topadi.

## PAUZA TURINI TANLASH

**Nazariy (1–2 daq)** — javob berish, bashorat qilish, xato topish:
- Yangi tushuncha, sintaksis, atama
- "Bu kod nima chiqaradi?"
- "Qaysi qatorda xato bor?"
- "Ikkitasining farqi nima?"

**Amaliy (4–6 daq)** — o'zi ishlab ko'rish:
- Yangi uskuna (Android Studio, Packet Tracer)
- Birinchi marta yoziladigan kod konstruksiyasi
- Ketma-ketlikni takrorlash shart bo'lgan holat

**Bitta videoda amaliy pauza 2 tadan oshmasin.** Aks holda uydagi
vaqt 40 daqiqadan oshadi va vazifa bajarilmay qoladi.

## TASDIQLASH

Xaritani foydalanuvchiga ko'rsating va **javob kuting**.
Tasdiqlanmagan xarita bo'yicha dars fayli yozilmaydi.

Xarita qisqa bo'lsin — 30–40 qator. Butun darsni yozib bermang.
