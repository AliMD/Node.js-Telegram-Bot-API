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
const EventEmitter = require('events');
const logEvents = debug('TelegramBotApi:events');
const log = debug('TelegramBotApi:update');
const _extend = require('lodash/extend');
const telegram_bot_methods_1 = require('./telegram-bot-methods');
logEvents('init');
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
            autoUpdate: false,
            updateInterval: 1000,
            updateLimit: 50,
            updatePoolingTimeout: 0
        };
        this._updateOffset = 0;
        logEvents('constructor');
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
        logEvents(`on ${eventName}`);
        this.events.addListener(eventName, listener);
    }
    /**
     * Add one time event listener to events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    once(eventName, listener) {
        logEvents(`once ${eventName}`);
        this.events.once(eventName, listener);
    }
    /**
     * Remove special listener from events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    off(eventName, listener) {
        logEvents(`off ${eventName}`);
        this.events.removeListener(eventName, listener);
    }
    /**
     * Remove all listeners form events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    offAll(eventName) {
        logEvents(`offAll ${eventName}`);
        if (eventName) {
            this.events.removeAllListeners(eventName);
        }
        else {
            this.events.removeAllListeners();
        }
    }
    static _getUpdates(_this) {
        return __awaiter(this, void 0, void 0, function* () {
            log('_getUpdates');
            try {
                let data = yield _this.getUpdates({
                    offset: _this._updateOffset,
                    limit: _this.options.updateLimit,
                    timeout: _this.options.updatePoolingTimeout
                });
                if (data && data.ok && data.result) {
                    data.result.forEach((item) => {
                        _this._updateOffset = item.update_id + 1;
                        let eventName;
                        if ('message' in item)
                            eventName = 'message';
                        if ('inline_query' in item)
                            eventName = 'inline_query';
                        if ('chosen_inline_result' in item)
                            eventName = 'chosen_inline_result';
                        if ('callback_query' in item)
                            eventName = 'callback_query';
                        setImmediate(() => {
                            _this.events.emit('update', data);
                            _this.events.emit(`update.${eventName}`, data);
                        });
                    });
                }
            }
            catch (err) {
                log('_getUpdates:Error', err);
            }
            if (_this.options.autoUpdate) {
                _this._startGetUpdates();
            }
            else {
                log('autoUpdate canceled');
            }
        });
    }
    _startGetUpdates() {
        this._setTimeout = setTimeout(TelegramBotApi._getUpdates, this.options.updateInterval, this);
    }
    startAutoUpdate(updateInterval = this.options.updateInterval) {
        log('startAutoUpdate');
        this.stopAutoUpdate();
        this.options.autoUpdate = true;
        this.options.updateInterval = updateInterval;
        this._startGetUpdates();
    }
    stopAutoUpdate() {
        log('stopAutoUpdate');
        clearTimeout(this._setTimeout);
        this.options.autoUpdate = false;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
