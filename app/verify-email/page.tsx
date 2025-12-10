'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { OTPInput } from '@/components/ui/otp-input';
import { useNotification } from '@/hooks/use-notification';
import { verificationService } from '@/lib/xano';
import { Mail, CheckCircle2, RefreshCw } from 'lucide-react';
import { Root as Button } from '@/components/ui/button';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { notification } = useNotification();
  
  const email = searchParams?.get('email') || '';
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Auto-verify when OTP is complete
  useEffect(() => {
    if (otp.length === 6 && !isVerifying) {
      handleVerify();
    }
  }, [otp]);

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    setIsVerifying(true);

    try {
      // Convert OTP string to integer for Xano API
      const tokenInt = parseInt(otp, 10);
      
      const response = await verificationService.verifyEmail({
        email,
        token: tokenInt,
      });

      if (response.success) {
        setIsVerified(true);
        
        notification({
          status: 'success',
          title: 'Email verified!',
          description: 'Your account is now active. Please login to continue.',
          duration: 4000,
        });

        // Redirect to login page (user needs to login after verification)
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      
      const errorMessage = err.message || 'Invalid code. Please try again.';
      
      notification({
        status: 'error',
        title: 'Verification failed',
        description: errorMessage,
        duration: 5000,
      });

      // Clear OTP on error
      setOtp('');
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend || isResending) return;

    setIsResending(true);

    try {
      const response = await verificationService.resendOTP({ email });

      notification({
        status: 'success',
        title: 'Code sent!',
        description: response.message || 'A new verification code has been sent to your email.',
        duration: 5000,
      });

      // Reset countdown
      setCountdown(60);
      setCanResend(false);
    } catch (err: any) {
      console.error('Resend error:', err);
      
      notification({
        status: 'error',
        title: 'Failed to resend',
        description: err.message || 'Could not resend code. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    router.push('/login');
  };

  return (
    <AuthLayout onClose={handleClose}>
      <div className="w-full max-w-md mx-auto">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center ${
          isVerified ? 'bg-success-alpha-10' : 'bg-primary-alpha-10'
        }`}>
          {isVerified ? (
            <CheckCircle2 className="w-8 h-8 text-success-base" />
          ) : (
            <Mail className="w-8 h-8 text-primary-base" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-text-strong-950 text-center mb-3">
          {isVerified ? 'Email Verified!' : 'Verify Your Email'}
        </h1>

        {/* Description */}
        {!isVerified && (
          <p className="text-text-soft-400 text-center mb-8">
            We sent a 6-digit code to <br />
            <span className="font-medium text-text-sub-600">{email || 'your email'}</span>
          </p>
        )}

        {isVerified ? (
          /* Success message */
          <div className="text-center py-8">
            <p className="text-text-sub-600 mb-4">
              Your account is now active!
            </p>
            <div className="animate-pulse text-text-soft-400 text-sm">
              Redirecting to login...
            </div>
          </div>
        ) : (
          /* OTP Input */
          <>
            <div className="mb-8">
              <OTPInput
                length={6}
                value={otp}
                onChange={setOtp}
                disabled={isVerifying}
                autoFocus
              />
            </div>

            {/* Resend button */}
            <div className="text-center">
              <p className="text-sm text-text-soft-400 mb-3">
                Didn't receive the code?
              </p>
              
              <Button
                mode="ghost"
                onClick={handleResendOTP}
                disabled={!canResend || isResending}
                className="mx-auto"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                {isResending 
                  ? 'Sending...' 
                  : canResend 
                  ? 'Resend Code' 
                  : `Resend in ${countdown}s`
                }
              </Button>
            </div>

            {/* Back to login */}
            <div className="text-center mt-8 pt-6 border-t border-stroke-soft-200">
              <button
                onClick={() => router.push('/login')}
                className="text-sm text-text-soft-400 hover:text-text-sub-600 transition-colors"
              >
                Back to login
              </button>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
