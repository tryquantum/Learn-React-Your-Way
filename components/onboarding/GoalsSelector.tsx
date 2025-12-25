'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CalendarCheck,
  TrendingUp,
  Users,
  Mail,
  Megaphone,
  Lightbulb,
} from 'lucide-react';
import { Goal } from '@/lib/onboarding/types';

interface GoalsSelectorProps {
  onSubmit: (goalIds: string[]) => void;
  disabled?: boolean;
}

const GOALS: Goal[] = [
  { id: 'save_time', label: 'Save time on marketing', icon: <Clock className="w-6 h-6" /> },
  { id: 'consistent_content', label: 'Create consistent content', icon: <CalendarCheck className="w-6 h-6" /> },
  { id: 'improve_engagement', label: 'Improve engagement', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'attract_customers', label: 'Attract more customers', icon: <Users className="w-6 h-6" /> },
  { id: 'build_email_list', label: 'Build email list', icon: <Mail className="w-6 h-6" /> },
  { id: 'brand_voice', label: 'Develop brand voice', icon: <Megaphone className="w-6 h-6" /> },
  { id: 'get_ideas', label: 'Get ideas & inspiration', icon: <Lightbulb className="w-6 h-6" /> },
];

export function GoalsSelector({ onSubmit, disabled }: GoalsSelectorProps) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const maxGoals = 3;
  const canSubmit = selectedGoals.length >= 1 && selectedGoals.length <= maxGoals;

  const handleToggleGoal = (goalId: string) => {
    if (disabled) return;

    setSelectedGoals((prev) => {
      if (prev.includes(goalId)) {
        // Deselect
        return prev.filter((id) => id !== goalId);
      } else {
        // Select (if under max)
        if (prev.length >= maxGoals) {
          // Show feedback - already at max
          return prev;
        }
        return [...prev, goalId];
      }
    });
  };

  const handleSubmit = () => {
    if (!canSubmit || disabled) return;
    onSubmit(selectedGoals);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Instructions */}
      <div className="text-center mb-6">
        <p className="text-base text-text-sub-600 mb-2">
          Select up to {maxGoals} goals that matter most to you
        </p>
        <p className="text-sm text-text-soft-400">
          {selectedGoals.length}/{maxGoals} selected
        </p>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {GOALS.map((goal, index) => {
          const isSelected = selectedGoals.includes(goal.id);
          const isMaxReached = selectedGoals.length >= maxGoals && !isSelected;

          return (
            <motion.button
              key={goal.id}
              type="button"
              onClick={() => handleToggleGoal(goal.id)}
              disabled={disabled || isMaxReached}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={!disabled && !isMaxReached ? { scale: 1.03 } : {}}
              whileTap={!disabled && !isMaxReached ? { scale: 0.97 } : {}}
              className={`
                relative p-4 rounded-xl text-left transition-all
                ${
                  isSelected
                    ? 'bg-primary-alpha-10 border-2 border-primary-base'
                    : isMaxReached
                      ? 'bg-bg-weak-50 border-2 border-transparent opacity-50 cursor-not-allowed'
                      : 'bg-bg-weak-50 border-2 border-transparent hover:border-primary-light'
                }
                ${disabled ? 'cursor-not-allowed' : ''}
              `}
            >
              {/* Checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-base flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-static-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}

              {/* Icon */}
              <div className={`mb-3 ${isSelected ? 'text-primary-base' : 'text-text-sub-600'}`}>
                {goal.icon}
              </div>

              {/* Label */}
              <p className={`text-sm font-medium ${isSelected ? 'text-primary-base' : 'text-text-strong-950'}`}>
                {goal.label}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Submit Button */}
      <motion.button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit || disabled}
        whileHover={canSubmit && !disabled ? { scale: 1.02 } : {}}
        whileTap={canSubmit && !disabled ? { scale: 0.98 } : {}}
        className={`
          w-full px-6 py-4 rounded-full text-base font-semibold transition-all
          ${
            canSubmit && !disabled
              ? 'bg-primary-base text-static-white shadow-md cursor-pointer hover:bg-primary-dark'
              : 'bg-bg-soft-200 text-text-disabled-300 cursor-not-allowed'
          }
        `}
      >
        {disabled ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>Saving...</span>
          </div>
        ) : (
          'Continue'
        )}
      </motion.button>
    </div>
  );
}
