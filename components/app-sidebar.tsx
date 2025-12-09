import Link from 'next/link';
import { useMemo } from 'react';
import { cn } from '@/utils/cn';
import * as Input from '@/components/ui/input';
import * as Button from '@/components/ui/button';
import {
  RiArrowDownSLine,
  RiSearchLine,
} from '@remixicon/react';

type NavItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

type AppSidebarProps = {
  versions?: string[];
  defaultVersion?: string;
  nav?: NavSection[];
  className?: string;
};

const fallbackData: Required<AppSidebarProps> = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  defaultVersion: '1.0.1',
  nav: [
    {
      title: 'Getting Started',
      items: [
        { title: 'Installation', url: '#' },
        { title: 'Project Structure', url: '#' },
      ],
    },
    {
      title: 'Building Your Application',
      items: [
        { title: 'Routing', url: '#' },
        { title: 'Data Fetching', url: '#', isActive: true },
        { title: 'Rendering', url: '#' },
        { title: 'Caching', url: '#' },
        { title: 'Styling', url: '#' },
        { title: 'Optimizing', url: '#' },
        { title: 'Configuring', url: '#' },
        { title: 'Testing', url: '#' },
        { title: 'Authentication', url: '#' },
        { title: 'Deploying', url: '#' },
        { title: 'Upgrading', url: '#' },
        { title: 'Examples', url: '#' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Components', url: '#' },
        { title: 'File Conventions', url: '#' },
        { title: 'Functions', url: '#' },
        { title: 'next.config.js Options', url: '#' },
        { title: 'CLI', url: '#' },
        { title: 'Edge Runtime', url: '#' },
      ],
    },
    {
      title: 'Architecture',
      items: [
        { title: 'Accessibility', url: '#' },
        { title: 'Fast Refresh', url: '#' },
        { title: 'Next.js Compiler', url: '#' },
        { title: 'Supported Browsers', url: '#' },
        { title: 'Turbopack', url: '#' },
      ],
    },
  ],
  className: '',
};

export function AppSidebar({
  versions = fallbackData.versions,
  defaultVersion = fallbackData.defaultVersion,
  nav = fallbackData.nav,
  className,
}: AppSidebarProps) {
  const initialVersion = useMemo(() => defaultVersion ?? versions[0], [defaultVersion, versions]);

  return (
    <aside
      className={cn(
        'hidden h-screen w-[272px] shrink-0 border-r border-stroke-soft-200 bg-bg-white-0 text-text-strong-950 shadow-regular-xs dark:border-stroke-soft-200/50 dark:bg-bg-strong-950 dark:text-text-white-0 lg:flex',
        className,
      )}
    >
      <div className='flex h-full w-full flex-col overflow-hidden'>
        <div className='flex items-center gap-2 px-4 pb-4 pt-6'>
          <div className='flex size-9 items-center justify-center rounded-2xl bg-primary-alpha-16 text-primary-base'>
            <span className='text-label-sm font-semibold'>G</span>
          </div>
          <div className='leading-tight'>
            <div className='text-label-md font-semibold'>Growtiva</div>
            <div className='text-paragraph-xs text-text-sub-600 dark:text-text-soft-400'>Docs</div>
          </div>
        </div>

        <div className='px-4 pb-4'>
          <div className='flex items-center gap-2 rounded-xl border border-stroke-soft-200 bg-bg-white-0 px-3 py-2 text-label-sm shadow-regular-xs dark:border-white/10 dark:bg-bg-surface-800'>
            <span className='text-text-sub-600'>Version</span>
            <div className='flex flex-1 items-center justify-end gap-1 text-text-strong-950 dark:text-text-white-0'>
              <span>{initialVersion}</span>
              <RiArrowDownSLine className='size-4 text-text-soft-400' />
            </div>
          </div>
        </div>

        <div className='px-4 pb-5'>
          <Input.Root size='medium'>
            <Input.Wrapper>
              <Input.Icon as={RiSearchLine} className='text-text-soft-400' />
              <Input.Input placeholder='Search docs' />
            </Input.Wrapper>
          </Input.Root>
        </div>

        <div className='flex-1 space-y-6 overflow-y-auto px-3 pb-6'>
          {nav.map((section) => (
            <div key={section.title} className='space-y-2'>
              <div className='px-1 text-subheading-xs uppercase text-text-soft-400'>{section.title}</div>
              <div className='space-y-1'>
                {section.items.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    aria-current={item.isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-label-sm text-text-sub-600 transition duration-150 ease-out hover:bg-bg-weak-50 hover:text-text-strong-950 dark:hover:bg-bg-weak-50/10',
                      item.isActive && 'bg-bg-weak-50 text-text-strong-950 dark:bg-bg-weak-50/10 dark:text-text-white-0',
                    )}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='border-t border-stroke-soft-200 px-4 py-4 dark:border-white/10'>
          <Button.Root variant='neutral' mode='ghost' className='w-full justify-start rounded-lg px-3 py-2 text-label-sm'>
            View Changelog
          </Button.Root>
        </div>
      </div>
    </aside>
  );
}

export default AppSidebar;
