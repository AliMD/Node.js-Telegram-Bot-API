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
const _extend = require('lodash/extend');
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
    constructor(token = '', options) {
        this.token = token;
        this.options = {
            gzip: true
        };
        log('constructor');
        _extend(this.options, options);
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
                method: parameters ? 'POST' : 'GET',
                url: this.makeUrl(methodName),
                gzip: this.options.gzip,
                json: true
            };
            if (typeof parameters === 'object' && Object.keys(parameters).length) {
                for (let i in parameters)
                    if (typeof parameters[i] === 'number' || typeof parameters[i] === 'boolean')
                        parameters[i] += '';
                requestOptions.formData = parameters;
            }
            queryLog(methodName);
            //queryLog(requestOptions);
            let data = yield _1request_1.default(requestOptions);
            if (data.body && data.body.ok)
                return data.body;
            throw (data.body || data);
        });
    }
}
TelegramBotApi.baseApiUrl = 'https://api.telegram.org/bot';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
