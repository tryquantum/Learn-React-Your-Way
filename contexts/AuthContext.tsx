'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/lib/xano';
import type { User, Workspace } from '@/lib/xano/types';

interface AuthContextType {
  user: User | null;
  workspace: Workspace | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ onboardingCompleted: boolean }>;
  logout: () => void;
  updateUser: (user: User) => void;
  updateWorkspace: (workspace: Workspace) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-login on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getAuthToken();
      const storedUser = authService.getStoredUser();
      const storedWorkspace = authService.getStoredWorkspace();

      if (token && storedUser) {
        try {
          // Optionally verify token is still valid by calling /auth/me
          // const currentUser = await authService.getCurrentUser(token);
          // setUser(currentUser);
          
          // For now, just use stored user
          setUser(storedUser);
          setWorkspace(storedWorkspace);
        } catch (error) {
          // Token invalid, clear storage
          authService.logout();
          setUser(null);
          setWorkspace(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ onboardingCompleted: boolean }> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      // Auth service already stores token, user, and workspace
      // Just update state
      setUser(response.user);
      setWorkspace(response.workspace);
      
      setIsLoading(false);
      
      // Return onboarding status for redirect logic
      return { onboardingCompleted: response.onboardingCompleted };
    } catch (error) {
      setIsLoading(false);
      throw error; // Re-throw so component can handle
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setWorkspace(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    authService.setStoredUser(updatedUser);
  };

  const updateWorkspace = (updatedWorkspace: Workspace) => {
    setWorkspace(updatedWorkspace);
    authService.setStoredWorkspace(updatedWorkspace);
  };

  const value: AuthContextType = {
    user,
    workspace,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
    updateWorkspace,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
