import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { Clock, Zap, ThumbsUp } from 'lucide-react';

export function InsightsCard() {
  return (
    <DashboardCard title="Insights Today">
      <div className="space-y-4">
        {/* Time Saved */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-green-50 dark:bg-green-900/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Clock className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text-strong-950">~45 mins saved</div>
            <div className="text-xs text-text-soft-400">"Today alone, you saved 45 mins of work"</div>
          </div>
        </div>

        {/* Productivity */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Zap className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text-strong-950">5 pieces created</div>
            <div className="text-xs text-text-soft-400">"You're creating like a team of 5!"</div>
          </div>
        </div>

        {/* Engagement - Example placeholder */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center flex-shrink-0 mt-0.5">
            <ThumbsUp className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text-strong-950">High Quality</div>
            <div className="text-xs text-text-soft-400">Content looks great</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
