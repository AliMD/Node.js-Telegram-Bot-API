/// <reference path="../typings/main.d.ts" />
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
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'getUpdates', parameters);
        });
    }
    /**
     * Send query for setWebhook
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    setWebhook(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'setWebhook', parameters);
        });
    }
    /**
     * Send query for getMe
     * @returns {Promise} requet promise
     */
    getMe() {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'sendMessage');
        });
    }
    /**
     * Send query for sendMessage
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendMessage(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.typing
            }, false);
            return _super("query").call(this, 'sendMessage', parameters);
        });
    }
    /**
     * Send query for forwardMessage
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    forwardMessage(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.typing
            }, false);
            return _super("query").call(this, 'forwardMessage', parameters);
        });
    }
    /**
     * Send query for sendPhoto
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendPhoto(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            console.assert((parameters.caption || '').length <= 200, "Photo caption must be 0-200 characters");
            parameters.photo = yield TelegramBotApi.fileIdOrReadStream(parameters.photo);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_photo
            }, typeof parameters.photo !== 'string');
            return _super("query").call(this, 'sendPhoto', parameters);
        });
    }
    /**
     * Send query for sendAudio
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendAudio(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            parameters.audio = yield TelegramBotApi.fileIdOrReadStream(parameters.audio);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_audio
            }, typeof parameters.audio !== 'string');
            return _super("query").call(this, 'sendAudio', parameters);
        });
    }
    /**
     * Send query for sendDocument
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendDocument(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            parameters.document = yield TelegramBotApi.fileIdOrReadStream(parameters.document);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_document
            }, typeof parameters.document !== 'string');
            return _super("query").call(this, 'sendDocument', parameters);
        });
    }
    /**
     * Send query for sendSticker
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendSticker(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            parameters.sticker = yield TelegramBotApi.fileIdOrReadStream(parameters.sticker);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_photo
            }, typeof parameters.sticker !== 'string');
            return _super("query").call(this, 'sendSticker', parameters);
        });
    }
    /**
     * Send query for sendVideo
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVideo(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            parameters.video = yield TelegramBotApi.fileIdOrReadStream(parameters.video);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.upload_video
            }, typeof parameters.video !== 'string');
            return _super("query").call(this, 'sendVideo', parameters);
        });
    }
    /**
     * Send query for sendVoice
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVoice(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            parameters.voice = yield TelegramBotApi.fileIdOrReadStream(parameters.voice);
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.record_audio
            }, typeof parameters.voice !== 'string');
            return _super("query").call(this, 'sendVoice', parameters);
        });
    }
    /**
     * Send query for sendLocation
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendLocation(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.find_location
            }, false);
            return _super("query").call(this, 'sendLocation', parameters);
        });
    }
    /**
     * Send query for sendVenue
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVenue(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.find_location
            }, false);
            return _super("query").call(this, 'sendVenue', parameters);
        });
    }
    /**
     * Send query for sendContact
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendContact(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            yield this._sendAutoChatAction({
                chat_id: parameters.chat_id,
                action: TelegramBotApi.chatActions.typing
            }, false);
            return _super("query").call(this, 'sendContact', parameters);
        });
    }
    /**
     * Send query for sendChatAction
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendChatAction(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'sendChatAction', parameters);
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
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'getUserProfilePhotos', parameters);
        });
    }
    /**
     * Send query for getFile
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getFile(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'getFile', parameters);
        });
    }
    /**
     * Send query for kickChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    kickChatMember(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'kickChatMember', parameters);
        });
    }
    /**
     * Send query for unbanChatMember
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    unbanChatMember(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'unbanChatMember', parameters);
        });
    }
    /**
     * Send query for answerCallbackQuery
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerCallbackQuery(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'answerCallbackQuery', parameters);
        });
    }
    /**
     * Send query for editMessageText
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageText(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'editMessageText', parameters);
        });
    }
    /**
     * Send query for editMessageCaption
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageCaption(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'editMessageCaption', parameters);
        });
    }
    /**
     * Send query for editMessageReplyMarkup
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    editMessageReplyMarkup(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'editMessageReplyMarkup', parameters);
        });
    }
    /**
     * Send query for answerInlineQuery
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerInlineQuery(parameters) {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            return _super("query").call(this, 'answerInlineQuery', parameters);
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
