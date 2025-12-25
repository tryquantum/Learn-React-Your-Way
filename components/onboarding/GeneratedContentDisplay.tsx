'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CopySamplesView } from './CopySamplesView';
import { SocialPostView } from './SocialPostView';
import { CopySamplesData, SocialPostData } from '@/lib/onboarding/types';
import { Root as Button } from '@/components/ui/button';

interface GeneratedContentDisplayProps {
  type: 'copy_samples' | 'social_post';
  data: CopySamplesData | SocialPostData;
  aiMessage: string;
  onContinue: () => void;
}

export function GeneratedContentDisplay({
  type,
  data,
  aiMessage,
  onContinue,
}: GeneratedContentDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full space-y-6"
    >
      {/* Generated content */}
      {type === 'copy_samples' && <CopySamplesView data={data as CopySamplesData} />}
      {type === 'social_post' && <SocialPostView data={data as SocialPostData} />}

      {/* AI message */}
      <div className="text-center px-4">
        <p className="text-base text-text-sub-600 font-medium">{aiMessage}</p>
      </div>

      {/* Continue button */}
      <div className="flex justify-center">
        <Button onClick={onContinue} size="large" className="min-w-[240px]">
          Got it, go to Dashboard
        </Button>
      </div>
    </motion.div>
  );
}
