import { painPoints } from '@/data/landing-content';

export function PainPointsSection() {
  return (
    <section
      id='features'
      className='mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:gap-12 md:py-16'
    >
      <div className='max-w-3xl space-y-3'>
        <p className='text-subheading-sm uppercase tracking-[0.2em] text-text-sub-600'>
          The Solopreneur Problem
        </p>
        <h2 className='text-title-h3 text-text-strong-950'>
          Doing everything yourself isn&apos;t sustainable.
        </h2>
        <p className='text-paragraph-md text-text-sub-600'>
          Content creation, strategy, and posting shouldn&apos;t consume your week. Growtiva
          removes the grind so you can focus on the work that grows your business.
        </p>
      </div>
      <div className='grid gap-4 md:grid-cols-3'>
        {painPoints.map((item) => (
          <div
            key={item.title}
            className='flex h-full flex-col gap-3 rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-5 shadow-custom-sm'
          >
            <div className='text-3xl'>{item.icon}</div>
            <h3 className='text-title-h6 text-text-strong-950'>{item.title}</h3>
            <p className='text-paragraph-sm text-text-sub-600'>{item.description}</p>
          </div>
        ))}
      </div>
      <p className='text-paragraph-md text-text-strong-950'>
        What if you had an AI team that handled all of this for you? It&apos;s not a dream. It&apos;s
        Growtiva.
      </p>
    </section>
  );
}
