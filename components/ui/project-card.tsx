'use client';

import React, { useState } from 'react';
import { RiFolder2Line, RiFolder2Fill, RiMore2Line, RiPushpinLine, RiEditLine, RiDeleteBinLine } from '@remixicon/react';
import * as Popover from '@/components/ui/popover';
import { cn } from '@/utils/cn';

interface ProjectCardProps {
  id: string;
  name: string;
  description?: string;
  templateCount?: number;
  isActive?: boolean;
  isPinned?: boolean;
  tierLevel?: 'free' | 'pro';
  onPin?: (id: string) => void;
  onRename?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  templateCount,
  isActive = false,
  isPinned = false,
  tierLevel = 'free',
  onPin,
  onRename,
  onDelete,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleMenuAction = (action: 'pin' | 'rename' | 'delete') => {
    setIsPopoverOpen(false);
    
    switch (action) {
      case 'pin':
        onPin?.(id);
        break;
      case 'rename':
        onRename?.(id);
        break;
      case 'delete':
        onDelete?.(id);
        break;
    }
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col p-4 rounded-xl border transition-all duration-200 cursor-pointer',
        'bg-white-0 border-soft-200',
        'hover:bg-weak-50 hover:border-weak-50',
        'dark:bg-white-0 dark:border-soft-200',
        'dark:hover:bg-weak-50 dark:hover:border-weak-50'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Header with Folder Icon and Context Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          'flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200',
          isActive 
            ? 'bg-primary-base/10 text-primary-base dark:bg-primary-base/20' 
            : 'bg-weak-50 text-sub-600 dark:bg-surface-800 dark:text-soft-400'
        )}>
          {isHovered || isActive ? (
            <RiFolder2Fill className="w-5 h-5" />
          ) : (
            <RiFolder2Line className="w-5 h-5" />
          )}
        </div>

        {/* Context Menu */}
        <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <Popover.Trigger asChild>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPopoverOpen(!isPopoverOpen);
              }}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200',
                'hover:bg-weak-50 dark:hover:bg-surface-800',
                'opacity-0 group-hover:opacity-100',
                isPopoverOpen && 'opacity-100 bg-weak-50 dark:bg-surface-800'
              )}
            >
              <RiMore2Line className="w-4 h-4 text-sub-600 dark:text-soft-400" />
            </button>
          </Popover.Trigger>
          <Popover.Content 
            align="end" 
            side="bottom" 
            sideOffset={4}
            className="w-48 p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => handleMenuAction('pin')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-weak-50 dark:hover:bg-surface-800 transition-colors"
              >
                <RiPushpinLine className="w-4 h-4 text-sub-600 dark:text-soft-400" />
                <span className="text-paragraph-sm text-strong-950 dark:text-white-0">
                  {isPinned ? 'Unpin' : 'Pin'}
                </span>
              </button>
              <button
                onClick={() => handleMenuAction('rename')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-weak-50 dark:hover:bg-surface-800 transition-colors"
              >
                <RiEditLine className="w-4 h-4 text-sub-600 dark:text-soft-400" />
                <span className="text-paragraph-sm text-strong-950 dark:text-white-0">
                  Rename
                </span>
              </button>
              <div className="h-px bg-soft-200 dark:bg-soft-200/10 my-1" />
              <button
                onClick={() => handleMenuAction('delete')}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-error-base/10 dark:hover:bg-error-base/20 transition-colors"
              >
                <RiDeleteBinLine className="w-4 h-4 text-error-base" />
                <span className="text-paragraph-sm text-error-base">
                  Delete
                </span>
              </button>
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className={cn(
            'text-label-md font-medium line-clamp-1',
            isActive 
              ? 'text-strong-950 dark:text-white-0' 
              : 'text-strong-950 dark:text-white-0'
          )}>
            {name}
          </h3>
          {tierLevel === 'pro' && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-label-xs font-medium bg-warning-base/10 text-warning-base">
              PRO
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-paragraph-sm text-sub-600 dark:text-soft-400 line-clamp-2 mb-2">
            {description}
          </p>
        )}

        {templateCount !== undefined && (
          <p className="text-paragraph-xs text-sub-600 dark:text-soft-400">
            {templateCount} templates
          </p>
        )}
      </div>

      {/* Pinned Indicator */}
      {isPinned && (
        <div className="absolute top-2 right-2">
          <RiPushpinLine className="w-3.5 h-3.5 text-primary-base" />
        </div>
      )}
    </div>
  );
};
