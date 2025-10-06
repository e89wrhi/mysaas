import { constructMetadata } from '@/lib/utils';
import { HowtoList } from '@/components/doc/how-to-list';

export const metadata = constructMetadata({
  title: 'How to Use Port',
  description: 'Latest news and updates from Next SaaS Starter.',
});

export default async function DocPage() {
  return <HowtoList />;
}
