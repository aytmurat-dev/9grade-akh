---
fayl: 11-slayd-dizayni.md
maqsad: Slayd ko'rinishining yagona konsepsiyasi — "dossier"
qachon: Slayd yozilayotgan har safar (D darslari)
---

# SLAYD DIZAYNI — "DOSSIER"

Slayd — arxivdan olingan **hujjat varag'i**. Taqdimot slaydi emas,
mavzu bo'yicha ochilgan fayl: qog'oz, ramka, mashinkada bosilgan
yorliqlar va qizil shtamp.

Nega shunday: 102 ta dars bitta ko'rinishda bo'lsa, o'quvchi yangi
mavzuni ochganda "yana o'sha joy" hissini oladi, ekran esa videoda
bir xil kadrga tushadi. Bezak ozligi — matn va kod uchun joy ko'p.

Dizayn kodda: `components/Slider.module.css`, ranglar
`styles/tokens.css` dagi `--slayd-*` guruhida. Yangi rang o'ylab
topilmaydi.

---

## 1. VARAQ

```
┌─ qog'oz #f0ebe2, 45° ingichka shtrix ────────────────┐
│ ⌐                                                    │
│   ┌────────── ichki ramka (1px #cdc5b4) ─────────┐   │
│   │  ● KIRISH                          VEB-01    │   │
│   │                                              │   │
│   │  QIZIL USTYOZUV                              │   │
│   │  Katta sarlavha                              │   │
│   │  ▬▬▬  (qizil ajratgich)                      │   │
│   │  Matn yoki ro'yxat yoki kod yoki rasm        │   │
│   │  [ TEG ] [ TEG ]                             │   │
│   │                                              │   │
│   │  SLAYD · 03 / 12                    ( MUHR ) │   │
│   └──────────────────────────────────────────────┘   │
│                                                    ¬ │
└──────────────────────────────────────────────────────┘
```

Doimiy bo'laklar:

| Bo'lak | Qayerda | Nima |
|---|---|---|
| Burchak qavslari | chap-yuqori, o'ng-quyi | faqat ikkitasi, hech qachon to'rttasi |
| Tepa chap | ● + yorliq | qaysi bo'lim: `KIRISH`, `SEGMENT 1`, `PAUZA` |
| Tepa o'ng | hujjat kodi | avtomatik: `VEB-01` |
| Past chap | slayd raqami | avtomatik: `SLAYD · 03 / 12` |
| Past o'ng | muhr | ixtiyoriy, qiya aylana |

---

## 2. RANG

Uch rang, boshqasi yo'q:

| Rol | Token | Qiymat |
|---|---|---|
| Qog'oz | `--slayd-qogoz` | `#f0ebe2` |
| Siyoh | `--slayd-siyoh` | `#1c1a17` |
| Qizil lenta | `--slayd-qizil` | `#b32b26` |

Qizil — **aksent, fon emas**. U faqat to'rt joyda ko'rinadi: tepa
chapdagi nuqta, ustyozuv, ajratgich, muhr. Beshinchi joyga qo'ysangiz
kuchini yo'qotadi.

**Pauza slaydi — teskari** (`--slayd-qora: #111110`). Sabab: pauza
videoni to'xtatish belgisi, ekran qorayishi o'quvchiga darrov
ko'rinadi. Boshqa hech qaysi slayd qora bo'lmaydi.

---

## 3. SHRIFT

| Ish | Shrift | Xususiyat |
|---|---|---|
| Yorliq, teg, muhr, kod | `--shrift-mono` (IBM Plex Mono) | KATTA HARF, harflar orasi keng (.18–.22em) |
| Sarlavha va matn | `--slayd-shrift` (Helvetica/Arial) | sarlavha 700, harflar zich (-.02em) |

Mono — mashinka yozuvi: qisqa, xizmat matni. Sans — o'qish uchun.
Ikkalasini almashtirmang: mono bilan yozilgan uzun gap o'qilmaydi.

---

## 4. O'LCHAM

Slayd — qat'iy **16:9**. Ichidagi hamma o'lcham `cqw` (quti
kengligining foizi) bilan beriladi, shuning uchun saytdagi kichik
karusel va to'liq ekrandagi kadr **bir xil ko'rinadi**.

Piksel bilan o'lcham yozilmaydi. Yagona istisno — `max()` ichidagi
pol qiymati, telefonda matn juda kichrayib ketmasligi uchun.

Asosiy o'lchamlar: sarlavha `5.2cqw`, matn `2.5cqw`, mono `1.55cqw`,
muqova sarlavhasi `8.4cqw`.

---

## 5. SLAYD MAYDONLARI

