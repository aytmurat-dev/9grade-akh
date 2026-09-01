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
| **D** | Yangi mavzu | Bor | Bor | Bor | 12 variant |
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
| Uy vazifasi | 15–20 daqiqa |
| Slaydlar soni | 8–12 |
| Qo'llanma | 3–5 bet |

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
