# Xano API Documentation

This directory contains the integration layer for Xano backend services.

## 📁 Structure

```
/lib/xano/
├── client.ts      → Base API client with error handling
├── types.ts       → TypeScript type definitions
├── auth.ts        → Authentication service
├── chat.ts        → Chat/AI assistant service
└── index.ts       → Central exports
```

## 🔧 Setup

### 1. Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_XANO_BASE_URL=https://your-workspace.xano.io/api:your-branch
```

**Never commit `.env.local` to GitHub!**

### 2. Update Types

Update `types.ts` to match your actual Xano database schema.

## 📚 Usage Examples

### Authentication

```typescript
import { authService } from '@/lib/xano';

// Login
const { authToken, user } = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Store token
authService.setAuthToken(authToken);
authService.setStoredUser(user);
```

### Chat

```typescript
import { chatService } from '@/lib/xano';

// Send message
const response = await chatService.sendMessage(
  {
    message: 'Hello AI!',
    conversation_id: 1
  },
  authToken
);

// Get conversations
const conversations = await chatService.getConversations(authToken);
```

## 🔐 Security Notes

- **Never commit** `.env.local` or any file with API keys
- Only use `NEXT_PUBLIC_` prefix for client-safe values
- Store sensitive keys in server-side env variables only
- Auth tokens are stored in localStorage (client-side)

## 📝 Xano Endpoints Expected

This integration expects the following Xano endpoints:

### Authentication
- `POST /auth/login` - Login user
- `POST /auth/signup` - Create new user
- `POST /auth/me` - Get current user

### Chat
- `POST /chat/send` - Send message to AI
- `GET /chat/conversations` - Get all conversations
- `GET /chat/conversations/:id` - Get specific conversation
- `GET /chat/conversations/:id/messages` - Get conversation messages
- `POST /chat/conversations` - Create new conversation
- `POST /chat/conversations/:id/delete` - Delete conversation
- `POST /chat/conversations/:id/update` - Update conversation title

## 🎯 Next Steps

1. Create these endpoints in Xano dashboard
2. Test endpoints in Xano
3. Update types in `types.ts` if schema differs
4. Build React hooks in `/hooks` directory
