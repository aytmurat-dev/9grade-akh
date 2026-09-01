---
fayl: 05-slayd-qoidalari.md
maqsad: Slayd (carousel) mazmuni qoidalari
qachon: Faqat D darslarida
---

# SLAYD QOIDALARI

Slayd ikki joyda ishlaydi: saytda carousel sifatida va **videoda**
(`?slayd` rejimida ekran yozib olinadi). Bitta manba, ikki natija.

## VAZIFASI

Slayd — eslatish va tuzilishni ko'rsatish. **O'rgatish emas.**
O'rgatish qo'llanmaning ishi.

| | Slayd | Qo'llanma |
|---|---|---|
| Matn | Qisqa tezis, 5–7 so'z | To'liq gap, izoh |
| Kod | Faqat asosiy qator | To'liq, sharhlar bilan |
| Skrinshot | 1–2 ta, kattaroq | Hammasi, qadamma-qadam |
| Xatolar | Yo'q | Bor |
| Hajmi | 8–12 slayd | 3–5 bet |

## TUZILISHI

```
1        Sarlavha — mavzu nomi
2        Nima o'rganamiz (3 punkt)
3-4      Segment 1: tushuncha → misol
5        PAUZA (segment 1)
6-7      Segment 2: tushuncha → misol
8        PAUZA (segment 2)
9-10     Segment 3: tushuncha → misol
11       PAUZA (segment 3)
12       Uy vazifasi
```

Slaydlar soni ≈ video daqiqasi, maksimum 12.

## PAUZA SLAYDI

```yaml
- sarlavha: "PAUZA"
  pauza: true
  topshiriq: "Bu sikl nechta marta ishlaydi?"
  vaqt: "1 daqiqa"
```

Komponent uni alohida ko'rinishda chizadi: katta "PAUZANI BOSING"
yozuvi, topshiriq matni, taxminiy vaqt, "Bajarganingizdan keyin
davom eting".

Videoda bu slayd 3–5 soniya turadi — o'quvchi to'xtatishga ulguradi.

`pauza: true` slaydlar soni `segmentlar` soniga teng bo'lishi shart.

## YOZISH TARTIBI

**Avval qo'llanma yoziladi, slayd undan siqib chiqariladi.**

Teskarisi bo'lsa ikkalasi bir xil narsani aytadi va qo'llanma
yuzaki chiqadi.

## MAZMUN QOIDALARI

1. **Bir slayd — bir fikr.** Ikki tushuncha bo'lsa, ikki slayd.
2. **Matn 5–7 so'zdan oshmasin.** Uzun matn videoda o'qilmaydi.
3. **Kod 6 qatordan oshmasin.** Uzunroq bo'lsa qo'llanmaga.
4. **Har segmentda kamida bitta misol.** Faqat ta'rif yetarli emas.
5. **Rasm bo'lsa, matn kam bo'lsin.** Ikkalasi to'lib ketmasin.

## SLAYD MAYDONLARI

Barchasi ixtiyoriy — komponent borini chizadi:

| Maydon | Izoh |
|---|---|
| `sarlavha` | Slayd sarlavhasi |
| `matn` | Qisqa tezis |
| `kod` | Kod bloki (til `yonalish` dan aniqlanadi) |
| `rasm` | `/img/...` yo'li |
| `royxat` | Punktlar massivi |
| `pauza` | `true` bo'lsa pauza slaydi |
| `topshiriq` | Pauza topshirig'i |
| `vaqt` | Pauza vaqti |
