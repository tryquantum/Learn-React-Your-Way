'use client';

import Link from 'next/link';
import * as Button from '@/components/ui/button';

export default function NicheSelectionPlaceholder() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-bg-weak-50 px-6 text-center'>
      <h1 className='text-title-h4 text-text-strong-950'>Onboarding placeholder</h1>
      <p className='max-w-xl text-paragraph-md text-text-sub-600'>
        This is where the niche selection step will live. Continue exploring Growtiva.
      </p>
      <Button.Root asChild>
        <Link href='/'>Back to home</Link>
      </Button.Root>
    </div>
  );
}
