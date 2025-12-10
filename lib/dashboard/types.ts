// Dashboard data types matching Xano schema

export type UserTier = 'FREE' | 'PRO';
export type ActivationStep = 0 | 1 | 2 | 3;

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  tier: UserTier;
  activation_step: ActivationStep;
}

export interface Workspace {
  id: string;
  name: string;
  niche?: string;
  created_at: string;
}

export interface QuickStats {
  ai_generations_today: number;
  ai_generations_limit: number;
  content_kits_downloaded: number;
  time_saved_this_week: number; // in minutes
  current_tier: UserTier;
  tier_limits_used: number;
  tier_limits_total: number;
}

export interface Activity {
  id: string;
  type: 'content_generated' | 'kit_downloaded' | 'profile_updated' | 'account_created';
  title: string;
  description?: string;
  timestamp: string;
  icon: string;
}

export interface WeeklySummary {
  posts_created: number;
  posts_created_change: number; // percentage change from last week
  campaigns_launched: number;
  campaigns_active: number;
  time_saved: number; // in hours
  emails_sent: number;
  content_kits_downloaded: number;
  engagement_rate?: number;
}

export interface ContentItem {
  id: string;
  title: string;
  preview: string;
  created_at: string;
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
  };
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  metrics: {
    registrations?: number;
    clicks?: number;
    conversions?: number;
    conversion_rate?: number;
  };
  emails_sent: number;
  emails_pending: number;
}

export interface Recommendation {
  id: string;
  type: 'trending_topic' | 'smart_suggestion' | 'automation_idea';
  title: string;
  description: string;
  cta_text: string;
  cta_action: string;
  priority: number;
  engagement_increase?: number;
}

export interface DashboardData {
  user: User;
  workspace: Workspace;
  tier: UserTier;
  activation_step: ActivationStep;
  quick_stats: QuickStats;
  recent_activity: Activity[];
  weekly_summary?: WeeklySummary; // PRO only
  recent_content?: ContentItem[]; // PRO only
  active_campaigns?: Campaign[]; // PRO only
  recommendations?: Recommendation[]; // PRO only
}
