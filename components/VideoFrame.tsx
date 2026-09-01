import uslub from './VideoFrame.module.css';

type Props = {
  /** 11 belgili YouTube ID */
  video: string;
  mavzu: string;
};

/**
 * youtube-nocookie.com — o'quvchi brauzerida reklama kuzatuvchi cookie
 * qoldirmaydi. rel=0 — video tugagach begona kanallarning tavsiyalari
 * chiqmasin (faqat shu kanalning videolari ko'rsatiladi).
 */
export default function VideoFrame({ video, mavzu }: Props) {
  const manzil = `https://www.youtube-nocookie.com/embed/${video}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <div className={uslub.ramka}>
      <iframe
        className={uslub.kadr}
        src={manzil}
        title={`Videodars: ${mavzu}`}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
