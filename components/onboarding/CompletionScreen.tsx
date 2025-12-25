'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Root as Button } from '@/components/ui/button';
import Confetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';

interface CompletionScreenProps {
  userFirstName: string;
  onContinue: () => void;
  autoRedirect?: boolean;
  redirectDelay?: number; // in seconds
}

export function CompletionScreen({
  userFirstName,
  onContinue,
  autoRedirect = true,
  redirectDelay = 5,
}: CompletionScreenProps) {
  const [countdown, setCountdown] = useState(redirectDelay);
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Stop confetti after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(confettiTimer);
  }, []);

  useEffect(() => {
    if (!autoRedirect) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onContinue();
    }
  }, [countdown, autoRedirect, onContinue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4">
      {/* Confetti */}
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

      {/* Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="relative">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 w-24 h-24 rounded-full bg-success-base opacity-20 blur-xl"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Main circle */}
          <div className="relative w-24 h-24 rounded-full bg-success-light flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-success-base" strokeWidth={2.5} />
          </div>

          {/* Sparkles */}
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <Sparkles className="w-6 h-6 text-primary-base" />
          </motion.div>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl sm:text-4xl font-bold text-text-strong-950 mb-3"
      >
        Your workspace is ready! 🚀
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-text-sub-600 mb-8 max-w-md"
      >
        Let&apos;s get to work, {userFirstName}.
      </motion.p>

      {/* Features unlocked */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8 p-4 bg-primary-alpha-10 rounded-xl border border-primary-light max-w-md"
      >
        <p className="text-sm font-medium text-primary-base mb-2">✨ What&apos;s unlocked:</p>
        <ul className="text-sm text-text-sub-600 space-y-1 text-left">
          <li>• Unlimited AI-powered content generation</li>
          <li>• Copy & caption creation tools</li>
          <li>• Content vault for all your ideas</li>
        </ul>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Button onClick={onContinue} size="large" className="min-w-[240px]">
          Go to Dashboard
        </Button>
      </motion.div>

      {/* Countdown */}
      {autoRedirect && countdown > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-text-disabled-300 mt-4"
        >
          Redirecting in {countdown}s...
        </motion.p>
      )}
    </div>
  );
}
