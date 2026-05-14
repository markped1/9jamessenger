export declare class AiService {
    private languages;
    translate(text: string, targetLang: keyof typeof this.languages): Promise<string>;
    generateReply(messageHistory: any[]): Promise<string>;
    summarize(messages: string[]): Promise<string>;
}
