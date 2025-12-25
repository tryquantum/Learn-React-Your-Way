import React from 'react';
import { cn } from '@/utils/cn';
import { ArrowRight } from 'lucide-react';

interface DashboardCardProps {
  title?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ 
  title, 
  action, 
  children, 
  className 
}: DashboardCardProps) {
  return (
    <div className={cn(
      "bg-bg-white-0 dark:bg-bg-strong-950 border border-stroke-soft-200 dark:border-stroke-soft-200/10 rounded-xl p-6 shadow-sm transition-shadow duration-200 hover:shadow-md hover:border-stroke-sub-300",
      className
    )}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h3 className="font-semibold text-text-strong-950 text-base leading-tight">
              {title}
            </h3>
          )}
          {action && (
            <button 
              onClick={action.onClick}
              className="text-xs font-medium text-text-sub-600 hover:text-primary-base transition-colors flex items-center gap-1"
            >
              {action.label}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
      <div className="h-full">
        {children}
      </div>
    </div>
  );
}
