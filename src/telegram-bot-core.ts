/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:core');
const queryLog = debug('TelegramBotApi:query');
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
  makeUrl(methodName: string): string {
    return `${TelegramBotApi.baseApiUrl}${this.token}/${methodName}`;
  }

  /**
   * Send query to telegram api server
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async query(methodName: string, parameters?: Object): Promise<any> {
    let requestOptions: any = {
      method: parameters ? 'POST' : 'GET',
      url: this.makeUrl(methodName),
      gzip: true,
      json: true
    }

    if (typeof parameters === 'object' && Object.keys(parameters).length) {
      for (let i in parameters)
        if(typeof parameters[i] === 'number' || typeof parameters[i] === 'boolean')
          parameters[i] += '';

      requestOptions.formData = parameters;
    }

    queryLog(methodName);
    //queryLog(requestOptions);
    let data = await _1request(requestOptions);
    if (data.body && data.body.ok) return data.body;
    throw(data.body || data);
  }
}
