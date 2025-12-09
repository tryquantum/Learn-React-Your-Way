import { pricing, pricingCTAStats } from '@/data/landing-content';
import * as Badge from '@/components/ui/badge';
import * as Button from '@/components/ui/button';
import { RiCheckLine } from '@remixicon/react';
import { cn } from '@/utils/cn';

export function PricingSection() {
  return (
    <section
      id='pricing'
      className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'
    >
      <div className='max-w-3xl space-y-3'>
        <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
          Pricing
        </p>
        <h2 className='text-title-h3 text-text-strong-950'>Simple, transparent pricing.</h2>
        <p className='text-paragraph-md text-text-sub-600'>
          No surprises. No hidden fees. Start free, upgrade when you&apos;re ready.
        </p>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        {pricing.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'flex h-full flex-col gap-4 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-6 shadow-custom-sm',
              plan.highlight && 'border-primary-base shadow-custom-md',
            )}
          >
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='text-title-h6 text-text-strong-950'>{plan.name}</h3>
                <p className='text-label-sm text-text-sub-600'>{plan.description}</p>
              </div>
              {plan.badge ? (
                <Badge.Root variant='lighter' color='green' size='small'>
                  {plan.badge}
                </Badge.Root>
              ) : null}
            </div>
            <p className='text-title-h4 text-text-strong-950'>{plan.price}</p>
            <ul className='space-y-2 text-paragraph-sm text-text-strong-950'>
              {plan.features.map((feat) => (
                <li key={feat} className='flex items-start gap-2'>
                  <RiCheckLine className='mt-0.5 size-4 text-primary-base' />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <Button.Root size='medium' className='mt-auto'>
              {plan.cta}
            </Button.Root>
          </div>
        ))}
      </div>
      <div className='flex flex-wrap gap-3 text-label-sm text-text-sub-600'>
        {pricingCTAStats.map((item) => (
          <div
            key={item}
            className='flex items-center gap-2 rounded-full border border-stroke-soft-200 bg-bg-white-0 px-3 py-1 shadow-regular-xs'
          >
            <RiCheckLine className='size-4 text-primary-base' />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
