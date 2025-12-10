import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BusinessNameInputProps {
  onSubmit: (name: string) => void;
  disabled?: boolean;
}

export function BusinessNameInput({ onSubmit, disabled }: BusinessNameInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    if (value.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    setError('');
    onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError('');
          }}
          disabled={disabled}
          placeholder="e.g. Acme Inc."
          className={`
            w-full px-6 py-4 rounded-full text-lg outline-none transition-all
            bg-bg-weak-50 border-2 
            ${error 
              ? 'border-error-base focus:border-error-base text-error-base' 
              : 'border-transparent focus:border-primary-base focus:bg-bg-white-0 text-text-strong-950'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-text-disabled-300
          `}
          autoFocus
        />
        
        <motion.button
          type="submit"
          disabled={!value.trim() || disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            absolute right-2 p-3 rounded-full flex items-center justify-center transition-colors
            ${value.trim() && !disabled
              ? 'bg-primary-base text-static-white shadow-md cursor-pointer' 
              : 'bg-bg-soft-200 text-text-disabled-300 cursor-not-allowed'
            }
          `}
        >
          {disabled ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-5 h-5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
        </motion.button>
      </div>
      
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-error-base text-center font-medium"
        >
          {error}
        </motion.p>
      )}
    </form>
  );
}
