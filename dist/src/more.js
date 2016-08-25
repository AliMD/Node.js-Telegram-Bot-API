"use strict";
const debug = require('debug');
const log = debug('TelegramBotApi:more');
const events_1 = require('./events');
log('init');
/**
 * @class TelegramBotApi
 */
class TelegramBotApi extends events_1.default {
    /**
     * Create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token, options) {
        super(token, options);
        /**
         * Array of onMessage listeners
         * @private
         */
        this._onMsgListenerArray = [];
        /**
         * last _onMsgListenerArray item.id
         * @private
         */
        this._onMsgLastId = 0;
        this.on('update.message.text', this._onMsg.bind(this));
        log('constructor');
    }
    /**
     * Make loop on _onMsgListenerArray and if callBackFn return false break the loop
     * @private
     * @param {Function} callBackFn
     */
    _onMsgListenerLoop(callBackFn) {
        // log('_onMsgListenerLoop', callBackFn);
        let i = 0;
        let len = this._onMsgListenerArray.length;
        for (; i < len; i++) {
            // log(`_onMsgListenerLoop i`, callBackFn);
            if (callBackFn(this._onMsgListenerArray[i], i) === false)
                break;
        }
    }
    /**
     * Check patterns and call listeners
     * called when 'update.message.text' receive
     * @private
     * @param {any} msg
     */
    _onMsg(msg) {
        // log(`_onMsg: ${msg.text}`);
        this._onMsgListenerLoop((item) => {
            // log(item.pattern);
            if (item.pattern && item.pattern.test && item.pattern.test(msg.text)) {
                if (typeof item.listener === 'function') {
                    return item.listener(msg);
                }
            }
        });
    }
    /**
     * Make 'update.message.text' event on special regular expersion pattern
     * @param {RegExp} pattern
     * @param {Function} listener
     * @return {number} event id
     */
    onMessage(pattern, listener) {
        this._onMsgListenerArray.push({
            id: ++this._onMsgLastId,
            pattern: pattern,
            listener: listener
        });
        log(`onMessage (#${this._onMsgLastId})`, pattern);
        return this._onMsgLastId;
    }
    offMessage(id) {
        log(`offMessage (#${id})`);
        let removed = false;
        this._onMsgListenerLoop((item, index) => {
            if (item.id === id) {
                this._onMsgListenerArray.splice(index, 1);
                removed = true;
                return false; // break the loop;
            }
        });
        return removed;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBotApi;
