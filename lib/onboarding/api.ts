import { OnboardingState, OnboardingStep } from './types';
import { xanoPost, xanoGet } from '../xano/client';

export interface OnboardingApiResponse {
  success: boolean;
  data: any;
  message?: string;
  next_step?: OnboardingStep;
}

/**
 * Get current onboarding state from backend
 */
export async function getOnboardingState(): Promise<OnboardingState> {
  // TODO: Replace with actual Xano call once endpoint exists
  // For now, return mock initial state
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        step: 'NICHE_SELECTION',
        progress: 0,
        messages: [
          {
            id: 'welcome-1',
            role: 'ai',
            content: "Hey there! 🚀 Welcome to your AI team.",
            timestamp: Date.now() - 1000,
          },
          {
            id: 'welcome-2',
            role: 'ai',
            content: "What's your niche? Let's personalize your AI team.",
            timestamp: Date.now(),
          }
        ],
        userData: {},
        isLoading: false,
      });
    }, 1000);
  });
}

/**
 * Save selected niche
 */
export async function saveNiche(niche: string): Promise<OnboardingApiResponse> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        next_step: 'WORKSPACE_SETUP',
        data: {
          message: "Awesome! I love fitness coaches. Let's set up your workspace."
        }
      });
    }, 800);
  });
}

/**
 * Save business name and create workspace
 */
export async function saveWorkspace(businessName: string): Promise<OnboardingApiResponse> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        next_step: 'FIRST_POST_CREATION',
        data: {
          message: "One last thing—what should we chat about for your first post?",
          workspace_id: "ws_123"
        }
      });
    }, 1200);
  });
}
