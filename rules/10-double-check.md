---
fayl: 10-double-check.md
maqsad: Dars fayli tayyor bo'lgach o'tiladigan tekshiruv ro'yxati
---

# DOUBLE-CHECK

Har bir dars fayli yozilgandan keyin shu ro'yxatdan o'ting.
Har punktni haqiqatan tekshiring — ko'z bilan o'qib chiqmang.

Ro'yxat ikki qismdan iborat: pastdagi punktlar **texnik** tekshiruv,
oxiridagi "IKKINCHI O'QISH" esa **sifat** tekshiruvi. Ikkinchisisiz
dars "xatosiz, lekin bo'sh" bo'lib qolishi mumkin.

## STRUKTURA

1. Frontmatter to'liq — dars turiga mos majburiy maydonlar bor
2. `dars` raqami fayl nomi bilan mos (`05.md` → `dars: 5`)
3. `chorak` mavzular ro'yxatidagi bilan mos
4. `mavzu` mavzular ro'yxatidan aynan ko'chirilgan
5. `uyVazifa.variantlar` aynan 12 ta, `n` 1..12 takrorlanmaydi
6. Har bir `{PARAMETR}` barcha 12 variantda mavjud — `shablon`,
   `minimum` va `qoshimcha` uchalasida ham
7. `pauza: true` slaydlar soni `segmentlar` soniga teng
8. Segment nomlari uchala joyda bir xil (frontmatter, slayd, qo'llanma)
9. Topshiriqlar soni = ceil(segmentlar / 2)
10. Har segment aynan bitta `qamrov` da bor — biror mavzu mashqsiz
    qolmagan

## MAZMUN

11. `davomiylik` ≤ 20 daqiqa
12. Amaliy pauzalar ≤ 2 ta
13. Slaydlar ≤ 16 ta, har segmentda C, P va A uchalasi bor
14. Qo'llanma o'z-o'zicha yetarli — "videoda ko'rgan edingiz" yo'q
15. Slayd qo'llanmani takrorlamaydi — tezis va tushuntirish farqlanadi
16. Har segmentda kamida bitta aniq misol bor
17. Uy vazifasi variantlari bir xil qiyinlikda
18. Parametrlarda mahalliy nomlar ishlatilgan
19. Uy vazifasi videodagi materialdan chetga chiqmaydi
20. Topshiriqlar jami vaqti ≤ 35 daqiqa va `daqiqa` haqiqatga yaqin
21. Har topshiriqni bajarish uchun kerak bo'lgan hamma narsa o'z
    bo'limida bor — o'quvchi tashqaridan qidirmaydi
22. "Tez-tez uchraydigan xatolar" bo'limi bo'sh emas

## TEXNIK

23. Barcha `rasm:` yo'llari to'g'ri formatda (`/img/<yonalish>/<NN>/<n>.png`)
24. Skrinshot papkalari yaratilgan
25. Kod bloklarida til belgilangan
26. Kod nusxa olib ishga tushiriladigan holatda — bo'lak emas
27. `video` — 11 belgili YouTube ID (D darslarida)
28. Javoblar kaliti dars faylida YO'Q, kalitda har topshiriq alohida
29. `.env` va `kalitlar/` `.gitignore` da
30. Skrinshotlarda o'quvchi ismi / maktab nomi yo'q

## BUILD

31. `npm run build` xatosiz o'tadi
32. Sxema xatoni tutishini sinang: bitta majburiy maydonni
    vaqtincha o'chiring, build to'xtashi kerak, keyin qaytaring

## YAKUNIY

33. Foydalanuvchiga qisqacha hisobot bering:
    - Qaysi fayl yaratildi
    - Nechta segment, slayd, topshiriq, variant
    - Qaysi skrinshotlar kutilmoqda (ro'yxat bilan)
    - Qaysi rasmlar generatsiya qilindi
34. Skrinshot ro'yxatini alohida, nusxa olishga qulay ko'rinishda
    chiqaring

---

# IKKINCHI O'QISH (RECHECK)

Build o'tgandan **keyin** bajariladi. Birinchi yozuv — qoralama;
bu yerda uchala bo'lak alohida, yangi ko'z bilan o'qiladi.

Tartib: qo'llanma → slayd → uy vazifasi. Sabab: qo'llanma asos,
slayd undan siqib chiqariladi, uy vazifasi esa ikkalasiga tayanadi.

## Qo'llanma (`rules/06`)

1. Boshidan oxirigacha o'qing, **kompyuterda qadamlarni takrorlab**.
   Biror joyda "bu qanday qilinadi?" degan savol qolsa — qo'shing.
2. Har bo'limda «Tekshirib ko'ring» bormi va u haqiqatan ekranda
   ko'rinadigan narsani aytadimi?
3. Birinchi marta uchraydigan asbob (dastur, fayl, tugma) qadamlar
   bilan yozilganmi?
4. Xatolar jadvalida shu darsda haqiqatan uchraydigan xatolar
   turibdimi — umumiy ro'yxat emas?
5. Mahalliy nomlar, apostrof, kodirovka kabi bizga xos tuzoqlar
   qaralganmi?

## Slayd (`rules/05`, `rules/11`)

6. Har segmentda C, P, A uchalasi bormi va tartibi buzilmaganmi?
7. C slaydida ta'rif, A slaydida yangi misol yo'qmi?
8. To'liq ekranda (`F`) har slaydni ko'ring: sarlavha sig'yaptimi,
   matn toshib ketmayaptimi, kod o'qilyaptimi?
9. Slayd qo'llanmani so'zma-so'z takrorlamaydimi?

## Uy vazifasi (`rules/07`)

10. Topshiriqlar soni darsning hajmiga mos (ceil(segmentlar / 2))?
11. Har segment mashq qilinyaptimi — biror mavzu chetda qolmaganmi?
12. **Birinchi variantni o'zingiz bajaring.** Yozilgan vaqt
    (`daqiqa`) haqiqatga yaqinmi?
13. Topshiriqni bajarish uchun qo'llanmadagi material yetadimi —
    yangi tushuncha talab qilinmayaptimi?
14. Kalitda har topshiriqning kutilgan natijasi bormi?

## Yakuniy savol

15. **Video ko'rmagan, yordamsiz o'quvchi shu sahifadan noldan
    o'rgana oladimi?** Javob "yo'q" bo'lsa — qaysi bo'lakda teshik
    borligini toping va shu ro'yxatga qayting.
