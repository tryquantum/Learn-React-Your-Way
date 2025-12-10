'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { MultiStepSignUpForm, SignUpFormData } from '@/components/ui/multi-step-sign-up';
import { useNotification } from '@/hooks/use-notification';
import { authService } from '@/lib/xano';


export default function SignUpPage() {
  const router = useRouter();
  const { notification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      // Call Xano signup API
      const response = await authService.signup(data);
      
      // Show success notification
      notification({
        status: 'success',
        title: 'Account created successfully!',
        description: response.message || 'Please check your email to verify your account.',
        duration: 6000,
      });
      
      // Redirect to email verification page with email parameter
      // Note: User is NOT logged in yet - they need to verify email first
      router.push('/verify-email?email=' + encodeURIComponent(data.email));
      
    } catch (err: any) {
      console.error('Signup error:', err);
      
      // XanoError already contains the error message from Xano
      const errorMessage = err.message || 'Something went wrong. Please try again.';
      
      // Show error notification using toast
      notification({
        status: 'error',
        title: 'Sign up failed',
        description: errorMessage,
        duration: 6000,
      });
      
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google OAuth
    notification({
      status: 'information',
      title: 'Coming soon',
      description: 'Google sign up will be available soon!',
      duration: 3000,
    });
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <AuthLayout onClose={handleClose}>
      <MultiStepSignUpForm
        onSubmit={handleSignUp}
        onGoogleSignUp={handleGoogleSignUp}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
