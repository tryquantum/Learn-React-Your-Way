'use client';

import React from 'react';
import { cn } from '@/utils/cn';
import {
  RiFileCopyLine,
  RiThumbUpLine,
  RiThumbDownLine,
} from '@remixicon/react';

export interface AIMessageProps {
  content: string;
  onCopy?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
  className?: string;
}

export function AIMessage({
  content,
  onCopy,
  onLike,
  onDislike,
  className,
}: AIMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-xl',
        className
      )}
    >
      {/* Message Text */}
      <div className="flex items-center gap-2 px-1">
        <p className="text-[15px] font-[430] leading-6 text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
          {content}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onCopy}
          className="flex items-center justify-center gap-0.5 rounded-md bg-[color:var(--bg-white-0)] p-[3px] transition-colors duration-150 ease-out hover:bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-strong-950)] dark:hover:bg-[color:var(--bg-surface-800)]"
          aria-label="Copy message"
        >
          <RiFileCopyLine className="h-[18px] w-[18px] text-[color:var(--text-soft-400)]" />
        </button>
        <button
          onClick={onLike}
          className="flex items-center justify-center gap-0.5 rounded-md bg-[color:var(--bg-white-0)] p-[3px] transition-colors duration-150 ease-out hover:bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-strong-950)] dark:hover:bg-[color:var(--bg-surface-800)]"
          aria-label="Like message"
        >
          <RiThumbUpLine className="h-[18px] w-[18px] text-[color:var(--text-soft-400)]" />
        </button>
        <button
          onClick={onDislike}
          className="flex items-center justify-center gap-0.5 rounded-md bg-[color:var(--bg-white-0)] p-[3px] transition-colors duration-150 ease-out hover:bg-[color:var(--bg-weak-50)] dark:bg-[color:var(--bg-strong-950)] dark:hover:bg-[color:var(--bg-surface-800)]"
          aria-label="Dislike message"
        >
          <RiThumbDownLine className="h-[18px] w-[18px] text-[color:var(--text-soft-400)]" />
        </button>
      </div>
    </div>
  );
}

export interface UserBubbleProps {
  content: string;
  className?: string;
}

export function UserBubble({ content, className }: UserBubbleProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 self-end overflow-hidden bg-[color:var(--bg-soft-200)] px-3.5 py-2.5 dark:bg-[color:var(--bg-surface-800)]',
        className
      )}
      style={{
        borderTopLeftRadius: '14px',
        borderTopRightRadius: '14px',
        borderBottomRightRadius: '8px',
        borderBottomLeftRadius: '14px',
      }}
    >
      <p className="text-[15px] font-[430] leading-6 text-[color:var(--text-strong-950)] dark:text-[color:var(--text-white-0)]">
        {content}
      </p>
    </div>
  );
}
