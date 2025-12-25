'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Instagram, Linkedin } from 'lucide-react';
import { SocialPostData } from '@/lib/onboarding/types';

interface SocialPostViewProps {
  data: SocialPostData;
}

export function SocialPostView({ data }: SocialPostViewProps) {
  const [copiedItem, setCopiedItem] = useState<'caption' | 'hashtags' | null>(null);

  const handleCopy = (text: string, item: 'caption' | 'hashtags') => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const PlatformIcon = data.platform === 'instagram' ? Instagram : Linkedin;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 bg-bg-white-0 rounded-2xl border-2 border-stroke-soft-200 shadow-md"
      >
        {/* Platform Badge */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-stroke-soft-200">
          <PlatformIcon className="w-5 h-5 text-primary-base" />
          <span className="text-sm font-semibold text-text-sub-600 capitalize">
            {data.platform} Post
          </span>
          <div className="ml-auto">
            <span className="text-xs text-success-base bg-success-alpha-10 px-2 py-1 rounded-full font-medium">
              Ready to post
            </span>
          </div>
        </div>

        {/* Caption */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-text-soft-400 uppercase tracking-wide">
              Caption
            </span>
            <button
              onClick={() => handleCopy(data.caption, 'caption')}
              className="p-1.5 rounded-md hover:bg-bg-sub-100 transition-colors"
              title="Copy caption"
            >
              {copiedItem === 'caption' ? (
                <Check className="w-4 h-4 text-success-base" />
              ) : (
                <Copy className="w-4 h-4 text-text-soft-400" />
              )}
            </button>
          </div>
          <p className="text-sm text-text-strong-950 leading-relaxed whitespace-pre-line">
            {data.caption}
          </p>
        </div>

        {/* Hashtags */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs font-semibold text-text-soft-400 uppercase tracking-wide">
              Hashtags
            </span>
            <button
              onClick={() => handleCopy(data.hashtags.join(' '), 'hashtags')}
              className="p-1.5 rounded-md hover:bg-bg-sub-100 transition-colors"
              title="Copy hashtags"
            >
              {copiedItem === 'hashtags' ? (
                <Check className="w-4 h-4 text-success-base" />
              ) : (
                <Copy className="w-4 h-4 text-text-soft-400" />
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.hashtags.map((tag, i) => (
              <span
                key={i}
                className="text-xs text-primary-base bg-primary-alpha-10 px-2 py-1 rounded-md font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Call to Action (if exists) */}
        {data.callToAction && (
          <div className="mt-6 pt-4 border-t border-stroke-soft-200">
            <span className="text-xs font-semibold text-text-soft-400 uppercase tracking-wide block mb-2">
              Call to Action
            </span>
            <p className="text-sm text-text-sub-600 font-medium">{data.callToAction}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
