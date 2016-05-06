/// <reference path="../typings/main.d.ts" />
export default class TelegramBot {
    token: string;
    options: Object;
    constructor(token: string, opt: {
        webhook: boolean;
        autoUpdate: boolean;
        updateInterval: number;
    });
    makeUrl(methodName: string): string;
    query(methodName: string, parameters?: Object): Promise<{}>;
    getMe(): Promise<{}>;
    sendMessage(parameters: Object): Promise<{}>;
    forwardMessage(parameters: Object): Promise<{}>;
    sendPhoto(parameters: Object): Promise<{}>;
    sendAudio(parameters: Object): Promise<{}>;
    sendDocument(parameters: Object): Promise<{}>;
    sendSticker(parameters: Object): Promise<{}>;
    sendVideo(parameters: Object): Promise<{}>;
    sendVoice(parameters: Object): Promise<{}>;
    sendLocation(parameters: Object): Promise<{}>;
    sendVenue(parameters: Object): Promise<{}>;
    sendContact(parameters: Object): Promise<{}>;
    sendChatAction(parameters: Object): Promise<{}>;
    getUserProfilePhotos(parameters: Object): Promise<{}>;
    getFile(parameters: Object): Promise<{}>;
    kickChatMember(parameters: Object): Promise<{}>;
    unbanChatMember(parameters: Object): Promise<{}>;
    answerCallbackQuery(parameters: Object): Promise<{}>;
    editMessageText(parameters: Object): Promise<{}>;
    editMessageCaption(parameters: Object): Promise<{}>;
    editMessageReplyMarkup(parameters: Object): Promise<{}>;
    answerInlineQuery(parameters: Object): Promise<{}>;
}
