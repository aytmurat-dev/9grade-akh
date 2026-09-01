import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Qollanma from '@/components/Qollanma';
import SlaydRejim from '@/components/SlaydRejim';
import Slider from '@/components/Slider';
import UyVazifa from '@/components/UyVazifa';
import VideoFrame from '@/components/VideoFrame';
import { Belgi, Belgilar, Bolim, Qobiq, Ustki } from '@/components/ds';
import { darsFayllari, darsniOl, qoshnilar, yonalishmi } from '@/lib/darslar';
import { kodniBoyash, markdownToHtml } from '@/lib/markdown';
import { CHORAK_RAQAMI, YONALISHLAR, YONALISH_NOMI } from '@/lib/sozlamalar';
import uslub from './dars.module.css';

type Props = { params: Promise<{ yonalish: string; dars: string }> };

export function generateStaticParams() {
  return YONALISHLAR.flatMap((yonalish) =>
    darsFayllari(yonalish).map((fayl) => ({ yonalish, dars: fayl.slice(0, 2) })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { yonalish, dars: raqam } = await params;
  if (!yonalishmi(yonalish)) return {};
  const dars = darsniOl(yonalish, raqam);
  if (!dars) return {};
  return {
    title: `${dars.dars}-dars. ${dars.mavzu}`,
    description: `${YONALISH_NOMI[yonalish]} · ${dars.davomiylik} daqiqalik videodars va uy vazifasi.`,
  };
}

/**
 * Dars sahifasi — to'liq server komponenti.
 *
 * Brauzerga faqat uchta kichik orolcha tushadi: slayder, uy vazifasi
 * va ?slayd rejimi. Sarlavha, video, segmentlar, qo'llanma va
 * navigatsiya — sof HTML, ular uchun JavaScript umuman kerak emas.
 */
export default async function DarsSahifasi({ params }: Props) {
  const { yonalish, dars: raqam } = await params;
  if (!yonalishmi(yonalish)) notFound();

  const dars = darsniOl(yonalish, raqam);
  if (!dars) notFound();

  const qollanmaHtml = await markdownToHtml(dars.qollanma);

  // Slayd kodini build paytida bo'yaymiz — brauzerga kutubxona tushmasin.
  const slaydlar = await Promise.all(
    dars.slaydlar.map(async (slayd) => ({
      sarlavha: slayd.sarlavha,
      matn: slayd.matn,
      rasm: slayd.rasm,
      pauza: slayd.pauza,
      topshiriq: slayd.topshiriq,
      kodHtml: slayd.kod ? await kodniBoyash(slayd.kod, slayd.til) : undefined,
    })),
  );

  // MUHIM: variantlar mijozga umuman berilmaydi. Aks holda 12 tasi ham
  // sahifa kodida qolib, o'quvchi hammasini ko'rgan bo'lardi.
  const { variantlar: _variantlar, ...uyVazifa } = dars.uyVazifa;

  const { oldingi, keyingi } = qoshnilar(yonalish, dars);

  return (
    <Qobiq>
      <nav className={uslub.orqaga} data-yashir>
        <Link href={`/${yonalish}`} prefetch={false}>
          ← {YONALISH_NOMI[yonalish]}
        </Link>
      </nav>

      {/* 1. Sarlavha + davomiylik + chorak */}
      <header className={uslub.bosh} data-yashir>
        <Ustki>
          {dars.dars}-dars · {CHORAK_RAQAMI[dars.chorak] ?? dars.chorak} chorak
        </Ustki>
        <h1>{dars.mavzu}</h1>
        <Belgilar>
          <Belgi>▶ {dars.davomiylik} daqiqa</Belgi>
          <Belgi>{slaydlar.length} ta slayd</Belgi>
        </Belgilar>
      </header>

      {/* 2. Video */}
      <Bolim yashirilsin>
        <VideoFrame video={dars.video} mavzu={dars.mavzu} />

        {dars.segmentlar.length > 0 && (
          <ol className={uslub.segmentlar}>
            {dars.segmentlar.map((segment, i) => (
              <li key={i}>
                <Belgi rang="vaqt">{segment.pauza}</Belgi>
                <span className={uslub.segmentNomi}>{segment.nomi}</span>
                <span className={uslub.tur}>{segment.tur}</span>
              </li>
            ))}
          </ol>
        )}
      </Bolim>

      {/* 3. Slaydlar — ?slayd rejimida yolg'iz shu qoladi */}
      <Bolim sarlavha="Slaydlar">
        <Slider slaydlar={slaydlar} mavzu={dars.mavzu} />
      </Bolim>

      {/* 4. Qo'llanma */}
      <Bolim sarlavha="Qo'llanma" yashirilsin>
        <Qollanma html={qollanmaHtml} />
      </Bolim>

      {/* 5. Uy vazifasi */}
      <Bolim sarlavha="Uy vazifasi" yashirilsin>
        <UyVazifa
          yonalish={yonalish}
          raqam={dars.raqam}
          shablon={uyVazifa.shablon}
          minimum={uyVazifa.minimum}
          qoshimcha={uyVazifa.qoshimcha}
        />
      </Bolim>

      <nav className={uslub.qoshni} data-yashir>
        {oldingi ? (
          <Link
            href={`/${yonalish}/${oldingi.raqam}`}
            className={uslub.qoshniHavola}
            prefetch={false}
          >
            <span>← Oldingi dars</span>
            <strong>{oldingi.mavzu}</strong>
          </Link>
        ) : (
          <span />
        )}
        {keyingi && (
          <Link
            href={`/${yonalish}/${keyingi.raqam}`}
            className={`${uslub.qoshniHavola} ${uslub.ong}`}
            prefetch={false}
          >
            <span>Keyingi dars →</span>
            <strong>{keyingi.mavzu}</strong>
          </Link>
        )}
      </nav>

      <SlaydRejim />
    </Qobiq>
  );
}
