---
fayl: 01-model-va-ish-tartibi.md
maqsad: Pedagogik model, dars turlari, vaqt cheklovlari
---

# MODEL VA ISH TARTIBI

## 1. FLIPPED CLASSROOM

O'quvchi uyda videoni ko'radi va uy vazifasini bajaradi.
Darsda tahlil, chuqurlashtirish va amaliyot bo'ladi.

Sinf: 12 o'quvchi. Maktab kompyuterlari doim ochiq.
Barcha o'quvchilarda uyda kompyuter va internet bor.

## 1a. PEDAGOGIK YONDASHUV: CPA + LXD

Flipped classroom — bu **qachon** o'rganish haqida. Quyidagi ikki
yondashuv esa **qanday** o'rgatish haqida. Slayd ham, qo'llanma ham
shu ikkisiga bo'ysunadi.

### CPA — Concrete, Pictorial, Abstract

Har bir yangi tushuncha **uch qadamda** beriladi. Tartib buzilmaydi.

| Qadam | Nima bo'ladi | Misol (`console.log`) |
|---|---|---|
| **C** — Aniq | O'quvchi haqiqiy narsani ko'radi yoki o'zi bajaradi | F12 bosib `console.log("Salom")` yozadi, javobni ko'radi |
| **P** — Tasvirli | O'sha narsa sxemada ko'rsatiladi — miyadagi model chiziladi | «Siz yozdingiz → brauzer o'qidi → javob qaytardi» sxemasi |
| **A** — Mavhum | Endi qoida va sintaksis umumiy ko'rinishda yoziladi | `console.log( <matn> );` — matn qo'shtirnoqda |

**Nega shunday.** Ta'rifdan boshlansa, o'quvchi tushunmagan narsani
yodlaydi. Aniq natijadan boshlansa — avval ishlaydi, keyin nomini
biladi. Dasturlashda bu ayniqsa muhim: kod ishlaganini ko'rgan
o'quvchi qoidani izlaydi, ko'rmagan o'quvchi esa ko'chiradi.

**A ni tashlab ketmang.** C va P bilan qolsa, o'quvchi faqat bitta
misolni biladi, qoidani emas — keyingi topshiriqda qotib qoladi.

### LXD — o'quv tajribasini loyihalash

Yetti qoida, hammasi tekshirib ko'riladigan:

1. **Natija tilida boshlang.** «Ushbu darsdan keyin siz ... qila
   olasiz» — mavzu nomi emas, o'quvchining qo'lidan keladigan ish.
2. **Erta g'alaba.** Birinchi 5 daqiqada o'quvchi ishlaydigan
   natijaga erishsin. Uzoq nazariyadan keyingi amaliyot kech.
3. **Bir vaqtda bitta yangilik.** Yangi tushuncha yangi asbob bilan
   birga kelmasin (yangi sintaksis + yangi dastur = ikki muammo).
4. **Bashorat → kuzatuv → izoh.** Kodni ko'rsatishdan oldin
   so'rang: «Bu nima chiqaradi deb o'ylaysiz?» Xato bashorat —
   eng yaxshi o'qish sharoiti.
5. **Har qadamdan keyin tekshiruv.** «Tekshirib ko'ring: ekranda
   shu bo'lishi kerak». O'quvchi to'g'ri ketayotganini bilsin.
6. **Xato — material.** Tez-tez qilinadigan xatoni **oldindan**
   ko'rsating: nima ko'rinadi, sababi nima, qanday tuzatiladi.
7. **Bog'lang.** Dars oxirida keyingi darsga ko'prik tashlang:
   «Bu bilan hozircha faqat ... qila olamiz. Keyingi darsda ...».

**Uy vazifasi ham shu ro'yxatga bo'ysunadi.** Darsdagi har bir segment
uy vazifasida mashq qilinadi (`rules/07`): ko'rilgan, lekin qo'l bilan
takrorlanmagan narsa esda qolmaydi.

### Qo'llab-quvvatlashni asta olib tashlash

1-darsda kod to'liq beriladi va nusxa olinadi. Keyingi darslarda
bo'lak-bo'lak. Undan keyin faqat vazifa qo'yiladi. Bu ataylab:
birinchi darsda "bo'sh varaqdan boshlash" — eng ko'p tashlab
ketiladigan joy.

---

## 2. SAYT SAHIFASI TUZILISHI

