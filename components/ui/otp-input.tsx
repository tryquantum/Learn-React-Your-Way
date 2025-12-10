'use client';

import React, { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function OTPInput({ 
  length = 6, 
  value, 
  onChange, 
  disabled = false,
  autoFocus = true 
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update internal state when value prop changes
  useEffect(() => {
    const otpArray = value.split('').slice(0, length);
    setOtp([...otpArray, ...Array(length - otpArray.length).fill('')]);
  }, [value, length]);

  const handleChange = (index: number, digit: string) => {
    if (disabled) return;

    // Only allow digits
    if (digit && !/^\d$/.test(digit)) return;

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current input is empty, move to previous and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    }
    
    // Handle left/right arrows
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    const pastedDigits = pastedData.replace(/\D/g, '').slice(0, length);

    if (pastedDigits) {
      const newOtp = pastedDigits.split('');
      const fullOtp = [...newOtp, ...Array(length - newOtp.length).fill('')];
      setOtp(fullOtp);
      onChange(newOtp.join(''));

      // Focus the next empty input or last input
      const nextIndex = Math.min(newOtp.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          className={`
            w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-semibold
            bg-bg-white-0 border-2 rounded-xl
            transition-all duration-200
            ${digit 
              ? 'border-primary-base text-text-strong-950' 
              : 'border-stroke-soft-200 text-text-sub-600'
            }
            ${disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:border-primary-alpha-32 focus:border-primary-base focus:outline-none focus:ring-2 focus:ring-primary-alpha-16'
            }
          `}
        />
      ))}
    </div>
  );
}
