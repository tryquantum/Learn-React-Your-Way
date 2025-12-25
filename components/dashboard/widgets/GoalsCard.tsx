import React from 'react';
import { DashboardCard } from '../DashboardCard';

export function GoalsCard() {
  const goals = [
    { label: 'Save Time', progress: 40, color: 'bg-green-500' },
    { label: 'Consistency', progress: 20, color: 'bg-blue-500' },
    { label: 'Attract Customers', progress: 10, color: 'bg-purple-500' }
  ];

  return (
    <DashboardCard title="Your Goals">
      <div className="space-y-5">
        {goals.map((goal) => (
          <div key={goal.label}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="font-medium text-text-strong-950">{goal.label}</span>
              <span className="text-text-soft-400">{goal.progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-bg-weak-50 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${goal.color}`} 
                style={{ width: `${goal.progress}%` }} 
              />
            </div>
          </div>
        ))}
        
        <button className="text-xs text-primary-base font-medium hover:underline mt-2">
          How to achieve these goals →
        </button>
      </div>
    </DashboardCard>
  );
}
