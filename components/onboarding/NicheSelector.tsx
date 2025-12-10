import React, { useState } from 'react';
import { NicheOption } from '@/lib/onboarding/types';
import { NicheCard } from './ui/NicheCard';

interface NicheSelectorProps {
  onSelect: (nicheId: string) => void;
  disabled?: boolean;
}

const NICHE_OPTIONS: NicheOption[] = [
  {
    id: 'fitness',
    label: 'Fitness Coach',
    icon: '💪',
    description: 'Personal training & wellness'
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    icon: '🏠',
    description: 'Property sales & rentals'
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: '🛍️',
    description: 'Online store owner'
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    icon: '💼',
    description: 'Consultant or contractor'
  },
  {
    id: 'creator',
    label: 'Content Creator',
    icon: '📸',
    description: 'Social media & video'
  },
  {
    id: 'coach',
    label: 'Coach/Educator',
    icon: '✍️',
    description: 'Teaching & mentoring'
  },
];

export function NicheSelector({ onSelect, disabled }: NicheSelectorProps) {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

  const handleSelect = (nicheId: string) => {
    if (disabled) return;
    
    setSelectedNiche(nicheId);
    
    // Small delay for visual feedback before triggering callback
    setTimeout(() => {
      onSelect(nicheId);
    }, 300);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NICHE_OPTIONS.slice(0, 4).map((niche) => (
          <NicheCard
            key={niche.id}
            niche={niche}
            isSelected={selectedNiche === niche.id}
            onClick={() => handleSelect(niche.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
