export type OnboardingStep = 
  | 'INITIAL_LOADING'
  | 'NICHE_SELECTION'
  | 'WORKSPACE_SETUP'
  | 'FIRST_POST_CREATION'
  | 'SOCIAL_CONNECTION'
  | 'ACTIVATION'
  | 'COMPLETED';

export type UserRole = 'ai' | 'user';

export interface Message {
  id: string;
  role: UserRole;
  content: React.ReactNode;
  timestamp: number;
}

export interface OnboardingState {
  step: OnboardingStep;
  progress: number;
  messages: Message[];
  userData: {
    niche?: string;
    businessName?: string;
    draftBrief?: string;
    connectedSocials?: string[];
  };
  isLoading: boolean;
}

export interface NicheOption {
  id: string;
  label: string;
  icon: string; // lucide icon name or emoji
  description?: string;
}

// Initial state constant
export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  step: 'INITIAL_LOADING',
  progress: 0,
  messages: [],
  userData: {},
  isLoading: true,
};
