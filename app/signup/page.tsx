'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignUpPage, type SignUpFormData } from '@/components/ui/sign-up';

type FieldKey = 'firstName' | 'lastName' | 'brandName' | 'email' | 'password';
type FieldErrors = Partial<Record<FieldKey, string>>;

export default function SignupPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [banner, setBanner] = useState<string | null>(null);
  const [bannerStatus, setBannerStatus] = useState<'success' | 'error' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: SignUpFormData) => {
    setBanner(null);
    setErrors({});
    
    const baseUrl = process.env.NEXT_PUBLIC_XANO_BASE_URL ?? 'https://x8ki-letl-twmt.n7.xano.io/api:loRGSvYR';
    setLoading(true);
    
    try {
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          password_confirm: formData.passwordConfirm,
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          business_name: formData.brandName.trim(),
          accept_terms: formData.acceptTerms,
          marketing_emails: formData.marketingEmails,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setBanner(data?.message || 'Something went wrong. Please try again.');
        setBannerStatus('error');
        
        if (res.status === 409) {
          setErrors((prev) => ({ ...prev, email: 'This email is already registered' }));
        }
        
        if (res.status === 400 && data?.message?.toLowerCase().includes('password')) {
          setErrors((prev) => ({ ...prev, password: data.message }));
        }
        return;
      }
      
      setBanner(data?.message || 'Signup successful. Please check your email to verify your account.');
      setBannerStatus('success');
      
      setTimeout(() => {
        router.push(`/verify-email?email=${encodeURIComponent(formData.email.trim())}`);
      }, 800);
    } catch {
      setBanner('Network error. Please try again.');
      setBannerStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = () => {
    console.log('Continue with Apple clicked');
    alert('Continue with Apple clicked');
  };

  const handleGoogleSignIn = () => {
    console.log('Continue with Google clicked');
    alert('Continue with Google clicked');
  };

  const handleLinkedInSignIn = () => {
    console.log('Continue with LinkedIn clicked');
    alert('Continue with LinkedIn clicked');
  };

  const handleContactUs = () => {
    alert('Contact Us clicked');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <SignUpPage
      title="Join Growtiva"
      description="Create your account and start growing your business."
      onSubmit={handleSubmit}
      onAppleSignIn={handleAppleSignIn}
      onGoogleSignIn={handleGoogleSignIn}
      onLinkedInSignIn={handleLinkedInSignIn}
      onContactUs={handleContactUs}
      onLogin={handleLogin}
      loading={loading}
      errors={errors}
      banner={banner}
      bannerStatus={bannerStatus}
    />
  );
}
