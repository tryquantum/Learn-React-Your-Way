'use client';

import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  percentage: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning';
  height?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  percentage,
  label,
  showPercentage = false,
  variant = 'default',
  height = 'medium',
  animated = true,
  className = ''
}: ProgressBarProps) {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Animate progress on mount
  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayPercentage(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayPercentage(percentage);
    }
  }, [percentage, animated]);

  const heightClass = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3'
  }[height];

  // Color based on percentage and variant
  const getColor = () => {
    if (variant === 'success') return 'bg-success-base';
    if (variant === 'warning') return 'bg-warning-base';
    
    // Default: color changes based on progress
    if (percentage >= 100) return 'bg-success-base';
    if (percentage >= 67) return 'bg-primary-base';
    if (percentage >= 33) return 'bg-information-base';
    return 'bg-text-soft-400';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label and percentage */}
      {(label || showPercentage) && (
        <div className="flex items-center justify-between mb-2">
          {label && (
            <span className="text-sm font-medium text-text-sub-600">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-semibold text-text-strong-950">
              {Math.round(displayPercentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress bar */}
      <div className={`w-full ${heightClass} bg-bg-weak-50 rounded-full overflow-hidden`}>
        <div
          className={`${heightClass} ${getColor()} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, displayPercentage))}%` }}
        />
      </div>
    </div>
  );
}
