import { valueProps } from '@/data/landing-content';
import { RiArrowRightUpLine } from '@remixicon/react';

export function ValuePropsSection() {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'>
      <div className='max-w-3xl space-y-3'>
        <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
          Meet your AI marketing team
        </p>
        <h2 className='text-title-h3 text-text-strong-950'>
          Grow like a team of 5—without the payroll.
        </h2>
        <p className='text-paragraph-md text-text-sub-600'>
          Industry-specific templates, AI copy generation, automated workflows, and posting
          across every channel from one dashboard.
        </p>
      </div>
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {valueProps.map((item) => (
          <div
            key={item.title}
            className='flex h-full flex-col gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
          >
            <div className='text-2xl'>{item.icon}</div>
            <h3 className='text-title-h6 text-text-strong-950'>{item.title}</h3>
            <p className='text-paragraph-sm text-text-sub-600'>{item.description}</p>
            <div className='mt-auto flex items-center gap-2 text-label-sm text-primary-base'>
              {item.cta}
              <RiArrowRightUpLine className='size-4' />
            </div>
            {item.stat ? (
              <span className='text-label-xs font-medium text-text-sub-600'>{item.stat}</span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
