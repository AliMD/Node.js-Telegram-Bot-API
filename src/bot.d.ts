/// <reference path="../typings/main.d.ts" />
/**
 * @class TelegramBot
 */
export default class TelegramBot {
    token: string;
    options: Object;
    /**
     * create a TelegramBot
     * @param {string} token
     * @param {Object} options
     */
    constructor(token?: string, options?: {
        webhook?: boolean;
        autoUpdate?: boolean;
        updateInterval?: number;
    });
    /**
     * Make telegram api query url
     * @param {string} methodName
     * @returns {string} url
     */
    makeUrl(methodName: string): string;
    /**
     * Send query to telegram api server
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    query(methodName: string, parameters?: Object): Promise<{}>;
    /**
     * Send query for getMe
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getMe(): Promise<{}>;
    /**
     * Send query for sendMessage
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendMessage(parameters: {
        chat_id: number | string;
        text: string;
        parse_mode?: string;
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        reply_to_message_id?: number;
        reply_markup?: string | Object;
    }): Promise<{}>;
    /**
     * Send query for forwardMessage
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    forwardMessage(parameters: Object): Promise<{}>;
    /**
     * Send query for sendPhoto
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendPhoto(parameters: Object): Promise<{}>;
    /**
     * Send query for sendAudio
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendAudio(parameters: Object): Promise<{}>;
    /**
     * Send query for sendDocument
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendDocument(parameters: Object): Promise<{}>;
    /**
     * Send query for sendSticker
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendSticker(parameters: Object): Promise<{}>;
    /**
     * Send query for sendVideo
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVideo(parameters: Object): Promise<{}>;
    /**
     * Send query for sendVoice
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVoice(parameters: Object): Promise<{}>;
    /**
     * Send query for sendLocation
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendLocation(parameters: Object): Promise<{}>;
    /**
     * Send query for sendVenue
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVenue(parameters: Object): Promise<{}>;
    /**
     * Send query for sendContact
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendContact(parameters: Object): Promise<{}>;
    /**
     * Send query for sendChatAction
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendChatAction(parameters: Object): Promise<{}>;
    /**
     * Send query for getUserProfilePhotos
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getUserProfilePhotos(parameters: Object): Promise<{}>;
    /**
     * Send query for getFile
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getFile(parameters: Object): Promise<{}>;
    /**
     * Send query for kickChatMember
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    kickChatMember(parameters: Object): Promise<{}>;
    /**
     * Send query for unbanChatMember
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    unbanChatMember(parameters: Object): Promise<{}>;
    /**
     * Send query for answerCallbackQuery
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerCallbackQuery(parameters: Object): Promise<{}>;
    /**
     * Send query for editMessageText
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageText(parameters: Object): Promise<{}>;
    /**
     * Send query for editMessageCaption
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageCaption(parameters: Object): Promise<{}>;
    /**
     * Send query for editMessageReplyMarkup
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageReplyMarkup(parameters: Object): Promise<{}>;
    /**
     * Send query for answerInlineQuery
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerInlineQuery(parameters: Object): Promise<{}>;
}
