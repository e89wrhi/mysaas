import { constructMetadata } from '@/lib/utils';
import { HowtoList } from '@/components/doc/how-to-list';

export const metadata = constructMetadata({
  title: 'How to Use Port',
  description: 'how to upload and convert and image to product listing.',
});

export default async function DocPage() {
  return <HowtoList />;
}
