/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const EventEmitter = require('events');
const log = debug('TelegramBotApi:events');
const logUpdate = debug('TelegramBotApi:update');
const _extend = require('lodash/extend');

import TelegramBotApiMethods from './telegram-bot-methods'

log('init');

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
  on(eventName: string, listener: Function) {
    log(`on ${eventName}`);
    this.events.addListener(eventName, listener);
  }

  /**
   * Add one time event listener to events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  once(eventName: string, listener: Function) {
    log(`once ${eventName}`);
    this.events.once(eventName, listener);
  }

  /**
   * Remove special listener from events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  off(eventName: string, listener: Function) {
    log(`off ${eventName}`);
    this.events.removeListener(eventName, listener);
  }

  /**
   * Remove all listeners form events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  offAll(eventName?: string) {
    log(`offAll ${eventName}`);
    if (eventName) {
      this.events.removeAllListeners(eventName);
    } else {
      this.events.removeAllListeners();
    }
  }

  private _setTimeout: NodeJS.Timer;

  private _updateOffset: number = 0;

  static async _getUpdates(_this: TelegramBotApi) {
    logUpdate('getInternalUpdates');
    console.log('getInternalUpdates');

    let data = await _this.getUpdates({
      offset: _this._updateOffset,
      limit: _this.options.updateLimit,
      timeout: _this.options.updatePoolingTimeout
    });

    if(data) {
      // console.dir(data);
      _this.events.emite('update', data);
    }

    if (!_this.options.autoUpdate) {
      _this._startGetUpdates();
    }
  }

  private _startGetUpdates() {
    this._setTimeout = setTimeout(TelegramBotApi._getUpdates, this.options.updateInterval, this);
  }

  startAutoUpdate(updateInterval: number = this.options.updateInterval) {
    this.stopAutoUpdate();
    this.options.autoUpdate = true;
    this.options.updateInterval = updateInterval;
    this._startGetUpdates();
  }

  stopAutoUpdate() {
    clearTimeout(this._setTimeout);
    this.options.autoUpdate = false;
  }
}
