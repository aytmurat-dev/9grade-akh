---
fayl: 05-slayd-qoidalari.md
maqsad: Slayd (carousel) mazmuni qoidalari
qachon: Faqat D darslarida
---

# SLAYD QOIDALARI

Bu fayl slaydda **nima yozilishini** aytadi. Slayd qanday
**ko'rinishini** esa `11-slayd-dizayni.md` aytadi — maydonlar ro'yxati
va chegaralar ham o'sha yerda.

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
| Hajmi | 12–16 slayd | mavzu to'liq yopilguncha |

## TUZILISHI — CPA BO'YICHA

Har segment **uch slayd**: aniq → tasvirli → mavhum
(`rules/01`, 1a-bo'lim). Keyin pauza. Tartib buzilmaydi.

```
01        Muqova — dars nomi, chorak
02        "Bugun nima qila olasiz" — natija tilida 3 punkt

03  C     Segment 1: aniq — skrinshot yoki haqiqiy natija
04  P     Segment 1: tasvirli — sxema
05  A     Segment 1: mavhum — qoida, sintaksis
06  PAUZA

07  C     Segment 2: aniq
08  P     Segment 2: tasvirli
09  A     Segment 2: mavhum
10  PAUZA

11  C     Segment 3: aniq
12  P     Segment 3: tasvirli
13  A     Segment 3: mavhum
14  PAUZA

15        Uy vazifasi va keyingi darsga ko'prik
```

Maksimum **16 slayd**. Uch segmentli darsda 15 ta chiqadi.

### C, P, A slaydini qanday ajratish

| | Slaydda nima bo'ladi | Nima BO'LMAYDI |
|---|---|---|
| **C** | skrinshot, haqiqiy natija, "buni hozir qiling" | ta'rif, sintaksis qoidasi |
| **P** | sxema, diagramma, oqim | uzun matn |
| **A** | sintaksis, qoida, atama nomi | yangi misol (misol C da bo'lgan) |

**A slaydi C dagi misolni umumlashtiradi.** Yangi misol keltirmang —
o'quvchi endi ikkita tanish bo'lmagan narsani solishtirishga majbur
bo'ladi.

### Nega ta'rifdan boshlanmaydi

Ta'rif — natija, sabab emas. O'quvchi `console.log` nima qilishini
ko'rmasdan turib uning ta'rifini o'qisa, faqat so'zni yodlaydi.
Avval ekranda `Salom` chiqsin, keyin uning nomi aytilsin.

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
   CPA da bu o'z-o'zidan chiqadi: C, P va A — uch alohida slayd.
2. **Matn 5–7 so'zdan oshmasin.** Uzun matn videoda o'qilmaydi.
3. **Kod 6 qatordan oshmasin.** Uzunroq bo'lsa qo'llanmaga.
4. **Har segmentda C slaydi majburiy.** Faqat sxema va ta'rif bilan
   segment tugamaydi — o'quvchi haqiqiy natijani ko'rishi shart.
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
