declare module '*.mdx' {
  import type { ComponentType } from 'react';
  import type { ByteWorldMetadata } from '@/lib/byteWorld';

  export const metadata: ByteWorldMetadata;
  const MDXContent: ComponentType;
  export default MDXContent;
}
