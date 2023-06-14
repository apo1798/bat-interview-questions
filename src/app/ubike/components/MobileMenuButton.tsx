'use client';

import { useState } from 'react';
import { HiXMark, HiBars3 } from 'react-icons/hi2';
import { navItems } from '@/app/ubike/layout';
import Link from 'next/link';
import HeaderLink from '@/app/ubike/components/HeaderLink';
import useResize from '@/hooks/useResize';

const MobileMenuButton = () => {
  const [open, setOpen] = useState(false);

  useResize(() => {
    setOpen(false);
  }, open);

  return (
    <div className='ml-auto flex items-center md:hidden'>
      <button
        className='item-center inline-flex justify-center'
        type='button'
        onClick={() => {
          setOpen((state) => !state);
        }}
      >
        {open ? (
          <HiXMark className='rounded-md p-1 text-4xl text-lime-600 hover:bg-gray-100' />
        ) : (
          <HiBars3 className='rounded-md p-1 text-4xl text-lime-600 hover:bg-gray-100' />
        )}
      </button>

      {open && (
        <>
          <nav className='absolute inset-x-0 top-full z-10 flex h-[calc(100vh-69px)] flex-col bg-lime-500 px-8 py-8'>
            <ul className='flex flex-col gap-6'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <HeaderLink
                    className='text-lg tracking-[0.2em]  text-white hover:text-lime-900'
                    href={item.href}
                    text={item.text}
                    onClick={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
            <div className='mt-auto'>
              <Link
                href='/ubike/login'
                className='rounded-full bg-white px-5 py-2  text-lime-500 shadow-lg transition-all hover:bg-amber-300 hover:text-lime-900 hover:shadow'
                onClick={() => setOpen(false)}
              >
                登入
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
};
export default MobileMenuButton;
