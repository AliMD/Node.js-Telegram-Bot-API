/// <reference path="../typings/main.d.ts" />
"use strict";
const debug = require('debug');
const EventEmitter = require('events');
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
        this.events = new EventEmitter();
        this.options = {
            webhook: false,
            autoUpdate: true,
            updateInterval: 1000
        };
        log('constructor');
        _extend(this.options, options);
    }
    /**
     * Add event listener to events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    on(eventName, listener) {
        this.events.addListener(eventName, listener);
    }
    /**
     * Add one time event listener to events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    once(eventName, listener) {
        this.events.once(eventName, listener);
    }
    /**
     * Remove special listener from events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    off(eventName, listener) {
        this.events.removeListener(eventName, listener);
    }
    /**
     * Remove all listeners form events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    offAll(eventName) {
        this.events.removeAllListeners(eventName);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
