import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  phoneNumber: z.string().optional(),
  displayName: z.string(),
  photoURL: z.string().optional(),
  bio: z.string().optional(),
  isBusiness: z.boolean().default(false),
  lastSeen: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const MessageSchema = z.object({
  id: z.string(),
  chatId: z.string(),
  senderId: z.string(),
  content: z.string(),
  type: z.enum(['text', 'image', 'video', 'audio', 'file', 'location', 'poll']),
  metadata: z.record(z.any()).optional(),
  timestamp: z.date(),
  status: z.enum(['sent', 'delivered', 'read']).default('sent'),
});

export type Message = z.infer<typeof MessageSchema>;

export const ChatSchema = z.object({
  id: z.string(),
  type: z.enum(['one-to-one', 'group', 'channel', 'community']),
  participants: z.array(z.string()),
  name: z.string().optional(),
  avatar: z.string().optional(),
  lastMessage: MessageSchema.optional(),
  unreadCount: z.number().default(0),
});

export type Chat = z.infer<typeof ChatSchema>;
