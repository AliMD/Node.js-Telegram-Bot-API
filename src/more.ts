import debug = require('debug');
const log = debug('TelegramBotApi:more');

import TelegramBotApiEvent from './events'

log('init');

/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiEvent{
  /**
   * Create a TelegramBotApi
   * @param {string} token
   * @param {Object} options
   */
  constructor(token?: string, options?: {
    gzip?: boolean,
    autoChatAction?: boolean,
    autoChatActionUploadOnly?: boolean,
    autoUpdate?: boolean,
    updateInterval?: number,
    updateLimit?: number,
    updatePoolingTimeout?: number
  }) {
    super(token, options);

    this.on('update.message.text', this._onMsg);

    log('constructor');
  }

  /**
   * Array of onMessage listeners
   * @private
   */
  private _onMsgListenerArray: Array<{
    id: number,
    pattern: RegExp,
    listener: Function
  }> = [];

  /**
   * last _onMsgListenerArray item.id
   * @private
   */
  private _onMsgLastId: number = 0;

  /**
   * Make loop on _onMsgListenerArray and if callBackFn return false break the loop
   * @private
   * @param {Function} callBackFn
   */
  private _onMsgListenerLoop (callBackFn: Function) {
    let i: number = 0;
    let len: number = this._onMsgListenerArray.length;
    for (; i < len; i++) {
      if (callBackFn(this._onMsgListenerArray[i], i) === false) break;
    }
  }

  /**
   * Check patterns and call listeners
   * called when 'update.message.text' receive
   * @private
   * @param {any} msg
   */
  private async _onMsg (msg) {
   this._onMsgListenerLoop((item) => {
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
  onMessage (pattern: RegExp, listener: Function): number {
    this._onMsgListenerArray.push({
      id: ++this._onMsgLastId,
      pattern: pattern,
      listener: listener
    });
    log(`onMessage (#${this._onMsgLastId})`, pattern);
    return this._onMsgLastId;
  }

  offMessage (id: number): boolean {
    log(`offMessage (#${id})`);
    let removed: boolean = false;
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
