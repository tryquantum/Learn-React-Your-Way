'use client';

import React from 'react';
import { AISidebar } from '@/components/ui/ai-sidebar';
import {
  RiDashboardLine,
  RiFolderLine,
  RiSparklingLine,
  RiCheckboxCircleLine,
  RiSettings3Line,
} from '@remixicon/react';

export default function DashboardPage() {
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah@growtiva.com',
    initials: 'SJ',
    badge: {
      label: 'PRO',
      color: 'green' as const,
    },
  };

  const navigationItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <RiDashboardLine className="w-5 h-5" />,
      onClick: () => console.log('Dashboard clicked'),
    },
    {
      id: 'content-vault',
      title: 'Content Vault',
      icon: <RiFolderLine className="w-5 h-5" />,
      onClick: () => console.log('Content Vault clicked'),
    },
    {
      id: 'ai-generator',
      title: 'AI Generator',
      icon: <RiSparklingLine className="w-5 h-5" />,
      onClick: () => console.log('AI Generator clicked'),
    },
    {
      id: 'activation',
      title: 'Activation Tracker',
      icon: <RiCheckboxCircleLine className="w-5 h-5" />,
      onClick: () => console.log('Activation Tracker clicked'),
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <RiSettings3Line className="w-5 h-5" />,
      onClick: () => console.log('Settings clicked'),
    },
  ];

  return (
    <div className="flex min-h-screen bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-strong-950)]">
      {/* Sidebar */}
      <AISidebar
        logo={
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary-base text-label-md font-semibold text-static-white">
              G
            </div>
            <span className="text-subheading-2xs font-semibold text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
              Growtiva
            </span>
          </div>
        }
        actionItems={navigationItems}
        user={user}
        onProfileClick={() => console.log('Profile clicked')}
        onToggleSidebar={() => console.log('Toggle sidebar')}
      />

      {/* Main Content Area */}
      <main className="ml-0 md:ml-[272px] w-full h-screen p-1.5">
        <div className="w-full h-full bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-3xl border border-[color:var(--stroke-soft-200)] dark:border-[color:var(--stroke-soft-200)]/10 p-6 overflow-y-auto">
          {/* Content goes here */}
          <div className="space-y-6">
            <div>
              <h1 className="text-title-h3 font-semibold text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)] mb-2">
                Welcome to Your Dashboard
              </h1>
              <p className="text-paragraph-md text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
                Get started with your content creation journey
              </p>
            </div>

            {/* Placeholder sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-surface-800)] rounded-lg">
                <h3 className="text-label-md font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)] mb-2">
                  Quick Stats
                </h3>
                <p className="text-paragraph-sm text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
                  Your metrics will appear here
                </p>
              </div>
              <div className="p-4 bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-surface-800)] rounded-lg">
                <h3 className="text-label-md font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)] mb-2">
                  Recent Activity
                </h3>
                <p className="text-paragraph-sm text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
                  Your recent actions will appear here
                </p>
              </div>
              <div className="p-4 bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-surface-800)] rounded-lg">
                <h3 className="text-label-md font-medium text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)] mb-2">
                  Quick Actions
                </h3>
                <p className="text-paragraph-sm text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
                  Shortcuts will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
