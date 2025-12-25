import React, { useState } from 'react';
import { X } from 'lucide-react';

export function CelebrationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-primary-base to-blue-600 rounded-xl p-6 text-white relative shadow-lg overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          🎉 Welcome to Your Dashboard!
        </h2>
        <p className="text-white/90 text-sm mb-4 max-w-sm leading-relaxed">
          You've completed onboarding and seen what Growtiva can do. Now let's create real content for your business.
        </p>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white text-primary-base rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors shadow-sm">
            Start Generating
          </button>
          <button className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors backdrop-blur-sm">
            Explore Templates
          </button>
        </div>
      </div>
    </div>
  );
}
