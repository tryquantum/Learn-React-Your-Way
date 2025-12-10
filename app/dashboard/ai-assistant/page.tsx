'use client';

import React, { useState } from 'react';
import { WelcomeScreen } from '@/components/chat/WelcomeScreen';
import { ChatInput } from '@/components/chat/ChatInput';

export default function AIAssistantPage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptClick = (prompt: string) => {
    setMessage(prompt);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    console.log('Sending message:', message);
    setIsLoading(true);
    
    // TODO: Call Xano API to send message
    // For now, simulate API call
    setTimeout(() => {
      setMessage('');
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <WelcomeScreen onPromptClick={handlePromptClick} />
      </div>

      {/* Input Area - Always at Bottom */}
      <div className="sticky bottom-0 p-4 bg-[color:var(--bg-white-0)] dark:bg-[color:var(--bg-strong-950)]">
        <ChatInput
          value={message}
          onChange={setMessage}
          onSend={handleSend}
          isLoading={isLoading}
          showPremiumBanner={false}
        />
      </div>
    </div>
  );
}
