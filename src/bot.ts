/// <reference path="../typings/main.d.ts" />

import _ = require('lodash');
import debug = require('debug');
const log = debug('TelegramBot index');

/**
 * @class TelegramBot
 * @param {string} tocken
 */
export default class TelegramBot {
  public options = {
    webhook: false,
    autoUpdate: true,
    updateInterval: 1000
  }

  constructor (public token:string = '', opt:Object = {}) {
    _.extend(this.options, opt);
  }
}
