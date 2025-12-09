import Link from 'next/link';
import * as Button from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-bg-white-0 px-6 py-12'>
      <div className='w-full max-w-md space-y-6 text-center'>
        <div className='space-y-4'>
          <h1 className='text-display-md font-semibold text-primary-base'>404</h1>
          <div className='space-y-2'>
            <h2 className='text-title-h4 text-text-strong-950'>Page not found</h2>
            <p className='text-paragraph-md text-text-sub-600'>
              Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL or return to the homepage.
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button.Root size='medium' asChild>
            <Link href='/'>Go Home</Link>
          </Button.Root>
          <Button.Root variant='neutral' mode='stroke' size='medium' asChild>
            <Link href='/help'>Get Help</Link>
          </Button.Root>
        </div>

        <div className='pt-6 border-t border-stroke-soft-200'>
          <p className='text-paragraph-sm text-text-sub-600 mb-3'>Quick links:</p>
          <ul className='flex flex-wrap justify-center gap-x-4 gap-y-2 text-paragraph-sm'>
            <li>
              <Link href='/#features' className='text-primary-base hover:underline'>
                Features
              </Link>
            </li>
            <li>
              <Link href='/#pricing' className='text-primary-base hover:underline'>
                Pricing
              </Link>
            </li>
            <li>
              <Link href='/signup' className='text-primary-base hover:underline'>
                Sign Up
              </Link>
            </li>
            <li>
              <Link href='/login' className='text-primary-base hover:underline'>
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
