/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const EventEmitter = require('events');
const log = debug('TelegramBotApi:events');
const _extend = require('lodash/extend');

import TelegramBotApiMethods from './telegram-bot-methods'

log('init');

/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiMethods{
  public events = new EventEmitter();

  public options: Object = {
    webhook: false,
    autoUpdate: true,
    updateInterval: 1000
  }

  /**
   * create a TelegramBotApi
   * @param {string} token
   * @param {Object} options
   */
  constructor(token?: string, options?: {
    webhook?: boolean,
    autoUpdate?: boolean,
    updateInterval?: number
  }) {
    super(token)
    log('constructor');
    _extend(this.options, options);
  }

  /**
   * Add event listener to events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  on(eventName: string, listener: Function) {
    this.events.addListener(eventName, listener);
  }

  /**
   * Add one time event listener to events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  once(eventName: string, listener: Function) {
    this.events.once(eventName, listener);
  }

  /**
   * Remove special listener from events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  off(eventName: string, listener: Function) {
    this.events.removeListener(eventName, listener);
  }

  /**
   * Remove all listeners form events
   * @param  {string} eventName
   * @param  {Function} listener
   */
  offAll(eventName?: string) {
    this.events.removeAllListeners(eventName);
  }

}
