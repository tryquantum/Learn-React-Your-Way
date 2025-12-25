'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FeatureOptionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost';
  disabled?: boolean;
}

export function FeatureOptionCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
  variant = 'primary',
  disabled = false,
}: FeatureOptionCardProps) {
  const isPrimary = variant === 'primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!disabled ? { y: -4 } : {}}
      className={`
        relative p-6 rounded-2xl transition-all
        ${
          isPrimary
            ? 'bg-bg-white-0 border-2 border-stroke-soft-200 shadow-sm hover:shadow-md'
            : 'bg-bg-weak-50 border-2 border-dashed border-stroke-soft-200 hover:border-primary-light'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Icon */}
      <div className="mb-4">
        <div
          className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${isPrimary ? 'bg-primary-alpha-10 text-primary-base' : 'bg-bg-sub-100 text-text-sub-600'}
        `}
        >
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-text-strong-950 mb-2">{title}</h3>
        <p className="text-sm text-text-soft-400 leading-relaxed">{description}</p>
      </div>

      {/* Button */}
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        className={`
          w-full px-4 py-3 rounded-xl font-medium transition-all
          ${
            isPrimary
              ? 'bg-primary-base text-static-white hover:bg-primary-dark shadow-sm'
              : 'bg-transparent border-2 border-stroke-soft-200 text-text-sub-600 hover:border-primary-base hover:text-primary-base'
          }
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  );
}
