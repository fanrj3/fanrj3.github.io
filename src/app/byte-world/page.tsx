import type { Metadata } from 'next';
import ByteWorldIndex from '@/components/byte-world/ByteWorldIndex';
import { getByteWorldIndexEntries } from '@/lib/byteWorld';

export const metadata: Metadata = {
  title: 'Byte World',
  description: 'Implementation notes on small systems built from first principles: mathematics, code, experiments, and lessons learned.',
};

export default function ByteWorldPage() {
  return (
    <main className="byte-page-shell">
      <ByteWorldIndex entries={getByteWorldIndexEntries()} />
    </main>
  );
}
