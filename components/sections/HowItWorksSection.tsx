import { steps } from '@/data/landing-content';
import * as Badge from '@/components/ui/badge';
import * as Button from '@/components/ui/button';

export function HowItWorksSection() {
  return (
    <section
      id='help'
      className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'
    >
      <div className='max-w-3xl space-y-3'>
        <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
          Get your first result in 7 minutes
        </p>
        <h2 className='text-title-h3 text-text-strong-950'>No complicated setup. Start today.</h2>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        {steps.map((step, index) => (
          <div
            key={step.title}
            className='flex h-full flex-col gap-2 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
          >
            <div className='flex items-center gap-2 text-label-sm text-primary-base'>
              <Badge.Root variant='lighter' color='green' size='small'>
                Step {index + 1}
              </Badge.Root>
              <span className='text-text-sub-600'>{step.title}</span>
            </div>
            <p className='text-paragraph-sm text-text-strong-950'>{step.copy}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-wrap items-center gap-3'>
        <Button.Root size='medium'>Ready to Start? → Sign Up Free</Button.Root>
        <Button.Root variant='neutral' mode='ghost' size='medium'>
          Still unsure? Watch our 2-minute demo
        </Button.Root>
      </div>
    </section>
  );
}
