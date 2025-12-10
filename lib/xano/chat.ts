/**
 * Xano Chat Service
 * Handles chat/AI assistant interactions with Xano backend
 */

import { xanoGet, xanoPost } from './client';
import type { ChatMessage, ChatConversation, SendMessageRequest, SendMessageResponse } from './types';

/**
 * Send a message to the AI assistant
 */
export async function sendMessage(
  request: SendMessageRequest,
  authToken: string
): Promise<SendMessageResponse> {
  return xanoPost<SendMessageResponse>('/chat/send', request, { authToken });
}

/**
 * Get all conversations for the current user
 */
export async function getConversations(authToken: string): Promise<ChatConversation[]> {
  return xanoGet<ChatConversation[]>('/chat/conversations', { authToken });
}

/**
 * Get a specific conversation by ID
 */
export async function getConversation(
  conversationId: number,
  authToken: string
): Promise<ChatConversation> {
  return xanoGet<ChatConversation>(`/chat/conversations/${conversationId}`, { authToken });
}

/**
 * Get messages for a specific conversation
 */
export async function getConversationMessages(
  conversationId: number,
  authToken: string
): Promise<ChatMessage[]> {
  return xanoGet<ChatMessage[]>(`/chat/conversations/${conversationId}/messages`, { authToken });
}

/**
 * Create a new conversation
 */
export async function createConversation(
  title: string,
  authToken: string
): Promise<ChatConversation> {
  return xanoPost<ChatConversation>('/chat/conversations', { title }, { authToken });
}

/**
 * Delete a conversation
 */
export async function deleteConversation(
  conversationId: number,
  authToken: string
): Promise<void> {
  return xanoPost<void>(`/chat/conversations/${conversationId}/delete`, {}, { authToken });
}

/**
 * Update conversation title
 */
export async function updateConversationTitle(
  conversationId: number,
  title: string,
  authToken: string
): Promise<ChatConversation> {
  return xanoPost<ChatConversation>(
    `/chat/conversations/${conversationId}/update`,
    { title },
    { authToken }
  );
}
