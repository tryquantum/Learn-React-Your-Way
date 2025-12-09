import { faqs } from '@/data/landing-content';

export function FAQSection() {
  return (
    <section className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'>
      <div className='max-w-3xl space-y-3'>
        <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
          Questions? We&apos;ve got answers.
        </p>
        <h2 className='text-title-h3 text-text-strong-950'>Everything you need to know.</h2>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        {faqs.map((item) => (
          <div
            key={item.q}
            className='rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-regular-xs'
          >
            <p className='text-label-md text-text-strong-950'>{item.q}</p>
            <p className='mt-2 text-paragraph-sm text-text-sub-600'>{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
