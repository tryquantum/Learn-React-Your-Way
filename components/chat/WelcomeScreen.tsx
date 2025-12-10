'use client';

import React from 'react';
import { RiSparklingLine, RiMailLine, RiArticleLine, RiLightbulbLine } from '@remixicon/react';

interface WelcomeScreenProps {
  onPromptClick?: (prompt: string) => void;
}

const GrowtivalLogo = () => (
  <svg width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27 0C31.9706 0 36 4.02944 36 9V27C36 31.9706 31.9706 36 27 36H9C4.02944 36 0 31.9706 0 27V9C0 4.02944 4.02944 0 9 0H27ZM21.1387 9C16.3264 9.00602 16.1487 9.0144 15.333 9.2666C12.2718 10.2134 10.1687 12.3662 9.20801 15.5361C9.0394 16.0924 8.99787 16.5894 9 18.0264C9.00236 19.6856 9.02609 19.8906 9.31445 20.7471C10.1324 23.1764 11.7071 25.0278 13.8779 26.1113C15.1916 26.767 16.0968 26.9631 17.9033 26.9834L19.4082 27L19.6113 26.4785C19.7229 26.1914 20.0466 25.3322 20.3311 24.5684C21.565 21.2548 21.7885 20.69 21.8662 20.6895C21.9114 20.6921 21.962 22.0853 21.9785 23.7871L22.0078 26.8838L27 26.9463V15.0156H18.5918L18.4346 15.2764C18.3478 15.4202 17.9884 16.3185 17.6367 17.2734C17.2849 18.2287 16.9499 19.1148 16.8926 19.2422C16.8351 19.3703 16.6448 19.8647 16.4688 20.3418C16.0534 21.468 15.886 21.507 15.0703 20.665C14.0122 19.5728 13.6963 18.0205 14.2354 16.5664C14.5662 15.6743 15.4236 14.7858 16.3057 14.4209C16.9363 14.1601 17.0909 14.1489 20.625 14.1123C23.3194 14.0844 24.2999 14.0386 24.3398 13.9375C24.9357 12.332 26.1025 9.10008 26.1025 9.05469C26.0899 9.02137 23.8611 8.99654 21.1387 9Z" fill="#1DAF61"/>
  </svg>
);

const suggestedPrompts = [
  {
    icon: RiSparklingLine,
    title: 'Create Social Post',
    prompt: 'Create an engaging social media post for my business about...',
    gradient: 'from-primary-base to-primary-dark',
  },
  {
    icon: RiMailLine,
    title: 'Write Email Campaign',
    prompt: 'Write a compelling email campaign for my audience about...',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: RiArticleLine,
    title: 'Generate Blog Ideas',
    prompt: 'Generate 5 creative blog post ideas for my niche in...',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    icon: RiLightbulbLine,
    title: 'Content Strategy',
    prompt: 'Help me create a content strategy for the next month focused on...',
    gradient: 'from-orange-500 to-orange-700',
  },
];

export function WelcomeScreen({ onPromptClick }: WelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-full max-w-3xl space-y-8">
        {/* Logo and Header */}
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-alpha-8 p-4">
            <GrowtivalLogo />
          </div>
          <div className="space-y-2">
            <h1 className="text-title-h3 font-semibold text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
              Welcome to Growtiva AI Assistant
            </h1>
            <p className="text-paragraph-md text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
              Your AI-powered marketing partner. Get help with content creation, strategy, and more.
            </p>
          </div>
        </div>

        {/* Suggested Prompts */}
        <div className="space-y-4">
          <p className="text-center text-label-sm uppercase tracking-wider text-[color:var(--text-soft-400)]">
            Try asking about
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {suggestedPrompts.map((item, index) => (
              <button
                key={index}
                onClick={() => onPromptClick?.(item.prompt)}
                className="group relative overflow-hidden rounded-xl border border-[color:var(--stroke-soft-200)] bg-[color:var(--bg-white-0)] p-4 text-left transition-all duration-200 hover:border-primary-base hover:shadow-md dark:border-[color:var(--stroke-soft-200)]/10 dark:bg-[color:var(--bg-surface-800)] dark:hover:border-primary-base"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-label-md font-semibold text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
                      {item.title}
                    </p>
                    <p className="text-paragraph-xs text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
                      {item.prompt}
                    </p>
                  </div>
                </div>
                {/* Hover gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-base/5 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
