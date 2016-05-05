/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:bot');
const queryLog = debug('TelegramBotApi:bot:query');
const _extend = require('lodash/extend');
import _1request from './1request';

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

  constructor(public token: string = '', opt: {
    webhook: boolean,
    autoUpdate: boolean,
    updateInterval: number
  }) {
    log('new TelegramBot');
    console.assert(typeof token === 'string', 'token must be string');
    _extend(this.options, opt);
  }

  makeUrl(methodName: string) {
    return `${BASE_API_URL}bot${this.token}/${methodName}`;
  }

  async query(methodName: string, parameters?: Object): Promise<{}> {
    let requestOptions = {
      url: this.makeUrl(methodName),
      qs: parameters
    }
    queryLog(requestOptions);
    return _1request(requestOptions)
      .then((data) => {
        let parsed = JSON.parse(data['body']);
        return parsed;
      });
  }

}
