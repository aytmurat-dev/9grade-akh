/**
 * Umumiy o'zgarmaslar. Bu faylda zod yo'q — shuning uchun uni
 * mijoz (client) komponentlari ham bemalol import qila oladi.
 */

export const YONALISHLAR = ['veb', 'mobil', 'tarmoq'] as const;
export type Yonalish = (typeof YONALISHLAR)[number];

export const YONALISH_NOMI: Record<Yonalish, string> = {
  veb: 'Veb dasturlash',
  mobil: 'Mobil dasturlash',
  tarmoq: 'Tizim administratori',
};

export const YONALISH_TAVSIF: Record<Yonalish, string> = {
  veb: 'HTML, CSS va JavaScript — brauzerda ishlaydigan sahifalar',
  mobil: 'Telefon ilovalari — interfeys, mantiq va qurilma imkoniyatlari',
  tarmoq: 'Operatsion tizim, tarmoq va server xizmatlarini boshqarish',
};

export const CHORAK_RAQAMI: Record<number, string> = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
};

export const DARSLAR_SONI = 34;
export const VARIANTLAR_SONI = 12;

/** localStorage kaliti — o'quvchi jurnaldagi raqami */
export const RAQAM_KALITI = 'oquvchi_raqami';

export function yonalishmi(qiymat: string): qiymat is Yonalish {
  return (YONALISHLAR as readonly string[]).includes(qiymat);
}

/**
 * Yo'nalish sahifasining manzili.
 *
 * Saytda alohida bosh sahifa yo'q: "/" — bu Veb yo'nalishi darslari.
 * Shuning uchun veb uchun "/veb" emas, "/" qaytariladi. ("/veb" sahifasi
 * ham yaratiladi, lekin unga hech qayerdan havola berilmaydi — u faqat
 * manzilni qo'lda qisqartirganda 404 chiqmasligi uchun.)
 */
export function yonalishManzili(yonalish: Yonalish): string {
  return yonalish === 'veb' ? '/' : `/${yonalish}`;
}
