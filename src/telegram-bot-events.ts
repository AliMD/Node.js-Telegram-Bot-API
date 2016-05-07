/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const EventEmitter = require('events');
const logEvents = debug('TelegramBotApi:events');
const log = debug('TelegramBotApi:update');
const _extend = require('lodash/extend');

import TelegramBotApiMethods from './telegram-bot-methods'

logEvents('init');

/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiMethods{
  public events = new EventEmitter();

  public options = {
    autoUpdate: false,
    updateInterval: 1000,
    updateLimit: 50,
    updatePoolingTimeout: 0
  }

  /**
   * create a TelegramBotApi
   * @param {string} token
   * @param {Object} options
   */
  constructor(token?: string, options?: {
    autoUpdate?: boolean,
    updateInterval?: number
  }) {
    super(token)
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
  on(eventName: string, listener: Function) {
    logEvents(`on ${eventName}`);
    this.events.addListener(eventName, listener);
  }

  /**
   * Add one time event listener to events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  once(eventName: string, listener: Function) {
    logEvents(`once ${eventName}`);
    this.events.once(eventName, listener);
  }

  /**
   * Remove special listener from events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  off(eventName: string, listener: Function) {
    logEvents(`off ${eventName}`);
    this.events.removeListener(eventName, listener);
  }

  /**
   * Remove all listeners form events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  offAll(eventName?: string) {
    logEvents(`offAll ${eventName}`);
    if (eventName) {
      this.events.removeAllListeners(eventName);
    } else {
      this.events.removeAllListeners();
    }
  }

  /**
   * Emit special event
   * @param  {string} eventName
   * @param  {Function} listener
   */
  emit(eventName: string, ...args) {
    logEvents(`Emit ${eventName}`);
    this.events.emit(eventName, ...args);
  }

  private _setTimeout: NodeJS.Timer;

  private _updateOffset: number = 0;

  static async _getUpdates(_this: TelegramBotApi) {
    log('_getUpdates');

    try {
      let data = await _this.getUpdates({
        offset: _this._updateOffset,
        limit: _this.options.updateLimit,
        timeout: _this.options.updatePoolingTimeout
      });

      if(data && data.ok && data.result) {
        data.result.forEach((item) => {
          _this._updateOffset = item.update_id + 1;

          let eventName;
          if ('message' in item) eventName = 'message';
          if ('inline_query' in item) eventName = 'inline_query';
          if ('chosen_inline_result' in item) eventName = 'chosen_inline_result';
          if ('callback_query' in item) eventName = 'callback_query';

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
  }

  private _startGetUpdates() {
    this._setTimeout = setTimeout(TelegramBotApi._getUpdates, this.options.updateInterval, this);
  }

  startAutoUpdate(updateInterval: number = this.options.updateInterval) {
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
