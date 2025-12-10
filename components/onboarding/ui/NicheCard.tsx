import React from 'react';
import { motion } from 'framer-motion';
import { NicheOption } from '@/lib/onboarding/types';

interface NicheCardProps {
  niche: NicheOption;
  isSelected?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function NicheCard({ niche, isSelected, onClick, disabled }: NicheCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`
        relative w-full h-[180px] text-left p-5 rounded-[24px] transition-colors duration-200 flex flex-col justify-between group
        ${isSelected 
          ? 'bg-primary-alpha-10 ring-2 ring-primary-base' 
          : 'bg-bg-weak-50 hover:bg-bg-soft-200'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <div className="flex flex-col gap-2">
        <h3 className={`font-medium text-[17px] leading-tight ${isSelected ? 'text-primary-base' : 'text-text-strong-950'}`}>
          {niche.label}
        </h3>
        
        {/* Description as subtitle */}
        {niche.description && (
          <p className="text-[13px] text-text-soft-400 font-normal leading-normal">
            {niche.description}
          </p>
        )}
      </div>

      {/* Icon Graphic at bottom right */}
      <div className="self-end mt-auto">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors
          ${isSelected ? 'bg-primary-base text-static-white' : 'bg-static-white text-text-strong-950 shadow-sm group-hover:bg-static-white'}
        `}>
          {niche.icon}
        </div>
      </div>
    </motion.button>
  );
}
