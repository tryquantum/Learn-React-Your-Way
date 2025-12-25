'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputAreaProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  validationError?: string;
}

export function ChatInputArea({
  onSend,
  disabled = false,
  placeholder = "Type your message...",
  autoFocus = true,
  validationError,
}: ChatInputAreaProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
    }
  };

  return (
    <div className="border-t border-stroke-soft-200 bg-bg-white-0 p-4">
      <div className="max-w-2xl mx-auto w-full relative">
        <div className={`
          relative bg-bg-weak-50 rounded-2xl border-2 transition-all
          ${validationError 
            ? 'border-error-base bg-error-lighter' 
            : 'border-transparent focus-within:border-primary-base focus-within:bg-bg-white-0'
          }
        `}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className="w-full pl-4 pr-12 py-3 bg-transparent resize-none outline-none text-text-strong-950 placeholder:text-text-disabled-300 max-h-[120px]"
            autoFocus={autoFocus}
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            className={`
              absolute right-2 bottom-2 p-2 rounded-xl transition-colors
              ${value.trim() && !disabled
                ? 'bg-primary-base text-static-white hover:bg-primary-dark'
                : 'bg-transparent text-text-disabled-300 cursor-not-allowed'
              }
            `}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        
        {/* Validation Error Message */}
        {validationError && (
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-error-base font-medium mt-2 ml-2"
          >
            {validationError}
          </motion.p>
        )}
        
        {/* Instructions */}
        {!validationError && (
          <div className="flex justify-between items-center mt-2 px-2">
            <span className="text-xs text-text-soft-400">
              Shift + Enter for new line
            </span>
            <span className={`text-xs ${value.length > 500 ? 'text-error-base' : 'text-text-soft-400'}`}>
              {value.length > 0 ? `${value.length} chars` : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
