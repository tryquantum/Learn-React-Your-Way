import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { Sparkles, LayoutTemplate, Mail, Library, BarChart2 } from 'lucide-react';

export function QuickActionsCard() {
  const actions = [
    {
      icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
      label: 'Generate Content',
      desc: 'Create posts, emails, headlines',
      bg: 'bg-yellow-50 dark:bg-yellow-900/10'
    },
    {
      icon: <LayoutTemplate className="w-5 h-5 text-blue-500" />,
      label: 'Browse Templates',
      desc: 'Explore 35+ niche-specific kits',
      bg: 'bg-blue-50 dark:bg-blue-900/10'
    },
    {
      icon: <Mail className="w-5 h-5 text-purple-500" />,
      label: 'Email Sequences',
      desc: 'Ready-to-use email automation',
      bg: 'bg-purple-50 dark:bg-purple-900/10'
    },
    {
      icon: <Library className="w-5 h-5 text-green-500" />,
      label: 'View Content Library',
      desc: 'All templates organized by niche',
      bg: 'bg-green-50 dark:bg-green-900/10'
    },
    {
      icon: <BarChart2 className="w-5 h-5 text-orange-500" />,
      label: 'View Analytics',
      desc: 'Deep dive into your metrics',
      bg: 'bg-orange-50 dark:bg-orange-900/10'
    }
  ];

  return (
    <DashboardCard title="Quick Actions">
      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.label}
            className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-bg-weak-50 transition-colors text-left group border border-transparent hover:border-stroke-soft-200"
          >
            <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
              {action.icon}
            </div>
            <div>
              <div className="font-semibold text-text-strong-950">{action.label}</div>
              <div className="text-xs text-text-soft-400">{action.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </DashboardCard>
  );
}
