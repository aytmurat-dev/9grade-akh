import type { Metadata } from 'next';
import {
  Alert,
  Belgi,
  Belgilar,
  Bolim,
  Jadval,
  Karta,
  Panel,
  Qator,
  Qobiq,
  Royxat,
  Tugma,
  Ustki,
  Yordam,
} from '@/components/ds';
import uslub from './dizayn.module.css';

export const metadata: Metadata = {
  title: 'Dizayn sistema',
  description: 'Saytdagi barcha standart bo’laklar bir joyda.',
  robots: { index: false, follow: false },
};

const RANGLAR = [
  ['--rang-asosiy', 'asosiy'],
  ['--rang-asosiy-toq', 'asosiy-toq'],
  ['--rang-asosiy-och', 'asosiy-och'],
  ['--rang-diqqat', 'diqqat'],
  ['--rang-yashil', 'yashil'],
  ['--rang-qizil', 'qizil'],
  ['--rang-sariq', 'sariq'],
  ['--rang-matn', 'matn'],
  ['--rang-matn-2', 'matn-2'],
  ['--rang-fon-2', 'fon-2'],
  ['--rang-chiziq', 'chiziq'],
  ['--rang-kod-fon', 'kod-fon'],
];

const OLCHAMLAR = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'];
const JOYLAR = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16'];

/**
 * Dizayn sistemaning tirik ko'rgazmasi.
 *
 * Yangi bo'lak kerak bo'lsa: styles/ds.css ga sinf, components/ds ga
 * React o'rami, keyin shu sahifaga namuna qo'shing. Shunda sistema
 * "qog'ozda" emas, ishlaydigan holda qoladi.
 */
