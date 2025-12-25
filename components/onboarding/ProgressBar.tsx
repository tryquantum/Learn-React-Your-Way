'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: 0 | 5 | 10 | 15;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  // Calculate width percentage (0-15 maps to 0-100%)
  const widthPercent = (progress / 15) * 100;

  return (
    <div className="w-full h-1 bg-bg-weak-50">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-base to-primary-dark"
        initial={{ width: 0 }}
        animate={{ width: `${widthPercent}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}
