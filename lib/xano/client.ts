/**
 * Xano API Client
 * Base client for making requests to Xano backend
 */

const XANO_BASE_URL = process.env.NEXT_PUBLIC_XANO_BASE_URL || '';

export class XanoError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'XanoError';
  }
}

export interface XanoRequestOptions extends RequestInit {
  authToken?: string;
}

/**
 * Make a request to the Xano API
 */
export async function xanoFetch<T = unknown>(
  endpoint: string,
  options: XanoRequestOptions = {}
): Promise<T> {
  const { authToken, ...fetchOptions } = options;

  if (!XANO_BASE_URL) {
    throw new XanoError('Xano base URL is not configured');
  }

  const url = `${XANO_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add custom headers from options
  if (fetchOptions.headers) {
    Object.entries(fetchOptions.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        headers[key] = value;
      }
    });
  }

  // Add authorization header if token provided
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Parse response
    const data = await response.json();

    // Handle errors
    if (!response.ok) {
      throw new XanoError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data.code
      );
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof XanoError) {
      throw error;
    }
    
    // Network or parsing error
    throw new XanoError(
      error instanceof Error ? error.message : 'An unknown error occurred'
    );
  }
}

/**
 * Helper for GET requests
 */
export async function xanoGet<T = unknown>(
  endpoint: string,
  options?: XanoRequestOptions
): Promise<T> {
  return xanoFetch<T>(endpoint, { ...options, method: 'GET' });
}

/**
 * Helper for POST requests
 */
export async function xanoPost<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown>,
  options?: XanoRequestOptions
): Promise<T> {
  return xanoFetch<T>(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * Helper for PUT requests
 */
export async function xanoPut<T = unknown>(
  endpoint: string,
  body?: Record<string, unknown>,
  options?: XanoRequestOptions
): Promise<T> {
  return xanoFetch<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * Helper for DELETE requests
 */
export async function xanoDelete<T = unknown>(
  endpoint: string,
  options?: XanoRequestOptions
): Promise<T> {
  return xanoFetch<T>(endpoint, { ...options, method: 'DELETE' });
}
