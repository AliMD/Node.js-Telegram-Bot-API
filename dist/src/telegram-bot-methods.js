"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const debug = require('debug');
const log = debug('TelegramBotApi:methods');
const fs = require('fs');
const _extend = require('lodash/extend');
const telegram_bot_core_1 = require('./telegram-bot-core');
log('init');
/**
 * @class TelegramBotApi
 * extends TelegramBotApiCore with bot api methods
 */
class TelegramBotApi extends telegram_bot_core_1.default {
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token, options) {
        super(token, options);
        this.options = {
            gzip: true,
            autoChatAction: true,
            autoChatActionUploadOnly: true
        };
        _extend(this.options, options);
        log('constructor');
    }
    /**
     * Create fileReadStream from path or retur file_id
     * @param  {any} file
     */
    static fileIdOrReadStream(file) {
        return __awaiter(this, void 0, Promise, function* () {
            log(`fileIdOrReadStream for ${file}`);
            let isFile = false;
            try {
                isFile = fs.statSync(file).isFile();
            }
            catch (err) { }
            ; // skip err
            return !isFile ?
                file :
                fs.createReadStream(file, {
                    flags: 'r',
                    autoClose: true
                });
        });
    }
    /**
     * Send query for getUpdates from server
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getUpdates(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getUpdates', parameters);
        });
    }
    /**
     * Send query for setWebhook
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    setWebhook(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('setWebhook', parameters);
        });
    }
    /**
     * Send query for getMe
     * @returns {Promise} requet promise
     */
    getMe() {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendMessage');
        });
    }
    /**
     * Send query for sendMessage
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendMessage(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.typing
            }, false);
            return this.query('sendMessage', parameters);
        });
    }
    /**
     * Send query for forwardMessage
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    forwardMessage(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.typing
            }, false);
            return this.query('forwardMessage', parameters);
        });
    }
    /**
     * Send query for sendPhoto
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendPhoto(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            console.assert((parameters.caption || '').length <= 200, "Photo caption must be 0-200 characters");
            parameters.photo = yield TelegramBotApi.fileIdOrReadStream(parameters.photo);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_photo
            }, typeof parameters.photo !== 'string');
            return this.query('sendPhoto', parameters);
        });
    }
    /**
     * Send query for sendAudio
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendAudio(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            parameters.audio = yield TelegramBotApi.fileIdOrReadStream(parameters.audio);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_audio
            }, typeof parameters.audio !== 'string');
            return this.query('sendAudio', parameters);
        });
    }
    /**
     * Send query for sendDocument
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendDocument(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            parameters.document = yield TelegramBotApi.fileIdOrReadStream(parameters.document);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_document
            }, typeof parameters.document !== 'string');
            return this.query('sendDocument', parameters);
        });
    }
    /**
     * Send query for sendSticker
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendSticker(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            parameters.sticker = yield TelegramBotApi.fileIdOrReadStream(parameters.sticker);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_photo
            }, typeof parameters.sticker !== 'string');
            return this.query('sendSticker', parameters);
        });
    }
    /**
     * Send query for sendVideo
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVideo(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            parameters.video = yield TelegramBotApi.fileIdOrReadStream(parameters.video);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_video
            }, typeof parameters.video !== 'string');
            return this.query('sendVideo', parameters);
        });
    }
    /**
     * Send query for sendVoice
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVoice(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            parameters.voice = yield TelegramBotApi.fileIdOrReadStream(parameters.voice);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.record_audio
            }, typeof parameters.voice !== 'string');
            return this.query('sendVoice', parameters);
        });
    }
    /**
     * Send query for sendLocation
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendLocation(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.find_location
            }, false);
            return this.query('sendLocation', parameters);
        });
    }
    /**
     * Send query for sendVenue
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVenue(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.find_location
            }, false);
            return this.query('sendVenue', parameters);
        });
    }
    /**
     * Send query for sendContact
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendContact(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.typing
            }, false);
            return this.query('sendContact', parameters);
        });
    }
    /**
     * Send query for sendChatAction
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendChatAction(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendChatAction', parameters);
        });
    }
    _sendAutoChatAction(parameters, uploadMode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.options.autoChatAction)
                return false;
            else if (this.options.autoChatActionUploadOnly && !uploadMode)
                return false;
            else
                return this.sendChatAction(parameters);
        });
    }
    /**
     * Send query for getUserProfilePhotos
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getUserProfilePhotos(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getUserProfilePhotos', parameters);
        });
    }
    /**
     * Send query for getFile
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getFile(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getFile', parameters);
        });
    }
    /**
     * Send query for kickChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    kickChatMember(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('kickChatMember', parameters);
        });
    }
    /**
     * Send query for leaveChat
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    leaveChat(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('leaveChat', parameters);
        });
    }
    /**
     * Send query for unbanChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    unbanChatMember(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('unbanChatMember', parameters);
        });
    }
    /**
     * Send query for getChat
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChat(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getChat', parameters);
        });
    }
    /**
     * Send query for getChatAdministrators
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChatAdministrators(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getChatAdministrators', parameters);
        });
    }
    /**
     * Send query for getChatMembersCount
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChatMembersCount(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getChatMembersCount', parameters);
        });
    }
    /**
     * Send query for getChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getChatMember(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getChatMember', parameters);
        });
    }
    /**
     * Send query for answerCallbackQuery
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerCallbackQuery(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('answerCallbackQuery', parameters);
        });
    }
    // ..== Inline mode methods ==..
    /**
     * Send query for editMessageText
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageText(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('editMessageText', parameters);
        });
    }
    /**
     * Send query for editMessageCaption
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageCaption(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('editMessageCaption', parameters);
        });
    }
    /**
     * Send query for editMessageReplyMarkup
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageReplyMarkup(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('editMessageReplyMarkup', parameters);
        });
    }
    /**
     * Send query for answerInlineQuery
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerInlineQuery(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('answerInlineQuery', parameters);
        });
    }
}
TelegramBotApi.chatActions = {
    typing: 'typing',
    upload_photo: 'upload_photo',
    record_video: 'record_video',
    upload_video: 'upload_video',
    record_audio: 'record_audio',
    upload_audio: 'upload_audio',
    upload_document: 'upload_document',
    find_location: 'find_location'
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
