import BikeMainContent from '@/app/ubike/components/BikeMainContent';

export const metadata = {
  title: 'Ubike 站點資訊',
};

const Page = async () => {
  const data: StationInfo[] = await fetch(
    'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());

  return (
    <div className='container py-4'>
      <div className='space-y-2'>
        <h1 className='mb-6 text-2xl tracking-widest text-lime-500'>
          站點資訊
        </h1>
        <BikeMainContent data={data} />
      </div>
    </div>
  );
};
export default Page;
