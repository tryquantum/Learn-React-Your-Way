'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { CopySamplesData } from '@/lib/onboarding/types';

interface CopySamplesViewProps {
  data: CopySamplesData;
}

export function CopySamplesView({ data }: CopySamplesViewProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.samples.map((sample, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative p-4 bg-bg-weak-50 rounded-xl border border-stroke-soft-200 hover:border-primary-light transition-all"
          >
            {/* Label */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-primary-base uppercase tracking-wide">
                {sample.label}
              </span>

              {/* Copy button */}
              <button
                onClick={() => handleCopy(sample.content, index)}
                className="p-1.5 rounded-md hover:bg-bg-sub-100 transition-colors"
                title="Copy to clipboard"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-success-base" />
                ) : (
                  <Copy className="w-4 h-4 text-text-soft-400" />
                )}
              </button>
            </div>

            {/* Content */}
            <p className="text-sm text-text-strong-950 leading-relaxed">
              {sample.content}
            </p>

            {/* Success indicator */}
            {copiedIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-2 left-2 text-xs font-medium text-success-base bg-success-alpha-10 px-2 py-1 rounded"
              >
                Copied!
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
