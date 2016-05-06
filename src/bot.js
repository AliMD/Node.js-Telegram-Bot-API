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
 * @param {string} tocken
 */
const BASE_API_URL = 'https://api.telegram.org/';
class TelegramBot {
    constructor(token = '', opt) {
        this.token = token;
        this.options = {
            webhook: false,
            autoUpdate: true,
            updateInterval: 1000
        };
        log('new TelegramBot');
        console.assert(typeof token === 'string', 'token must be string');
        _extend(this.options, opt);
    }
    makeUrl(methodName) {
        return `${BASE_API_URL}bot${this.token}/${methodName}`;
    }
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
    sendMessage(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendMessage', parameters);
        });
    }
    forwardMessage(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('forwardMessage', parameters);
        });
    }
    sendPhoto(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendPhoto', parameters);
        });
    }
    sendAudio(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendAudio', parameters);
        });
    }
    sendDocument(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendDocument', parameters);
        });
    }
    sendSticker(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendSticker', parameters);
        });
    }
    sendVideo(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendVideo', parameters);
        });
    }
    sendVoice(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendVoice', parameters);
        });
    }
    sendLocation(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendLocation', parameters);
        });
    }
    sendVenue(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendVenue', parameters);
        });
    }
    sendContact(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendContact', parameters);
        });
    }
    sendChatAction(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('sendChatAction', parameters);
        });
    }
    getUserProfilePhotos(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getUserProfilePhotos', parameters);
        });
    }
    getFile(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('getFile', parameters);
        });
    }
    kickChatMember(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('kickChatMember', parameters);
        });
    }
    unbanChatMember(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('unbanChatMember', parameters);
        });
    }
    answerCallbackQuery(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('answerCallbackQuery', parameters);
        });
    }
    editMessageText(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('editMessageText', parameters);
        });
    }
    editMessageCaption(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('editMessageCaption', parameters);
        });
    }
    editMessageReplyMarkup(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('editMessageReplyMarkup', parameters);
        });
    }
    answerInlineQuery(parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return this.query('answerInlineQuery', parameters);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBot;
