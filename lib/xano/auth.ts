/**
 * Xano Authentication Service
 */

import { xanoPost } from './client';
import type { AuthResponse, User, Workspace } from './types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  business_name: string;
  accept_terms: boolean;
  marketing_emails: boolean;
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: User;
}

/**
 * Login with email and password
 * Returns full auth response including onboarding status
 */
// Fix lint error by casting
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await xanoPost<any>('/auth/login', credentials as unknown as Record<string, unknown>);
  
  // Robustly handle potential string types from Xano
  let parsedUser = typeof response.user === 'string' 
    ? JSON.parse(response.user) 
    : response.user;
    
  // Construct 'name' field if missing (Xano uses first_name)
  if (!parsedUser.name && parsedUser.first_name) {
    parsedUser.name = parsedUser.first_name;
  }
  
  const safeResponse: AuthResponse = {
    ...response,
    // Ensure boolean
    onboardingCompleted: typeof response.onboardingCompleted === 'string' 
      ? response.onboardingCompleted === 'true' 
      : !!response.onboardingCompleted,
      
    // Use parsed and fixed user object
    user: parsedUser
  };
  
  // Store auth token
  if (safeResponse.authToken) {
    setAuthToken(safeResponse.authToken);
  } else {
    console.error('Login successful but no authToken returned', response);
  }
  
  // Store user data
  setStoredUser(safeResponse.user);
  
  // Store workspace if available
  if (safeResponse.workspace) {
    setStoredWorkspace(safeResponse.workspace);
  }
  
  return safeResponse;
}

/**
 * Sign up new user
 * Sends email verification, does NOT auto-login
 */
export async function signup(data: SignupData): Promise<SignupResponse> {
  const response = await xanoPost<any>('/auth/signup', data as unknown as Record<string, unknown>);
  
  return {
    ...response,
    // Ensure boolean
    success: typeof response.success === 'string' 
      ? response.success === 'true' 
      : !!response.success
  };
}

/**
 * Get current user info
 */
export async function getCurrentUser(authToken: string): Promise<User> {
  return xanoPost<User>('/auth/me', {}, { authToken });
}

/**
 * Logout (client-side token removal)
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('xano-auth-token');
    localStorage.removeItem('xano-user');
    localStorage.removeItem('xano-workspace');
  }
}

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('xano-auth-token');
}

/**
 * Store auth token
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('xano-auth-token', token);
  }
}

/**
 * Get stored user
 */
export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('xano-user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Store user
 */
export function setStoredUser(user: User): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('xano-user', JSON.stringify(user));
  }
}

/**
 * Get stored workspace
 */
export function getStoredWorkspace(): Workspace | null {
  if (typeof window === 'undefined') return null;
  const workspaceStr = localStorage.getItem('xano-workspace');
  return workspaceStr ? JSON.parse(workspaceStr) : null;
}

/**
 * Store workspace
 */
export function setStoredWorkspace(workspace: Workspace): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('xano-workspace', JSON.stringify(workspace));
  }
}
