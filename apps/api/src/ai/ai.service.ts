import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  private languages = {
    en: 'English',
    pcm: 'Nigerian Pidgin',
    yo: 'Yoruba',
    ha: 'Hausa',
    ig: 'Igbo',
    edo: 'Edo',
  };

  async translate(text: string, targetLang: keyof typeof this.languages) {
    console.log(`Translating to ${this.languages[targetLang]}: ${text}`);
    // Placeholder for actual AI integration (e.g., HuggingFace or Ollama)
    return `[Translated to ${this.languages[targetLang]}]: ${text}`;
  }

  async generateReply(messageHistory: any[]) {
    const lastMessage = messageHistory[messageHistory.length - 1].content.toLowerCase();
    
    if (lastMessage.includes('hello') || lastMessage.includes('hey')) {
      const greetings = [
        "How far! Welcome to 9ja Messenger. Wetin dey occur?",
        "Bawoni! I'm here to help you connect with your people.",
        "Sanu! How can I assist you today?",
        "Welcome! Experience the future of African communication."
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    if (lastMessage.includes('apk') || lastMessage.includes('install')) {
      return "I see you're working on the mobile build! Once the APK is ready, you can install it on any Android device. Make sure to enable 'Unknown Sources' in settings.";
    }

    return "9ja Messenger is steady growing! We're building the best communication ecosystem for Nigeria and the World. 🚀";
  }

  async summarize(messages: string[]) {
    return "Summary of the conversation: Discussion about the 9ja Messenger project and its progress.";
  }
}
