import { Belgi, Karta, Panel, Qobiq } from '@/components/ds';
import { yonalishDarslari } from '@/lib/darslar';
import {
  DARSLAR_SONI,
  YONALISHLAR,
  YONALISH_NOMI,
  YONALISH_TAVSIF,
} from '@/lib/sozlamalar';
import uslub from './page.module.css';

export default function BoshSahifa() {
  const yonalishlar = YONALISHLAR.map((y) => ({
    kalit: y,
    nomi: YONALISH_NOMI[y],
    tavsif: YONALISH_TAVSIF[y],
    tayyor: yonalishDarslari(y).length,
  }));

  return (
    <Qobiq>
      <section className={uslub.kirish}>
        <h1>Informatika videodarslari</h1>
        <p className={uslub.izoh}>
          Uyda videoni ko&apos;rasiz va uy vazifasini bajarasiz. Darsda esa
          savollarni birga tahlil qilamiz. Yo&apos;nalishingizni tanlang.
        </p>
      </section>

      <ul className={uslub.kartalar}>
        {yonalishlar.map((y) => (
          <li key={y.kalit}>
            <Karta href={`/${y.kalit}`} sarlavha={y.nomi} matn={y.tavsif}>
              <Belgi>
                {y.tayyor > 0
                  ? `${y.tayyor} ta dars tayyor · jami ${DARSLAR_SONI} ta`
                  : 'darslar tayyorlanmoqda'}
              </Belgi>
            </Karta>
          </li>
        ))}
      </ul>

      <Panel className={uslub.qanday}>
        <h2>Qanday ishlaymiz</h2>
        <ol className={uslub.qadamlar}>
          <li>
            <strong>Uyda:</strong> videoni ko&apos;rasiz, pauza belgisida to&apos;xtab
            topshiriqni bajarasiz.
          </li>
          <li>
            <strong>Uyda:</strong> o&apos;z raqamingiz bo&apos;yicha uy vazifasini
            bajarasiz.
          </li>
          <li>
            <strong>Darsda:</strong> tushunmagan joylarni so&apos;raysiz, ishlarni
            birga tahlil qilamiz.
          </li>
        </ol>
      </Panel>
    </Qobiq>
  );
}
