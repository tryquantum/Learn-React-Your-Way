import React, { useEffect, useRef } from 'react';
import { Message } from '@/lib/onboarding/types';
import { AIMessage, UserMessage } from './ui/MessageBubble';

interface ConversationContainerProps {
  messages: Message[];
  isTyping?: boolean;
}

export function ConversationContainer({ messages, isTyping }: ConversationContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="max-w-2xl mx-auto flex flex-col justify-end min-h-full">
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            {msg.role === 'ai' ? (
              <AIMessage message={msg} />
            ) : (
              <UserMessage message={msg} />
            )}
          </React.Fragment>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-[85%] mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-base flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-static-white text-xs font-bold">AI</span>
            </div>
            <div className="bg-bg-weak-50 px-4 py-3 rounded-2xl rounded-tl-none border border-stroke-soft-200">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-text-soft-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-text-soft-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-text-soft-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
}
