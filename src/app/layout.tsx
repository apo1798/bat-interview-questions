import Link from 'next/link';
import './globals.css';
import { Noto_Sans_TC } from 'next/font/google';
import QueryProvider from '@/app/components/QueryProvider';
import { Metadata } from 'next';

const font = Noto_Sans_TC({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | 烏龜移動科技面試題目',
    default: '首頁 | 烏龜移動科技面試題目',
  },
  description: '烏龜移動面試題目',
};

const navItems = [
  { href: '/', title: '首頁' },
  { href: '/sum', title: 'Q1: 總和' },
  { href: '/prize', title: 'Q2: 抽獎' },
  { href: '/message', title: 'Q3: 元件' },
  { href: '/ubike', title: 'Q4: UBike 站點資訊' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className + ' flex min-h-screen flex-col'}>
        <QueryProvider>
          <header className='bg-amber-100 py-1'>
            <ul className='container flex gap-2'>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className='hover:text-amber-500'>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </header>
          <div className='grow'>{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
