/**
 * DIZAYN SISTEMA — React qavati (Educom Style)
 *
 * Bu komponentlar styles/ds.css dagi sinflarni o'raydi, xolos. Ular
 * ataylab "yupqa": yangi rang yoki oraliq bu yerda emas, tokenlarda
 * (styles/tokens.css) yashaydi.
 *
 * Barcha sahifalar shu komponentlardan yig'iladi. Agar kerakli bo'lak
 * bu yerda bo'lmasa — avval shu faylga qo'shing, keyin sahifada
 * ishlating.
 */

import Link from 'next/link';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */

function sinflar(...qismlar: Array<string | false | null | undefined>): string {
  return qismlar.filter(Boolean).join(' ');
}

/* ------------------------------------------------------------------
   Qobiq — sahifa markazidagi ustun
   ------------------------------------------------------------------ */

export function Qobiq({
  keng = false,
  className,
  children,
}: {
  keng?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={sinflar('ds-qobiq', keng && 'ds-qobiq--keng', className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Bolim — sarlavhali bo'lim
   ------------------------------------------------------------------ */

export function Bolim({
  sarlavha,
  yashirilsin = false,
  className,
  children,
}: {
  /** Kichik, yorqin bo'lim sarlavhasi */
  sarlavha?: string;
  /** ?slayd rejimida yashirilsinmi */
  yashirilsin?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      className={sinflar('ds-bolim', className)}
      {...(yashirilsin ? { 'data-yashir': '' } : {})}
    >
      {sarlavha && <h2 className="ds-bolim-sarlavha">{sarlavha}</h2>}
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------
   Karta (Educom Card & Pastel Options)
   ------------------------------------------------------------------ */

type KartaRangi = 'oddiy' | 'moviy' | 'sariq' | 'binafsha' | 'yashil' | 'pushti';

const KARTA_RANGI_SINFI: Record<KartaRangi, string> = {
  oddiy: '',
  moviy: 'ds-karta--moviy',
  sariq: 'ds-karta--sariq',
  binafsha: 'ds-karta--binafsha',
  yashil: 'ds-karta--yashil',
  pushti: 'ds-karta--pushti',
};

export function Karta({
  href,
  sarlavha,
  matn,
  rang = 'oddiy',
  className,
  children,
}: {
  /** Berilsa — karta havolaga aylanadi */
  href?: string;
  sarlavha?: string;
  matn?: string;
  rang?: KartaRangi;
  className?: string;
  children?: ReactNode;
}) {
  const ichi = (
    <>
      {sarlavha && <h3 className="ds-karta-sarlavha">{sarlavha}</h3>}
      {matn && <p className="ds-karta-matn">{matn}</p>}
      {children}
    </>
  );

  const sinf = sinflar(
    'ds-karta',
    href && 'ds-karta--havola',
    KARTA_RANGI_SINFI[rang],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={sinf}>
        {ichi}
      </Link>
    );
  }
  return <div className={sinf}>{ichi}</div>;
}

/** Yumshoq fonli quti — izoh yoki ikkinchi darajali ma'lumot uchun */
export function Panel({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={sinflar('ds-panel', className)}>{children}</div>;
}

/* ------------------------------------------------------------------
   Tugma — <button> yoki havola
   ------------------------------------------------------------------ */

type TugmaKorinishi = 'oddiy' | 'asosiy' | 'iliq' | 'sokin' | 'katta';

const TUGMA_SINFI: Record<TugmaKorinishi, string> = {
  oddiy: '',
  asosiy: 'ds-tugma--asosiy',
  iliq: 'ds-tugma--iliq',
  sokin: 'ds-tugma--sokin',
  katta: 'ds-tugma--katta',
};

export function Tugma({
  korinish = 'oddiy',
  href,
  onClick,
  disabled,
  type = 'button',
  className,
  children,
  ...qolgani
}: {
  korinish?: TugmaKorinishi;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  children: ReactNode;
} & Record<`aria-${string}`, string | undefined>) {
  const sinf = sinflar('ds-tugma', TUGMA_SINFI[korinish], className);

  if (href) {
    return (
      <Link href={href} className={sinf} {...qolgani}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={sinf} onClick={onClick} disabled={disabled} {...qolgani}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------
   Tanlov — ro'yxatdan bitta qiymat (native <select>)
   ------------------------------------------------------------------ */

export function Tanlov({
  qiymat,
  ozgarganda,
  korinish = 'oddiy',
  id,
  className,
  children,
  ...qolgani
}: {
  qiymat?: string;
  /**
   * Berilmasa — select boshqarilmaydi (defaultValue). Shu tufayli uni
   * server komponentida ham ko'rsatish mumkin (app/dizayn).
   */
  ozgarganda?: (qiymat: string) => void;
  /** "diqqat" — hali tanlanmagan, ko'zga tashlansin */
  korinish?: 'oddiy' | 'diqqat';
  id?: string;
  className?: string;
  children: ReactNode;
} & Record<`aria-${string}`, string | undefined>) {
  const sinf = sinflar(
    'ds-tanlov',
    korinish === 'diqqat' && 'ds-tanlov--diqqat',
    className,
  );

  return (
    <span className={sinf}>
      {ozgarganda ? (
        <select
          id={id}
          value={qiymat}
          onChange={(hodisa) => ozgarganda(hodisa.target.value)}
          {...qolgani}
        >
          {children}
        </select>
      ) : (
        <select id={id} defaultValue={qiymat} {...qolgani}>
          {children}
        </select>
      )}
    </span>
  );
}

/* ------------------------------------------------------------------
   Belgi (badge)
   ------------------------------------------------------------------ */

type BelgiRangi = 'sokin' | 'asosiy' | 'iliq' | 'diqqat' | 'yashil' | 'vaqt';

export function Belgi({
  rang = 'sokin',
  className,
  children,
}: {
  rang?: BelgiRangi;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={sinflar('ds-belgi', rang !== 'sokin' && `ds-belgi--${rang}`, className)}>
      {children}
    </span>
  );
}

/** Belgilar qatori */
export function Belgilar({ children }: { children: ReactNode }) {
  return <div className="ds-belgilar">{children}</div>;
}

/* ------------------------------------------------------------------
   Alert
   ------------------------------------------------------------------ */

type AlertTuri = 'eslatma' | 'ogoh' | 'xato' | 'yashil' | 'diqqat';

export function Alert({
  turi = 'eslatma',
  sarlavha,
  className,
  children,
}: {
  turi?: AlertTuri;
  sarlavha?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={sinflar('ds-alert', `ds-alert--${turi}`, className)}>
      {sarlavha && <p className="ds-alert-sarlavha">{sarlavha}</p>}
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   Jadval — telefonda gorizontal scroll bilan
   ------------------------------------------------------------------ */

export function Jadval({ children }: { children: ReactNode }) {
  return (
    <div className="ds-jadval-quti">
      <table className="ds-jadval">{children}</table>
    </div>
  );
}

/* ------------------------------------------------------------------
   Ro'yxat va bosiladigan qator
   ------------------------------------------------------------------ */

export function Royxat({ children }: { children: ReactNode }) {
  return <ul className="ds-royxat">{children}</ul>;
}

export function Qator({
  href,
  raqam,
  nomi,
  izoh,
}: {
  href: string;
  raqam: ReactNode;
  nomi: ReactNode;
  izoh?: ReactNode;
}) {
  return (
    <Link href={href} className="ds-qator" prefetch={false}>
      <span className="ds-qator-raqam">{raqam}</span>
      <span className="ds-qator-nomi">{nomi}</span>
      {izoh !== undefined && <span className="ds-qator-izoh">{izoh}</span>}
      <span className="ds-qator-oq" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------
   Yordamchi matnlar
   ------------------------------------------------------------------ */

export function Ustki({ children }: { children: ReactNode }) {
  return <p className="ds-ustki">{children}</p>;
}

export function Yordam({ children }: { children: ReactNode }) {
  return <p className="ds-yordam">{children}</p>;
}
