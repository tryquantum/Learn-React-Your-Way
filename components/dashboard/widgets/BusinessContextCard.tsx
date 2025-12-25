import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { Building2, Pencil } from 'lucide-react';

interface BusinessContextCardProps {
  businessName: string;
  industry?: string;
  description?: string;
}

export function BusinessContextCard({ 
  businessName, 
  industry = 'Fitness Coaching',
  description = 'I help busy professionals stay fit with 30-minute personalized workouts'
}: BusinessContextCardProps) {
  return (
    <DashboardCard 
      title="Business Context"
      action={{ label: 'Edit', onClick: () => console.log('Edit context') }}
    >
      <div className="space-y-4">
        <div>
          <div className="text-xs text-text-soft-400 mb-1">Business Name</div>
          <div className="text-sm font-semibold text-text-strong-950 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-text-sub-600" />
            {businessName}
          </div>
        </div>

        <div>
          <div className="text-xs text-text-soft-400 mb-1">Industry</div>
          <div className="text-sm text-text-strong-950 bg-bg-weak-50 inline-block px-2 py-1 rounded">
            {industry}
          </div>
        </div>

        <div>
          <div className="text-xs text-text-soft-400 mb-1">Description</div>
          <p className="text-sm text-text-sub-600 leading-relaxed line-clamp-3">
            "{description}"
          </p>
        </div>
      </div>
    </DashboardCard>
  );
}
