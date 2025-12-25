/**
 * Map Xano authentication errors to user-friendly messages
 */

export function mapErrorToMessage(error: string): string {
  const errorMap: Record<string, string> = {
    'Invalid email or password': 'Invalid email or password. Please try again.',
    'Account suspended. Contact support@growtiva.com': 'Your account has been suspended. Contact support@growtiva.com',
    'Account is suspended or deleted. Contact support@growtiva.com': 'Your account has been suspended. Contact support@growtiva.com',
    'Please verify your email first. Check your inbox': 'Please verify your email before logging in. Check your inbox for the verification link.',
    'Please verify your email first': 'Please verify your email before logging in. Check your inbox for the verification link.',
    'Password must be at least 8 characters': 'Password must be at least 8 characters long.',
    'Too many login attempts': 'Too many login attempts. Please try again later.',
  };

  // Return raw error if no mapping found (for debugging)
  return errorMap[error] || error;
}

/**
 * Determine if error is a network/connection error
 */
export function isNetworkError(error: any): boolean {
  return (
    error instanceof TypeError ||
    error.message?.includes('fetch') ||
    error.message?.includes('network') ||
    error.message?.includes('Failed to fetch')
  );
}
