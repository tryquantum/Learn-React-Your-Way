'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { SignInForm, SignInFormData } from '@/components/ui/sign-in-form';
import { useAuth } from '@/contexts/AuthContext';
import { mapErrorToMessage, isNetworkError } from '@/utils/auth-errors';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (data: SignInFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      // Call login and get onboarding status
      const { onboardingCompleted } = await login(data.email, data.password);
      
      // Redirect based on onboarding status
      if (onboardingCompleted) {
        router.push('/dashboard');
      } else {
        router.push('/onboarding/niche-selection');
      }
    } catch (err: any) {
      // Map error to user-friendly message
      let errorMessage = 'An error occurred. Please try again.';
      
      if (isNetworkError(err)) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (err?.message) {
        errorMessage = mapErrorToMessage(err.message);
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign in clicked');
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <AuthLayout onClose={handleClose}>
      <SignInForm
        onSubmit={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
        error={error}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}
