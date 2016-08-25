import TelegramBotApiCore from './core';
export declare type integer = string | number;
export declare type chatActions = 'typing' | 'upload_photo' | 'record_video' | 'upload_video' | 'record_audio' | 'upload_audio' | 'upload_document' | 'find_location';
export declare type parseMode = 'Markdown' | 'HTML';
/**
 * @class TelegramBotApi
 * extends TelegramBotApiCore with bot api methods
 */
export default class TelegramBotApi extends TelegramBotApiCore {
    options: {
        gzip: boolean;
        autoChatAction: boolean;
        autoChatActionUploadOnly: boolean;
    };
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token?: string, options?: {
        gzip?: boolean;
        autoChatAction?: boolean;
        autoChatActionUploadOnly?: boolean;
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
        offset?: integer;
        limit?: integer;
        timeout?: integer;
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
        chat_id: integer;
        text: string;
        parse_mode?: parseMode;
        disable_web_page_preview?: boolean;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string | Object;
    }): Promise<any>;
    /**
     * Send query for forwardMessage
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    forwardMessage(parameters: {
        chat_id: integer;
        from_chat_id: integer;
        message_id: integer;
        disable_notification?: boolean;
    }): Promise<any>;
    /**
     * Send query for sendPhoto
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendPhoto(parameters: {
        chat_id: integer;
        photo: string;
        caption?: string;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendAudio
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendAudio(parameters: {
        chat_id: integer;
        audio: string;
        duration?: number;
        performer?: string;
        title?: string;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendDocument
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendDocument(parameters: {
        chat_id: integer;
        document: string;
        caption?: string;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendSticker
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendSticker(parameters: {
        chat_id: integer;
        sticker: string;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendVideo
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVideo(parameters: {
        chat_id: integer;
        video: string;
        duration?: number;
        width?: number;
        height?: number;
        caption?: string;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendVoice
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVoice(parameters: {
        chat_id: integer;
        voice: string;
        duration?: number;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendLocation
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendLocation(parameters: {
        chat_id: integer;
        latitude: number;
        longitude: number;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendVenue
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVenue(parameters: {
        chat_id: integer;
        latitude: number;
        longitude: number;
        title: string;
        address: string;
        foursquare_id?: string;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for sendContact
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendContact(parameters: {
        chat_id: integer;
        phone_number: string;
        first_name: string;
        last_name: string;
        disable_notification?: boolean;
        reply_to_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    static chatActions: {
        typing: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
        upload_photo: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
        record_video: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
        upload_video: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
        record_audio: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
        upload_audio: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
        upload_document: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
        find_location: "typing" | "upload_photo" | "record_video" | "upload_video" | "record_audio" | "upload_audio" | "upload_document" | "find_location";
    };
    /**
     * Send query for sendChatAction
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendChatAction(parameters: {
        chat_id: integer;
        action: chatActions;
    }): Promise<any>;
    _sendAutoChatAction(parameters: {
        chat_id: integer;
        action: chatActions;
    }, uploadMode: boolean): Promise<any>;
    /**
     * Send query for getUserProfilePhotos
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getUserProfilePhotos(parameters: {
        chat_id: integer;
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
        chat_id: integer;
        user_id: integer;
    }): Promise<any>;
    /**
     * Send query for leaveChat
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    leaveChat(parameters: {
        chat_id: integer;
    }): Promise<any>;
    /**
     * Send query for unbanChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    unbanChatMember(parameters: {
        chat_id: integer;
        user_id: integer;
    }): Promise<any>;
    /**
     * Send query for getChat
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChat(parameters: {
        chat_id: integer;
    }): Promise<any>;
    /**
     * Send query for getChatAdministrators
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChatAdministrators(parameters: {
        chat_id: integer;
    }): Promise<any>;
    /**
     * Send query for getChatMembersCount
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChatMembersCount(parameters: {
        chat_id: integer;
    }): Promise<any>;
    /**
     * Send query for getChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChatMember(parameters: {
        chat_id: integer;
        user_id: number;
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
        chat_id?: integer;
        message_id?: integer;
        inline_message_id?: integer;
        text: string;
        parse_mode?: parseMode;
        disable_web_page_preview?: boolean;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for editMessageCaption
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageCaption(parameters: {
        chat_id?: integer;
        message_id?: integer;
        inline_message_id?: integer;
        caption?: string;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for editMessageReplyMarkup
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageReplyMarkup(parameters: {
        chat_id?: integer;
        message_id?: integer;
        inline_message_id?: integer;
        reply_markup?: string;
    }): Promise<any>;
    /**
     * Send query for answerInlineQuery
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerInlineQuery(parameters: {
        inline_query_id: integer;
        results: Array<Object>;
        cache_time?: number;
        is_personal?: boolean;
        next_offset?: string;
        switch_pm_text?: string;
        switch_pm_parameter?: string;
    }): Promise<any>;
}
