import { testimonials, socialProofStats } from '@/data/landing-content';
import { RiStarFill, RiCheckLine } from '@remixicon/react';

export function TestimonialsSection() {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'>
      <div className='max-w-3xl space-y-3'>
        <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
          Social proof
        </p>
        <h2 className='text-title-h3 text-text-strong-950'>
          Solopreneurs are already winning.
        </h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        {testimonials.map((item) => (
          <div
            key={item.name}
            className='flex h-full flex-col gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
          >
            <div className='flex items-center gap-2 text-primary-base'>
              <RiStarFill className='size-4' />
              <RiStarFill className='size-4' />
              <RiStarFill className='size-4' />
              <RiStarFill className='size-4' />
              <RiStarFill className='size-4' />
            </div>
            <p className='text-paragraph-md text-text-strong-950'>&ldquo;{item.quote}&rdquo;</p>
            <p className='text-label-sm text-text-sub-600'>
              {item.name} — {item.role}
            </p>
            <p className='text-label-sm font-semibold text-primary-base'>{item.result}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-wrap gap-3 text-label-sm text-text-sub-600'>
        {socialProofStats.map((item) => (
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
