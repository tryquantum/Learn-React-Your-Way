'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  onClose?: () => void;
}

/**
 * Clean authentication layout without decorations
 */
export function AuthLayout({ children, onClose }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-bg-white-0 relative flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Top bar */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10">
        {/* Growtiva Logo */}
        <Link href="/" className="flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M21 0C24.866 0 28 3.13401 28 7V21C28 24.866 24.866 28 21 28H7C3.13401 28 4.50994e-07 24.866 0 21V7C0 3.13401 3.13401 4.50979e-07 7 0H21ZM16.4414 7C12.6986 7.00468 12.5602 7.01088 11.9258 7.20703C9.5447 7.94339 7.90931 9.61831 7.16211 12.084C7.03098 12.5166 6.99834 12.9029 7 14.0205C7.00183 15.311 7.01987 15.4706 7.24414 16.1367C7.88032 18.0262 9.10558 19.4659 10.7939 20.3086C11.8157 20.8186 12.5197 20.9715 13.9248 20.9873L15.0957 21L15.2529 20.5947C15.3396 20.3718 15.5911 19.7028 15.8125 19.1084C16.7718 16.5325 16.9463 16.0926 17.0068 16.0918C17.042 16.0915 17.0809 17.1759 17.0938 18.501L17.1172 20.9102L19.0586 20.9346L21 20.958V11.6787H14.46L14.3379 11.8809C14.2705 11.9923 13.9914 12.6917 13.7178 13.4346C13.4442 14.1776 13.1833 14.8668 13.1387 14.9658C13.0941 15.065 12.9456 15.4499 12.8086 15.8213C12.4855 16.6972 12.3561 16.7271 11.7217 16.0723C10.8988 15.2228 10.6532 14.0166 11.0723 12.8857C11.3296 12.1917 11.9964 11.5006 12.6826 11.2168C13.1731 11.014 13.2926 11.005 16.041 10.9766C18.1395 10.9549 18.9023 10.9186 18.9316 10.8398C19.3943 9.59336 20.2984 7.08743 20.3018 7.04297C20.3018 7.01694 18.5648 6.9973 16.4414 7Z" 
              fill="var(--primary-base, #1DAF61)"
            />
          </svg>
        </Link>

        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="p-[3px] bg-bg-weak-50 rounded-md hover:bg-bg-weak-100 transition-colors"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M9.00005 8.04535L12.3413 4.7041L13.2957 5.65855L9.95449 8.9998L13.2957 12.3411L12.3413 13.2955L9.00005 9.95425L5.6588 13.2955L4.70435 12.3411L8.0456 8.9998L4.70435 5.65855L5.6588 4.7041L9.00005 8.04535Z" 
                fill="var(--text-sub-600)"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Main content - Responsive centered card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[384px]">
        {children}
      </div>

      {/* Copyright - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2">
        <p className="text-text-soft-400 text-xs font-normal">
          All rights reserved © 2025 Growtiva
        </p>
      </div>
    </div>
  );
}
