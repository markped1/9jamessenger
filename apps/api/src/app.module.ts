import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ChatGateway } from './chat/chat.gateway';
import { AuthService } from './auth/auth.service';
import { AiService } from './ai/ai.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ChatGateway, AuthService, AiService],
})
export class AppModule {}
