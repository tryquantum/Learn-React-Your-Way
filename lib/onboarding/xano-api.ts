import { xanoGet, xanoPost } from '@/lib/xano/client';
import { getAuthToken } from '@/lib/xano/auth';
import type { 
  OnboardingState, 
  OnboardingApiResponse, 
  CopyDemoResponse, 
  ContentDemoResponse 
} from './types';

function getTokenOrThrow(): string {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found. Please log in.');
  }
  return token;
}

/**
 * Get current onboarding state from Xano
 */
export async function getOnboardingState(): Promise<OnboardingState> {
  const token = getTokenOrThrow();
  return xanoGet<OnboardingState>('/onboarding/state', { authToken: token });
}

/**
 * Save niche selection
 */
export async function saveNiche(nicheId: string): Promise<OnboardingApiResponse> {
  const token = getTokenOrThrow();
  return xanoPost<OnboardingApiResponse>('/onboarding/save-niche', { niche: nicheId }, { authToken: token });
}

/**
 * Save business context
 */
export async function saveBusinessContext(context: string): Promise<OnboardingApiResponse> {
  const token = getTokenOrThrow();
  return xanoPost<OnboardingApiResponse>('/onboarding/save-business-context', { context }, { authToken: token });
}

/**
 * Save goals
 */
export async function saveGoals(goals: string[]): Promise<OnboardingApiResponse> {
  const token = getTokenOrThrow();
  return xanoPost<OnboardingApiResponse>('/onboarding/save-goals', { goals }, { authToken: token });
}

/**
 * Generate copy samples (Real Xano call)
 */
export async function generateCopyDemo(): Promise<CopyDemoResponse> {
  const token = getTokenOrThrow();
  return xanoPost<CopyDemoResponse>('/onboarding/generate-copy-demo', {}, { authToken: token });
}

/**
 * Generate full social post (Real Xano call)
 */
export async function generateContentDemo(): Promise<ContentDemoResponse> {
  const token = getTokenOrThrow();
  return xanoPost<ContentDemoResponse>('/onboarding/generate-content-demo', {}, { authToken: token });
}

/**
 * Skip AI demo
 */
export async function skipDemo(): Promise<OnboardingApiResponse> {
  const token = getTokenOrThrow();
  return xanoPost<OnboardingApiResponse>('/onboarding/skip', {}, { authToken: token });
}

/**
 * Complete onboarding
 */
export async function completeOnboarding(): Promise<{ success: boolean; redirect_to: string }> {
  const token = getTokenOrThrow();
  return xanoPost<{ success: boolean; redirect_to: string }>('/onboarding/complete', {}, { authToken: token });
}
