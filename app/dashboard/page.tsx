'use client';

import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Hand } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardHomePage() {
  const { user, workspace, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

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
  if (!isAuthenticated || !user || !workspace) {
    return null;
  }

  // Temporary placeholder - will be replaced with actual dashboard content
  return (
    <DashboardLayout
      user={{
        first_name: user.name.split(' ')[0] || user.name,
        last_name: user.name.split(' ').slice(1).join(' ') || '',
        email: user.email,
        tier: workspace?.subscription_tier === 'free' ? 'FREE' : 'PRO'
      }}
      workspace={{
        name: workspace.name
      }}
      notificationCount={0}
    >
      {/* Temporary welcome message */}
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="w-20 h-20 bg-primary-alpha-10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Hand className="w-10 h-10 text-primary-base" />
          </div>
          <h1 className="text-3xl font-bold text-text-strong-950 mb-4">
            Welcome to Growtiva, {user.name || user.email}! 👋
          </h1>
          <p className="text-text-soft-400 text-lg mb-8">
            Your AI team is ready to help you create amazing content. <br />
            Dashboard is being built...
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
            <div className="p-6 bg-bg-white-0 border border-stroke-soft-200 rounded-2xl">
              <div className="text-2xl mb-2">✨</div>
              <h3 className="font-semibold text-text-strong-950 mb-1">Generate Content</h3>
              <p className="text-sm text-text-soft-400">Coming soon</p>
            </div>
            <div className="p-6 bg-bg-white-0 border border-stroke-soft-200 rounded-2xl">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-semibold text-text-strong-950 mb-1">Content Vault</h3>
              <p className="text-sm text-text-soft-400">Coming soon</p>
            </div>
            <div className="p-6 bg-bg-white-0 border border-stroke-soft-200 rounded-2xl">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-text-strong-950 mb-1">Analytics</h3>
              <p className="text-sm text-text-soft-400">Coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
