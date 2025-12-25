import {
  OnboardingState,
  OnboardingStep,
  CopySample,
  SocialPostData,
} from './types';

export interface OnboardingApiResponse {
  success: boolean;
  activation_progress: 0 | 5 | 10 | 15;
  ai_message?: string;
  next_action?: string;
  data?: Record<string, unknown>;
  message?: string;
  next_step?: OnboardingStep;
}

// New response types for AI generation
export interface CopyDemoResponse extends OnboardingApiResponse {
  generated_samples: CopySample[];
  generation_time_ms: number;
  feature_choice: 'copy_generator';
}

export interface ContentDemoResponse extends OnboardingApiResponse {
  generated_post: SocialPostData;
  generation_time_ms: number;
  feature_choice: 'content_generation';
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
        currentStep: 1,
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
            content: "What industry are you in?",
            timestamp: Date.now(),
          }
        ],
        userData: {
          firstName: '', // Will be set by OnboardingFlow from user.name
          businessName: 'Your Business',
        },
        generatedContent: {
          type: null,
          loading: false,
          error: null,
          data: null,
        },
        isLoading: false,
        isTyping: false,
        showChat: false,
      });
    }, 1000);
  });
}

/**
 * Save selected niche
 */
export async function saveNiche(_niche: string): Promise<OnboardingApiResponse> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        activation_progress: 5,
        next_step: 'BUSINESS_CONTEXT',
        ai_message: "Great choice! Tell me more about your business.",
        data: {}
      });
    }, 800);
  });
}

/**
 * Save business context
 */
export async function saveBusinessContext(_context: string): Promise<OnboardingApiResponse> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        activation_progress: 10,
        next_step: 'GOALS_SELECTION',
        ai_message: "Perfect! What are your main goals?",
        data: {}
      });
    }, 800);
  });
}

/**
 * Save selected goals
 */
export async function saveGoals(_goals: string[]): Promise<OnboardingApiResponse> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        activation_progress: 10,
        next_step: 'FEATURE_CHOICE',
        ai_message: "Here's what you can do right now...",
        data: {}
      });
    }, 800);
  });
}

/**
 * Save business name and create workspace (deprecated - replaced by saveBusinessContext)
 * @deprecated Use saveBusinessContext instead
 */
export async function saveWorkspace(_businessName: string): Promise<OnboardingApiResponse> {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        activation_progress: 10,
        next_step: 'GOALS_SELECTION',
        data: {
          message: "One last thing—what are your goals?",
          workspace_id: "ws_123"
        }
      });
    }, 1200);
  });
}

/**
 * Generate copy samples (mock - will be replaced with Xano endpoint)
 * TODO: Replace with POST /api/onboarding/generate-copy-demo
 */
export async function generateCopyDemo(): Promise<CopyDemoResponse> {
  // Simulate API call with realistic delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        activation_progress: 15,
        feature_choice: 'copy_generator',
        generation_time_ms: 2400,
        generated_samples: [
          {
            type: 'instagram_caption',
            label: 'Instagram Caption',
            content: 'Busy schedule? No problem. 30-minute workouts that actually work. No gym required, just you and your determination. 💪✨ #FitnessForBusy',
          },
          {
            type: 'email_subject',
            label: 'Email Subject',
            content: 'Your 30-min path to fitness (starts this week)',
          },
          {
            type: 'linkedin_post',
            label: 'LinkedIn Post Intro',
            content: 'Quick workout tip: Time is your biggest objection to fitness. Here\'s how I help busy professionals stay fit in just 30 minutes...',
          },
        ],
        ai_message: 'See? That\'s the kind of copy you can generate instantly in your workspace.',
        next_action: 'go_to_dashboard',
      });
    }, 2400); // Simulate realistic generation time
  });
}

/**
 * Generate full social post (mock - will be replaced with Xano endpoint)
 * TODO: Replace with POST /api/onboarding/generate-content-demo
 */
export async function generateContentDemo(): Promise<ContentDemoResponse> {
  // Simulate API call with realistic delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        activation_progress: 15,
        feature_choice: 'content_generation',
        generation_time_ms: 3200,
        generated_post: {
          platform: 'instagram',
          caption: `Quick reality check on fitness and busy schedules...

Here's the truth: You don't need 2 hours at the gym.

What you need:
• 30 focused minutes
• A clear plan
• Consistency over perfection

I help busy professionals stay fit without the overwhelm. No fancy equipment. No gym membership. Just results.

Ready to start?`,
          hashtags: [
            '#FitnessCoach',
            '#BusyProfessionals',
            '#WorkoutTips',
            '#30MinWorkouts',
            '#FitnessForBusy',
            '#HealthyLifestyle',
            '#CoachingBusiness',
            '#SoloPreneur',
          ],
          callToAction: 'DM me "READY" to get your personalized 30-minute workout plan.',
        },
        ai_message: 'This is ready to post. Create unlimited posts like this in your workspace.',
        next_action: 'go_to_dashboard',
      });
    }, 3200); // Simulate realistic generation time
  });
}

/**
 * Skip AI demo (mock - will be replaced with Xano endpoint)
 * TODO: Replace with POST /api/onboarding/skip
 */
export async function skipDemo(): Promise<OnboardingApiResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        activation_progress: 15,
        ai_message: 'No problem! Everything is ready whenever you are.',
        next_action: 'go_to_dashboard',
      });
    }, 500);
  });
}

/**
 * Complete onboarding (mock - will be replaced with Xano endpoint)
 * TODO: Replace with POST /api/onboarding/complete
 */
export async function completeOnboarding(): Promise<{ success: boolean; redirect_to: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        redirect_to: '/dashboard',
      });
    }, 500);
  });
}
