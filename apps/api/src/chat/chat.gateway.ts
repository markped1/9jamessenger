import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from '@9ja/core';
import { AiService } from '../ai/ai.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly aiService: AiService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(`user_${userId}`);
      console.log(`User connected: ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() message: Message) {
    // 1. Acknowledge message to sender
    this.server.to(`user_${message.senderId}`).emit('messageSent', message);
    
    // 2. Broadcast to all (for testing)
    this.server.emit('newMessage', message); 

    // 3. AI Automated Reply (Delayed for realism)
    if (!message.content.includes('[AI]')) {
      setTimeout(async () => {
        const aiReplyContent = await this.aiService.generateReply([message]);
        const aiReply: Message = {
          id: `ai_${Date.now()}`,
          chatId: message.chatId,
          senderId: 'ai_assistant',
          content: `[AI Assistant]: ${aiReplyContent}`,
          type: 'text',
          timestamp: new Date(),
          status: 'sent'
        };
        this.server.emit('newMessage', aiReply);
      }, 1500);
    }
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: { chatId: string; userId: string; isTyping: boolean }) {
    this.server.emit('userTyping', data);
  }
}
