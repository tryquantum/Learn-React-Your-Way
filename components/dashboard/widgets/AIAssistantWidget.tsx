import React from 'react';
import { DashboardCard } from '../DashboardCard';
import { Send, Sparkles } from 'lucide-react';

export function AIAssistantWidget() {
  return (
    <DashboardCard 
      title="Ask Growtiva" 
      action={{ label: 'Expand', onClick: () => {} }}
      className="flex flex-col h-[320px]"
    >
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-4 text-xs text-green-600 font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
          Online & Ready
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-bg-weak-50 rounded-lg p-3 mb-3 overflow-y-auto">
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary-base flex items-center justify-center flex-shrink-0 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="bg-white border border-stroke-soft-200 rounded-2xl rounded-tl-none p-3 text-sm text-text-strong-950 shadow-sm max-w-[85%]">
              <p>Hi there! 👋 You're on fire today! You've created 5 posts already.</p>
              <p className="mt-2">Want to keep the momentum going? I can suggest what to create next based on your goals.</p>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          <button className="whitespace-nowrap px-3 py-1.5 bg-bg-weak-50 hover:bg-bg-white-0 border border-transparent hover:border-stroke-soft-200 rounded-full text-xs font-medium text-text-sub-600 transition-colors">
            Post for Instagram
          </button>
          <button className="whitespace-nowrap px-3 py-1.5 bg-bg-weak-50 hover:bg-bg-white-0 border border-transparent hover:border-stroke-soft-200 rounded-full text-xs font-medium text-text-sub-600 transition-colors">
            Email subject line
          </button>
        </div>

        {/* Input Area */}
        <div className="relative">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="w-full pl-4 pr-10 py-2.5 bg-bg-white-0 border border-stroke-soft-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-base/20 focus:border-primary-base"
          />
          <button className="absolute right-2 top-2 p-1 text-primary-base hover:bg-primary-alpha-10 rounded transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </DashboardCard>
  );
}
