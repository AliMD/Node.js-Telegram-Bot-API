/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:core');
const queryLog = debug('TelegramBotApi:query');
const _extend = require('lodash/extend');
import _1request from './1request';

log('init');

/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi {
  /**
   * create a TelegramBotApi
   * @param {string} token
   * @param {Object} options
   */
  constructor(public token: string = '') {
    log('constructor');
  }

  static baseApiUrl: string = 'https://api.telegram.org/bot';

  /**
   * Make telegram api query url
   * @param {string} methodName
   * @returns {string} url
   */
  makeUrl(methodName: string) {
    return `${TelegramBotApi.baseApiUrl}${this.token}/${methodName}`;
  }

  /**
   * Send query to telegram api server
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
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
