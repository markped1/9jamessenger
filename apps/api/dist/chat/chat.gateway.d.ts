import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message } from '@9ja/core';
import { AiService } from '../ai/ai.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly aiService;
    server: Server;
    constructor(aiService: AiService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleMessage(message: Message): Promise<void>;
    handleTyping(data: {
        chatId: string;
        userId: string;
        isTyping: boolean;
    }): void;
}
