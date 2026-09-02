---
fayl: 06-qollanma-qoidalari.md
maqsad: Qo'llanma (markdown tanasi) qoidalari
---

# QO'LLANMA QOIDALARI

## SINOV

**Video ko'rmagan o'quvchi faqat qo'llanmadan o'rgana olishi kerak.**

Agar matnda "videoda ko'rsatilgan edi", "yuqorida aytganimizdek"
kabi ishora bo'lsa — qo'llanma tugallanmagan.

102 ta qo'llanma yil oxirida bitta hujjatga yig'iladi va haqiqiy
darslik chiqadi. Shuning uchun tuzilish har darsda bir xil.

## TUZILISHI

Har bo'lim CPA tartibida yoziladi (`rules/01`, 1a-bo'lim): avval
o'quvchi nima ko'rishi, keyin sxema, keyin qoida.

~~~markdown
## Nima o'rganamiz

Natija tilida: "Ushbu darsdan keyin siz ... qila olasiz."

## Kerakli narsalar

Dastur va versiyasi, oldingi bilim qayerdan kelgani, tayyor fayllar.

## 1. <Segment 1 nomi>

**C — avval qilib ko'ring.** Aniq qadamlar: nima bosiladi, nima
yoziladi. Keyin: ekranda nima paydo bo'ladi.

**Tekshirib ko'ring:** <o'quvchi to'g'ri ketayotganini bilsin>

**P — nima bo'ldi.** Sxema va uning izohi: brauzer nimani o'qidi,
nimani bajardi.

![Sxema](/img/veb/05/2.svg)

**A — qoida.** Endi sintaksis va atama:

```javascript
console.log(<matn>);
```

| Bo'lak | Vazifasi |
|---|---|
| `console` | brauzerning konsoli |

**E'tibor bering:** <tez-tez qilinadigan xato — oldindan>

## 2. <Segment 2 nomi>

...

## Tez-tez uchraydigan xatolar

| Xato | Nima ko'rinadi | Sabab | Yechim |
|---|---|---|---|

## Qisqacha

Takrorlash uchun: qadamlar yoki kod ro'yxati.

## Keyingi darsda

Bir-ikki qator: hozir nimani qila olmaymiz va u qachon keladi.
~~~

### Majburiy bo'laklar

| Bo'lak | Nega |
|---|---|
| «Tekshirib ko'ring» | o'quvchi qayerda ekanini bilsin (LXD 5) |
| Xatolar jadvali | xato — material, oldindan ko'rsatiladi (LXD 6) |
| «Keyingi darsda» | 102 dars bitta zanjir bo'lsin (LXD 7) |
| To'liq kod | nusxa olib ishga tushiriladigan holatda |

### Yangi asbob birinchi marta ishlatilsa

Dastur, papka, fayl saqlash — bularning har biri **alohida
qadamlar bilan** yoziladi. «Faylni saqlang» yetarli emas: qaysi
nomda, qaysi papkaga, qanday kengaytma bilan.

Windowsdagi klassik tuzoq (Bloknot `.txt` qo'shib yuboradi) kabi
joylar birinchi marta uchraganda albatta yozilsin — aks holda
o'quvchi hamma qadamni to'g'ri bajarib ham natija ko'rmaydi.

## UY VAZIFASI BILAN BOG'LIQLIK

Uy vazifasi segmentlar bo'yicha taqsimlanadi (`rules/07`). Shuning
uchun **har bo'lim o'z topshirig'ini bajarish uchun yetarli bo'lsin**:
kerakli kod, qadamlar va tekshirish usuli o'sha bo'limda bo'lsin.

Qo'llanma oxirida qisqa «Uy vazifasi» bo'limi yoziladi:

~~~markdown
## Uy vazifasi

1. **Konsolda** (≈10 daqiqa) — 1 va 2-bo'lim: ...
2. **O'z sahifangizda** (≈15 daqiqa) — 3-bo'lim: ...

Topshiriq matni sahifaning pastida — raqamingizni tanlaganingizdan
keyin chiqadi.
~~~

Bu yerda **topshiriqning o'zi yozilmaydi** — u har o'quvchida boshqa.
Faqat nechta ish borligi, qancha vaqt ketishi va qaysi bo'limga
tayanishi aytiladi.

## SEGMENT NOMLARI

Videodagi, slayddagi va qo'llanmadagi segment nomlari **bir xil**.

O'quvchi videoning 6-daqiqasida tushunmagan joyini qo'llanmadan
darrov topadi. Bu ikkalasini bir-biriga bog'laydi.

## YOZISH USLUBI

1. **To'liq gaplar.** Slayd tezis yozadi, qo'llanma tushuntiradi.
2. **Sabab aytiladi.** "Shunday yoziladi" emas — "shunday yoziladi,
   chunki ...".
3. **Har tushunchada misol.** Ta'rif + misol, faqat ta'rif emas.
4. **Xatolar ko'rsatiladi.** "Bu xatoni ko'rsangiz — sababi bu."
5. **9-sinf tili.** Murakkab atama birinchi marta ishlatilganda
   izohlanadi.

## KOD BLOKLARI

Til belgilanadi — sayt nusxalash tugmasi va bo'yashni shundan oladi:

| Yo'nalish | Til |
|---|---|
| veb | `javascript`, `html`, `css` |
| mobil | `java` yoki `kotlin`, `xml` |
| tarmoq | `bash` (IOS buyruqlari uchun) |

Kod to'liq bo'lsin — o'quvchi nusxa olib ishga tushira olsin.

## UZUNLIGI

**Video davomiyligiga solishtirilmaydi.** Qo'llanma mavzu to'liq
yopilguncha yoziladi — necha bet bo'lsa ham.

O'lchov bitta: *video ko'rmagan o'quvchi shu matndan o'rgana oladimi?*
Agar biror qadamda «bu qanday qilinadi?» degan savol javobsiz qolsa —
qo'llanma tugallanmagan.

Qisqartirish uchun tushuntirishni emas, **takrorni** olib tashlang.
