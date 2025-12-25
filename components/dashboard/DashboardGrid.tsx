import React from 'react';
import { cn } from '@/utils/cn';

interface DashboardGridProps {
  leftColumn: React.ReactNode;
  centerColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  className?: string;
}

export function DashboardGrid({
  leftColumn,
  centerColumn,
  rightColumn,
  className
}: DashboardGridProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 gap-5 grid-rows-1 flex-col",
      className
    )}>
      {/* Left Column - 35% on Desktop (4 cols) */}
      <div className="lg:col-span-4 flex flex-col gap-5 order-2 lg:order-1" style={{ order: 2 }}>
        {leftColumn}
      </div>

      {/* Center Column - 40% on Desktop (5 cols) */}
      <div className="lg:col-span-5 flex flex-col gap-5 order-1 lg:order-2" style={{ order: 1 }}>
        {centerColumn}
      </div>

      {/* Right Column - 25% on Desktop (3 cols) */}
      <div className="lg:col-span-3 flex flex-col gap-5 order-3" style={{ order: 3 }}>
        {rightColumn}
      </div>
    </div>
  );
}
