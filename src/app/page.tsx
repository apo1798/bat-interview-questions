import Image from 'next/image';

export default function Home() {
  return (
    <main className='container grid h-[calc(100vh-32px)] place-content-center place-items-center text-2xl'>
      <h1>Hi 烏龜移動科技</h1>
      <p>請由上方連結進入各個題目。如有任何問題歡迎再聯絡！</p>
      <p>UBike 站點資訊請點擊 Table Header 進行排序</p>
      <address className='mt-10 w-full text-end text-lg not-italic'>
        <p>陳柏翰</p>
        <a
          href='mailto:nploxz@gmail.com'
          className='text-blue-500 hover:text-blue-700'
        >
          nploxz@gmail.com
        </a>
      </address>
    </main>
  );
}
