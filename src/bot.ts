/// <reference path="../typings/main.d.ts" />

import _ = require('lodash');
import debug = require('debug');
const log = debug('TelegramBot index');

/**
 * @class TelegramBot
 * @param {string} tocken
 */

const BASE_API_URL: string = 'https://api.telegram.org/';

export default class TelegramBot {
  public options: Object = {
    webhook: false,
    autoUpdate: true,
    updateInterval: 1000
  }

  constructor (public token: string = '', opt: {
      webhook: boolean,
      autoUpdate: boolean,
      updateInterval: number
    }) {
    log('new TelegramBot');
    console.assert(typeof token === 'string', 'token must be string');
    _.extend(this.options, opt);
  }

  makeUrl (methodName: string) {
    return `${BASE_API_URL}bot${this.token}/${methodName}`;
  }

  async query (methodName: string, parameters: Object) {
    return;
  }

}
