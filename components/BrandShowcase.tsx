import { cn } from '@/utils/cn';

export interface BrandShowcaseProps {
  brands?: string[];
  className?: string;
}

const defaultBrands = [
  'G2',
  'Capterra',
  'Stripe',
  'SendGrid',
  'Buffer',
  'Canva',
  'Zapier',
];

export function BrandShowcase({
  brands = defaultBrands,
  className,
}: BrandShowcaseProps) {
  return (
    <section
      className={cn(
        'border-t border-stroke-soft-200 bg-bg-white-0',
        'px-4 sm:px-6 lg:px-11 py-6 sm:py-8',
        className,
      )}
    >
      <div className='mx-auto max-w-6xl overflow-x-auto'>
        <div className='flex min-w-full items-center justify-between gap-6 text-label-sm text-text-soft-400 sm:text-label-md'>
          {brands.map((brand, index) => (
            <div
              key={brand}
              className='flex items-center gap-6 whitespace-nowrap pr-4 sm:pr-6'
            >
              <span>{brand}</span>
              {index < brands.length - 1 ? (
                <span className='hidden h-5 w-px bg-stroke-soft-200 sm:block' aria-hidden />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
