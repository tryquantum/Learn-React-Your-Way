import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { FileText, Mail, Layout } from 'lucide-react';

export function RecentContentCard() {
  const recentItems = [
    {
      id: 1,
      type: 'social',
      title: 'Top 5 Morning Yoga Poses...',
      time: '2 hours ago',
      icon: <Layout className="w-4 h-4 text-blue-500" />,
      bg: 'bg-blue-50 dark:bg-blue-900/10'
    },
    {
      id: 2,
      type: 'email',
      title: 'Get Your Personalized Workout...',
      time: '1 day ago',
      icon: <Mail className="w-4 h-4 text-purple-500" />,
      bg: 'bg-purple-50 dark:bg-purple-900/10'
    },
    {
      id: 3,
      type: 'page',
      title: 'Transform Your Fitness in 30...',
      time: '3 days ago',
      icon: <FileText className="w-4 h-4 text-green-500" />,
      bg: 'bg-green-50 dark:bg-green-900/10'
    }
  ];

  return (
    <DashboardCard 
      title="Recent Content" 
      action={{ label: 'See All', onClick: () => console.log('See all') }}
    >
      <div className="space-y-4">
        {recentItems.map((item) => (
          <div key={item.id} className="group flex items-start gap-3 p-2 -mx-2 hover:bg-bg-weak-50 rounded-lg transition-colors cursor-pointer">
            <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-strong-950 truncate group-hover:text-primary-base transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-text-soft-400 mt-0.5">
                {item.time}
              </p>
            </div>
          </div>
        ))}

        <button className="w-full py-2 text-sm text-primary-base font-medium border border-dashed border-primary-base/30 rounded-lg hover:bg-primary-alpha-10 transition-colors">
          + Create New
        </button>
      </div>
    </DashboardCard>
  );
}
