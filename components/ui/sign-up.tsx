"use client";

import React, { useState } from "react";
import { Headphones, UserPlus, X, Mail, Building2, User, Lock, Eye, EyeOff, ChevronLeft } from "lucide-react";
import { Root as Button, Icon as ButtonIcon } from "./button";
import * as Input from "./input";
import { Root as Checkbox } from "./checkbox";
import { Root as Label, Asterisk as LabelAsterisk } from "./label";
import { Root as SocialButton, Icon as SocialButtonIcon } from "./social-button";
import { Root as LinkButton } from "./link-button";

interface SignUpPageProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  onSubmit?: (data: SignUpFormData) => void | Promise<void>;
  onAppleSignIn?: () => void;
  onGoogleSignIn?: () => void;
  onLinkedInSignIn?: () => void;
  onContactUs?: () => void;
  onLogin?: () => void;
  loading?: boolean;
  errors?: Partial<Record<keyof SignUpFormData, string>>;
  banner?: string | null;
  bannerStatus?: 'success' | 'error' | null;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  brandName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  marketingEmails: boolean;
  acceptTerms: boolean;
}

const AppleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const SignUpPage: React.FC<SignUpPageProps> = ({
  title = "Join Growtiva",
  description = "Create your account and start growing your business.",
  logoSrc,
  onSubmit,
  onAppleSignIn,
  onGoogleSignIn,
  onLinkedInSignIn,
  onContactUs,
  onLogin,
  loading = false,
  errors = {},
  banner,
  bannerStatus,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    brandName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    marketingEmails: false,
    acceptTerms: false,
  });

  const totalSteps = 4;

  const updateField = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.firstName.trim().length >= 1 && formData.lastName.trim().length >= 1;
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formData.brandName.trim().length >= 2 && emailRegex.test(formData.email);
      case 3:
        const passwordValid = formData.password.length >= 8 && 
                             /[A-Z]/.test(formData.password) && 
                             /\d/.test(formData.password);
        return passwordValid && formData.password === formData.passwordConfirm;
      case 4:
        return formData.acceptTerms;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(currentStep) && currentStep === totalSteps) {
      onSubmit?.(formData);
    }
  };

  const isPasswordValid = formData.password.length >= 8 && 
                         /[A-Z]/.test(formData.password) && 
                         /\d/.test(formData.password);

  return (
    <div className="flex min-h-screen w-full flex-col bg-bg-white-0 text-text-strong-950 dark:bg-[#0a0a0a] dark:text-text-white-0">
      {/* Header */}
      <header className="flex items-center justify-between p-6 lg:p-8">
        <div className="flex items-center gap-2">
          {logoSrc ? (
            <img src={logoSrc} alt="Logo" className="h-10 w-10" />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-base">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-static-white border-t-transparent" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-paragraph-sm text-text-sub-600 dark:text-text-soft-400 sm:inline">
            Need help?
          </span>
          <Button
            variant="neutral"
            mode="ghost"
            size="small"
            onClick={onContactUs}
          >
            <ButtonIcon>
              <Headphones />
            </ButtonIcon>
            <span className="hidden sm:inline">Contact Us</span>
          </Button>
          <Button
            variant="neutral"
            mode="ghost"
            size="small"
            className="lg:hidden"
          >
            <ButtonIcon>
              <X />
            </ButtonIcon>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-6 py-8 lg:px-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center gap-8">
            {/* Avatar Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-weak-50 dark:bg-bg-surface-800">
              <UserPlus className="h-10 w-10 text-text-sub-600 dark:text-text-soft-400" />
            </div>

            {/* Title & Description */}
            <div className="text-center">
              <h1 className="text-display-xs font-semibold leading-tight text-text-strong-950 dark:text-text-white-0">
                {title}
              </h1>
              <p className="mt-3 text-paragraph-sm text-text-sub-600 dark:text-text-soft-400">
                {description}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-label-xs text-text-sub-600 dark:text-text-soft-400">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-bg-weak-50 dark:bg-bg-surface-800">
                <div
                  className="h-full rounded-full bg-primary-base transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            {/* Social Buttons - Only on Step 1 */}
            {currentStep === 1 && (
              <>
                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <SocialButton
                    brand="apple"
                    mode="stroke"
                    className="flex-1"
                    onClick={onAppleSignIn}
                  >
                    <SocialButtonIcon>
                      <AppleIcon />
                    </SocialButtonIcon>
                  </SocialButton>
                  <SocialButton
                    brand="google"
                    mode="stroke"
                    className="flex-1"
                    onClick={onGoogleSignIn}
                  >
                    <SocialButtonIcon>
                      <GoogleIcon />
                    </SocialButtonIcon>
                  </SocialButton>
                  <SocialButton
                    brand="linkedin"
                    mode="stroke"
                    className="flex-1"
                    onClick={onLinkedInSignIn}
                  >
                    <SocialButtonIcon>
                      <LinkedInIcon />
                    </SocialButtonIcon>
                  </SocialButton>
                </div>

                {/* Divider */}
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stroke-soft-200 dark:border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-label-sm">
                    <span className="bg-bg-white-0 px-4 text-text-sub-600 dark:bg-[#0a0a0a] dark:text-text-soft-400">
                      OR
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name
                      <LabelAsterisk />
                    </Label>
                    <Input.Root hasError={!!errors.firstName}>
                      <Input.Wrapper>
                        <Input.Icon>
                          <User />
                        </Input.Icon>
                        <Input.Input
                          id="firstName"
                          type="text"
                          placeholder="James"
                          value={formData.firstName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateField("firstName", e.target.value)
                          }
                          required
                        />
                      </Input.Wrapper>
                    </Input.Root>
                    {errors.firstName && (
                      <p className="text-label-xs text-error-base">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name
                      <LabelAsterisk />
                    </Label>
                    <Input.Root hasError={!!errors.lastName}>
                      <Input.Wrapper>
                        <Input.Icon>
                          <User />
                        </Input.Icon>
                        <Input.Input
                          id="lastName"
                          type="text"
                          placeholder="Brown"
                          value={formData.lastName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateField("lastName", e.target.value)
                          }
                          required
                        />
                      </Input.Wrapper>
                    </Input.Root>
                    {errors.lastName && (
                      <p className="text-label-xs text-error-base">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Business Details */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="brandName">
                      Brand Name
                      <LabelAsterisk />
                    </Label>
                    <Input.Root hasError={!!errors.brandName}>
                      <Input.Wrapper>
                        <Input.Icon>
                          <Building2 />
                        </Input.Icon>
                        <Input.Input
                          id="brandName"
                          type="text"
                          placeholder="Acme Inc."
                          value={formData.brandName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateField("brandName", e.target.value)
                          }
                          required
                        />
                      </Input.Wrapper>
                    </Input.Root>
                    {errors.brandName && (
                      <p className="text-label-xs text-error-base">{errors.brandName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address
                      <LabelAsterisk />
                    </Label>
                    <Input.Root hasError={!!errors.email}>
                      <Input.Wrapper>
                        <Input.Icon>
                          <Mail />
                        </Input.Icon>
                        <Input.Input
                          id="email"
                          type="email"
                          placeholder="hello@growtiva.com"
                          value={formData.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateField("email", e.target.value)
                          }
                          required
                        />
                      </Input.Wrapper>
                    </Input.Root>
                    {errors.email && (
                      <p className="text-label-xs text-error-base">{errors.email}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password
                      <LabelAsterisk />
                    </Label>
                    <Input.Root hasError={!!errors.password}>
                      <Input.Wrapper>
                        <Input.Icon>
                          <Lock />
                        </Input.Icon>
                        <Input.Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateField("password", e.target.value)
                          }
                          required
                        />
                        <Input.InlineAffix>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="flex items-center justify-center"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-text-sub-600 dark:text-text-soft-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-text-sub-600 dark:text-text-soft-400" />
                            )}
                          </button>
                        </Input.InlineAffix>
                      </Input.Wrapper>
                    </Input.Root>
                    {formData.password && (
                      <p className={`text-label-xs ${isPasswordValid ? 'text-success-base' : 'text-text-sub-600 dark:text-text-soft-400'}`}>
                        Must contain 1 uppercase letter, 1 number, min. 8 characters.
                      </p>
                    )}
                    {errors.password && (
                      <p className="text-label-xs text-error-base">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="passwordConfirm">
                      Confirm Password
                      <LabelAsterisk />
                    </Label>
                    <Input.Root hasError={!!errors.passwordConfirm}>
                      <Input.Wrapper>
                        <Input.Icon>
                          <Lock />
                        </Input.Icon>
                        <Input.Input
                          id="passwordConfirm"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.passwordConfirm}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateField("passwordConfirm", e.target.value)
                          }
                          required
                        />
                        <Input.InlineAffix>
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="flex items-center justify-center"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-text-sub-600 dark:text-text-soft-400" />
                            ) : (
                              <Eye className="h-5 w-5 text-text-sub-600 dark:text-text-soft-400" />
                            )}
                          </button>
                        </Input.InlineAffix>
                      </Input.Wrapper>
                    </Input.Root>
                    {formData.passwordConfirm && formData.password !== formData.passwordConfirm && (
                      <p className="text-label-xs text-error-base">Passwords must match</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Preferences */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={(checked: boolean | "indeterminate") => 
                        updateField("acceptTerms", checked === true)
                      }
                    />
                    <Label htmlFor="acceptTerms" className="cursor-pointer text-paragraph-sm leading-relaxed">
                      I accept the{" "}
                      <LinkButton variant="primary" size="small" className="text-paragraph-sm">
                        Terms & Conditions
                      </LinkButton>
                      <LabelAsterisk />
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketingEmails"
                      checked={formData.marketingEmails}
                      onCheckedChange={(checked: boolean | "indeterminate") => 
                        updateField("marketingEmails", checked === true)
                      }
                    />
                    <Label htmlFor="marketingEmails" className="cursor-pointer text-paragraph-sm leading-relaxed">
                      Send me updates and marketing emails
                    </Label>
                  </div>

                  {banner && (
                    <div className={`rounded-10 border p-3 text-paragraph-sm ${
                      bannerStatus === 'success' 
                        ? 'border-success-light bg-success-alpha-8 text-success-base' 
                        : 'border-error-light bg-error-alpha-8 text-error-base'
                    }`}>
                      {banner}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    variant="neutral"
                    mode="stroke"
                    size="medium"
                    type="button"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    <ButtonIcon>
                      <ChevronLeft />
                    </ButtonIcon>
                    Back
                  </Button>
                )}

                <Button
                  variant="primary"
                  mode="filled"
                  size="medium"
                  type={currentStep === totalSteps ? "submit" : "button"}
                  onClick={currentStep < totalSteps ? handleNext : undefined}
                  className="flex-1"
                  disabled={!validateStep(currentStep) || loading}
                >
                  {loading 
                    ? "Creating account..." 
                    : currentStep === totalSteps 
                      ? "Create Account" 
                      : "Continue"}
                </Button>
              </div>
            </form>

            {/* Login Link */}
            <p className="text-paragraph-sm text-text-sub-600 dark:text-text-soft-400">
              Already have an account?{" "}
              <LinkButton variant="primary" size="small" onClick={onLogin}>
                Login
              </LinkButton>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-between gap-4 p-6 text-paragraph-sm text-text-sub-600 dark:text-text-soft-400 sm:flex-row lg:p-8">
        <p>© 2024 Growtiva</p>
        <div className="flex items-center gap-2">
          <span>ENG</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </footer>
    </div>
  );
};
