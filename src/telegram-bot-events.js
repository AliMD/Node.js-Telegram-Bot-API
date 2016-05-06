/// <reference path="../typings/main.d.ts" />
"use strict";
const debug = require('debug');
const EventEmitter = require('events');
const log = debug('TelegramBotApi:events');
const logUpdate = debug('TelegramBotApi:update');
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
            autoUpdate: true,
            updateInterval: 1000
        };
        log('constructor');
        _extend(this.options, options);
        if (this.options.autoUpdate) {
            this.startAutoUpdate();
        }
    }
    /**
     * Add event listener to events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    on(eventName, listener) {
        log(`on ${eventName}`);
        this.events.addListener(eventName, listener);
    }
    /**
     * Add one time event listener to events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    once(eventName, listener) {
        log(`once ${eventName}`);
        this.events.once(eventName, listener);
    }
    /**
     * Remove special listener from events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    off(eventName, listener) {
        log(`off ${eventName}`);
        this.events.removeListener(eventName, listener);
    }
    /**
     * Remove all listeners form events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    offAll(eventName) {
        log(`offAll ${eventName}`);
        if (eventName) {
            this.events.removeAllListeners(eventName);
        }
        else {
            this.events.removeAllListeners();
        }
    }
    _getUpdates(_this = this) {
        logUpdate('getInternalUpdates');
        if (!_this.options.autoUpdate) {
            return _this.stopAutoUpdate();
        }
        _this._setTimeout = setTimeout(_this._getUpdates, _this.options.updateInterval, _this);
    }
    startAutoUpdate(updateInterval = this.options.updateInterval) {
        this.stopAutoUpdate();
        this.options.autoUpdate = true;
        this.options.updateInterval = updateInterval;
        this._getUpdates();
    }
    stopAutoUpdate() {
        if (this.options.autoUpdate) {
            clearTimeout(this._setTimeout);
            this.options.autoUpdate = false;
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
