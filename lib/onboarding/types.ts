export type OnboardingStep =
  | 'INITIAL_LOADING'
  | 'NICHE_SELECTION'       // Step 1: Select industry
  | 'BUSINESS_CONTEXT'      // Step 2: Describe business (was WORKSPACE_SETUP)
  | 'GOALS_SELECTION'       // Step 3: Choose up to 3 goals
  | 'FEATURE_CHOICE'        // Step 4: Try AI demo (copy/content) or skip
  | 'COMPLETED';            // Step 5: Completion screen

export type UserRole = 'ai' | 'user';

export interface Message {
  id: string;
  role: UserRole;
  content: React.ReactNode;
  timestamp: number;
}

export interface OnboardingState {
  step: OnboardingStep;
  currentStep: 1 | 2 | 3 | 4 | 5; // For easier step tracking
  progress: 0 | 5 | 10 | 15; // Activation progress %
  messages: Message[];
  userData: {
    firstName: string;
    businessName: string;
    niche?: string;
    businessContext?: string;  // From Step 2
    goals?: string[];          // From Step 3
  };
  generatedContent: {
    type: null | 'copy_samples' | 'social_post';
    loading: boolean;
    error: null | GenerationError;
    data: null | CopySamplesData | SocialPostData;
    generationTimeMs?: number;
  };
  isLoading: boolean;
  isTyping: boolean;
  showChat: boolean;
}

export interface GenerationError {
  type: 'timeout' | 'rate_limited' | 'generation_failed';
  message: string;
  canRetry: boolean;
  canContinue: boolean;
}

export interface CopySample {
  type: 'instagram_caption' | 'email_subject' | 'linkedin_post';
  label: string;
  content: string;
}

export interface CopySamplesData {
  samples: CopySample[];
}

export interface SocialPostData {
  platform: 'instagram' | 'linkedin';
  caption: string;
  hashtags: string[];
  callToAction?: string;
}

export interface NicheOption {
  id: string;
  label: string;
  icon: string; // emoji
  description?: string;
}

export interface Goal {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Initial state constant
export const INITIAL_ONBOARDING_STATE: OnboardingState = {
  step: 'INITIAL_LOADING',
  currentStep: 1,
  progress: 0,
  messages: [],
  userData: {
    firstName: '',
    businessName: '',
  },
  generatedContent: {
    type: null,
    loading: false,
    error: null,
    data: null,
  },
  isLoading: true,
  isTyping: false,
  showChat: false,
};