Aynan shu tartibda:

```
1. Sarlavha + davomiylik + chorak
2. YouTube iframe
3. Slider (carousel)
4. Qo'llanma
5. Uy vazifasi
```

Kirish chiptasi saytga TUSHMAYDI — o'qituvchi uchun alohida.

## 3. DARS TURLARI

Mavzular ro'yxatidagi har bir dars to'rt turdan biriga kiradi.
Tur generatsiya hajmini belgilaydi.

| Kod | Turi | Video | Slayd | Qo'llanma | Uy vazifasi |
|---|---|---|---|---|---|
| **D** | Yangi mavzu | Bor | Bor | Bor | 12 variant × 1–2 topshiriq |
| **A** | Amaliy mashg'ulot | Yo'q | Yo'q | Qisqa ko'rsatma | 12 variant |
| **L** | Loyiha ishi | Yo'q | Yo'q | Loyiha sharti | 12 variant |
| **BSB** | Nazorat | Yo'q | Yo'q | Yo'q | Yo'q |

### D — Yangi mavzu
To'liq generatsiya. Segment xaritasidan boshlanadi.

### A — Amaliy mashg'ulot
Oldingi D darsining mashqi. Video kerak emas — o'quvchi
oldingi videoni qayta ko'radi. Sahifada: qisqa ko'rsatma
(nima qilinadi, qanday tekshiriladi) + 12 variantli topshiriq.

Frontmatter'da `tur: "amaliy"`, `video` maydoni bo'sh qoladi,
`bogliqDars` maydoni oldingi D darsiga ishora qiladi.

### L — Loyiha ishi
Bir necha darslik natija. Sahifada: loyiha sharti, talablar
ro'yxati, baholash mezoni, muddat. 12 variant — mavzu farqi.

### BSB — Nazorat
Sahifa yaratilmaydi. Foydalanuvchi so'rasa, ogohlantiring va
buning o'rniga nazorat topshiriqlarini alohida faylda taklif qiling.

## 4. VAQT CHEKLOVLARI

| Narsa | Chegara |
|---|---|
| Video davomiyligi | Maqsad 8–12 daq, mutlaq shift 20 daq |
| Segmentlar soni | 3–4 ta |
| Bitta segment tushuntirishi | 2–3 daqiqa |
| Nazariy pauza | 1–2 daqiqa |
| Amaliy pauza | 4–6 daqiqa |
| Amaliy pauza soni | Bitta videoda maksimum 2 ta |
| Slaydlar soni | 12–16 (CPA: har segmentga 3 ta + pauza) |
| Uy vazifasi topshiriqlari | ceil(segmentlar / 2) — kichik darsda 1 ta, kattasida 2 ta |
| Bitta topshiriq | 5–25 daqiqa |
| Uy vazifasi jami | 35 daqiqadan oshmasin |
| Qo'llanma | chegara yo'q — mavzu to'liq yopilsin |

**20 daqiqadan oshsa** mavzu ikkiga bo'linadi: `23a`, `23b`.
Ikkalasi bir hafta ichida ko'riladi.

## 5. DARSDAGI 45 DAQIQA

Bu saytga tushmaydi, lekin materiallar shunga mo'ljallanadi:

| Vaqt | Ish |
|---|---|
| 0–5 | Kirish chiptasi (Wayground) |
| 5–12 | Chiptada eng ko'p xato qilingan nuqta |
| 12–25 | Uy vazifasi tahlili |
| 25–40 | Chuqurlashtirish — videoda yo'q material |
| 40–45 | Yig'ish, keyingi videoni e'lon qilish |

## 6. FOYDALANUVCHI VA CLAUDE VAZIFALARI

| Ish | Kim |
|---|---|
| Segment xaritasini tuzish | Claude |
| Segment xaritasini tasdiqlash | Foydalanuvchi |
| Skrinshot ro'yxatini berish | Claude |
| Skrinshot olish va joylash | **Foydalanuvchi** |
| Boshqa rasmlarni generatsiya qilish | Claude (Gemini API) |
| Slayd, qo'llanma, uy vazifasi | Claude |
| Video yozish va montaj | **Foydalanuvchi** |
| YouTube'ga yuklash, ID ni berish | **Foydalanuvchi** |
| Kirish chiptasi | Claude (alohida so'rov bilan) |
