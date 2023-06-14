import SumCalculator from '@/app/sum/components/SumCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '總和',
};

const Page = ({}) => {
  return <SumCalculator />;
};

export default Page;
