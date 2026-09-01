/**
 * DIZAYN SISTEMA — React qavati
 *
 * Bu komponentlar styles/ds.css dagi sinflarni o'raydi, xolos. Ular
 * ataylab "yupqa": yangi rang yoki oraliq bu yerda emas, tokenlarda
 * (styles/tokens.css) yashaydi.
 *
 * Barcha sahifalar shu komponentlardan yig'iladi. Agar kerakli bo'lak
 * bu yerda bo'lmasa — avval shu faylga qo'shing, keyin sahifada
 * ishlating. Sahifa ichida bir martalik uslub yozmang.
 *
 * Hech qaysisida 'use client' yo'q — server komponentida ham, mijoz
 * komponentida ham ishlaydi.
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
  /** Kichik, katta harfli bo'lim sarlavhasi */
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
   Karta
   ------------------------------------------------------------------ */

export function Karta({
  href,
  sarlavha,
  matn,
  className,
  children,
}: {
  /** Berilsa — karta havolaga aylanadi */
  href?: string;
  sarlavha?: string;
  matn?: string;
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

  if (href) {
    return (
      <Link href={href} className={sinflar('ds-karta', 'ds-karta--havola', className)}>
        {ichi}
      </Link>
    );
  }
  return <div className={sinflar('ds-karta', className)}>{ichi}</div>;
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

type TugmaKorinishi = 'oddiy' | 'asosiy' | 'sokin' | 'katta';

const TUGMA_SINFI: Record<TugmaKorinishi, string> = {
  oddiy: '',
  asosiy: 'ds-tugma--asosiy',
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
   Belgi (badge)
   ------------------------------------------------------------------ */

type BelgiRangi = 'sokin' | 'asosiy' | 'diqqat' | 'yashil' | 'vaqt';

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
  return <p className="ds-belgilar">{children}</p>;
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
