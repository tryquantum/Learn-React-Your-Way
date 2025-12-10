/**
 * Xano Type Definitions
 */

export interface User {
  id: string;
  email: string;
  name: string;
  email_verified?: boolean;
  account_status?: 'active' | 'suspended' | 'deleted';
  created_at?: number;
}

export interface Workspace {
  id: string;
  name: string;
  slug?: string;
  industry?: string;
  subscription_tier: 'free' | 'pro' | 'premium';
  subscription_status?: 'active' | 'cancelled' | 'past_due';
  created_at?: number;
  updated_at?: number;
}

export interface AuthResponse {
  authToken: string;
  user: User;
  workspace: Workspace | null;
  onboardingCompleted: boolean;
  expiresAt?: number;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: number;
}

export interface ChatConversation {
  id: string;
  workspace_id: string;
  title?: string;
  created_at: number;
  last_message_at?: number;
}

// Request types
export interface SendMessageRequest {
  conversation_id?: string;
  message: string;
}

export interface SendMessageResponse {
  message: ChatMessage;
  conversation: ChatConversation;
}

// Content types
export interface ContentItem {
  id: number;
  user_id: number;
  title: string;
  content: string;
  type: 'social' | 'email' | 'blog' | 'other';
  status: 'draft' | 'published';
  created_at: number;
  updated_at: number;
}
