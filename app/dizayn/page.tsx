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
  Tanlov,
  Tugma,
  Ustki,
  Yordam,
} from '@/components/ds';
import uslub from './dizayn.module.css';

export const metadata: Metadata = {
  title: 'Dizayn sistema ko\'rgazmasi',
  description: 'Saytdagi barcha standart bo\'laklar bir joyda.',
  robots: { index: false, follow: false },
};

const RANGLAR = [
  ['--rang-asosiy', 'asosiy (ko\'k)'],
  ['--rang-asosiy-toq', 'asosiy-toq'],
  ['--rang-asosiy-och', 'asosiy-och'],
  ['--rang-iliq', 'iliq (sariq/to\'q sariq)'],
  ['--rang-iliq-och', 'iliq-och'],
  ['--rang-pastel-moviy-fon', 'pastel-moviy'],
  ['--rang-pastel-sariq-fon', 'pastel-sariq'],
  ['--rang-pastel-binafsha-fon', 'pastel-binafsha'],
  ['--rang-pastel-yashil-fon', 'pastel-yashil'],
  ['--rang-pastel-pushti-fon', 'pastel-pushti'],
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

const OLCHAMLAR = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'];
const JOYLAR = ['1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20'];

export default function DizaynSahifasi() {
  return (
    <Qobiq keng>
      <header className={uslub.bosh}>
        <Ustki>Ichki sahifa</Ustki>
        <h1>Educom Dizayn Sistema</h1>
        <Yordam>
          Saytdagi barcha sahifalar shu bo&apos;laklardan yig&apos;iladi. Rang,
          oraliq va shrift o&apos;lchamlari <code>styles/tokens.css</code> da;
          sinflar <code>styles/ds.css</code> da; React o&apos;ramlari{' '}
          <code>components/ds/</code> da.
        </Yordam>
      </header>

      {/* ---------------- Tokenlar ---------------- */}

      <Bolim sarlavha="Ranglar palitrasi">
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
              <code>--olcham-{o}</code> — Sarlavha teglari va matn ierarxiyasi
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

      {/* ---------------- Tugmalar ---------------- */}

      <Bolim sarlavha="Tugmalar (Pill Buttons)">
        <div className={uslub.qator}>
          <Tugma korinish="asosiy">Asosiy ko&apos;k</Tugma>
          <Tugma korinish="iliq">Iliq sariq</Tugma>
          <Tugma>Oddiy oq</Tugma>
          <Tugma korinish="sokin">Sokin kulrang</Tugma>
          <Tugma korinish="katta">Katta tugma</Tugma>
          <Tugma disabled>O&apos;chirilgan</Tugma>
        </div>
      </Bolim>

      {/* ---------------- Tanlov ---------------- */}

      <Bolim sarlavha="Tanlov (Select)">
        <div className={uslub.qator}>
          <Tanlov qiymat="2" aria-label="Namuna: variant raqami">
            <option value="1">№1</option>
            <option value="2">№2</option>
            <option value="3">№3</option>
          </Tanlov>

          <Tanlov korinish="diqqat" qiymat="" aria-label="Namuna: tanlanmagan">
            <option value="" disabled>
              tanlang…
            </option>
            <option value="1">№1</option>
          </Tanlov>
        </div>
        <Yordam>
          &quot;diqqat&quot; ko&apos;rinishi — hali tanlanmagan maydon uchun.
          Uy vazifasidagi raqam shu bo&apos;lakdan tanlanadi.
        </Yordam>
      </Bolim>

      {/* ---------------- Belgilar ---------------- */}

      <Bolim sarlavha="Belgilar (Badges)">
        <Belgilar>
          <Belgi>Sokin</Belgi>
          <Belgi rang="asosiy">Asosiy</Belgi>
          <Belgi rang="iliq">Iliq aksent</Belgi>
          <Belgi rang="diqqat">Diqqat</Belgi>
          <Belgi rang="yashil">Bajarildi</Belgi>
          <Belgi rang="vaqt">⏱ 3:40</Belgi>
        </Belgilar>
      </Bolim>

      {/* ---------------- Pastel Kartalar ---------------- */}

      <Bolim sarlavha="Pastel va Oddiy Kartalar (Educom Cards)">
        <div className={uslub.kartalarGrid}>
          <Karta
            rang="moviy"
            sarlavha="01. Moviy Pastel Karta"
            matn="Asosiy videodarslar va tushunchalar bloki uchun ishlatiladi."
          />
          <Karta
            rang="sariq"
            sarlavha="02. Sariq Pastel Karta"
            matn="Pauza, to'xtash va diqqat talab qilinadigan mashqlar uchun."
          />
          <Karta
            rang="binafsha"
            sarlavha="03. Binafsha Pastel Karta"
            matn="Shaxsiy variantlar va mustaqil ishlar uchun."
          />
          <Karta
            rang="yashil"
            sarlavha="04. Yashil Pastel Karta"
            matn="Darsda tahlil va muvaffaqiyatli yakunlash bosqichlari uchun."
          />
        </div>

        <div className={uslub.kartalarGrid} style={{ marginTop: 'var(--joy-4)' }}>
          <Karta
            href="/dizayn"
            sarlavha="Havolali standart karta"
            matn="Ustiga bosganda yo'nalishga o'tadi, hover animatsiyasi mavjud."
          >
            <Belgi rang="asosiy">Darslar ➔</Belgi>
          </Karta>

          <Panel>
            <p>
              <strong>Panel</strong> — yumshoq fonli quti. Izoh, ko&apos;rsatma yoki
              ikkinchi darajali ma&apos;lumot uchun.
            </p>
          </Panel>
        </div>
      </Bolim>

      {/* ---------------- Alertlar ---------------- */}

      <Bolim sarlavha="Alertlar (Callouts)">
        <Alert turi="eslatma" sarlavha="Eslatma">
          <p>Foydali ma&apos;lumot yoki maslahat.</p>
        </Alert>
        <Alert turi="ogoh" sarlavha="Ehtiyot bo&apos;ling">
          <p>Bu yerda xato qilish oson.</p>
        </Alert>
        <Alert turi="xato" sarlavha="Xato">
          <p>Nimadir ishlamadi yoki manzil noto&apos;g&apos;ri.</p>
        </Alert>
        <Alert turi="yashil" sarlavha="Bajarildi">
          <p>Topshiriq muvaffaqiyatli topshirildi.</p>
        </Alert>
        <Alert turi="diqqat" sarlavha="Pauza">
          <p>Videoni to&apos;xtatib, topshiriqni bajaring.</p>
        </Alert>
      </Bolim>

      {/* ---------------- Ro'yxat ---------------- */}

      <Bolim sarlavha="Bosiladigan dars qatorlari">
        <Royxat>
          <li>
            <Qator href="/dizayn" raqam={1} nomi="HTML hujjat tuzilishi" izoh="⏱ 11 daq" />
          </li>
          <li>
            <Qator href="/dizayn" raqam={2} nomi="Teglar va atributlar" izoh="⏱ 9 daq" />
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
      </Bolim>
    </Qobiq>
  );
}

