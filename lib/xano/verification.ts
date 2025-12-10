/**
 * Xano Authentication Service - Email Verification Methods
 */

import { xanoPost } from './client';

export interface VerifyEmailData {
  email: string;
  token: number; // 6-digit OTP as integer
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface ResendOTPData {
  email: string;
}

export interface ResendOTPResponse {
  success: boolean;
  message: string;
}

/**
 * Verify email with 6-digit OTP token
 * NOTE: This only verifies the email, does NOT auto-login
 * User must login after verification
 */
export async function verifyEmail(data: VerifyEmailData): Promise<VerifyEmailResponse> {
  const response = await xanoPost<VerifyEmailResponse>('/auth/verify_email', data);
  return response;
}

/**
 * Resend OTP code to email
 */
export async function resendOTP(data: ResendOTPData): Promise<ResendOTPResponse> {
  return xanoPost<ResendOTPResponse>('/auth/resend_otp', data);
}

