"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
let AiService = class AiService {
    constructor() {
        this.languages = {
            en: 'English',
            pcm: 'Nigerian Pidgin',
            yo: 'Yoruba',
            ha: 'Hausa',
            ig: 'Igbo',
            edo: 'Edo',
        };
    }
    async translate(text, targetLang) {
        console.log(`Translating to ${this.languages[targetLang]}: ${text}`);
        return `[Translated to ${this.languages[targetLang]}]: ${text}`;
    }
    async generateReply(messageHistory) {
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
    async summarize(messages) {
        return "Summary of the conversation: Discussion about the 9ja Messenger project and its progress.";
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map