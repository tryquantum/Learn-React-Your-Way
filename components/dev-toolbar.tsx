"use client";

import { useEffect } from 'react';
import { initToolbar } from '@21st-extension/toolbar';

const stagewiseConfig = {
  plugins: [],
};

let toolbarInitialized = false;

export function DevToolbarInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (toolbarInitialized) return;

    toolbarInitialized = true;
    initToolbar(stagewiseConfig);
  }, []);

  return null;
}
