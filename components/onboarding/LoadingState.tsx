'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  type: 'copy' | 'content';
  elapsedSeconds?: number;
}

export function LoadingState({ type, elapsedSeconds = 0 }: LoadingStateProps) {
  const message = useMemo(() => {
    const typeText = type === 'copy' ? 'copy samples' : 'your first post';
    
    if (elapsedSeconds < 2) return `Generating ${typeText}...`;
    if (elapsedSeconds < 4) return 'Almost there...';
    if (elapsedSeconds < 6) return 'Finalizing...';
    return 'Taking longer than expected...';
  }, [elapsedSeconds, type]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center p-12 min-h-[300px]"
    >
      {/* Spinner */}
      <div className="relative mb-6">
        {/* Outer ring */}
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-primary-alpha-10"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Inner spinner */}
        <motion.div
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary-base"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Pulsing dot in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-3 h-3 rounded-full bg-primary-base" />
        </motion.div>
      </div>

      {/* Message */}
      <motion.p
        key={message} // Re-animate on message change
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-base font-medium text-text-sub-600 text-center"
      >
        {message}
      </motion.p>

      {/* Subtle hint if taking too long */}
      {elapsedSeconds >= 6 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-text-soft-400 mt-2 text-center"
        >
          This usually takes just a few seconds...
        </motion.p>
      )}
    </motion.div>
  );
}
