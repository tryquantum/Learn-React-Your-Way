import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingState, INITIAL_ONBOARDING_STATE } from '@/lib/onboarding/types';
import { getOnboardingState, saveNiche, saveWorkspace } from '@/lib/onboarding/api';
import { ConversationContainer } from './ConversationContainer';
import { NicheSelector } from './NicheSelector';
import { BusinessNameInput } from './BusinessNameInput';

interface OnboardingFlowProps {
  user: any;
}

export function OnboardingFlow({ user }: OnboardingFlowProps) {
// ...
  const handleBusinessNameSubmit = async (name: string) => {
    // Add user's name input to conversation
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user' as const,
      content: name,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      userData: { ...prev.userData, businessName: name },
      isLoading: true,
    }));

    setIsTyping(true);

    try {
      const response = await saveWorkspace(name);

      setTimeout(() => {
        const aiMessage = {
          id: `ai-${Date.now()}`,
          role: 'ai' as const,
          content: response.data.message,
          timestamp: Date.now(),
        };

        setState(prev => ({
          ...prev,
          messages: [...prev.messages, aiMessage],
          step: response.next_step || 'FIRST_POST_CREATION',
          progress: 40,
          isLoading: false,
        }));

        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to save workspace:', error);
      setIsTyping(false);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };
  const [state, setState] = useState<OnboardingState>(INITIAL_ONBOARDING_STATE);
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false); // New: controls hero vs chat view

  // Load initial state
  useEffect(() => {
    const loadState = async () => {
      try {
        const initialState = await getOnboardingState();
        setState(initialState);
      } catch (error) {
        console.error('Failed to load onboarding state:', error);
      }
    };

    loadState();
  }, []);

  const handleNicheSelect = async (nicheId: string) => {
    // Transition to chat view
    setShowChat(true);

    // Add user's selection to conversation
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user' as const,
      content: NICHE_LABELS[nicheId] || nicheId,
      timestamp: Date.now(),
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      userData: { ...prev.userData, niche: nicheId },
      isLoading: true,
    }));

    setIsTyping(true);

    try {
      // Call API to save niche
      const response = await saveNiche(nicheId);
      
      // Add AI response
      setTimeout(() => {
        const aiMessage = {
          id: `ai-${Date.now()}`,
          role: 'ai' as const,
          content: response.data.message,
          timestamp: Date.now(),
        };

        setState(prev => ({
          ...prev,
          messages: [...prev.messages, aiMessage],
          step: response.next_step || 'WORKSPACE_SETUP',
          progress: 20,
          isLoading: false,
        }));

        setIsTyping(false);
      }, 800);
    } catch (error) {
      console.error('Failed to save niche:', error);
      setIsTyping(false);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bg-white-0">
      {/* Header - Only show after chat starts */}
      <AnimatePresence>
        {showChat && (
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-4 border-b border-stroke-soft-200 bg-bg-white-0 flex justify-between items-center sticky top-0 z-10"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-base flex items-center justify-center text-static-white font-bold">
                G
              </div>
              <span className="font-semibold text-text-strong-950">Growtiva AI</span>
            </div>
            <div className="text-sm font-medium text-primary-base">
              {state.progress}% Complete
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col relative">
        <AnimatePresence mode="wait">
          {!showChat ? (
            /* Hero View - Gemini Style */
            <motion.div
              key="hero"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col px-6 md:px-12 pt-20 max-w-[1200px] mx-auto w-full"
            >
              {/* Greeting Section - Left Aligned */}
              <div className="mb-16">
                <h1 className="text-[56px] leading-[1.1] font-medium tracking-tight mb-2">
                  <span className="bg-gradient-to-r from-[#4285F4] via-[#9B51E0] to-[#FF516D] bg-clip-text text-transparent">
                    Hello, {user.name?.split(' ')[0] || 'there'}
                  </span>
                </h1>
                <h2 className="text-[56px] leading-[1.1] font-medium tracking-tight text-[#C4C7C5]">
                  How can I help you today?
                </h2>
              </div>

              {/* Niche Cards - Horizontal Row */}
              <div className="w-full mb-auto">
                <NicheSelector 
                  onSelect={handleNicheSelect}
                  disabled={state.isLoading}
                />
              </div>

              {/* Bottom Input Area - Fake Input for Visuals */}
              <div className="w-full max-w-[800px] mx-auto pb-12">
                <div className="bg-bg-weak-50 rounded-full py-4 px-6 flex items-center justify-between cursor-text opacity-80 hover:opacity-100 transition-opacity">
                  <span className="text-text-soft-400 text-lg font-light">Enter a prompt here</span>
                  <div className="flex gap-4 text-text-strong-950">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center mt-4 text-xs text-text-disabled-300">
                  Growtiva may display inaccurate info, so double-check its responses.
                </div>
              </div>
            </motion.div>
          ) : (
            /* Chat View - Conversation + Input */
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              {/* Conversation Area */}
              <ConversationContainer 
                messages={state.messages} 
                isTyping={isTyping} 
              />

              {/* Action Area */}
              <div className="border-t border-stroke-soft-200 bg-bg-white-0 p-4 sm:p-6 pb-8">
                <div className="max-w-3xl mx-auto w-full">
                  {state.step === 'WORKSPACE_SETUP' && (
                    <BusinessNameInput 
                      onSubmit={handleBusinessNameSubmit}
                      disabled={state.isLoading}
                    />
                  )}
                  
                  {state.step === 'FIRST_POST_CREATION' && (
                    <div className="text-center p-8 bg-bg-weak-50 rounded-xl border border-dashed border-stroke-soft-200 text-text-soft-400">
                      [Input Area: Post Brief will go here]
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Helper to get display name for niche
const NICHE_LABELS: Record<string, string> = {
  'fitness': 'Fitness Coach',
  'real-estate': 'Real Estate',
  'ecommerce': 'E-commerce',
  'freelancer': 'Freelancer',
  'creator': 'Content Creator',
  'coach': 'Coach/Educator',
};
