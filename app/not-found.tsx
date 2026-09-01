import { Qobiq, Tugma } from '@/components/ds';

export default function TopilmadiSahifasi() {
  return (
    <Qobiq>
      <div style={{ padding: 'var(--joy-16) 0' }}>
        <h1>Sahifa topilmadi</h1>
        <p className="ds-yordam">
          Bunday dars yo&apos;q yoki manzil noto&apos;g&apos;ri yozilgan.
        </p>
        <Tugma href="/" korinish="asosiy">
          Bosh sahifaga qaytish
        </Tugma>
      </div>
    </Qobiq>
  );
}
