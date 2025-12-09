/* eslint-disable react/no-unused-prop-types */
'use client';
import { useState } from 'react';
import { TimerFillIcon, CloseIcon } from './CustomIcons';
import { cn } from '@/utils/cn';

export interface AnnouncementBannerProps {
  countdown?: [string, string, string];
  hideOnMobile?: boolean;
  className?: string;
}

function TimerItem({ value }: { value: string }) {
  return (
    <div className='flex w-[28px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-sm bg-bg-weak-50 p-[2px]'>
      <p className='w-[16px] text-center text-xs font-medium leading-[16px] text-text-sub-600'>
        {value}
      </p>
    </div>
  );
}

export function AnnouncementBanner({
  countdown = ['02', '14', '31'],
  hideOnMobile = true,
  className,
}: AnnouncementBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'relative z-[4] flex h-[40px] w-full items-center justify-center overflow-hidden bg-bg-weak-50 px-4 py-[8px] md:px-[44px]',
        hideOnMobile && 'hidden sm:flex',
        className,
      )}
      role='status'
      aria-live='polite'
    >
      <div className='flex items-center gap-[10px]'>
        <div className='flex items-center gap-[6px]'>
          <TimerFillIcon className='size-[12px] text-primary-base' />
          <p className='whitespace-pre text-s font-medium leading-[12px] text-text-strong-950'>
            Limited offer ends in:
          </p>
        </div>

        <div className='flex items-center gap-[5px]'>
          <TimerItem value={countdown[0]} />
          <span className='text-xs font-medium text-text-sub-600'>:</span>
          <TimerItem value={countdown[1]} />
          <span className='text-xs font-medium text-text-sub-600'>:</span>
          <TimerItem value={countdown[2]} />
        </div>
      </div>

      <button
        type='button'
        aria-label='Dismiss announcement'
        onClick={() => setVisible(false)}
        className='absolute right-[16px] flex items-center justify-center rounded-full p-[2px] text-text-sub-600 transition hover:text-text-strong-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-base focus-visible:ring-offset-2 focus-visible:ring-offset-bg-weak-50'
      >
        <CloseIcon className='size-[16px]' />
      </button>
    </div>
  );
}
