import Link from 'next/link';
import Image from 'next/image';
import MobileMenuButton from '@/app/ubike/components/MobileMenuButton';
import HeaderLink from '@/app/ubike/components/HeaderLink';
import { ReactNode } from 'react';

export const navItems = [
  { href: '/ubike/instruction', text: '使用說明' },
  { href: '/ubike/fee', text: '收費方式' },
  { href: '/ubike/stop-info', text: '站點資訊' },
  { href: '/ubike/latest-news', text: '最新消息' },
  { href: '/ubike/activity', text: '活動專區' },
];

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='mb-9'>
        <div className='fixed left-0 right-0 top-0 z-10 bg-white'>
          <div
            className=' relative border-b border-solid border-slate-200'
            id='header-contaienr'
          >
            <header className='container my-4 flex items-center gap-10'>
              <h2>
                <Link href='/ubike'>
                  <Image
                    src='/ubike-logo.svg'
                    width={100}
                    height={100}
                    alt='Ubike'
                  />
                </Link>
              </h2>

              <div className='hidden grow items-center md:flex'>
                <nav>
                  <ul className='flex gap-4'>
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <HeaderLink
                          className='text-lime-600'
                          href={item.href}
                          text={item.text}
                        />
                      </li>
                    ))}
                  </ul>
                </nav>
                <Link
                  href='/ubike/login'
                  className='ml-auto inline-flex rounded-full bg-lime-500 px-4 py-1 text-white transition-colors hover:bg-lime-600'
                >
                  登入
                </Link>
              </div>
              <MobileMenuButton />
            </header>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};
export default Layout;
