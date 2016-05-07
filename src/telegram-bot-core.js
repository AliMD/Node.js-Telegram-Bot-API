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
const log = debug('TelegramBotApi:core');
const queryLog = debug('TelegramBotApi:query');
const _1request_1 = require('./1request');
log('init');
/**
 * @class TelegramBotApi
 */
class TelegramBotApi {
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token = '') {
        this.token = token;
        log('constructor');
    }
    /**
     * Make telegram api query url
     * @param {string} methodName
     * @returns {string} url
     */
    makeUrl(methodName) {
        return `${TelegramBotApi.baseApiUrl}${this.token}/${methodName}`;
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
            queryLog(methodName, requestOptions);
            return _1request_1.default(requestOptions)
                .then((data) => {
                queryLog('then');
                let parsed = JSON.parse(data.body);
                if (parsed.ok)
                    return parsed;
                throw (parsed);
            });
        });
    }
}
TelegramBotApi.baseApiUrl = 'https://api.telegram.org/bot';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
