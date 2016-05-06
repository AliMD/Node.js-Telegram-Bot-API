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
const log = debug('TelegramBotApi:bot');
const queryLog = debug('TelegramBotApi:bot:query');
const _extend = require('lodash/extend');
const _1request_1 = require('./1request');
/**
 * @class TelegramBot
 */
class TelegramBot {
    /**
     * create a TelegramBot
     * @param {string} token
     * @param {Object} options
     */
    constructor(token = '', options) {
        this.token = token;
        this.options = {
            webhook: false,
            autoUpdate: true,
            updateInterval: 1000
        };
        log('new TelegramBot');
        console.assert(typeof token === 'string', 'token must be string');
        _extend(this.options, options);
    }
    /**
     * Make telegram api query url
     * @param {string} methodName
     * @returns {string} url
     */
    makeUrl(methodName) {
        return `${TelegramBot.baseApiUrl}${this.token}/${methodName}`;
    }
    /**
     * Send query to telegram api server
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    query(methodName, parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            let requestOptions = {
                url: this.makeUrl(methodName),
                qs: parameters
            };
            queryLog(requestOptions);
            return _1request_1.default(requestOptions)
                .then((data) => {
                let parsed = JSON.parse(data['body']);
                return parsed;
            });
        });
    }
    /**
     * Send query for getMe
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    getMe() {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendMessage');
        });
    }
    /**
     * Send query for sendMessage
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendMessage(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendMessage', parameters);
        });
    }
    /**
     * Send query for forwardMessage
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    forwardMessage(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('forwardMessage', parameters);
        });
    }
    /**
     * Send query for sendPhoto
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendPhoto(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            console.assert((parameters.caption || '').length <= 200, "Photo caption must be 0-200 characters");
            return this.query('sendPhoto', parameters);
        });
    }
    /**
     * Send query for sendAudio
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendAudio(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendAudio', parameters);
        });
    }
    /**
     * Send query for sendDocument
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendDocument(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendDocument', parameters);
        });
    }
    /**
     * Send query for sendSticker
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendSticker(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendSticker', parameters);
        });
    }
    /**
     * Send query for sendVideo
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVideo(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendVideo', parameters);
        });
    }
    /**
     * Send query for sendVoice
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVoice(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendVoice', parameters);
        });
    }
    /**
     * Send query for sendLocation
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendLocation(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendLocation', parameters);
        });
    }
    /**
     * Send query for sendVenue
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendVenue(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendVenue', parameters);
        });
    }
    /**
     * Send query for sendContact
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendContact(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendContact', parameters);
        });
    }
    /**
     * Send query for sendChatAction
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    sendChatAction(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendChatAction', parameters);
        });
    }
    /**
     * Send query for getUserProfilePhotos
     * @param  {string} methodName
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
     * @param  {string} methodName
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
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    kickChatMember(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('kickChatMember', parameters);
        });
    }
    /**
     * Send query for unbanChatMember
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    unbanChatMember(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('unbanChatMember', parameters);
        });
    }
    /**
     * Send query for answerCallbackQuery
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerCallbackQuery(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('answerCallbackQuery', parameters);
        });
    }
    /**
     * Send query for editMessageText
     * @param  {string} methodName
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
     * @param  {string} methodName
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
     * @param  {string} methodName
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
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    answerInlineQuery(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('answerInlineQuery', parameters);
        });
    }
}
TelegramBot.baseApiUrl = 'https://api.telegram.org/bot';
TelegramBot.chatActions = {
    typings: 'typings',
    upload_photo: 'upload_photo',
    record_video: 'record_video',
    upload_video: 'upload_video',
    record_audio: 'record_audio',
    upload_audio: 'upload_audio',
    upload_document: 'upload_document',
    find_location: 'find_location'
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBot;
