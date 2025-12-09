/**
 * Google Analytics utilities for tracking pageviews and events
 */

// Declare gtag on window for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Google Analytics measurement ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

/**
 * Track a pageview
 */
export const pageview = (url: string) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Track a custom event
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

/**
 * Track signup conversion
 */
export const trackSignup = (method?: string) => {
  event({
    action: 'sign_up',
    category: 'engagement',
    label: method || 'email',
  });
};

/**
 * Track login conversion
 */
export const trackLogin = (method?: string) => {
  event({
    action: 'login',
    category: 'engagement',
    label: method || 'email',
  });
};

/**
 * Track button click
 */
export const trackButtonClick = (buttonName: string) => {
  event({
    action: 'click',
    category: 'button',
    label: buttonName,
  });
};

/**
 * Track CTA (Call-to-Action) click
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  event({
    action: 'cta_click',
    category: 'conversion',
    label: `${location}: ${ctaName}`,
  });
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string) => {
  event({
    action: 'form_submit',
    category: 'engagement',
    label: formName,
  });
};

/**
 * Track pricing plan selection
 */
export const trackPlanSelect = (planName: string, planPrice: string) => {
  event({
    action: 'select_plan',
    category: 'conversion',
    label: `${planName} - ${planPrice}`,
  });
};

/**
 * Track social auth click
 */
export const trackSocialAuth = (provider: string) => {
  event({
    action: 'social_auth_click',
    category: 'engagement',
    label: provider,
  });
};

/**
 * Track navigation click
 */
export const trackNavigation = (destination: string) => {
  event({
    action: 'navigation',
    category: 'engagement',
    label: destination,
  });
};

/**
 * Track outbound link click
 */
export const trackOutboundLink = (url: string) => {
  event({
    action: 'outbound_link',
    category: 'engagement',
    label: url,
  });
};

/**
 * Track video play
 */
export const trackVideoPlay = (videoName: string) => {
  event({
    action: 'video_play',
    category: 'engagement',
    label: videoName,
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string) => {
  event({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
  });
};
