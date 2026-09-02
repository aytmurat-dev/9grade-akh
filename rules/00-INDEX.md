---
fayl: 00-INDEX.md
maqsad: Qoidalar to'plamiga kirish nuqtasi — Claude Code shu fayldan boshlaydi
---

# QOIDALAR — KIRISH

Bu papka 9-sinf videodars materiallarini generatsiya qilish qoidalarini
saqlaydi. Foydalanuvchi `/rules bo'yicha <yo'nalish> <N>-darsni yaratib ber`
desa, quyidagi tartibda ishlang.

## ISH TARTIBI

```
1. 02-mavzular-royxati.md dan darsni toping
   → mavzu nomi, chorak, dars turi

2. Dars turini aniqlang (01-model-va-ish-tartibi.md, 3-bo'lim)
   → D (yangi mavzu) | A (amaliy) | L (loyiha) | BSB

3. Dars turiga mos qoidani o'qing:
   D   → 03 → 05 → 11 → 06 → 07
   A   → 07 (faqat topshiriq sahifasi)
   L   → 07 (loyiha shartlari)
   BSB → sahifa yaratilmaydi, foydalanuvchini ogohlantiring

4. Segment xaritasini tuzing (03-segment-xaritasi.md)
   → FOYDALANUVCHIGA KO'RSATING va tasdiqlashini kuting

5. Skrinshot ro'yxatini bering (08-rasm-va-skrinshot.md)
   → foydalanuvchi skrinshotlarni o'zi joylaydi

6. Dars faylini yozing (04-dars-fayli-formati.md)
   → content/darslar/<yonalish>/<NN>.md
   → uchta bo'lak ALOHIDA ishlanadi, biri ikkinchisidan qolib ketmasin:
        slayd        (05 + 11)
        qo'llanma    (06)
        uy vazifasi  (07)

7. Kerakli rasmlarni generatsiya qiling (08, Gemini API)

8. 10-double-check.md ro'yxatidan o'ting

9. npm run build ishlashini tekshiring

10. QAYTA TEKSHIRUV — uchta bo'lakni yana bir bor o'qing
    (10-double-check.md, "IKKINCHI O'QISH")
```

## QOIDA FAYLLARI

| Fayl | Qachon o'qiladi |
|---|---|
| `01-model-va-ish-tartibi.md` | Har doim — model, dars turlari, vaqt cheklovlari |
| `02-mavzular-royxati.md` | Har doim — 102 dars ro'yxati |
| `03-segment-xaritasi.md` | Yangi mavzu darslarida |
| `04-dars-fayli-formati.md` | Har doim — frontmatter sxemasi |
| `05-slayd-qoidalari.md` | Yangi mavzu darslarida |
| `06-qollanma-qoidalari.md` | Yangi mavzu darslarida |
| `07-uy-vazifasi.md` | Har doim |
| `08-rasm-va-skrinshot.md` | Rasm kerak bo'lganda |
| `09-kirish-chiptasi.md` | Faqat so'ralganda — saytga tushmaydi |
| `10-double-check.md` | Har doim, oxirida |
| `11-slayd-dizayni.md` | Slayd yozilayotganda — ko'rinish konsepsiyasi |

## MUHIM QOIDALAR

1. **Segment xaritasi tasdiqlanmaguncha dars fayli yozilmaydi.**
   Xarita — bir necha qatorlik reja. Uni ko'rsatib, javob kuting.

2. **Skrinshotlarni foydalanuvchi joylaydi.** Siz faqat ro'yxat berasiz.
   Skrinshot yo'lini frontmatter'ga yozing, fayl keyin paydo bo'ladi.

3. **Boshqa rasmlar Gemini API bilan generatsiya qilinadi.**
   Kalit `.env` faylida: `GEMINI_API_KEY`. Kalitni hech qachon
   kodga yoki markdown faylga yozmang.

4. **Javoblar kaliti `content/` ichiga tushmaydi.**
   Alohida: `kalitlar/<yonalish>-<NN>.md` — bu papka `.gitignore` da.

5. **12 variant HTML ichiga to'liq tushmasin.** Faqat o'quvchining
   varianti render qilinsin.

6. Yozilgan har bir fayldan keyin `npm run build` ishlashini tekshiring.

7. **Uchta bo'lak — darsning o'zi.** Slayd, qo'llanma va uy vazifasi —
   uchalasi ham alohida ishlanadi va uchalasi ham eng yaxshi holatga
   yetkaziladi. Biri "bor bo'lsa bo'ldi" darajasida qolsa, dars
   ishlamaydi: slayd videoni, qo'llanma mustaqil o'qishni, uy vazifasi
   esa esda qolishini ta'minlaydi.

8. **Tugatgandan keyin qayta o'qing.** Birinchi yozuv — qoralama.
   Fayl tayyor bo'lib, build o'tgandan keyin uchala bo'lakni ikkinchi
   marta o'qib chiqing (`rules/10`, "IKKINCHI O'QISH") va toping:
   tushib qolgan qadam, javobsiz savol, mashq qilinmagan mavzu.
