'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Button from '@/components/ui/button';
import * as ProgressBar from '@/components/ui/progress-bar';
import { RiCheckboxCircleLine } from '@remixicon/react';

export default function VerifySuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 1000);
    const timeout = setTimeout(() => router.push('/onboarding/niche-selection'), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-success-light to-bg-white-0 px-4 py-12'>
      <div className='w-full max-w-md rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-8 text-center shadow-custom-lg'>
        <div className='mx-auto flex size-16 items-center justify-center rounded-full bg-success-light text-success-base'>
          <RiCheckboxCircleLine className='size-8' />
        </div>
        <h1 className='mt-4 text-title-h4 text-text-strong-950'>Email verified!</h1>
        <p className='mt-2 text-paragraph-md text-text-sub-600'>
          Your account is ready. We&apos;ll take you to onboarding.
        </p>
        <div className='mt-6 space-y-2'>
          <p className='text-label-sm text-text-sub-600'>Redirecting in {countdown}s</p>
          <ProgressBar.Root value={(3 - countdown) * 33.4} max={100} color='green' />
        </div>
        <div className='mt-6 flex flex-col gap-2'>
          <Button.Root onClick={() => router.push('/onboarding/niche-selection')}>Continue now</Button.Root>
          <Button.Root variant='neutral' mode='ghost' onClick={() => router.push('/')}>
            Back to home
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
