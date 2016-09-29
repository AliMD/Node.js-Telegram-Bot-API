import debug = require('debug');
const log = debug('TelegramBotApi:core');
const queryLog = debug('TelegramBotApi:query');
import _1request from './1request';
import _extend = require('lodash/extend');

log('init');

/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi {
  public options = {
    gzip: true
  }

  /**
   * create a TelegramBotApi
   * @param {string} token
   * @param {Object} options
   */
  constructor(public token: string = '', options?: {
    gzip?: boolean
  }) {
    log('constructor');
    _extend(this.options, options);
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
    let hasParams = typeof parameters === 'object' && Object.keys(parameters).length;
    let requestOptions: any = {
      method: hasParams ? 'POST' : 'GET',
      url: this.makeUrl(methodName),
      gzip: this.options.gzip,
      json: true
    }

    if (hasParams) {
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
