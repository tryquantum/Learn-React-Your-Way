'use client';

import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = '',
  children
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 ${className}`}>
      {/* Icon */}
      {Icon && (
        <div className="w-16 h-16 bg-bg-weak-50 rounded-full flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-text-soft-400" />
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-text-strong-950 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-text-soft-400 max-w-md mb-6">
        {description}
      </p>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="px-6 py-2.5 bg-primary-base text-static-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="px-6 py-2.5 bg-bg-white-0 border border-stroke-soft-200 text-text-sub-600 rounded-lg font-medium text-sm hover:bg-bg-weak-50 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}

      {/* Custom children */}
      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}
