'use client';

import React, { Component, ReactNode } from 'react';
import * as Button from './ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className='flex min-h-screen flex-col items-center justify-center bg-bg-white-0 px-6 py-12'>
          <div className='w-full max-w-md space-y-6 text-center'>
            <div className='flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-error-lighter'>
              <svg
                className='h-10 w-10 text-error-base'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                />
              </svg>
            </div>

            <div className='space-y-2'>
              <h1 className='text-title-h4 text-text-strong-950'>Something went wrong</h1>
              <p className='text-paragraph-md text-text-sub-600'>
                We encountered an unexpected error. Please try refreshing the page.
              </p>
            </div>

            {this.state.error && process.env.NODE_ENV === 'development' && (
              <div className='rounded-10 border border-stroke-soft-200 bg-bg-weak-50 p-4 text-left'>
                <p className='text-label-sm font-semibold text-text-strong-950'>
                  Error details:
                </p>
                <p className='mt-2 text-paragraph-xs text-text-sub-600 font-mono'>
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className='flex gap-3 justify-center'>
              <Button.Root
                size='medium'
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try Again
              </Button.Root>
              <Button.Root
                variant='neutral'
                mode='stroke'
                size='medium'
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button.Root>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
