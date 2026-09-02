import type { Metadata } from 'next';
import YonalishRoyxati from '@/components/YonalishRoyxati';
import { YONALISH_NOMI, YONALISH_TAVSIF } from '@/lib/sozlamalar';

/**
 * Saytning kirish sahifasi — alohida "bosh sahifa" yo'q.
 * O'quvchi saytga kirishi bilan Veb yo'nalishi darslarini ko'radi.
 * Qolgan yo'nalishlar tepa paneldan ochiladi.
 */
export const metadata: Metadata = {
  // Ildiz sahifada layout'ning title shabloni qo'llanmaydi — to'liq yozamiz.
  title: { absolute: `${YONALISH_NOMI.veb} darslari · 9-sinf Informatika` },
  description: YONALISH_TAVSIF.veb,
};

export default function KirishSahifasi() {
  return <YonalishRoyxati yonalish="veb" />;
}
