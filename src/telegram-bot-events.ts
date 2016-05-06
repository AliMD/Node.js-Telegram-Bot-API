/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:events');
const _extend = require('lodash/extend');

import TelegramBotApiMethods from './telegram-bot-methods'

log('init');

/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiMethods{
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

}
