'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Root as Button } from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import { Root as Label, Asterisk as LabelAsterisk } from '@/components/ui/label';
import { Root as SocialButton, Icon as SocialButtonIcon } from '@/components/ui/social-button';
import * as Alert from '@/components/ui/alert';
import { RiErrorWarningLine, RiInformationLine } from '@remixicon/react';
import { AuthHeaderIcon } from './auth-decorations';

interface SignUpFormProps {
  onSubmit?: (data: SignUpFormData) => void | Promise<void>;
  onGoogleSignUp?: () => void;
  error?: string | null;
  isLoading?: boolean;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password: string;
}

export function SignUpForm({ onSubmit, onGoogleSignUp, error, isLoading = false }: SignUpFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      await onSubmit({ fullName, email, password });
    }
  };

  return (
    <div className="w-full flex flex-col items-start gap-6">
      {/* Header */}
      <div className="w-full flex flex-col items-center gap-4">
        <AuthHeaderIcon />
        
        <div className="w-full flex flex-col items-start gap-1">
          <h1 className="w-full text-center text-text-strong-950 text-lg font-medium leading-6">
            Welcome to Growtiva
          </h1>
          <p className="w-full text-center text-text-soft-400 text-sm font-medium leading-5">
            The simplest way to scale your marketing
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-start gap-4">
        {/* Social Sign Up */}
        <button
          onClick={onGoogleSignUp}
          disabled={isLoading}
          className="w-full px-3 py-2 bg-bg-white-0 rounded-[10px] border border-faded-light hover:bg-bg-weak-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1531 8.63672V11.5413H14.2718C14.091 12.4754 13.5482 13.2663 12.7342 13.7981L15.218 15.6868C16.6651 14.3777 17.5 12.455 17.5 10.1709C17.5 9.63908 17.4513 9.12767 17.3609 8.6368L10.1531 8.63672Z" fill="#4285F4"/>
            <path d="M3.32115 6.63867C2.79938 7.64773 2.50024 8.78639 2.50024 10C2.50024 11.2136 2.79938 12.3523 3.32115 13.3613C3.32115 13.3681 5.86759 11.425 5.86759 11.425C5.71453 10.975 5.62406 10.4977 5.62406 9.99993C5.62406 9.50214 5.71453 9.02489 5.86759 8.57489L3.32115 6.63867Z" fill="#FBBC05"/>
            <path d="M10.1529 5.48638C11.28 5.48638 12.2818 5.86819 13.0819 6.60457L15.2735 4.45685C13.9446 3.24323 12.2192 2.5 10.1529 2.5C7.16123 2.5 4.58008 4.1841 3.3208 6.63866L5.86716 8.57504C6.47242 6.80229 8.16308 5.48638 10.1529 5.48638Z" fill="#EA4335"/>
            <path d="M5.86387 11.4277L5.30368 11.848L3.3208 13.3616C4.58008 15.8093 7.16107 17.5003 10.1527 17.5003C12.219 17.5003 13.9514 16.8321 15.2176 15.6866L12.7339 13.798C12.052 14.248 11.1824 14.5207 10.1527 14.5207C8.16292 14.5207 6.47233 13.2048 5.867 11.4321L5.86387 11.4277Z" fill="#34A853"/>
          </svg>
          <div className="flex items-center gap-1">
            <span className="text-text-soft-400 text-sm font-medium">Sign up with</span>
            <span className="text-text-sub-600 text-sm font-medium">Google</span>
          </div>
        </button>

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="w-full p-6 bg-bg-white-0 rounded-3xl border border-faded-light shadow-sm flex flex-col items-start gap-5">
          {/* Error Alert */}
          {error && (
            <Alert.Root variant="light" status="error" size="small" className="w-full">
              <Alert.Icon as={RiErrorWarningLine} />
              <div>{error}</div>
            </Alert.Root>
          )}

          {/* Form Fields */}
          <div className="w-full flex flex-col items-center gap-3">
            {/* Full Name */}
            <div className="w-full flex flex-col items-start gap-1">
              <Label htmlFor="fullName" className="flex items-center gap-px">
                <span>Full name</span>
                <LabelAsterisk />
              </Label>
              <Input.Root className="w-full">
                <Input.Wrapper>
                  <Input.Icon>
                    <User className="w-5 h-5" />
                  </Input.Icon>
                  <Input.Input
                    id="fullName"
                    type="text"
                    placeholder="James Brown"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Input.Wrapper>
              </Input.Root>
            </div>

            {/* Email */}
            <div className="w-full flex flex-col items-start gap-1">
              <Label htmlFor="email" className="flex items-center gap-px">
                <span>Email Address</span>
                <LabelAsterisk />
              </Label>
              <Input.Root className="w-full">
                <Input.Wrapper>
                  <Input.Icon>
                    <Mail className="w-5 h-5" />
                  </Input.Icon>
                  <Input.Input
                    id="email"
                    type="email"
                    placeholder="hello@alignui.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </Input.Wrapper>
              </Input.Root>
            </div>

            {/* Password */}
            <div className="w-full flex flex-col items-start gap-1">
              <Label htmlFor="password" className="flex items-center gap-px">
                <span>Password</span>
                <LabelAsterisk />
              </Label>
              <Input.Root className="w-full">
                <Input.Wrapper>
                  <Input.Icon>
                    <Lock className="w-5 h-5" />
                  </Input.Icon>
                  <Input.Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="• • • • • • • • • •"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:bg-bg-soft-200 rounded transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-text-disabled-300" />
                    ) : (
                      <Eye className="w-5 h-5 text-text-disabled-300" />
                    )}
                  </button>
                </Input.Wrapper>
              </Input.Root>
              
              {/* Hint Text */}
              <div className="pt-1 flex items-center gap-1.5">
                <RiInformationLine className="w-3 h-3 text-text-disabled-300 flex-shrink-0" />
                <p className="text-text-soft-400 text-xs font-medium leading-4">
                  8+ characters, 1 uppercase, 1 number
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            variant="primary"
            mode="filled"
            size="medium"
            type="submit"
            className="w-full"
            disabled={isLoading || !fullName || !email || !password}
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>
      </div>

      {/* Footer Link */}
      <div className="w-full flex items-center justify-center gap-1">
        <span className="text-text-soft-400 text-sm font-medium">
          Already have an account?
        </span>
        <Link 
          href="/login" 
          className="text-text-sub-600 text-sm font-medium underline hover:text-text-strong-950 transition-colors"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
