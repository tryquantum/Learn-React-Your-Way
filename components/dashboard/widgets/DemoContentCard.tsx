import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { Copy, Trash2, Repeat } from 'lucide-react';

export function DemoContentCard() {
  return (
    <DashboardCard 
      title="Your Demo Content" 
      action={{ label: 'Hide', onClick: () => {} }}
    >
      <div className="bg-bg-weak-50 border border-stroke-soft-200 rounded-lg p-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💪</div>
          <div>
            <p className="text-sm text-text-strong-950 font-medium leading-relaxed italic">
              "Tired of one-size-fits-all workout plans? Your fitness journey is unique, and your training should be too. At Sharon's Fitness Studio, we create personalized..."
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex-1 py-2 bg-primary-base text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm flex items-center justify-center gap-2">
          <Repeat className="w-4 h-4" />
          Create Similar
        </button>
        <button className="p-2 border border-stroke-soft-200 rounded-lg text-text-sub-600 hover:bg-bg-weak-50 hover:text-primary-base transition-colors">
          <Copy className="w-4 h-4" />
        </button>
        <button className="p-2 border border-stroke-soft-200 rounded-lg text-text-sub-600 hover:bg-bg-weak-50 hover:text-red-500 transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-xs text-text-soft-400 mt-3 text-center">
        Created during setup. Validated for your niche.
      </p>
    </DashboardCard>
  );
}
