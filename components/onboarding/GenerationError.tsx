'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { GenerationError as GenerationErrorType } from '@/lib/onboarding/types';
import { Root as Button } from '@/components/ui/button';

interface GenerationErrorProps {
  error: GenerationErrorType;
  onRetry?: () => void;
  onContinue: () => void;
}

export function GenerationError({ error, onRetry, onContinue }: GenerationErrorProps) {
  const getErrorIcon = () => {
    switch (error.type) {
      case 'timeout':
        return '⏱️';
      case 'rate_limited':
        return '⚠️';
      case 'generation_failed':
        return '❌';
      default:
        return '⚠️';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="p-8 bg-error-lighter rounded-2xl border-2 border-error-light text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-error-light flex items-center justify-center">
          <span className="text-3xl">{getErrorIcon()}</span>
        </div>

        {/* Error Type */}
        <h3 className="text-lg font-semibold text-error-base mb-2">
          {error.type === 'timeout' && 'Generation Timeout'}
          {error.type === 'rate_limited' && 'Service Busy'}
          {error.type === 'generation_failed' && 'Generation Failed'}
        </h3>

        {/* Message */}
        <p className="text-text-strong-950 mb-6 leading-relaxed">{error.message}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {error.canRetry && onRetry && (
            <Button mode="outline" onClick={onRetry} className="min-w-[140px]">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          )}
          {error.canContinue && (
            <Button onClick={onContinue} className="min-w-[140px]">
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue to Dashboard
            </Button>
          )}
        </div>

        {/* Helper text */}
        <p className="text-xs text-text-soft-400 mt-4">
          Don't worry, you can try generating content again from your dashboard.
        </p>
      </div>
    </motion.div>
  );
}
