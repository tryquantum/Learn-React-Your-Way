'use client';

import React from 'react';
import { AISidebar } from '@/components/ui/ai-sidebar';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/cn';
import {
  RiDashboardLine,
  RiFolderLine,
  RiSparklingLine,
  RiSettings3Line,
  RiMenuLine,
  RiChat3Line,
} from '@remixicon/react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebar-collapsed', false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleToggleSidebar = () => {
    setIsTransitioning(true);
    setIsCollapsed(!isCollapsed);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleMobileToggle = () => {
    setIsTransitioning(true);
    setIsMobileOpen(!isMobileOpen);
    setTimeout(() => setIsTransitioning(false), 250);
  };

  const handleMobileClose = () => {
    setIsTransitioning(true);
    setIsMobileOpen(false);
    setTimeout(() => setIsTransitioning(false), 250);
  };

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
      onClick: () => router.push('/dashboard'),
      isActive: pathname === '/dashboard',
    },
    {
      id: 'content-vault',
      title: 'Content Vault',
      icon: <RiFolderLine className="w-5 h-5" />,
      onClick: () => router.push('/dashboard/content-vault'),
      isActive: pathname === '/dashboard/content-vault',
    },
    {
      id: 'ai-generator',
      title: 'AI Generator',
      icon: <RiSparklingLine className="w-5 h-5" />,
      onClick: () => router.push('/dashboard/ai-generator'),
      isActive: pathname === '/dashboard/ai-generator',
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      icon: <RiChat3Line className="w-5 h-5" />,
      onClick: () => router.push('/dashboard/ai-assistant'),
      isActive: pathname === '/dashboard/ai-assistant',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <RiSettings3Line className="w-5 h-5" />,
      onClick: () => router.push('/dashboard/settings'),
      isActive: pathname === '/dashboard/settings',
    },
  ];

  return (
    <div suppressHydrationWarning className="flex min-h-screen bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-strong-950)]">
      {/* Mobile Menu Button */}
      <button
        onClick={handleMobileToggle}
        className="fixed top-4 left-4 z-30 md:hidden p-2 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-lg shadow-lg"
      >
        <RiMenuLine className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <AISidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleSidebar={handleToggleSidebar}
        onMobileClose={handleMobileClose}
        logo={
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 0C31.9706 0 36 4.02944 36 9V27C36 31.9706 31.9706 36 27 36H9C4.02944 36 0 31.9706 0 27V9C0 4.02944 4.02944 0 9 0H27ZM21.1387 9C16.3264 9.00602 16.1487 9.0144 15.333 9.2666C12.2718 10.2134 10.1687 12.3662 9.20801 15.5361C9.0394 16.0924 8.99787 16.5894 9 18.0264C9.00236 19.6856 9.02609 19.8906 9.31445 20.7471C10.1324 23.1764 11.7071 25.0278 13.8779 26.1113C15.1916 26.767 16.0968 26.9631 17.9033 26.9834L19.4082 27L19.6113 26.4785C19.7229 26.1914 20.0466 25.3322 20.3311 24.5684C21.565 21.2548 21.7885 20.69 21.8662 20.6895C21.9114 20.6921 21.962 22.0853 21.9785 23.7871L22.0078 26.8838L27 26.9463V15.0156H18.5918L18.4346 15.2764C18.3478 15.4202 17.9884 16.3185 17.6367 17.2734C17.2849 18.2287 16.9499 19.1148 16.8926 19.2422C16.8351 19.3703 16.6448 19.8647 16.4688 20.3418C16.0534 21.468 15.886 21.507 15.0703 20.665C14.0122 19.5728 13.6963 18.0205 14.2354 16.5664C14.5662 15.6743 15.4236 14.7858 16.3057 14.4209C16.9363 14.1601 17.0909 14.1489 20.625 14.1123C23.3194 14.0844 24.2999 14.0386 24.3398 13.9375C24.9357 12.332 26.1025 9.10008 26.1025 9.05469C26.0899 9.02137 23.8611 8.99654 21.1387 9Z" fill="#1DAF61"/>
          </svg>
        }
        actionItems={navigationItems}
        user={user}
        onProfileClick={() => console.log('Profile clicked')}
      />

      {/* Main Content Area */}
      <main
        className={cn(
          "w-full min-h-screen pl-0 pr-1.5 pt-1.5 pb-1.5 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-white-0)]",
          "motion-safe:transition-[margin] motion-safe:duration-300",
          isTransitioning && "will-change-[margin]",
          isCollapsed ? "md:ml-16" : "md:ml-[272px]",
          "ml-0"
        )}
      >
        <div className="w-full h-full bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)] rounded-3xl border border-[color:var(--stroke-soft-200)] dark:border-[color:var(--stroke-soft-200)]/10 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
