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
const logEvents = debug('TelegramBotApi:events');
const EventEmitter = require('events');
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
        super(token, options);
        this.events = new EventEmitter();
        this.options = {
            gzip: true,
            autoChatAction: true,
            autoChatActionUploadOnly: false,
            autoUpdate: false,
            updateInterval: 1000,
            updateLimit: 50,
            updatePoolingTimeout: 0
        };
        this._updateOffset = 0;
        _extend(this.options, options);
        logEvents('constructor');
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
    /**
     * Emit special event
     * @param  {string} eventName
     * @param  {Function} listener
     */
    emit(eventName, ...args) {
        logEvents(`Emit ${eventName}`);
        let _this = this;
        setImmediate(() => {
            _this.events.emit(eventName, ...args);
        });
    }
    /**
     * Start auto update and set options.autoUpdate to true
     */
    startAutoUpdate() {
        log('startAutoUpdate');
        this.stopAutoUpdate();
        this.options.autoUpdate = true;
        this._startGetUpdates();
    }
    /**
     * Stop auto update and set options.autoUpdate to false
     */
    stopAutoUpdate() {
        log('stopAutoUpdate');
        clearTimeout(this._setTimeout);
        this.options.autoUpdate = false;
    }
    _startGetUpdates() {
        this._setTimeout = setTimeout(TelegramBotApi._getUpdates, this.options.updateInterval, this);
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
                if (data && data.ok && data.result && data.result.length) {
                    log('_getUpdates: new update');
                    data.result.forEach((item) => {
                        _this._onUpdate(item);
                        if (_this._updateOffset < item.update_id + 1)
                            _this._updateOffset = item.update_id + 1;
                    });
                }
            }
            catch (err) {
                log('_getUpdates:Error', err);
                console.log('TelegramBotApi Get Update Error!', err);
            }
            if (_this.options.autoUpdate) {
                _this._startGetUpdates();
            }
            else {
                log('autoUpdate canceled');
            }
        });
    }
    /**
     * When _getUpdates foud any new update call me
     * @param {any} item
     */
    _onUpdate(item) {
        log('_onUpdate: new update item');
        let data, eventName;
        this.emit('update', item);
        if ('inline_query' in item) {
            data = item.inline_query;
            eventName = 'inline_query';
        }
        if ('chosen_inline_result' in item) {
            data = item.chosen_inline_result;
            eventName = 'chosen_inline_result';
        }
        if ('callback_query' in item) {
            data = item.callback_query;
            eventName = 'callback_query';
        }
        if ('message' in item) {
            data = item.message;
            eventName = 'message';
            if ('new_chat_member' in data)
                eventName = 'new_chat_member';
            if ('left_chat_member' in data)
                eventName = 'left_chat_member';
            if ('new_chat_title' in data)
                eventName = 'new_chat_title';
            if ('new_chat_photo' in data)
                eventName = 'new_chat_photo';
            if ('delete_chat_photo' in data)
                eventName = 'delete_chat_photo';
            if ('group_chat_created' in data)
                eventName = 'group_chat_created';
            if ('supergroup_chat_created' in data)
                eventName = 'supergroup_chat_created';
            if ('channel_chat_created' in data)
                eventName = 'channel_chat_created';
            if ('migrate_to_chat_id' in data)
                eventName = 'migrate_to_supergroup';
            if ('migrate_from_chat_id' in data)
                eventName = 'migrate_to_supergroup';
            if ('pinned_message' in data)
                eventName = 'pinned_message';
        }
        this.emit(`update.${eventName}`, data);
        if (eventName === 'message') {
            let messageType;
            if ('text' in data)
                messageType = 'text';
            if ('audio' in data)
                messageType = 'audio';
            if ('document' in data)
                messageType = 'document';
            if ('photo' in data)
                messageType = 'photo';
            if ('sticker' in data)
                messageType = 'sticker';
            if ('video' in data)
                messageType = 'video';
            if ('voice' in data)
                messageType = 'voice';
            if ('contact' in data)
                messageType = 'contact';
            if ('location' in data)
                messageType = 'location';
            if ('venue' in data)
                messageType = 'venue';
            if ('pinned_message' in data)
                messageType = 'pinned_message';
            this.emit(`update.${eventName}.${messageType}`, data);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
