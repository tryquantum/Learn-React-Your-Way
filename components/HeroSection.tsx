/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import {
  RiArrowRightUpLine,
  RiInformationLine,
  RiLineChartLine,
} from '@remixicon/react';
import * as Button from '@/components/ui/button';
import { CheckCircleIcon, PatternIcon } from '@/components/CustomIcons';
import { cn } from '@/utils/cn';

export interface HeroSectionProps {
  headline?: string;
  description?: string;
  bullets?: string[];
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  heroImageSrc?: string;
  heroImageAlt?: string;
  className?: string;
}

const avatars = [
  'https://images.unsplash.com/photo-1704726135027-9c6f034cfa41?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1656338997878-279d71d48f6e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1680104073282-8462cdf70b6a?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1705940372495-ab4ed45d3102?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1567803641348-95489fa13cc1?auto=format&fit=crop&w=200&q=80',
];

export function HeroSection({
  headline = 'Create and Scale Like a Team of 5, Without Hiring One',
  description = 'Your AI marketing team is ready. Generate professional content, automate workflows, and grow your business—all in minutes. Perfect for solopreneurs, coaches, freelancers, and small business owners who need marketing that actually works.',
  bullets = [
    'Start free — no credit card required',
    'Built for solopreneurs and micro teams',
    'Get your first result in 7 minutes',
  ],
  ctaPrimaryLabel = 'Start Free Trial',
  ctaSecondaryLabel = 'Watch 2-min Demo',
  heroImageSrc = 'https://images.unsplash.com/photo-1764642716231-b52fe5a4f6b4?auto=format&fit=crop&w=1200&q=80',
  heroImageAlt = 'Growtiva dashboard preview',
  className,
}: HeroSectionProps) {
  return (
    <section
      id='home'
      className={cn(
        'relative isolate overflow-hidden',
        'px-6 md:px-14 lg:px-[188px] py-12 md:py-16 lg:py-[72px]',
        className,
      )}
    >
      {/* Decorative lines */}
      <div className='pointer-events-none absolute left-[80px] top-[100px] hidden h-[600px] w-px -translate-x-1/2 rotate-90 border-t border-stroke-soft-200 xl:block' />
      <div className='pointer-events-none absolute left-[188px] top-[116px] hidden h-[192px] w-px -translate-x-1/2 rotate-90 border-t border-primary-base xl:block' />

      <div className='relative z-[2] flex w-full flex-col items-center gap-12 xl:flex-row xl:items-start xl:gap-[80px]'>
        {/* Content */}
        <div className='flex w-full max-w-[540px] flex-col gap-10 xl:gap-[72px]'>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-6'>
              <div className='flex w-fit items-center gap-2 rounded-[10px] bg-primary-alpha-10 pl-[6px] pr-[9px] py-[4px]'>
                <div className='flex items-center justify-center rounded-[5px] bg-bg-white-0 px-[5px] py-[2px] shadow-regular-xs'>
                  <span className='text-[10px] font-semibold leading-[12px] tracking-[0.2px] text-primary-base'>
                    NEW
                  </span>
                </div>
                <span className='text-sm font-medium text-text-sub-600'>
                  All-in-one AI marketing for growth
                </span>
              </div>

              <h1 className='text-balance text-[40px] font-medium leading-[48px] tracking-[-0.56px] text-text-strong-950 md:text-[56px] md:leading-[64px]'>
                {headline}
              </h1>
            </div>

            <p className='text-paragraph-md font-medium text-text-sub-600'>
              {description}
            </p>

            <div className='flex flex-col gap-4'>
              {bullets.map((text) => (
                <div key={text} className='flex items-center gap-2.5'>
                  <span className='relative size-[18px] text-primary-base'>
                    <CheckCircleIcon className='size-full' />
                  </span>
                  <p className='text-label-md font-medium text-text-strong-950'>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-[14px]'>
            <Button.Root
              size='medium'
              className='h-auto px-[14px] py-[10px] rounded-[12px] bg-primary-base text-static-white shadow-regular-sm hover:bg-primary-darker'
            >
              {ctaPrimaryLabel}
              <Button.Icon as={RiArrowRightUpLine} className='size-4 opacity-80' />
            </Button.Root>
            <Button.Root
              asChild
              variant='neutral'
              mode='stroke'
              size='medium'
              className='h-auto px-[14px] py-[10px] rounded-[12px] bg-primary-alpha-10 text-text-strong-950 hover:bg-bg-weak-50'
            >
              <Link href='#demo'>{ctaSecondaryLabel}</Link>
            </Button.Root>
          </div>

          <div className='flex items-center gap-2'>
            <div className='mr-2 flex -space-x-2'>
              {avatars.map((src, index) => (
                <img
                  key={src}
                  src={src}
                  alt={`User ${index + 1}`}
                  className='size-8 rounded-full border-[3px] border-bg-white-0 object-cover shadow-regular-xs'
                />
              ))}
            </div>
            <p className='text-label-sm text-text-sub-600'>
              <span className='text-text-soft-400'>—</span> rated 4.8/5 by 200+ SMB
              founders
            </p>
          </div>
        </div>

        {/* Visual */}
        <div className='relative w-full max-w-[520px] shrink-0'>
          <div className='absolute inset-0 -z-10 bg-gradient-to-br from-primary-alpha-24 via-bg-white-0 to-primary-alpha-10 blur-3xl' />
          <div className='relative h-[420px] w-full rounded-[40px] border border-stroke-soft-200 bg-bg-weak-50 shadow-custom-lg md:h-[520px]'>
            <div className='absolute left-0 top-0'>
              <PatternIcon className='text-white opacity-80' />
            </div>
            <picture>
              <source srcSet={`${heroImageSrc}&format=webp`} type='image/webp' />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImageSrc}
                alt={heroImageAlt}
                className='absolute inset-0 h-full w-full rounded-[40px] object-cover'
                loading='lazy'
              />
            </picture>
            <div className='absolute bottom-0 left-0 right-0 h-[180px] rounded-b-[40px] bg-gradient-to-t from-black/25 to-transparent' />
            <Widget />
          </div>
        </div>
      </div>
    </section>
  );
}

function Widget() {
  return (
    <div className='absolute bottom-[20px] left-1/2 w-[90%] -translate-x-1/2 rounded-[24px] border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-md backdrop-blur md:w-[352px] xl:left-auto xl:right-[-80px] xl:bottom-[64px] xl:translate-x-0'>
      <div className='flex w-full items-start justify-between gap-3'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-1 text-text-sub-600'>
            <span className='text-label-sm font-medium'>Revenue by Category</span>
            <RiInformationLine className='size-3 text-text-soft-400' />
          </div>
          <div className='flex items-end gap-2'>
            <span className='text-[24px] font-medium leading-[32px] text-text-strong-950'>
              58%
            </span>
            <span className='mb-1 text-label-sm font-medium text-primary-base'>
              +2.1%{' '}
              <span className='text-text-sub-600 font-medium'>from last week</span>
            </span>
          </div>
        </div>
        <div className='flex items-center justify-center rounded-[8px] border border-stroke-soft-200 bg-bg-white-0 px-[6px] py-[4px] shadow-regular-xs'>
          <span className='text-label-sm font-medium text-text-sub-600'>Details</span>
        </div>
      </div>

      <div className='mt-4 flex flex-col gap-4'>
        <div className='flex h-[30px] w-full items-center gap-[3px]'>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={`green-${i}`} className='h-full flex-1 rounded-[1px] bg-primary-base' />
          ))}
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={`muted-${i}`} className='h-full flex-1 rounded-[1px] bg-bg-weak-50' />
          ))}
        </div>

        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='text-label-sm font-medium text-text-sub-600'>Services</span>
            <div className='flex items-center rounded-[6px] border border-stroke-soft-200 bg-bg-white-0'>
              <div className='flex items-center justify-center border-r border-stroke-soft-200 p-1'>
                <RiLineChartLine className='size-4 text-text-sub-600' />
              </div>
              <div className='flex items-center justify-center p-1'>
                <RiLineChartLine className='size-4 rotate-180 text-text-sub-600' />
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-label-sm font-medium text-text-sub-600'>
              $12.4K total
            </span>
            <span className='text-label-xs text-text-soft-400'>•</span>
            <span className='text-label-sm font-medium text-primary-base'>+3.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
