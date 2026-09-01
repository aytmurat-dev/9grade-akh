import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Alert, Belgi, Bolim, Qator, Qobiq, Royxat } from '@/components/ds';
import { choraklarBoyicha, yonalishDarslari, yonalishmi } from '@/lib/darslar';
import {
  CHORAK_RAQAMI,
  DARSLAR_SONI,
  YONALISHLAR,
  YONALISH_NOMI,
  YONALISH_TAVSIF,
} from '@/lib/sozlamalar';
import uslub from './yonalish.module.css';

type Props = { params: Promise<{ yonalish: string }> };

export function generateStaticParams() {
  return YONALISHLAR.map((yonalish) => ({ yonalish }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { yonalish } = await params;
  if (!yonalishmi(yonalish)) return {};
  return {
    title: YONALISH_NOMI[yonalish],
    description: YONALISH_TAVSIF[yonalish],
  };
}

export default async function YonalishSahifasi({ params }: Props) {
  const { yonalish } = await params;
  if (!yonalishmi(yonalish)) notFound();

  const darslar = yonalishDarslari(yonalish);
  const guruhlar = choraklarBoyicha(darslar);

  return (
    <Qobiq>
      <nav className={uslub.orqaga}>
        <Link href="/" prefetch={false}>
          ← Yo&apos;nalishlar
        </Link>
      </nav>

      <header className={uslub.bosh}>
        <h1>{YONALISH_NOMI[yonalish]}</h1>
        <p className={uslub.tavsif}>{YONALISH_TAVSIF[yonalish]}</p>
        <Belgi rang="asosiy">
          {darslar.length} ta dars tayyor · o&apos;quv yilida jami {DARSLAR_SONI} ta
        </Belgi>
      </header>

      {guruhlar.length === 0 ? (
        <Alert turi="eslatma" sarlavha="Darslar hali joylanmagan">
          <p>Bu yo&apos;nalish uchun videodarslar tez orada paydo bo&apos;ladi.</p>
        </Alert>
      ) : (
        guruhlar.map((guruh) => (
          <Bolim
            key={guruh.chorak}
            sarlavha={`${CHORAK_RAQAMI[guruh.chorak] ?? guruh.chorak} chorak`}
          >
            <Royxat>
              {guruh.darslar.map((dars) => (
                <li key={dars.raqam}>
                  <Qator
                    href={`/${yonalish}/${dars.raqam}`}
                    raqam={dars.dars}
                    nomi={dars.mavzu}
                    izoh={`${dars.davomiylik} daq`}
                  />
                </li>
              ))}
            </Royxat>
          </Bolim>
        ))
      )}
    </Qobiq>
  );
}
