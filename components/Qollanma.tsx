import QollanmaXulq from './QollanmaXulq';

type Props = {
  /** build paytida markdown'dan yasalgan HTML */
  html: string;
  id?: string;
};

/**
 * Qo'llanma matni — server komponenti. Brauzerga markdown kutubxonasi
 * ham, HTML nusxasi ham tushmaydi; interaktivlikni QollanmaXulq
 * orolchasi qo'shadi.
 */
export default function Qollanma({ html, id = 'qollanma' }: Props) {
  return (
    <>
      <div id={id} className="ds-matn" dangerouslySetInnerHTML={{ __html: html }} />
      <QollanmaXulq nishon={id} />
    </>
  );
}