export default function DizaynSahifasi() {
  return (
    <Qobiq>
      <header className={uslub.bosh}>
        <Ustki>Ichki sahifa</Ustki>
        <h1>Dizayn sistema</h1>
        <Yordam>
          Saytdagi barcha sahifalar shu bo&apos;laklardan yig&apos;iladi. Rang,
          oraliq va shrift o&apos;lchamlari <code>styles/tokens.css</code> da;
          sinflar <code>styles/ds.css</code> da; React o&apos;ramlari{' '}
          <code>components/ds/</code> da.
        </Yordam>
      </header>

      {/* ---------------- Tokenlar ---------------- */}

      <Bolim sarlavha="Ranglar">
        <ul className={uslub.ranglar}>
          {RANGLAR.map(([token, nom]) => (
            <li key={token}>
              <span
                className={uslub.rangQuti}
                style={{ background: `var(${token})` }}
                aria-hidden="true"
              />
              <code>{nom}</code>
            </li>
          ))}
        </ul>
      </Bolim>

      <Bolim sarlavha="Shrift o'lchamlari">
        <ul className={uslub.olchamlar}>
          {OLCHAMLAR.map((o) => (
            <li key={o} style={{ fontSize: `var(--olcham-${o})` }}>
              <code>--olcham-{o}</code> — Sarlavha teglari va matn
            </li>
          ))}
        </ul>
      </Bolim>

      <Bolim sarlavha="Oraliqlar">
        <ul className={uslub.joylar}>
          {JOYLAR.map((j) => (
            <li key={j}>
              <span className={uslub.joyChiziq} style={{ width: `var(--joy-${j})` }} />
              <code>--joy-{j}</code>
            </li>
          ))}
        </ul>
      </Bolim>

      {/* ---------------- Matn ---------------- */}

      <Bolim sarlavha="Matn">
        <div className="ds-matn">
          <h2>Ikkinchi darajali sarlavha</h2>
          <p>
            Oddiy paragraf. Ichida <code>kod bo&apos;lagi</code>, <strong>qalin
            matn</strong> va <a href="#">havola</a> bo&apos;lishi mumkin.
          </p>
          <h3>Uchinchi darajali sarlavha</h3>
          <ul>
            <li>Ro&apos;yxatning birinchi bandi</li>
            <li>Ikkinchi bandi</li>
          </ul>
          <blockquote>
            <p>Iqtibos yoki muhim eslatma shunday ko&apos;rinadi.</p>
          </blockquote>
        </div>
        <Yordam>
          Qo&apos;llanma markdown&apos;i aynan shu uslublar bilan chiziladi —{' '}
          <code>.ds-matn</code> o&apos;rami ichida.
        </Yordam>
      </Bolim>

      {/* ---------------- Tugmalar ---------------- */}

      <Bolim sarlavha="Tugmalar">
        <div className={uslub.qator}>
          <Tugma korinish="asosiy">Asosiy</Tugma>
          <Tugma>Oddiy</Tugma>
          <Tugma korinish="sokin">Sokin</Tugma>
          <Tugma korinish="katta">Katta</Tugma>
          <Tugma disabled>O&apos;chirilgan</Tugma>
        </div>
      </Bolim>

      {/* ---------------- Belgilar ---------------- */}

      <Bolim sarlavha="Belgilar">
        <Belgilar>
          <Belgi>Sokin</Belgi>
          <Belgi rang="asosiy">Asosiy</Belgi>
          <Belgi rang="diqqat">Diqqat</Belgi>
          <Belgi rang="yashil">Bajarildi</Belgi>
          <Belgi rang="vaqt">3:40</Belgi>
        </Belgilar>
      </Bolim>

      {/* ---------------- Alertlar ---------------- */}

      <Bolim sarlavha="Alertlar">
        <Alert turi="eslatma" sarlavha="Eslatma">
          <p>Foydali ma&apos;lumot yoki maslahat.</p>
        </Alert>
        <Alert turi="ogoh" sarlavha="Ehtiyot bo&apos;ling">
          <p>Bu yerda xato qilish oson.</p>
        </Alert>
        <Alert turi="xato" sarlavha="Xato">
          <p>Nimadir ishlamadi.</p>
        </Alert>
        <Alert turi="yashil" sarlavha="Bajarildi">
          <p>Hammasi joyida.</p>
        </Alert>
        <Alert turi="diqqat" sarlavha="Pauza">
          <p>Videoni to&apos;xtatib, topshiriqni bajaring.</p>
        </Alert>
      </Bolim>

      {/* ---------------- Kartalar ---------------- */}

      <Bolim sarlavha="Kartalar va panellar">
        <div className={uslub.kartalar}>
          <Karta sarlavha="Oddiy karta" matn="Havolasiz, ma'lumot uchun.">
            <Belgi>ichida belgi</Belgi>
          </Karta>
          <Karta
            href="/dizayn"
            sarlavha="Bosiladigan karta"
            matn="Havola sifatida ishlaydi, chap chetida rangli chiziq."
          />
        </div>
        <Panel className={uslub.panel}>
          <p>
            <strong>Panel</strong> — yumshoq fonli quti. Izoh, ko&apos;rsatma yoki
            ikkinchi darajali ma&apos;lumot uchun.
          </p>
        </Panel>
      </Bolim>

      {/* ---------------- Ro'yxat ---------------- */}

      <Bolim sarlavha="Bosiladigan qatorlar">
        <Royxat>
          <li>
            <Qator href="/dizayn" raqam={1} nomi="Birinchi dars mavzusi" izoh="11 daq" />
          </li>
          <li>
            <Qator href="/dizayn" raqam={2} nomi="Ikkinchi dars mavzusi" izoh="9 daq" />
          </li>
        </Royxat>
      </Bolim>

      {/* ---------------- Jadval ---------------- */}

      <Bolim sarlavha="Jadval">
        <Jadval>
          <thead>
            <tr>
              <th>Teg</th>
              <th>Vazifasi</th>
              <th>Juftmi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>&lt;h1&gt;</code>
              </td>
              <td>Sarlavha</td>
              <td>Ha</td>
            </tr>
            <tr>
              <td>
                <code>&lt;img&gt;</code>
              </td>
              <td>Rasm</td>
              <td>Yo&apos;q</td>
            </tr>
          </tbody>
        </Jadval>
        <Yordam>Telefonda jadval gorizontal scroll bo&apos;ladi.</Yordam>
      </Bolim>
    </Qobiq>
  );
}
