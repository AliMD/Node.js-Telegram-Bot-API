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
    autoUpdate: true,
    updateInterval: 1000
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

  private _setTimeout:NodeJS.Timer;

  private _getUpdates(_this = this) {
    logUpdate('getInternalUpdates');
    if (!_this.options.autoUpdate) {
      return _this.stopAutoUpdate();
    }
    _this._setTimeout = setTimeout(_this._getUpdates, _this.options.updateInterval, _this);
  }

  startAutoUpdate(updateInterval: number = this.options.updateInterval) {
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
