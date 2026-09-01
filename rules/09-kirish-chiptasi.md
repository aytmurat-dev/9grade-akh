---
fayl: 09-kirish-chiptasi.md
maqsad: Kirish chiptasi (entry ticket) generatsiyasi
qachon: Faqat alohida so'ralganda — saytga TUSHMAYDI
---

# KIRISH CHIPTASI

Video ko'rilganini tekshiradigan qisqa test. Dars boshida,
birinchi 5 daqiqada, Wayground'da o'tkaziladi.

**Saytga tushmaydi.** Sayt ochiq — savollar ham ochiq bo'lib qoladi.

## QOIDALAR

1. **3–4 savol.** Ko'proq bo'lsa 5 daqiqaga sig'maydi.
2. **Har segmentdan kamida bittadan.** Segment xaritasidan olinadi.
3. **Ko'rilganini tekshiradi, bilimni chuqur o'lchamaydi.**
   Video ko'rgan o'quvchi 4 tadan 3 tasiga javob bera olsin.
4. **Pauza topshiriqlari bilan bir xil bo'lmasin** — o'zgartirilgan
   variant bo'lsin.

## DISTRAKTORLAR

Noto'g'ri javoblar **haqiqiy xatodan** olinadi, tasodifiy emas.

Misol — `for (let i = 0; i < 5; i++)` nechta marta ishlaydi?

| Javob | Nega |
|---|---|
| 5 | To'g'ri |
| 6 | `<=` deb o'ylagan — eng keng tarqalgan xato |
| 4 | 0 dan boshlanishini hisobga olmagan |
| 1 | Siklni tushunmagan |

## FORMAT — WAYGROUND CSV

```csv
Question Text,Question Type,Option 1,Option 2,Option 3,Option 4,Correct Answer,Time
"for (let i = 0; i < 5; i++) nechta marta ishlaydi?",Multiple Choice,5,6,4,1,1,30
```

- UTF-8 BOM bilan saqlang
- `Correct Answer` — variant **raqami** (1–4), matni emas
- `Time` — soniya, odatda 30
- Kod bo'lsa qo'shtirnoq ichida, ichki qo'shtirnoq ikkilanadi

## CHEKLOV

Natija dars boshlangandan keyin ko'rinadi — oldindan tayyorgarlik
ko'ra olmaysiz. 12 tadan bir nechtasi videoni ko'rmagan bo'lsa,
buni 5-daqiqada bilib qolasiz.

Zaxira reja: o'sha o'quvchilar darsning 12–25 daqiqasida
qo'llanmadan o'qib, qolganlar bilan juftlikda ishlaydi.
