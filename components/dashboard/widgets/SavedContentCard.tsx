import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { Bookmark, FolderHeart } from 'lucide-react';

export function SavedContentCard() {
  return (
    <DashboardCard 
      title="Saved Content"
      action={{ label: 'Library', onClick: () => console.log('Library') }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-bg-weak-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-bg-strong-950 shadow-sm flex items-center justify-center">
              <Bookmark className="w-4 h-4 text-text-sub-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-strong-950">Saved Posts</div>
              <div className="text-xs text-text-soft-400">8 items</div>
            </div>
          </div>
          <div className="text-xs font-medium text-primary-base">View</div>
        </div>

        <div className="flex items-center justify-between p-3 bg-bg-weak-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-bg-strong-950 shadow-sm flex items-center justify-center">
              <FolderHeart className="w-4 h-4 text-text-sub-600" />
            </div>
            <div>
              <div className="text-sm font-medium text-text-strong-950">Templates</div>
              <div className="text-xs text-text-soft-400">12 items</div>
            </div>
          </div>
          <div className="text-xs font-medium text-primary-base">View</div>
        </div>
      </div>
    </DashboardCard>
  );
}
