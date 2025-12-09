'use client';

import React, { useState } from 'react';
import * as Input from './input';
import { cn } from '@/utils/cn';
import {
  RiFlashlightFill,
  RiAddLine,
  RiArrowDownSLine,
  RiArrowUpLine,
} from '@remixicon/react';

export interface MessageInputProps {
  onSend?: (message: string) => void;
  onModelChange?: (model: string) => void;
  onUpgrade?: () => void;
  selectedModel?: string;
  placeholder?: string;
  className?: string;
}

export function MessageInput({
  onSend,
  onModelChange,
  onUpgrade,
  selectedModel = 'GPT-4',
  placeholder = 'How can I help you today?',
  className,
}: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSend) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      {/* Message Input Area */}
      <div
        className="flex w-full flex-col gap-2.5 overflow-hidden rounded-[20px] bg-[color:var(--bg-weak-50)] px-0.5 pb-0.5 pt-2.5 dark:bg-[color:var(--bg-surface-800)]"
      >
        {/* Upgrade Banner */}
        <div className="flex items-center gap-1 px-3">
          <RiFlashlightFill className="h-4 w-4 text-[color:var(--text-soft-400)]" />
          <span className="text-xs font-medium leading-4 text-[color:var(--text-soft-400)]">
            Access premium models & features
          </span>
          <span className="text-xs font-medium leading-4 text-[color:var(--text-disabled-300)]">
            ∙
          </span>
          <button
            onClick={onUpgrade}
            className="text-xs font-medium leading-4 text-[color:var(--text-sub-600)] transition-colors hover:text-[color:var(--text-strong-950)] dark:hover:text-[color:var(--text-white-0)]"
          >
            Upgrade
          </button>
        </div>

        {/* Chat Input Container */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8 overflow-hidden rounded-[19px] bg-[color:var(--bg-white-0)] px-3 pb-3 pt-3.5 shadow-[0_0_0_1px_rgba(23,23,23,0.02)] dark:bg-[color:var(--bg-strong-950)]">
            {/* Input Field */}
            <div className="flex items-center gap-2 px-1">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-[15px] font-[430] leading-6 text-[color:var(--text-strong-950)] placeholder:text-[color:var(--text-soft-400)] focus:outline-none dark:text-[color:var(--text-white-0)]"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between gap-2">
              {/* Left Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-0.5 overflow-hidden rounded-[9px] bg-[color:var(--bg-weak-50)] p-1 transition-colors duration-150 ease-out hover:bg-[color:var(--bg-soft-200)] dark:bg-[color:var(--bg-surface-800)] dark:hover:bg-[color:var(--bg-sub-300)]"
                  aria-label="Add attachment"
                >
                  <RiAddLine className="h-5 w-5 text-[color:var(--text-soft-400)]" />
                </button>

                {/* Model Selector */}
                <button
                  type="button"
                  onClick={() => onModelChange?.(selectedModel)}
                  className="flex items-center gap-1 overflow-hidden rounded-[9px] bg-[color:var(--bg-weak-50)] px-2 py-1 transition-colors duration-150 ease-out hover:bg-[color:var(--bg-soft-200)] dark:bg-[color:var(--bg-surface-800)] dark:hover:bg-[color:var(--bg-sub-300)]"
                >
                  <span className="text-sm font-medium leading-5 text-[color:var(--text-sub-600)] dark:text-[color:var(--text-soft-400)]">
                    {selectedModel}
                  </span>
                  <RiArrowDownSLine className="h-5 w-5 text-[color:var(--text-soft-400)]" />
                </button>
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!message.trim()}
                className="flex items-center justify-center gap-0.5 overflow-hidden rounded-[9px] bg-[color:var(--bg-weak-50)] p-1 transition-colors duration-150 ease-out hover:bg-[color:var(--bg-soft-200)] disabled:pointer-events-none disabled:opacity-50 dark:bg-[color:var(--bg-surface-800)] dark:hover:bg-[color:var(--bg-sub-300)]"
                aria-label="Send message"
              >
                <RiArrowUpLine className="h-5 w-5 text-[color:var(--text-soft-400)]" />
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs leading-4 text-[color:var(--text-soft-400)]">
        AI can make <span className="font-medium">mistakes</span> - please double-check
      </p>
    </div>
  );
}
