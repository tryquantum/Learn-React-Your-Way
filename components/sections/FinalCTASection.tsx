import Link from 'next/link';
import * as Button from '@/components/ui/button';

export function FinalCTASection() {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 md:gap-8 md:pb-20'>
      <div className='rounded-3xl border border-stroke-soft-200 bg-gradient-to-r from-primary-base via-primary-darker to-green-600 p-8 shadow-custom-lg md:p-12'>
        <div className='flex flex-col gap-6 text-static-white md:flex-row md:items-center md:justify-between'>
          <div className='space-y-3'>
            <h3 className='text-title-h3'>Ready to scale without hiring?</h3>
            <p className='text-paragraph-md text-white/80'>
              Join 3,000+ solopreneurs who already run Growtiva as their AI team. Start free—
              no credit card required.
            </p>
            <div className='flex flex-wrap gap-2 text-label-sm text-white/80'>
              <span>✓ 4.8/5 rating on G2 Capterra</span>
              <span>✓ 50,000+ posts created this month</span>
              <span>✓ 30-day money-back guarantee</span>
            </div>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <Button.Root size='medium' asChild>
              <Link href='/signup'>Start Your Free Trial →</Link>
            </Button.Root>
            <Button.Root variant='neutral' mode='ghost' size='medium' asChild>
              <Link href='#demo'>Watch 2-min demo</Link>
            </Button.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
