'use client';

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, LogOut, Settings as SettingsIcon, User } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { UserTier } from '@/lib/dashboard/types';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    tier: UserTier;
  };
  workspace: {
    name: string;
  };
  notificationCount?: number;
}

export function DashboardLayout({ 
  children, 
  user, 
  workspace,
  notificationCount = 0 
}: DashboardLayoutProps) {
  const router = useRouter();
  const { logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    logout();
    // Force full page reload to ensure clean state
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-bg-white-0 flex">
      {/* Sidebar */}
      <Sidebar tier={user.tier} className="hidden lg:flex" />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-bg-white-0 border-b border-stroke-soft-200">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            {/* Left: Logo + Workspace */}
            <div className="flex items-center gap-4">
              {/* Mobile menu button - will implement later */}
              <button className="lg:hidden p-2 hover:bg-bg-weak-50 rounded-md">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <Link href="/dashboard" className="flex items-center gap-2">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M21 0C24.866 0 28 3.13401 28 7V21C28 24.866 24.866 28 21 28H7C3.13401 28 4.50994e-07 24.866 0 21V7C0 3.13401 3.13401 4.50979e-07 7 0H21ZM16.4414 7C12.6986 7.00468 12.5602 7.01088 11.9258 7.20703C9.5447 7.94339 7.90931 9.61831 7.16211 12.084C7.03098 12.5166 6.99834 12.9029 7 14.0205C7.00183 15.311 7.01987 15.4706 7.24414 16.1367C7.88032 18.0262 9.10558 19.4659 10.7939 20.3086C11.8157 20.8186 12.5197 20.9715 13.9248 20.9873L15.0957 21L15.2529 20.5947C15.3396 20.3718 15.5911 19.7028 15.8125 19.1084C16.7718 16.5325 16.9463 16.0926 17.0068 16.0918C17.042 16.0915 17.0809 17.1759 17.0938 18.501L17.1172 20.9102L19.0586 20.9346L21 20.958V11.6787H14.46L14.3379 11.8809C14.2705 11.9923 13.9914 12.6917 13.7178 13.4346C13.4442 14.1776 13.1833 14.8668 13.1387 14.9658C13.0941 15.065 12.9456 15.4499 12.8086 15.8213C12.4855 16.6972 12.3561 16.7271 11.7217 16.0723C10.8988 15.2228 10.6532 14.0166 11.0723 12.8857C11.3296 12.1917 11.9964 11.5006 12.6826 11.2168C13.1731 11.014 13.2926 11.005 16.041 10.9766C18.1395 10.9549 18.9023 10.9186 18.9316 10.8398C19.3943 9.59336 20.2984 7.08743 20.3018 7.04297C20.3018 7.01694 18.5648 6.9973 16.4414 7Z" 
                    fill="var(--primary-base)"
                  />
                </svg>
                <span className="hidden sm:block text-sm font-medium text-text-sub-600">
                  {workspace.name}
                </span>
              </Link>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-soft-400" />
                <input
                  type="text"
                  placeholder="Search content, templates..."
                  className="w-full pl-10 pr-4 py-2 bg-bg-weak-50 border border-stroke-soft-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-base focus:border-transparent"
                />
              </div>
            </div>

            {/* Right: Notifications + Profile */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-bg-weak-50 rounded-md">
                <Bell className="w-5 h-5 text-text-sub-600" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-error-base rounded-full" />
                )}
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-1.5 hover:bg-bg-weak-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-alpha-10 text-primary-base rounded-full flex items-center justify-center text-sm font-medium">
                    {user.first_name[0]}{user.last_name[0]}
                  </div>
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-medium text-text-strong-950">
                      {user.first_name} {user.last_name}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      user.tier === 'PRO' 
                        ? 'bg-primary-alpha-10 text-primary-base' 
                        : 'bg-bg-soft-200 text-text-soft-400'
                    }`}>
                      {user.tier}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-text-soft-400 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowProfileMenu(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-bg-white-0 border border-stroke-soft-200 rounded-xl shadow-lg z-50 py-1">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-stroke-soft-200">
                        <p className="text-sm font-medium text-text-strong-950">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs text-text-soft-400 truncate" title={user.email}>{user.email}</p>
                      </div>

                      {/* Menu items */}
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-text-sub-600 hover:bg-bg-weak-50 transition-colors"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <SettingsIcon className="w-4 h-4" />
                        Settings
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLogout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error-base hover:bg-error-alpha-10 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
