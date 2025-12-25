'use client';

import React from 'react';
import { Sparkles, FileText, ArrowRight } from 'lucide-react';
import { FeatureOptionCard } from './FeatureOptionCard';

interface FeatureChoiceProps {
  onSelectCopyGenerator: () => void;
  onSelectContentGenerator: () => void;
  onSkip: () => void;
  disabled?: boolean;
}

export function FeatureChoice({
  onSelectCopyGenerator,
  onSelectContentGenerator,
  onSkip,
  disabled = false,
}: FeatureChoiceProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Grid for desktop, stack for mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option A: Copy Generator */}
        <FeatureOptionCard
          icon={<Sparkles className="w-6 h-6" />}
          title="Instant Copy Generator"
          description="Generate captions, emails, headlines instantly. Perfect for quick ideas & consistent messaging."
          buttonText="Try Copy Generator"
          onClick={onSelectCopyGenerator}
          variant="primary"
          disabled={disabled}
        />

        {/* Option B: Content Generator */}
        <FeatureOptionCard
          icon={<FileText className="w-6 h-6" />}
          title="Content Generation for Socials"
          description="Create full social media posts ready to share. Instagram, LinkedIn, and more."
          buttonText="Try Content Generator"
          onClick={onSelectContentGenerator}
          variant="primary"
          disabled={disabled}
        />

        {/* Option C: Skip (full width below) */}
        <div className="md:col-span-2">
          <FeatureOptionCard
            icon={<ArrowRight className="w-6 h-6" />}
            title="Skip & Explore Later"
            description="Head to dashboard, explore features on your terms."
            buttonText="Skip"
            onClick={onSkip}
            variant="ghost"
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
}
