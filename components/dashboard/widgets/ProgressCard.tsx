import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { Flame, Trophy, TrendingUp } from 'lucide-react';

export function ProgressCard() {
  return (
    <DashboardCard title="Your Progress">
      <div className="space-y-6">
        {/* Activation Score */}
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm text-text-sub-600 font-medium">Activation Score</span>
            <span className="text-sm font-bold text-primary-base">30%</span>
          </div>
          <div className="w-full h-2 bg-bg-weak-50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-base rounded-full" 
              style={{ width: '30%' }}
            />
          </div>
        </div>

        {/* Creation Streak */}
        <div className="flex items-center gap-4 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-900/20">
          <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
            <Flame className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <div className="text-sm font-bold text-text-strong-950 flex items-center gap-2">
              3 Days Streak! <span className="text-xs font-normal text-text-sub-600">🔥</span>
            </div>
            <div className="flex gap-1 mt-1">
              {['M', 'T', 'W'].map((day, i) => (
                <div key={day} className="w-5 h-5 rounded-full bg-orange-200 dark:bg-orange-800 flex items-center justify-center text-[10px] font-medium text-orange-700 dark:text-orange-200">
                  {day}
                </div>
              ))}
              <div className="w-5 h-5 rounded-full border border-dashed border-orange-300 dark:border-orange-700 flex items-center justify-center text-[10px] text-orange-400">
                T
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-weak-50 p-3 rounded-lg">
            <div className="text-xs text-text-soft-400 mb-1">Posts Created</div>
            <div className="text-lg font-bold text-text-strong-950">5</div>
          </div>
          <div className="bg-bg-weak-50 p-3 rounded-lg">
            <div className="text-xs text-text-soft-400 mb-1">Time Saved</div>
            <div className="text-lg font-bold text-text-strong-950">~2h</div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
