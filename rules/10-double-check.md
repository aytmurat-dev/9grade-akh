---
fayl: 10-double-check.md
maqsad: Dars fayli tayyor bo'lgach o'tiladigan tekshiruv ro'yxati
---

# DOUBLE-CHECK

Har bir dars fayli yozilgandan keyin shu ro'yxatdan o'ting.
Har punktni haqiqatan tekshiring — ko'z bilan o'qib chiqmang.

## STRUKTURA

1. Frontmatter to'liq — dars turiga mos majburiy maydonlar bor
2. `dars` raqami fayl nomi bilan mos (`05.md` → `dars: 5`)
3. `chorak` mavzular ro'yxatidagi bilan mos
4. `mavzu` mavzular ro'yxatidan aynan ko'chirilgan
5. `uyVazifa.variantlar` aynan 12 ta, `n` 1..12 takrorlanmaydi
6. `shablon` dagi har bir `{PARAMETR}` barcha 12 variantda mavjud
7. `pauza: true` slaydlar soni `segmentlar` soniga teng
8. Segment nomlari uchala joyda bir xil (frontmatter, slayd, qo'llanma)

## MAZMUN

9. `davomiylik` ≤ 20 daqiqa
10. Amaliy pauzalar ≤ 2 ta
11. Slaydlar ≤ 12 ta
12. Qo'llanma o'z-o'zicha yetarli — "videoda ko'rgan edingiz" yo'q
13. Slayd qo'llanmani takrorlamaydi — tezis va tushuntirish farqlanadi
14. Har segmentda kamida bitta aniq misol bor
15. Uy vazifasi variantlari bir xil qiyinlikda
16. Parametrlarda mahalliy nomlar ishlatilgan
17. Uy vazifasi videodagi materialdan chetga chiqmaydi
18. "Tez-tez uchraydigan xatolar" bo'limi bo'sh emas

## TEXNIK

19. Barcha `rasm:` yo'llari to'g'ri formatda (`/img/<yonalish>/<NN>/<n>.png`)
20. Skrinshot papkalari yaratilgan
21. Kod bloklarida til belgilangan
22. Kod nusxa olib ishga tushiriladigan holatda — bo'lak emas
23. `video` — 11 belgili YouTube ID (D darslarida)
24. Javoblar kaliti dars faylida YO'Q
25. `.env` va `kalitlar/` `.gitignore` da
26. Skrinshotlarda o'quvchi ismi / maktab nomi yo'q

## BUILD

27. `npm run build` xatosiz o'tadi
28. Sxema xatoni tutishini sinang: bitta majburiy maydonni
    vaqtincha o'chiring, build to'xtashi kerak, keyin qaytaring

## YAKUNIY

29. Foydalanuvchiga qisqacha hisobot bering:
    - Qaysi fayl yaratildi
    - Nechta segment, slayd, variant
    - Qaysi skrinshotlar kutilmoqda (ro'yxat bilan)
    - Qaysi rasmlar generatsiya qilindi
30. Skrinshot ro'yxatini alohida, nusxa olishga qulay ko'rinishda
    chiqaring
