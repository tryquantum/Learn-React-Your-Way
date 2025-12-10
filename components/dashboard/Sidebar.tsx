'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Sparkles, 
  FolderOpen, 
  Megaphone, 
  Mail,
  BarChart3,
  BookOpen,
  Settings,
  ArrowUpCircle,
  HelpCircle
} from 'lucide-react';
import { UserTier } from '@/lib/dashboard/types';

interface SidebarProps {
  tier: UserTier;
  className?: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  proOnly?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Generate', href: '/dashboard/generate', icon: Sparkles },
  { name: 'Content Vault', href: '/dashboard/vault', icon: FolderOpen },
  { name: 'Campaigns', href: '/dashboard/campaigns', icon: Megaphone, proOnly: true },
  { name: 'Email Sequences', href: '/dashboard/emails', icon: Mail, proOnly: true },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Resources', href: '/dashboard/resources', icon: BookOpen },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ tier, className = '' }: SidebarProps) {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  return (
    <aside className={`w-64 bg-bg-white-0 border-r border-stroke-soft-200 flex flex-col ${className}`}>
      {/* Sidebar content */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const locked = item.proOnly && tier === 'FREE';

          return (
            <Link
              key={item.name}
              href={locked ? '#' : item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${active 
                  ? 'bg-primary-alpha-10 text-primary-base' 
                  : locked
                  ? 'text-text-disabled-300 cursor-not-allowed'
                  : 'text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950'
                }
              `}
              onClick={(e) => locked && e.preventDefault()}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1">{item.name}</span>
              {locked && (
                <span className="text-xs bg-bg-soft-200 text-text-soft-400 px-1.5 py-0.5 rounded">
                  Pro
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA for FREE users */}
      {tier === 'FREE' && (
        <div className="p-4 border-t border-stroke-soft-200">
          <Link
            href="/dashboard/upgrade"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary-base text-static-white rounded-lg font-medium text-sm hover:bg-primary-dark transition-colors"
          >
            <ArrowUpCircle className="w-4 h-4" />
            Upgrade to Pro
          </Link>
        </div>
      )}

      {/* Help link */}
      <div className="p-4 border-t border-stroke-soft-200">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-sub-600 hover:bg-bg-weak-50 hover:text-text-strong-950 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </Link>
      </div>
    </aside>
  );
}
