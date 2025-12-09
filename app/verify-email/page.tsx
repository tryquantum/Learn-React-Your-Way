'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Button from '@/components/ui/button';
import * as Alert from '@/components/ui/alert';
import * as Badge from '@/components/ui/badge';
import { RiMailLine, RiArrowLeftLine, RiErrorWarningLine, RiCheckboxCircleLine } from '@remixicon/react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const search = useSearchParams();
  const emailFromQuery = search.get('email') ?? '';
  const token = search.get('token');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [sending, setSending] = useState(false);

  const maskedEmail = useMemo(() => {
    if (!emailFromQuery) return 'your email';
    const [user, domain] = emailFromQuery.split('@');
    if (!domain) return emailFromQuery;
    const safeUser = user.length <= 2 ? `${user[0] ?? ''}*` : `${user[0]}***${user[user.length - 1]}`;
    return `${safeUser}@${domain}`;
  }, [emailFromQuery]);

  useEffect(() => {
    if (!token) return;
    const verify = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        const data = await res.json();
        if (res.ok) {
          setStatus('success');
          setMessage('Email verified successfully.');
          setTimeout(() => {
            router.push('/verify-success');
          }, 1500);
        } else {
          setStatus('error');
          setMessage(data?.message || 'Verification failed.');
        }
      } catch {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    };
    verify();
  }, [router, token]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleResend = async () => {
    if (!emailFromQuery || cooldown > 0) return;
    setSending(true);
    setMessage(null);
    try {
      const res = await fetch('/api/auth/resend-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailFromQuery }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage('Verification email sent.');
        setCooldown(60);
      } else {
        setStatus('error');
        setMessage(data?.message || 'Failed to resend. Try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-b from-bg-weak-50 to-bg-white-0 px-4 py-12'>
      <div className='w-full max-w-md rounded-2xl border border-stroke-soft-200 bg-bg-white-0 p-8 shadow-custom-md'>
        <div className='mb-6 flex flex-col items-center gap-3 text-center'>
          <div className='flex size-12 items-center justify-center rounded-full bg-primary-alpha-10 text-primary-base'>
            <RiMailLine className='size-6' />
          </div>
          <h1 className='text-title-h4 text-text-strong-950'>Check your email</h1>
          <p className='text-paragraph-md text-text-sub-600'>
            We sent a verification link to <span className='font-semibold text-text-strong-950'>{maskedEmail}</span>
          </p>
          <Badge.Root variant='lighter' color='green'>
            <Badge.Dot />
            Link expires in 24 hours
          </Badge.Root>
        </div>

        {message ? (
          <Alert.Root variant='light' status={status === 'error' ? 'error' : 'success'} size='small' className='mb-4'>
            <Alert.Icon as={status === 'error' ? RiErrorWarningLine : RiCheckboxCircleLine} />
            <div>{message}</div>
          </Alert.Root>
        ) : null}

        <div className='space-y-3'>
          <Button.Root className='w-full' onClick={handleResend} disabled={sending || cooldown > 0}>
            {cooldown > 0 ? `Resend in ${cooldown}s` : sending ? 'Sending...' : 'Resend verification email'}
          </Button.Root>
          <details className='rounded-xl border border-stroke-soft-200 bg-bg-weak-50 px-4 py-3 text-paragraph-sm text-text-sub-600'>
            <summary className='cursor-pointer font-semibold text-text-strong-950'>Didn&apos;t receive the email?</summary>
            <ul className='mt-2 list-disc space-y-1 pl-5'>
              <li>Check your spam or junk folder</li>
              <li>Verify the email address is correct</li>
              <li>Resend the verification email above</li>
              <li>
                Contact{' '}
                <a href='mailto:support@growtiva.com' className='text-primary-base underline'>
                  support@growtiva.com
                </a>
              </li>
            </ul>
          </details>
          <Button.Root variant='neutral' mode='ghost' asChild>
            <a href='/login' className='inline-flex items-center justify-center gap-2'>
              <RiArrowLeftLine className='size-4' />
              Back to login
            </a>
          </Button.Root>
        </div>
      </div>
    </div>
  );
}
