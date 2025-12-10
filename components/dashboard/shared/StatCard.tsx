'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  context?: string;
  onClick?: () => void;
  className?: string;
}

export function StatCard({
  label,
  value,
  unit,
  trend,
  context,
  onClick,
  className = ''
}: StatCardProps) {
  const TrendIcon = trend?.direction === 'up' 
    ? TrendingUp 
    : trend?.direction === 'down' 
    ? TrendingDown 
    : Minus;

  const trendColor = trend?.direction === 'up'
    ? 'text-success-base'
    : trend?.direction === 'down'
    ? 'text-error-base'
    : 'text-text-soft-400';

  return (
    <div
      className={`
        p-4 sm:p-5 bg-bg-white-0 rounded-2xl border border-stroke-soft-200 
        ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary-alpha-16 transition-all' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {/* Label */}
      <p className="text-sm font-medium text-text-soft-400 mb-1">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-semibold text-text-strong-950">
          {value}
        </span>
        {unit && (
          <span className="text-sm text-text-soft-400">
            {unit}
          </span>
        )}
      </div>

      {/* Trend or Context */}
      {trend && (
        <div className={`flex items-center gap-1 mt-2 ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span className="text-sm font-medium">
            {trend.value}
          </span>
        </div>
      )}

      {context && !trend && (
        <p className="text-xs text-text-soft-400 mt-2">
          {context}
        </p>
      )}
    </div>
  );
}
