---
fayl: 04-dars-fayli-formati.md
maqsad: Dars faylining frontmatter sxemasi va joylashuvi
---

# DARS FAYLI FORMATI

## JOYLASHUV

```
content/darslar/<yonalish>/<NN>.md
```

`yonalish`: `veb` | `mobil` | `tarmoq`
`NN`: 01 … 34 (ikki xonali, yil bo'yicha uzluksiz)

## D — YANGI MAVZU

```yaml
---
dars: 5
mavzu: "Takrorlash operatorlari"
yonalish: "veb"
chorak: 1
tur: "yangi"
video: "dQw4w9WgXcQ"
davomiylik: 11

segmentlar:
  - nomi: "for sikli"
    pauza: "3:40"
    tur: "nazariy"
  - nomi: "while sikli"
    pauza: "7:15"
    tur: "nazariy"
  - nomi: "break va continue"
    pauza: "10:30"
    tur: "amaliy"

slaydlar:
  - sarlavha: "Takrorlash operatorlari"
    matn: "Bir xil ishni ko'p marta bajarish"
  - sarlavha: "for sikli"
    kod: |
      for (let i = 0; i < 5; i++) {
        console.log(i);
      }
    rasm: "/img/veb/05/1.png"
  - sarlavha: "PAUZA"
    pauza: true
    topshiriq: "Bu sikl nechta marta ishlaydi?"
    vaqt: "1 daqiqa"

uyVazifa:
  # Topshiriqlar soni = ceil(segmentlar / 2) — bu yerda 3 segment -> 2 ta.
  # Har segment aynan bitta topshiriqqa tushadi (rules/07).
  topshiriqlar:
    - qamrov: [1, 2]
      daqiqa: 10
      shablon: "{SIKL} siklidan foydalanib {DIAPAZON} oralig'idagi {SHART} sonlarni chiqaring"
      minimum: "Kod ishlashi va natijani konsolga chiqarishi"
      qoshimcha: "Natijani sahifada ro'yxat ko'rinishida chiqaring"

    - qamrov: [3]
      daqiqa: 15
      shablon: "Shu siklga {AMAL} qo'shing va nima o'zgarganini izohda yozing"
      minimum: "Sikl to'xtaydigan shart ko'rinib tursin"

  # Variantlar jadvali bitta — barcha topshiriqlar uchun umumiy
  variantlar:
    - { n: 1,  SIKL: "for",   DIAPAZON: "1–50",  SHART: "3 ga bo'linadigan", AMAL: "break" }
    - { n: 2,  SIKL: "while", DIAPAZON: "1–40",  SHART: "juft",              AMAL: "continue" }
    # ... 12 tagacha
---

## Nima o'rganamiz

Qo'llanma matni bu yerdan boshlanadi (markdown).
```

## A — AMALIY MASHG'ULOT

Video va slayd yo'q. `bogliqDars` oldingi D darsiga ishora qiladi.

```yaml
---
dars: 8
mavzu: "Amaliy mashg'ulot. Valyuta konvertatsiyasi"
yonalish: "veb"
chorak: 1
tur: "amaliy"
bogliqDars: 7

uyVazifa:
  # A darsida segment yo'q — qamrov ishlatilmaydi
  topshiriqlar:
    - daqiqa: 25
      shablon: "{VALYUTA1} dan {VALYUTA2} ga o'giruvchi kalkulyator yozing"
      minimum: "Kiritish maydoni, tugma, natija"
      qoshimcha: "Teskari o'girish tugmasi"
  variantlar:
    - { n: 1, VALYUTA1: "so'm", VALYUTA2: "dollar" }
    # ... 12 tagacha
---

## Vazifa

Qisqa ko'rsatma: nima qilinadi, qanday tekshiriladi.
```

## L — LOYIHA ISHI

```yaml
---
dars: 15
mavzu: "Loyiha ishi"
yonalish: "mobil"
chorak: 2
tur: "loyiha"
muddat: "2 hafta"

baholash:
  - mezon: "Ishlaydi"
    ball: 4
  - mezon: "UI toza va tushunarli"
    ball: 3
  - mezon: "Kod tartibli"
    ball: 3

uyVazifa:
  topshiriqlar:
    - daqiqa: 25
      shablon: "{TEMA} mavzusida ilova yarating"
      minimum: "Kamida 2 ta ekran, Intent bilan bog'langan"
      qoshimcha: "Ma'lumot saqlash"
  variantlar:
    - { n: 1, TEMA: "Kitob ro'yxati" }
    # ... 12 tagacha
---

## Loyiha sharti
```

## BSB

Fayl yaratilmaydi. Foydalanuvchini ogohlantiring.

## MAJBURIY MAYDONLAR

Barcha turlar uchun:
`dars`, `mavzu`, `yonalish`, `chorak`, `tur`, `uyVazifa`

`tur: "yangi"` uchun qo'shimcha:
`video`, `davomiylik`, `segmentlar`, `slaydlar`

`tur: "amaliy"` uchun qo'shimcha:
`bogliqDars`

## SXEMA QOIDALARI (`lib/schema.ts`)

Build paytida tekshirilsin, xato bo'lsa build to'xtasin:

1. `yonalish` ∈ {`veb`, `mobil`, `tarmoq`}
2. `chorak` ∈ 1..4
3. `dars` ∈ 1..34, fayl nomi bilan mos
4. `tur` ∈ {`yangi`, `amaliy`, `loyiha`}
5. `davomiylik` ≤ 20
6. `uyVazifa.variantlar` uzunligi **aynan 12**
7. Har variantda `n` bor, 1..12, takrorlanmaydi
8. `shablon`, `minimum`, `qoshimcha` ichidagi har bir
   `{PARAMETR}` **barcha** variantlarda mavjud
9. `segmentlar` dagi `tur` ∈ {`nazariy`, `amaliy`}
10. `segmentlar` da `tur: "amaliy"` soni ≤ 2
11. `slaydlar` uzunligi ≤ 16
12. `pauza: true` slaydlar soni = `segmentlar` uzunligi
13. `video` — 11 belgili YouTube ID
14. `bogliqDars` mavjud faylga ishora qiladi
15. `uyVazifa.topshiriqlar` soni = ceil(segmentlar / 2)
16. Har segment aynan bitta `qamrov` da uchraydi — tushib qolgani ham,
    ikki marta kelgani ham xato
17. Bitta `qamrov` da 2 tadan ko'p segment bo'lmaydi
18. `daqiqa` 5..25, barcha topshiriqlar jami ≤ 35

8-qoida muhim: shablon `{MAVZU}` deb yozilib, variantda `MAVZU`
bo'lmasa, o'quvchi topshiriqda `{MAVZU}` so'zini ko'radi.

15–18 uy vazifasini darsning hajmi va mazmuniga bog'laydi
(`rules/07`): kichik darsda bitta topshiriq, kattasida ikkita, va
darsda o'tilgan har bir segment mashq qilinadi.
