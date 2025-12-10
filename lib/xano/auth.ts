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
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await xanoPost<AuthResponse>('/auth/login', credentials);
  
  // Store auth token
  setAuthToken(response.authToken);
  
  // Store user data
  setStoredUser(response.user);
  
  // Store workspace if available
  if (response.workspace) {
    setStoredWorkspace(response.workspace);
  }
  
  return response;
}

/**
 * Sign up new user
 * Sends email verification, does NOT auto-login
 */
export async function signup(data: SignupData): Promise<SignupResponse> {
  const response = await xanoPost<SignupResponse>('/auth/signup', data);
  return response;
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
