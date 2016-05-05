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

  constructor (public token: string = '', public opt: {
      webhook: boolean,
      autoUpdate: boolean,
      updateInterval: number
    }) {

    console.assert(typeof token === 'string', 'token must be string');
    _.extend(this.options, opt);
  }
}
