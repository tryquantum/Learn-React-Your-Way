'use client';

import React from 'react';

/**
 * Decorative corner dots for auth pages
 */
export function CornerDot({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute ${className}`}>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle 
          cx="7.5" 
          cy="7.5" 
          r="5.5" 
          fill="var(--bg-weak-50)" 
          stroke="var(--bg-white-0)" 
          strokeWidth="4"
        />
      </svg>
    </div>
  );
}

/**
 * Decorative guide lines
 */
export function GuideLine({ 
  orientation = 'vertical',
  className = '' 
}: { 
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}) {
  const isVertical = orientation === 'vertical';
  
  return (
    <div 
      className={`absolute border-stroke-soft-200 ${
        isVertical ? 'border-l w-0 h-full' : 'border-t h-0 w-full'
      } ${className}`}
    />
  );
}

/**
 * Decorative background blur (SVG triangle with gaussian blur)
 */
export function BackgroundBlur({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <svg 
        width="934" 
        height="634" 
        viewBox="0 0 934 634" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <g opacity="0.06" filter="url(#filter0_f)">
          <path 
            d="M455.632 204.569C461.852 198.477 471.801 198.477 478.021 204.569L728.815 450.174C739.057 460.204 731.956 477.605 717.621 477.605H471.191H216.032C201.697 477.605 194.595 460.204 204.837 450.174L455.632 204.569Z" 
            fill="var(--static-black)"
          />
        </g>
        <defs>
          <filter 
            id="filter0_f" 
            x="0" 
            y="0" 
            width="933.653" 
            height="677.605" 
            filterUnits="userSpaceOnUse" 
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

/**
 * User icon with green accent for auth header
 */
export function AuthHeaderIcon() {
  return (
    <div className="p-3 bg-bg-white-0 rounded-[96px] border border-border-faded-lighter/10 inline-flex justify-center items-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_user)">
          <path 
            d="M16 2.6665C12.6863 2.6665 10 5.3528 10 8.6665C10 11.9802 12.6863 14.6665 16 14.6665C19.3137 14.6665 22 11.9802 22 8.6665C22 5.3528 19.3137 2.6665 16 2.6665Z" 
            fill="#1DAF61" 
            fillOpacity="0.56"
          />
        </g>
        <g filter="url(#filter1_i_user)">
          <path 
            d="M16.0021 16C10.8929 16 6.98256 19.0616 5.39481 23.3547C4.94091 24.582 5.25167 25.7917 5.97321 26.6516C6.67637 27.4896 7.76185 28 8.93117 28H23.0729C24.2422 28 25.3277 27.4896 26.0309 26.6516C26.7525 25.7917 27.0631 24.582 26.6093 23.3547C25.0215 19.0616 21.1113 16 16.0021 16Z" 
            fill="#1DAF61" 
            fillOpacity="0.56"
          />
        </g>
        <path 
          d="M24 17.5C25.5188 17.5 26.75 18.7312 26.75 20.25V21.25H27.75C29.2688 21.25 30.5 22.4812 30.5 24C30.5 25.5188 29.2688 26.75 27.75 26.75H26.75V27.75C26.75 29.2688 25.5188 30.5 24 30.5C22.4812 30.5 21.25 29.2688 21.25 27.75V26.75H20.25C18.7312 26.75 17.5 25.5188 17.5 24C17.5 22.4812 18.7312 21.25 20.25 21.25H21.25V20.25C21.25 18.7312 22.4812 17.5 24 17.5Z" 
          fill="var(--bg-white-0, #0E121B)" 
          stroke="var(--bg-white-0, #0E121B)" 
          strokeWidth="3"
        />
        <g filter="url(#filter2_i_user)">
          <path 
            d="M24 19C24.6904 19 25.25 19.5596 25.25 20.25V22.75H27.75C28.4404 22.75 29 23.3096 29 24C29 24.6904 28.4404 25.25 27.75 25.25H25.25V27.75C25.25 28.4404 24.6904 29 24 29C23.3096 29 22.75 28.4404 22.75 27.75V25.25H20.25C19.5596 25.25 19 24.6904 19 24C19 23.3096 19.5596 22.75 20.25 22.75H22.75V20.25C22.75 19.5596 23.3096 19 24 19Z" 
            fill="#1DAF61" 
            fillOpacity="0.56"
          />
        </g>
        <defs>
          <filter id="filter0_i_user" x="10" y="-0.333496" width="12" height="15" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-3"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </filter>
          <filter id="filter1_i_user" x="5.18237" y="13" width="21.6394" height="15" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-3"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </filter>
          <filter id="filter2_i_user" x="19" y="18" width="10" height="11" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="-1"/>
            <feGaussianBlur stdDeviation="1"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </filter>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Animated accent line that moves up and down
 */
export function AnimatedAccentLine({ 
  side,
  className = '' 
}: { 
  side: 'left' | 'right';
  className?: string;
}) {
  return (
    <div 
      className={`absolute w-0 h-60 border-l border-primary-base ${className}`}
      style={{
        animation: side === 'left' 
          ? 'slideUpDown 8s ease-in-out infinite' 
          : 'slideDownUp 8s ease-in-out infinite'
      }}
    />
  );
}
