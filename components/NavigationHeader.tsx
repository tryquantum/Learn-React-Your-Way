import Link from 'next/link';
import dynamic from 'next/dynamic';
import { RiArrowDownSLine, RiMenuLine, RiSearchLine } from '@remixicon/react';
import * as Button from '@/components/ui/button';
import * as Badge from '@/components/ui/badge';
import { cn } from '@/utils/cn';

const DynamicThemeSwitch = dynamic(() => import('./theme-switch'), {
  ssr: false,
});

type NavItem = {
  label: string;
  href: string;
  badge?: string;
  hasDropdown?: boolean;
};

export interface NavigationHeaderProps {
  brand?: string;
  navItems?: NavItem[];
  showSearch?: boolean;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Help', href: '#help' },
];

export function NavigationHeader({
  brand = 'Growtiva',
  navItems = defaultNavItems,
  showSearch = true,
  className,
}: NavigationHeaderProps) {
  return (
    <div
      className={cn(
        'sticky top-0 z-40 border-b border-stroke-soft-200 bg-bg-white-0/90 backdrop-blur supports-[backdrop-filter]:bg-bg-white-0/80',
        className,
      )}
    >
      <header className='mx-auto flex h-[60px] max-w-6xl items-center justify-between px-4 sm:px-8 lg:px-11'>
        <div className='flex items-center gap-2 text-label-md text-text-strong-950'>
          <div className='flex size-8 items-center justify-center rounded-2xl bg-primary-alpha-10 text-primary-base'>
            <span aria-hidden className='text-label-sm font-semibold'>
              G
            </span>
          </div>
          <div className='flex flex-col leading-tight'>
            <span className='font-semibold'>{brand}</span>
            <span className='text-label-xs text-text-sub-600'>
              Create and scale like a team of 5
            </span>
          </div>
        </div>

        <nav className='hidden items-center gap-6 text-label-sm text-text-sub-600 md:flex'>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className='group flex items-center gap-2 transition hover:text-text-strong-950'
            >
              <span>{item.label}</span>
              {item.badge ? (
                <Badge.Root
                  size='small'
                  variant='lighter'
                  color='blue'
                  className='text-[11px]'
                >
                  {item.badge}
                </Badge.Root>
              ) : null}
              {item.hasDropdown ? (
                <RiArrowDownSLine
                  aria-hidden
                  className='size-4 text-text-soft-400 transition group-hover:text-text-strong-950'
                />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-3'>
          {showSearch ? (
            <button
              type='button'
              aria-label='Search'
              className='hidden size-9 items-center justify-center rounded-10 text-text-sub-600 transition hover:bg-bg-weak-50 hover:text-text-strong-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-base focus-visible:ring-offset-2 focus-visible:ring-offset-bg-white-0 md:flex'
            >
              <RiSearchLine aria-hidden className='size-4' />
            </button>
          ) : null}
          <div className='hidden items-center gap-3 sm:flex'>
            <Button.Root
              asChild
              variant='neutral'
              mode='ghost'
              size='small'
              className='px-3'
            >
              <Link href='/login'>Login</Link>
            </Button.Root>
            <Button.Root size='small' className='px-4' asChild>
              <Link href='/signup'>Start free trial</Link>
            </Button.Root>
            <DynamicThemeSwitch />
          </div>
          <button
            type='button'
            aria-label='Open menu'
            className='flex size-9 items-center justify-center rounded-10 text-text-strong-950 transition hover:bg-bg-weak-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-base focus-visible:ring-offset-2 focus-visible:ring-offset-bg-white-0 md:hidden'
          >
            <RiMenuLine aria-hidden className='size-5' />
          </button>
        </div>
      </header>
    </div>
  );
}
