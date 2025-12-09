'use client';

import { useEffect } from 'react';
import * as Button from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-bg-white-0 px-6 py-12'>
      <div className='w-full max-w-md space-y-6 text-center'>
        <div className='flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-error-lighter'>
          <svg
            className='h-10 w-10 text-error-base'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        </div>

        <div className='space-y-2'>
          <h1 className='text-title-h4 text-text-strong-950'>Something went wrong!</h1>
          <p className='text-paragraph-md text-text-sub-600'>
            We apologize for the inconvenience. Please try again or return to the homepage.
          </p>
        </div>

        {error.digest && (
          <p className='text-paragraph-xs text-text-sub-600'>
            Error ID: <code className='font-mono'>{error.digest}</code>
          </p>
        )}

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button.Root size='medium' onClick={reset}>
            Try Again
          </Button.Root>
          <Button.Root
            variant='neutral'
            mode='stroke'
            size='medium'
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
