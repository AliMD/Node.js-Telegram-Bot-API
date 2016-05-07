/// <reference path="../typings/main.d.ts" />
import TelegramBotApiCore from './telegram-bot-core';
/**
 * @class TelegramBotApi
 * extends TelegramBotApiCore with bot api methods
 */
export default class TelegramBotApi extends TelegramBotApiCore {
    options: {
        gzip: boolean;
        autoChatAction: boolean;
    };
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token?: string, options?: {
        gzip?: boolean;
        autoChatAction?: boolean;
    });
    /**
     * Create fileReadStream from path or retur file_id
     * @param  {any} file
     */
    static fileIdOrReadStream(file: string): Promise<any>;
    /**
     * Send query for getUpdates from server
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getUpdates(parameters: {
        offset?: number | string;
        limit?: number | string;
        timeout?: number | string;
    }): Promise<any>;
    /**
     * Send query for setWebhook
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    setWebhook(parameters: {
        url?: string;
        certificate?: string;
    }): Promise<any>;
    /**
     * Send query for getMe
     * @returns {Promise} requet promise
     */
    getMe(): Promise<any>;
    /**
     * Send query for sendMessage
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendMessage(parameters: {
        chat_id: number | string;
        text: string;
        parse_mode?: string;
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string | Object;
    }): Promise<any>;
    /**
     * Send query for forwardMessage
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    forwardMessage(parameters: {
        chat_id: number | string;
        from_chat_id: number | string;
        message_id: number | string;
        disable_notification?: boolean;
    }): Promise<any>;
    /**
     * Send query for sendPhoto
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendPhoto(parameters: {
        chat_id: number | string;
        photo: string;
        caption?: string;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendAudio
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendAudio(parameters: {
        chat_id: number | string;
        audio: string;
        duration?: number;
        performer?: string;
        title?: string;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendDocument
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendDocument(parameters: {
        chat_id: number | string;
        document: string;
        caption?: string;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendSticker
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendSticker(parameters: {
        chat_id: number | string;
        sticker: string;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendVideo
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVideo(parameters: {
        chat_id: number | string;
        video: string;
        duration?: number;
        width?: number;
        height?: number;
        caption?: string;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendVoice
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVoice(parameters: {
        chat_id: number | string;
        voice: string;
        duration?: number;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendLocation
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendLocation(parameters: {
        chat_id: number | string;
        latitude: number;
        longitude: number;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendVenue
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVenue(parameters: {
        chat_id: number | string;
        latitude: number;
        longitude: number;
        title: string;
        address: string;
        foursquare_id?: string;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendContact
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendContact(parameters: {
        chat_id: number | string;
        phone_number: string;
        first_name: string;
        last_name: string;
        disable_notification?: boolean;
        reply_to_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    static chatActions: {
        typings: string;
        upload_photo: string;
        record_video: string;
        upload_video: string;
        record_audio: string;
        upload_audio: string;
        upload_document: string;
        find_location: string;
    };
    /**
     * Send query for sendChatAction
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendChatAction(parameters: {
        chat_id: number | string;
        action: string;
    }): Promise<any>;
    /**
     * Send query for getUserProfilePhotos
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getUserProfilePhotos(parameters: {
        chat_id: number | string;
        offset?: number;
        limit?: number;
    }): Promise<any>;
    /**
     * Send query for getFile
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getFile(parameters: {
        file_id: string;
    }): Promise<any>;
    /**
     * Send query for kickChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    kickChatMember(parameters: {
        chat_id: number | string;
        user_id: number | string;
    }): Promise<any>;
    /**
     * Send query for unbanChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    unbanChatMember(parameters: {
        chat_id: number | string;
        user_id: number | string;
    }): Promise<any>;
    /**
     * Send query for answerCallbackQuery
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerCallbackQuery(parameters: {
        callback_query_id: string;
        text?: string;
        show_alert?: boolean;
    }): Promise<any>;
    /**
     * Send query for editMessageText
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageText(parameters: {
        chat_id?: number | string;
        message_id?: number | string;
        inline_message_id?: number | string;
        text: string;
        parse_mode?: string;
        disable_web_page_preview?: boolean;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for editMessageCaption
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageCaption(parameters: {
        chat_id?: number | string;
        message_id?: number | string;
        inline_message_id?: number | string;
        caption?: string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for editMessageReplyMarkup
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageReplyMarkup(parameters: {
        chat_id?: number | string;
        message_id?: number | string;
        inline_message_id?: number | string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for answerInlineQuery
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerInlineQuery(parameters: {
        inline_query_id: number | string;
        results: Array<Object>;
        cache_time?: number;
        is_personal?: boolean;
        next_offset?: string;
        switch_pm_text?: string;
        switch_pm_parameter?: string;
    }): Promise<any>;
}
