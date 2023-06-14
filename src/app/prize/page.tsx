import Drawing from '@/app/prize/components/Drawing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '抽獎',
};

const Page = () => {
  return <Drawing />;
};

export default Page;
