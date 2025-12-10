import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/lib/onboarding/types';

interface MessageProps {
  message: Message;
}

export function AIMessage({ message }: MessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 max-w-[85%] pr-4 mb-4"
    >
      <div className="w-8 h-8 rounded-full bg-primary-base flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-static-white text-xs font-bold">AI</span>
      </div>
      <div>
        <div className="bg-bg-weak-50 text-text-strong-950 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-stroke-soft-200">
          <div className="text-[15px] leading-relaxed">
            {message.content}
          </div>
        </div>
        <span className="text-[11px] text-text-soft-400 mt-1 ml-1 block">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}

export function UserMessage({ message }: MessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex justify-end mb-4"
    >
      <div className="max-w-[80%] flex flex-col items-end">
        <div className="bg-primary-base text-static-white px-4 py-3 rounded-2xl rounded-tr-none shadow-sm">
          <div className="text-[15px] leading-relaxed">
            {message.content}
          </div>
        </div>
        <span className="text-[11px] text-text-soft-400 mt-1 mr-1 block">
          You • {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}
