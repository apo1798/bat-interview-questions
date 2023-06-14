'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  href: string;
  text: string;
  className?: string;
  activeColor?: string;
} & ComponentProps<typeof Link>;

const HeaderLink = ({
  href,
  text,
  className,
  activeColor = 'text-lime-700',
  ...rest
}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={twMerge(
        clsx(
          'transition-colors hover:text-lime-500',
          className,
          pathname === href && activeColor
        )
      )}
      {...rest}
    >
      {text}
    </Link>
  );
};
export default HeaderLink;
