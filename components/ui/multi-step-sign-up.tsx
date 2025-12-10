'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Building2, Check } from 'lucide-react';
import { Root as Button } from '@/components/ui/button';
import * as Input from '@/components/ui/input';
import { Root as Label, Asterisk as LabelAsterisk } from '@/components/ui/label';
import * as Checkbox from '@/components/ui/checkbox';
import { AuthHeaderIcon } from './auth-decorations';

interface MultiStepSignUpFormProps {
  onSubmit?: (data: SignUpFormData) => void | Promise<void>;
  onGoogleSignUp?: () => void;
  isLoading?: boolean;
}

export interface SignUpFormData {
  // Xano API requirements
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  business_name: string;
  accept_terms: boolean;
  marketing_emails: boolean;
}

export function MultiStepSignUpForm({ 
  onSubmit, 
  onGoogleSignUp, 
  isLoading = false 
}: MultiStepSignUpFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  
  // Form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < totalSteps) {
      handleNext();
    } else if (onSubmit) {
      await onSubmit({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        business_name: businessName,
        accept_terms: acceptTerms,
        marketing_emails: marketingEmails,
      });
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return firstName && lastName && email && password.length >= 8;
      case 2:
        return businessName;
      case 3:
        return acceptTerms;
      default:
        return false;
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full flex flex-col items-start gap-6">
      {/* Header */}
      <div className="w-full flex flex-col items-center gap-4">
        <AuthHeaderIcon />
        
        <div className="w-full flex flex-col items-start gap-1">
          <h1 className="w-full text-center text-text-strong-950 text-lg font-medium leading-6">
            Create Your Account
          </h1>
          <p className="w-full text-center text-text-soft-400 text-sm font-medium leading-5">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="w-full flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-primary-base' : 'bg-bg-weak-50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-start gap-4">
        {/* Google Sign Up - Only on first step */}
        {currentStep === 1 && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
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
          </motion.button>
        )}

        {/* Multi-Step Form */}
        <form onSubmit={handleSubmit} className="w-full p-6 bg-bg-white-0 rounded-3xl border border-faded-light shadow-sm flex flex-col items-start gap-5 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="w-full flex flex-col items-center gap-3"
            >
              {/* Step 1: Account Details */}
              {currentStep === 1 && (
                <>
                  <div className="w-full flex flex-col items-start gap-1">
                    <Label htmlFor="firstName" className="flex items-center gap-px">
                      <span>First name</span>
                      <LabelAsterisk />
                    </Label>
                    <Input.Root className="w-full">
                      <Input.Wrapper>
                        <Input.Icon>
                          <User className="w-5 h-5" />
                        </Input.Icon>
                        <Input.Input
                          id="firstName"
                          type="text"
                          placeholder="James"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={isLoading}
                          required
                          autoFocus
                        />
                      </Input.Wrapper>
                    </Input.Root>
                  </div>

                  <div className="w-full flex flex-col items-start gap-1">
                    <Label htmlFor="lastName" className="flex items-center gap-px">
                      <span>Last name</span>
                      <LabelAsterisk />
                    </Label>
                    <Input.Root className="w-full">
                      <Input.Wrapper>
                        <Input.Icon>
                          <User className="w-5 h-5" />
                        </Input.Icon>
                        <Input.Input
                          id="lastName"
                          type="text"
                          placeholder="Brown"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={isLoading}
                          required
                        />
                      </Input.Wrapper>
                    </Input.Root>
                  </div>

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
                          placeholder="hello@growtiva.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={isLoading}
                          required
                        />
                      </Input.Wrapper>
                    </Input.Root>
                  </div>

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
                          type="password"
                          placeholder="• • • • • • • • • •"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                          required
                        />
                      </Input.Wrapper>
                    </Input.Root>
                    <p className="text-text-soft-400 text-xs mt-1">
                      At least 8 characters
                    </p>
                  </div>
                </>
              )}

              {/* Step 2: Business Info */}
              {currentStep === 2 && (
                <>
                  <div className="w-full flex flex-col items-start gap-1">
                    <Label htmlFor="businessName" className="flex items-center gap-px">
                      <span>Business Name</span>
                      <LabelAsterisk />
                    </Label>
                    <Input.Root className="w-full">
                      <Input.Wrapper>
                        <Input.Icon>
                          <Building2 className="w-5 h-5" />
                        </Input.Icon>
                        <Input.Input
                          id="businessName"
                          type="text"
                          placeholder="Acme Inc."
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          disabled={isLoading}
                          required
                          autoFocus
                        />
                      </Input.Wrapper>
                    </Input.Root>
                    <p className="text-text-soft-400 text-xs mt-1">
                      This will be the name of your workspace
                    </p>
                  </div>
                </>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <>
                  <div className="w-full flex flex-col gap-4">
                    <label
                      htmlFor="acceptTerms"
                      className="flex items-start gap-2 cursor-pointer"
                    >
                      <Checkbox.Root
                        id="acceptTerms"
                        checked={acceptTerms}
                        onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                        disabled={isLoading}
                      />
                      <span className="text-sm text-text-sub-600">
                        I accept the{' '}
                        <a href="/terms" className="text-primary-base underline">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-primary-base underline">
                          Privacy Policy
                        </a>
                        <span className="text-error-base ml-1">*</span>
                      </span>
                    </label>

                    <label
                      htmlFor="marketingEmails"
                      className="flex items-start gap-2 cursor-pointer"
                    >
                      <Checkbox.Root
                        id="marketingEmails"
                        checked={marketingEmails}
                        onCheckedChange={(checked) => setMarketingEmails(checked === true)}
                        disabled={isLoading}
                      />
                      <span className="text-sm text-text-sub-600">
                        Send me marketing emails and product updates
                      </span>
                    </label>
                  </div>

                  <div className="w-full p-4 bg-success-lighter rounded-lg border border-success-light">
                    <div className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success-base flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-success-dark">
                          Almost there!
                        </p>
                        <p className="text-xs text-success-base mt-1">
                          Click "Create Account" to finish setting up your Growtiva account.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="w-full flex items-center gap-3">
            {currentStep > 1 && (
              <Button
                variant="neutral"
                mode="stroke"
                size="medium"
                type="button"
                onClick={handleBack}
                disabled={isLoading}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              mode="filled"
              size="medium"
              type="submit"
              className={currentStep === 1 ? 'w-full' : 'flex-1'}
              disabled={isLoading || !isStepValid()}
            >
              {isLoading
                ? 'Creating account...'
                : currentStep === totalSteps
                ? 'Create Account'
                : 'Continue'}
            </Button>
          </div>
        </form>
      </div>

      {/* Footer Link */}
      <div className="w-full flex items-center justify-center gap-1">
        <span className="text-text-soft-400 text-sm font-medium">
          Already have an account?
        </span>
        <a
          href="/login"
          className="text-text-sub-600 text-sm font-medium underline hover:text-text-strong-950 transition-colors"
        >
          Sign in
        </a>
      </div>
    </div>
  );
}
