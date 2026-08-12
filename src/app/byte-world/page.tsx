import type { Metadata } from 'next';
import ByteWorldIndex from '@/components/byte-world/ByteWorldIndex';
import { getByteWorldEntries } from '@/lib/byteWorld';

export const metadata: Metadata = {
  title: 'Byte World',
  description: 'Implementation notes on small systems built from first principles: mathematics, code, experiments, and lessons learned.',
};

export default function ByteWorldPage() {
  return (
    <main className="byte-page-shell">
      <ByteWorldIndex entries={getByteWorldEntries()} />
    </main>
  );
}