```yaml
- muqova: true          # faqat 1-slaydda
  yorliq: "DARS"        # tepa chap
  ustyozuv: "I CHORAK · VEB DASTURLASH"
  sarlavha: "JavaScript"
  matn: "Sahifani jonlantiradigan til"
  teglar: ["BRAUZER", "KOD"]
  muhr: "01 dars"
```

| Maydon | Chegara | Izoh |
|---|---|---|
| `yorliq` | 24 belgi | bo'lim nomi, KATTA HARF |
| `ustyozuv` | 48 belgi | sarlavha ustidagi qizil qator |
| `sarlavha` | ~6 so'z | uzun bo'lsa kadrga sig'maydi |
| `matn` | 1–2 gap | uzunini qo'llanmaga |
| `royxat` | 4 punkt | har biri 5–7 so'z |
| `kod` | 6 qator | uzunini qo'llanmaga |
| `teglar` | 3 ta | har biri 1–2 so'z |
| `muhr` | 2 so'z | aylanaga sig'sin |

Hammasi ixtiyoriy — komponent borini chizadi. Lekin **bitta slaydda
matn ham, ro'yxat ham, kod ham, rasm ham bo'lmasin**: bir slayd — bir
fikr (`rules/05`).

---

## 6. MAZMUN BO'LAKLARI

### Kod

Qog'ozda chop etilgan nusxa: och fon, chap chetida qizil chiziq,
tepasida tilning mono yorlig'i. Bo'yash ikki rangda — kalit so'zlar
qizil, qolgani siyoh. Saytdagi to'q kod bloki bu yerga tushmaydi:
qog'oz fonda o'qilmaydi.

### Rasm

Dalil plastinkasi: ingichka ramka, och fon, rasm `contain` bilan
joylashadi. Rasm slaydida matn kam bo'lsin — sarlavha va bitta qator
yetadi.

### Ro'yxat

Punktlar emas — **mono raqamlar** (`01`, `02`, `03`) va har qator
ustida ingichka chiziq. Bu hujjat ro'yxati ko'rinishini beradi.

### Pauza

Qora varaq. Tuzilishi:

```yaml
- pauza: true
  yorliq: "PAUZA"
  ustyozuv: "VIDEONI TO'XTATING"
  sarlavha: "Pauzani bosing"
  topshiriq: "Bu sikl nechta marta ishlaydi?"
  vaqt: "1 daqiqa"
```

`vaqt` muhr ichida chiqadi — o'quvchi qancha vaqt kerakligini
darrov ko'radi.

---

## 7. TARTIB — CPA

Slaydlar ketma-ketligi `rules/05` da, mazmun qoidalari `rules/01`
1a-bo'limida. Bu yerda faqat **qaysi bo'lak qaysi qadamga tushishi**:

| Qadam | Varaqda nima bo'ladi | `ustyozuv` |
|---|---|---|
| **C** — aniq | skrinshot (`rasm`) yoki kod + natija | «Avval qilib ko'ring» |
| **P** — tasvirli | sxema (`rasm`), matn bir qator | «Nima bo'ldi» |
| **A** — mavhum | `kod` yoki `royxat` + `teglar` | «Qoida» |

`yorliq` maydonida segment raqami turadi: `SEGMENT 1`, `SEGMENT 2`.
Shu tufayli o'quvchi qaysi bo'limda ekanini har kadrda ko'radi.

Har segmentning **A slaydi segment nomini aynan takrorlaydi**
(`rules/06`) — o'quvchi videodagi joyni qo'llanmadan topadi.

**Teglar — A slaydining ishi.** Ular qoidani qisqa eslatma qilib
qoldiradi: `MATN — QO'SHTIRNOQDA`. C va P slaydlarida teg kerak emas.

**Muhr** faqat uch joyda: muqova (`01-dars`), pauza (vaqt) va yakun
(`Bajarish`). Har varaqqa muhr bosilsa, u belgi bo'lishdan to'xtaydi.

## 8. TEKSHIRUV

Slayd tayyor bo'lgach:

1. Har segmentda C, P, A uchalasi ham bormi
2. C slaydida ta'rif, A slaydida yangi misol yo'qmi
3. Qizil to'rt joydan ko'p ishlatilmaganmi
4. Sarlavha bir qatorga sig'yaptimi (to'liq ekranda tekshiring: `F`)
5. Bitta slaydda ikkita mazmun bo'lagi yo'qmi (kod + rasm kabi)
6. Mono bilan uzun gap yozilmaganmi
7. Pauza slaydlari qora va soni segmentlar soniga tengmi
8. `?slayd` rejimida kadrda ortiqcha element yo'qmi
