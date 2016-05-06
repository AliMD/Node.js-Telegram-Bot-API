/// <reference path="../typings/main.d.ts" />
"use strict";
const debug = require('debug');
const log = debug('TelegramBotApi:events');
const _extend = require('lodash/extend');
const telegram_bot_methods_1 = require('./telegram-bot-methods');
log('init');
/**
 * @class TelegramBotApi
 */
class TelegramBotApi extends telegram_bot_methods_1.default {
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token, options) {
        super(token);
        this.options = {
            webhook: false,
            autoUpdate: true,
            updateInterval: 1000
        };
        log('constructor');
        _extend(this.options, options);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
