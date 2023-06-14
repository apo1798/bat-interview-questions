import UnderConstructionPlaceholder from '@/app/ubike/components/UnderConstructionPlaceholder';
import { redirect } from 'next/navigation';

export const metadata = {
  title: '站點資訊',
};

const page = () => {
  redirect('/ubike');
  // return <UnderConstructionPlaceholder />;
};
export default page;
