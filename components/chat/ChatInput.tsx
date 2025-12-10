'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Root as LinkButton } from '@/components/ui/link-button';
import * as Dropdown from '@/components/ui/dropdown';
import {
  RiSparklingLine,
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpLine,
  RiStopCircleLine,
} from '@remixicon/react';
import { cn } from '@/utils/cn';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading?: boolean;
  showPremiumBanner?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const models = [
  { id: 'gpt-4', name: 'GPT-4', description: 'Most capable' },
  { id: 'gpt-3.5', name: 'GPT-3.5', description: 'Faster responses' },
  { id: 'claude', name: 'Claude', description: 'Alternative model' },
];

export function ChatInput({
  value,
  onChange,
  onSend,
  isLoading = false,
  showPremiumBanner = false,
  placeholder = 'How can I help you today?',
  disabled = false,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedModel, setSelectedModel] = useState(models[0]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const maxHeight = 200; // More height for better UX
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading && !disabled) {
        onSend();
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !isLoading && !disabled) {
      onSend();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-surface-800)] rounded-3xl p-5 shadow-sm">
        {/* Premium Banner */}
        {showPremiumBanner && (
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[color:var(--stroke-soft-200)] dark:border-[color:var(--stroke-soft-200)]/10">
            <RiSparklingLine className="h-4 w-4 text-[color:var(--text-soft-400)]" />
            <span className="text-[color:var(--text-soft-400)] text-xs font-medium">
              Access premium models & features
            </span>
            <span className="text-[color:var(--text-disabled-300)] text-xs font-medium">∙</span>
            <LinkButton variant="primary" size="small" className="text-xs font-medium">
              Upgrade
            </LinkButton>
          </div>
        )}

        {/* Textarea Area */}
        <div className="mb-6">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              'w-full resize-none bg-transparent text-base leading-relaxed outline-none',
              'placeholder:text-[color:var(--text-soft-400)]',
              'text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          />
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Add Button */}
            <button
              type="button"
              disabled={disabled || isLoading}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg',
                'bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-surface-700)]',
                'border border-[color:var(--stroke-soft-200)] dark:border-[color:var(--stroke-soft-200)]/10',
                'transition-colors hover:bg-[color:var(--bg-sub-100)] dark:hover:bg-[color:var(--bg-surface-600)]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <RiAddLine className="h-5 w-5 text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]" />
            </button>

            {/* Model Selector */}
            <Dropdown.Root>
              <Dropdown.Trigger asChild>
                <button
                  type="button"
                  disabled={disabled || isLoading}
                  className={cn(
                    'flex h-9 items-center gap-1.5 rounded-lg px-3',
                    'bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-surface-700)]',
                    'border border-[color:var(--stroke-soft-200)] dark:border-[color:var(--stroke-soft-200)]/10',
                    'transition-colors hover:bg-[color:var(--bg-sub-100)] dark:hover:bg-[color:var(--bg-surface-600)]',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  <span className="text-sm font-medium text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
                    {selectedModel.name}
                  </span>
                  <RiArrowDownSLine className="h-4 w-4 text-[color:var(--text-soft-400)]" />
                </button>
              </Dropdown.Trigger>
              <Dropdown.Content align="start" className="min-w-[180px]">
                {models.map((model) => (
                  <Dropdown.Item
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-label-sm font-medium">{model.name}</span>
                      <span className="text-paragraph-xs text-[color:var(--text-soft-400)]">
                        {model.description}
                      </span>
                    </div>
                  </Dropdown.Item>
                ))}
              </Dropdown.Content>
            </Dropdown.Root>
          </div>

          {/* Send/Stop Button */}
          {isLoading ? (
            <button
              type="button"
              onClick={() => {/* TODO: Add stop generation */}}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg',
                'bg-error-lighter hover:bg-error-light',
                'transition-colors'
              )}
            >
              <RiStopCircleLine className="h-5 w-5 text-error-base" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg transition-all',
                canSend
                  ? 'bg-primary-base hover:bg-primary-dark'
                  : 'bg-[color:var(--bg-sub-100)] dark:bg-[color:var(--bg-surface-700)]',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              <RiArrowUpLine
                className={cn(
                  'h-5 w-5 transition-colors',
                  canSend
                    ? 'text-static-white'
                    : 'text-[color:var(--text-soft-400)]'
                )}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
