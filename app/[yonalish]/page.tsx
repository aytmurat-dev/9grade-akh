import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import YonalishRoyxati from '@/components/YonalishRoyxati';
import { yonalishmi } from '@/lib/darslar';
import { YONALISHLAR, YONALISH_NOMI, YONALISH_TAVSIF } from '@/lib/sozlamalar';

type Props = { params: Promise<{ yonalish: string }> };

export function generateStaticParams() {
  return YONALISHLAR.map((yonalish) => ({ yonalish }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { yonalish } = await params;
  if (!yonalishmi(yonalish)) return {};
  return {
    title: `${YONALISH_NOMI[yonalish]} darslari`,
    description: YONALISH_TAVSIF[yonalish],
    // "veb" saytning kirish sahifasi ham — asosiysi "/" deb belgilaymiz,
    // /veb esa faqat manzilni qo'lda qisqartirganlar uchun qoladi.
    ...(yonalish === 'veb' ? { alternates: { canonical: '/' } } : {}),
  };
}

export default async function YonalishSahifasi({ params }: Props) {
  const { yonalish } = await params;
  if (!yonalishmi(yonalish)) notFound();
  return <YonalishRoyxati yonalish={yonalish} />;
}
