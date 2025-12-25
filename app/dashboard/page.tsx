'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Hand } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DashboardGrid } from '@/components/dashboard/DashboardGrid';
import { ProgressCard } from '@/components/dashboard/widgets/ProgressCard';
import { RecentContentCard } from '@/components/dashboard/widgets/RecentContentCard';
import { SavedContentCard } from '@/components/dashboard/widgets/SavedContentCard';
import { QuickActionsCard } from '@/components/dashboard/widgets/QuickActionsCard';
import { AIAssistantWidget } from '@/components/dashboard/widgets/AIAssistantWidget';
import { CelebrationBanner } from '@/components/dashboard/widgets/CelebrationBanner';
import { DemoContentCard } from '@/components/dashboard/widgets/DemoContentCard';
import { BusinessContextCard } from '@/components/dashboard/widgets/BusinessContextCard';
import { InsightsCard } from '@/components/dashboard/widgets/InsightsCard';
import { GoalsCard } from '@/components/dashboard/widgets/GoalsCard';
import dynamic from 'next/dynamic';

// Import DashboardLayout removed as we use the main layout
// Widgets are imported below


export default function DashboardHomePage() {
  const { user, workspace, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-base border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-soft-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!isAuthenticated) return null;
  
  // Use mock workspace if missing (as per user request since API isn't ready)
  const currentWorkspace = workspace || {
    name: "My Business",
    subscription_tier: "free"
  };
  
  // Ensure we have at least a user object (should be guaranteed by isAuthenticated)
  if (!user) return null;

  return (
    <div className="max-w-[1400px] mx-auto h-full">
      <h1 className="text-2xl font-bold text-text-strong-950 mb-6">
        Welcome back, {(user.name || '').split(' ')[0] || user.name || 'User'}! 👋
      </h1>
      
      <DashboardGrid
        leftColumn={
          <>
            <ProgressCard />
            <RecentContentCard />
            <SavedContentCard />
          </>
        }
        centerColumn={
          <>
            <QuickActionsCard />
            <CelebrationBanner />
            <DemoContentCard />
            <AIAssistantWidget />
          </>
        }
        rightColumn={
          <>
            <BusinessContextCard 
              businessName={currentWorkspace.name || "Your Business"} 
              // In a real app, description and industry would come from user metadata or separate API call
            />
            <InsightsCard />
            <GoalsCard />
          </>
        }
      />
    </div>
  );
}
