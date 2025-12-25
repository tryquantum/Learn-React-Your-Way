'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingState, INITIAL_ONBOARDING_STATE } from '@/lib/onboarding/types';
import {
  getOnboardingState,
  saveNiche,
  saveBusinessContext,
  saveGoals,
  generateCopyDemo,
  generateContentDemo,
  skipDemo,
  completeOnboarding,
} from '@/lib/onboarding/api';
import { ConversationContainer } from './ConversationContainer';
import { ChatInputArea } from './ChatInputArea';
import { NicheSelector } from './NicheSelector';
import { GoalsSelector } from './GoalsSelector';
import { FeatureChoice } from './FeatureChoice';
import { LoadingState } from './LoadingState';
import { GeneratedContentDisplay } from './GeneratedContentDisplay';
import { GenerationError } from './GenerationError';
import { CompletionScreen } from './CompletionScreen';
import { ProgressBar } from './ProgressBar';

interface OnboardingFlowProps {
  user: { name?: string; email: string };
}

export function OnboardingFlow({ user }: OnboardingFlowProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [state, setState] = useState<OnboardingState>({
    ...INITIAL_ONBOARDING_STATE,
    step: 'INITIAL_LOADING', // Enforce initial step
    showChat: true, 
    userData: {
      firstName: user.name?.split(' ')[0] || 'there',
      businessName: 'Your Business',
    },
  });
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [validationError, setValidationError] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load initial state
  useEffect(() => {
    const loadState = async () => {
      try {
        const initialState = await getOnboardingState();
        const firstName = user.name?.split(' ')[0] || 'there';
        
        setState((prev) => ({
          ...initialState,
          // Force chat view
          showChat: true,
          // Personalize messages with actual firstName
          messages: initialState.messages.map((msg) => ({
            ...msg,
            content: typeof msg.content === 'string' 
              ? msg.content.replace('Hey there!', `Hey ${firstName}!`)
              : msg.content,
          })),
          userData: {
            ...initialState.userData,
            firstName,
          },
        }));
      } catch (error) {
        console.error('Failed to load onboarding state:', error);
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadState();
  }, [user.name]);

  // Track elapsed time during generation
  useEffect(() => {
    if (!state.generatedContent.loading) {
      setElapsedSeconds(0);
      return;
    }
    const timer = setInterval(() => setElapsedSeconds((p) => p + 1), 1000);
    return () => clearInterval(timer);
  }, [state.generatedContent.loading]);

  // Prevent hydration mismatch - check AFTER all hooks
  if (!isMounted) {
    return null;
  }

  // Helpers
  const addAIMessage = (content: string) => {
    const aiMessage = {
      id: `ai-${Date.now()}`,
      role: 'ai' as const,
      content,
      timestamp: Date.now(),
    };
    setState((prev) => ({ ...prev, messages: [...prev.messages, aiMessage] }));
  };

  const addUserMessage = (content: string) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user' as const,
      content,
      timestamp: Date.now(),
    };
    setState((prev) => ({ ...prev, messages: [...prev.messages, userMessage] }));
  };

  // --- Handlers ---

  const handleNicheSelect = async (nicheId: string) => {
    // Add user message via label
    const label = NICHE_LABELS[nicheId] || nicheId;
    addUserMessage(label);

    setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, niche: nicheId },
      isLoading: true,
      isTyping: true,
    }));

    try {
      const response = await saveNiche(nicheId);
      setTimeout(() => {
        if (response.ai_message) addAIMessage(response.ai_message);
        setState((prev) => ({
          ...prev,
          step: response.next_step || 'BUSINESS_CONTEXT',
          currentStep: 2,
          progress: response.activation_progress,
          isLoading: false,
          isTyping: false,
        }));
      }, 800);
    } catch (error) {
      console.error('Failed to save niche:', error);
      setState((prev) => ({ ...prev, isLoading: false, isTyping: false }));
    }
  };

  const handleBusinessContextSubmit = async (context: string) => {
    // Validation
    if (context.length < 50) {
      setValidationError('Please tell me a bit more (at least 50 characters).');
      return;
    }
    setValidationError('');
    
    addUserMessage(context);
    setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, businessContext: context },
      isLoading: true,
      isTyping: true,
    }));

    try {
      const response = await saveBusinessContext(context);
      setTimeout(() => {
        if (response.ai_message) addAIMessage(response.ai_message);
        setState((prev) => ({
          ...prev,
          step: response.next_step || 'GOALS_SELECTION',
          currentStep: 3,
          progress: response.activation_progress,
          isLoading: false,
          isTyping: false,
        }));
      }, 800);
    } catch (error) {
      console.error('Failed to save context:', error);
      setState((prev) => ({ ...prev, isLoading: false, isTyping: false }));
    }
  };

  const handleGoalsSubmit = async (goals: string[]) => {
    const goalLabels = goals.map((id) => GOAL_LABELS[id] || id).join(', ');
    addUserMessage(`Selected: ${goalLabels}`);

    setState((prev) => ({
      ...prev,
      userData: { ...prev.userData, goals },
      isLoading: true,
      isTyping: true,
    }));

    try {
      const response = await saveGoals(goals);
      setTimeout(() => {
        if (response.ai_message) addAIMessage(response.ai_message);
        addAIMessage("Here's what you can do right now...");
        
        setState((prev) => ({
          ...prev,
          step: response.next_step || 'FEATURE_CHOICE',
          currentStep: 4,
          progress: response.activation_progress,
          isLoading: false,
          isTyping: false,
        }));
      }, 800);
    } catch (error) {
      console.error('Failed to save goals:', error);
      setState((prev) => ({ ...prev, isLoading: false, isTyping: false }));
    }
  };

  const handleSelectCopyGenerator = async () => {
    addUserMessage('Show me copy samples');
    setState((prev) => ({
      ...prev,
      generatedContent: { ...prev.generatedContent, loading: true, error: null },
    }));

    try {
      const response = await generateCopyDemo();
      setState((prev) => ({
        ...prev,
        progress: response.activation_progress,
        generatedContent: {
          type: 'copy_samples',
          loading: false,
          error: null,
          data: { samples: response.generated_samples },
          generationTimeMs: response.generation_time_ms,
        },
      }));
      setTimeout(() => {
        if (response.ai_message) addAIMessage(response.ai_message);
      }, 500);
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        generatedContent: {
          ...prev.generatedContent,
          loading: false,
          error: {
            type: 'generation_failed',
            message: error.message || 'Failed to generate.',
            canRetry: true,
            canContinue: true,
          },
        },
      }));
    }
  };

  const handleSelectContentGenerator = async () => {
    addUserMessage('Create a social post');
    setState((prev) => ({
      ...prev,
      generatedContent: { ...prev.generatedContent, loading: true, error: null },
    }));

    try {
      const response = await generateContentDemo();
      setState((prev) => ({
        ...prev,
        progress: response.activation_progress,
        generatedContent: {
          type: 'social_post',
          loading: false,
          error: null,
          data: response.generated_post,
          generationTimeMs: response.generation_time_ms,
        },
      }));
      setTimeout(() => {
        if (response.ai_message) addAIMessage(response.ai_message);
      }, 500);
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        generatedContent: {
          ...prev.generatedContent,
          loading: false,
          error: {
            type: 'generation_failed',
            message: error.message || 'Failed to generate.',
            canRetry: true,
            canContinue: true,
          },
        },
      }));
    }
  };

  const handleSkipDemo = async () => {
    addUserMessage('Skip for now');
    setState((prev) => ({ ...prev, isTyping: true }));
    try {
      const response = await skipDemo();
      setTimeout(() => {
        if (response.ai_message) addAIMessage(response.ai_message);
        setState((prev) => ({
          ...prev,
          currentStep: 5,
          step: 'COMPLETED',
          progress: response.activation_progress,
          isTyping: false,
        }));
      }, 800);
    } catch (error) {
      setState((prev) => ({ ...prev, isTyping: false }));
    }
  };

  const handleContinueToDashboard = () => {
    setState((prev) => ({ ...prev, currentStep: 5, step: 'COMPLETED' }));
    addAIMessage('Your workspace is ready! 🚀');
  };

  const handleGoToDashboard = async () => {
    try {
      const response = await completeOnboarding();
      window.location.href = response.redirect_to;
    } catch (error) {
      window.location.href = '/dashboard';
    }
  };
  
  const handleRetryGeneration = () => {
    setState((prev) => ({
      ...prev,
      generatedContent: { ...prev.generatedContent, error: null },
    }));
  };

  // Decide active component to render in stream
  const getActiveComponent = () => {
    // If loading AI generation, show standard spinner
    if (state.generatedContent.loading) {
      return (
        <LoadingState
          type={state.generatedContent.type === 'copy_samples' ? 'copy' : 'content'}
          elapsedSeconds={elapsedSeconds}
        />
      );
    }

    // Interactive steps
    switch (state.step) {
      case 'NICHE_SELECTION':
        return <NicheSelector onSelect={handleNicheSelect} disabled={state.isLoading} />;
        
      case 'GOALS_SELECTION':
        return <GoalsSelector onSubmit={handleGoalsSubmit} disabled={state.isLoading} />;
        
      case 'FEATURE_CHOICE':
        if (state.generatedContent.data || state.generatedContent.error) return null;
        return (
          <FeatureChoice
            onSelectCopyGenerator={handleSelectCopyGenerator}
            onSelectContentGenerator={handleSelectContentGenerator}
            onSkip={handleSkipDemo}
            disabled={state.isLoading}
          />
        );
        
      default:
        // Handle generated content display or errors
        if (state.generatedContent.data) {
          return (
            <GeneratedContentDisplay
              type={state.generatedContent.type!}
              data={state.generatedContent.data}
              aiMessage="" // Message is already added to chat
              onContinue={handleContinueToDashboard}
            />
          );
        }
        if (state.generatedContent.error) {
          return (
            <GenerationError
              error={state.generatedContent.error}
              onRetry={handleRetryGeneration}
              onContinue={handleContinueToDashboard}
            />
          );
        }
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bg-white-0">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 py-4 border-b border-stroke-soft-200 bg-bg-white-0 flex justify-between items-center sticky top-0 z-10"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-base flex items-center justify-center text-static-white font-bold">G</div>
          <span className="font-semibold text-text-strong-950">Growtiva AI</span>
        </div>
        <div className="w-1/3 max-w-[200px]">
          <ProgressBar progress={state.progress} />
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        {state.step === 'COMPLETED' ? (
          <CompletionScreen
            userFirstName={state.userData.firstName}
            onContinue={handleGoToDashboard}
            autoRedirect={true}
            redirectDelay={5}
          />
        ) : (
          <>
            <ConversationContainer 
              messages={state.messages} 
              isTyping={state.isTyping} 
              activeComponent={getActiveComponent()}
            />
            
            {/* Input Area (Only for Business Context step) */}
            {state.step === 'BUSINESS_CONTEXT' && (
              <ChatInputArea 
                onSend={handleBusinessContextSubmit}
                placeholder="Describe your business..."
                validationError={validationError}
                disabled={state.isLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Helpers...
const NICHE_LABELS: Record<string, string> = {
  fitness: 'Fitness Coach',
  beauty: 'Beauty & Wellness',
  'real-estate': 'Real Estate',
  ecommerce: 'E-commerce',
  freelancer: 'Freelancer',
  creator: 'Content Creator',
  coach: 'Coach/Educator',
};

const GOAL_LABELS: Record<string, string> = {
  save_time: 'Save time on marketing',
  consistent_content: 'Create consistent content',
  improve_engagement: 'Improve engagement',
  attract_customers: 'Attract more customers',
  build_email_list: 'Build email list',
  brand_voice: 'Develop brand voice',
  get_ideas: 'Get ideas & inspiration',
};
