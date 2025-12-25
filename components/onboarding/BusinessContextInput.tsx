'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BusinessContextInputProps {
  businessName: string; // From signup
  onSubmit: (context: string) => void;
  disabled?: boolean;
}

export function BusinessContextInput({
  businessName,
  onSubmit,
  disabled,
}: BusinessContextInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const charCount = value.length;
  const minChars = 50;
  const maxChars = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    if (value.trim().length < minChars) {
      setError(`Please add at least ${minChars} characters`);
      return;
    }

    if (value.trim().length > maxChars) {
      setError(`Please keep it under ${maxChars} characters`);
      return;
    }

    setError('');
    onSubmit(value.trim());
  };

  const isValid = charCount >= minChars && charCount <= maxChars;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      {/* Label */}
      <label className="block mb-3 text-left">
        <span className="text-base font-medium text-text-sub-600">
          Tell me more about {businessName}
        </span>
      </label>

      {/* Textarea Container */}
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError('');
          }}
          disabled={disabled}
          placeholder="e.g., I help busy professionals stay fit with 30-minute workouts that actually work. No gym required, just you and 30 minutes."
          rows={4}
          className={`
            w-full px-6 py-4 rounded-2xl text-base outline-none transition-all resize-none
            bg-bg-weak-50 border-2 
            ${
              error
                ? 'border-error-base focus:border-error-base'
                : 'border-transparent focus:border-primary-base focus:bg-bg-white-0'
            }
            text-text-strong-950
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-text-disabled-300
          `}
          autoFocus
        />

        {/* Character Counter */}
        <div className="absolute bottom-4 right-6 flex items-center gap-2">
          <span
            className={`text-xs font-medium ${
              charCount < minChars
                ? 'text-text-soft-400'
                : charCount > maxChars
                  ? 'text-error-base'
                  : 'text-success-base'
            }`}
          >
            {charCount}/{maxChars}
          </span>
        </div>
      </div>

      {/* Helper Text / Error */}
      <div className="mt-2 min-h-[20px]">
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-error-base font-medium"
          >
            {error}
          </motion.p>
        ) : charCount < minChars ? (
          <p className="text-sm text-text-soft-400">
            {minChars - charCount} more characters needed
          </p>
        ) : null}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={!isValid || disabled}
        whileHover={isValid && !disabled ? { scale: 1.02 } : {}}
        whileTap={isValid && !disabled ? { scale: 0.98 } : {}}
        className={`
          w-full mt-4 px-6 py-4 rounded-full text-base font-semibold transition-all
          ${
            isValid && !disabled
              ? 'bg-primary-base text-static-white shadow-md cursor-pointer hover:bg-primary-dark'
              : 'bg-bg-soft-200 text-text-disabled-300 cursor-not-allowed'
          }
        `}
      >
        {disabled ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Saving...</span>
          </div>
        ) : (
          'Continue'
        )}
      </motion.button>
    </form>
  );
}
