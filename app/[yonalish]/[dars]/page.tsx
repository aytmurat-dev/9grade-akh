import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Qollanma from '@/components/Qollanma';
import SlaydRejim from '@/components/SlaydRejim';
import Slider from '@/components/Slider';
import UyVazifa from '@/components/UyVazifa';
import VideoFrame from '@/components/VideoFrame';
import { Bolim, Qobiq } from '@/components/ds';
import { darsFayllari, darsniOl, qoshnilar, rasmBormi, yonalishmi } from '@/lib/darslar';
import { kodniBoyash, markdownToHtml } from '@/lib/markdown';
import {
  CHORAK_RAQAMI,
  YONALISHLAR,
  YONALISH_NOMI,
  yonalishManzili,
} from '@/lib/sozlamalar';
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

export default async function DarsSahifasi({ params }: Props) {
  const { yonalish, dars: raqam } = await params;
  if (!yonalishmi(yonalish)) notFound();

  const dars = darsniOl(yonalish, raqam);
  if (!dars) notFound();

  const qollanmaHtml = await markdownToHtml(dars.qollanma);

  // Slayd kodini build paytida bo'yaymiz — brauzerga kutubxona tushmasin.
  const slaydlar = await Promise.all(
    dars.slaydlar.map(async (slayd) => ({
      muqova: slayd.muqova,
      yorliq: slayd.yorliq,
      ustyozuv: slayd.ustyozuv,
      sarlavha: slayd.sarlavha,
      matn: slayd.matn,
      royxat: slayd.royxat,
      rasm: slayd.rasm && rasmBormi(slayd.rasm) ? slayd.rasm : undefined,
      rasmKutilmoqda: slayd.rasm !== undefined && !rasmBormi(slayd.rasm),
      teglar: slayd.teglar,
      muhr: slayd.muhr,
      pauza: slayd.pauza,
      topshiriq: slayd.topshiriq,
      vaqt: slayd.vaqt,
      til: slayd.til,
      kodHtml: slayd.kod ? await kodniBoyash(slayd.kod, slayd.til) : undefined,
    })),
  );

  // MUHIM: variantlar mijozga umuman berilmaydi — faqat topshiriq
  // matnlari uzatiladi, qiymatlarni brauzer alohida JSON'dan oladi.
  const topshiriqlar = dars.uyVazifa.topshiriqlar.map((t) => ({
    shablon: t.shablon,
    minimum: t.minimum,
    qoshimcha: t.qoshimcha,
    daqiqa: t.daqiqa,
    // Topshiriq darsning qaysi qismidan kelganini o'quvchi ko'rsin (rules/07)
    qamrovYorliq:
      t.qamrov.length > 1 ? `${t.qamrov.join('–')}-segmentlar` : `${t.qamrov[0]}-segment`,
    qamrovNomi: t.qamrov
      .map((r) => dars.segmentlar[r - 1]?.nomi ?? `${r}-segment`)
      .join(' · '),
  }));

  const { oldingi, keyingi } = qoshnilar(yonalish, dars);

  return (
    <Qobiq>
      {/* Breadcrumb */}
      <nav className={uslub.orqaga} data-yashir aria-label="Yo'l">
        <Link href={yonalishManzili(yonalish)} className={uslub.orqagaHavola} prefetch={false}>
          <span>←</span> {YONALISH_NOMI[yonalish]}
        </Link>
      </nav>

      {/* 1. Sarlavha + davomiylik + chorak */}
      <header className={uslub.bosh} data-yashir>
        <div className={uslub.ustkiQator}>
          <span className={uslub.darsRaqamPill}>
            {dars.dars}-DARS
          </span>
          <span className={uslub.chorakPill}>
            {CHORAK_RAQAMI[dars.chorak] ?? dars.chorak} CHORAK
          </span>
        </div>

        <h1 className={uslub.mavzuSarlavha}>{dars.mavzu}</h1>
      </header>

      {/* 2. Video — vaqt belgilari ro'yxati ataylab yo'q: pauza vaqtlari
          videoning o'zida va slaydlarda ko'rinadi, sahifada takrorlanmaydi. */}
      <Bolim yashirilsin>
        <VideoFrame video={dars.video} mavzu={dars.mavzu} />
      </Bolim>

      {/* 3. Slaydlar */}
      <Bolim sarlavha="Taqdimot slaydlari">
        <Slider
          slaydlar={slaydlar}
          mavzu={dars.mavzu}
          darsKodi={`${yonalish.toUpperCase()}-${dars.raqam}`}
        />
      </Bolim>

      {/* 4. Qo'llanma */}
      <Bolim sarlavha="Dars qo'llanmasi" yashirilsin>
        <Qollanma html={qollanmaHtml} />
      </Bolim>

      {/* 5. Uy vazifasi */}
      <Bolim sarlavha="Shaxsiy uy vazifasi" yashirilsin>
        <UyVazifa yonalish={yonalish} raqam={dars.raqam} topshiriqlar={topshiriqlar} />
      </Bolim>

      {/* Navigatsiya: Oldingi / keyingi dars */}
      {/* Qo'shni dars bo'lmasa navigatsiya umuman chizilmaydi — aks holda
          sahifa oxirida bo'sh chiziq va ortiqcha joy qolib ketadi. */}
      {(oldingi || keyingi) && (
        <nav className={uslub.qoshni} data-yashir aria-label="Darslararo o'tish">
          {oldingi && (
            <Link
              href={`/${yonalish}/${oldingi.raqam}`}
              className={uslub.qoshniHavola}
              prefetch={false}
            >
              <span>← Oldingi dars</span>
              <strong>{oldingi.mavzu}</strong>
            </Link>
          )}
          {/* Oldingisi yo'q bo'lsa, keyingisi o'ng ustunda qolsin */}
          {!oldingi && keyingi && <div />}
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
      )}

      <SlaydRejim />
    </Qobiq>
  );
}

