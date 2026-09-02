import Link from 'next/link';
import { Qobiq, Tugma } from '@/components/ds';

export default function TopilmadiSahifasi() {
  return (
    <Qobiq>
      <div
        style={{
          padding: 'var(--joy-16) var(--joy-6)',
          margin: 'var(--joy-10) auto',
          maxWidth: '560px',
          textAlign: 'center',
          background: '#ffffff',
          border: '1px solid var(--rang-chiziq)',
          borderRadius: 'var(--burchak-xl)',
          boxShadow: 'var(--soya-2)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: 'var(--joy-2)' }}>🔍</div>
        <span
          style={{
            fontSize: 'var(--olcham-xs)',
            fontWeight: 'var(--qalin-ulkan)',
            color: 'var(--rang-qizil)',
            background: 'var(--rang-qizil-och)',
            padding: '4px 14px',
            borderRadius: 'var(--burchak-toliq)',
            border: '1px solid var(--rang-qizil-chiziq)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--harf-keng)',
            display: 'inline-block',
            marginBottom: 'var(--joy-4)',
          }}
        >
          404 Xatolik
        </span>
        <h1 style={{ fontSize: 'var(--olcham-2xl)', fontWeight: 'var(--qalin-ulkan)', margin: '0 0 var(--joy-2)' }}>
          Sahifa topilmadi
        </h1>
        <p
          style={{
            color: 'var(--rang-matn-2)',
            fontSize: 'var(--olcham-md)',
            lineHeight: 'var(--qator-orta)',
            margin: '0 0 var(--joy-8)',
          }}
        >
          Siz qidirayotgan dars yoki sahifa mavjud emas, nomi o&apos;zgargan yoki
          manzil noto&apos;g&apos;ri kiritilgan.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--joy-3)', flexWrap: 'wrap' }}>
          <Tugma href="/" korinish="asosiy">
            Veb darslariga qaytish ➔
          </Tugma>
          <Tugma href="/mobil" korinish="sokin">
            Mobil dasturlash
          </Tugma>
        </div>
      </div>
    </Qobiq>
  );
}

