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

  /**
   * create a TelegramBot
   * @param {string} token
   * @param {Object} options
   */
  constructor(public token: string = '', options: {
    webhook: boolean,
    autoUpdate: boolean,
    updateInterval: number
  }) {
    log('new TelegramBot');
    console.assert(typeof token === 'string', 'token must be string');
    _extend(this.options, options);
  }

  /**
   * Make telegram api query url
   * @param {string} methodName
   * @returns {string} url
   */
  makeUrl(methodName: string) {
    return `${BASE_API_URL}bot${this.token}/${methodName}`;
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

  /**
   * Send query for getMe
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getMe(): Promise<{}> {
    return this.query('sendMessage');
  }

  /**
   * Send query for sendMessage
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendMessage(parameters: Object): Promise<{}> {
    return this.query('sendMessage', parameters);
  }

  /**
   * Send query for forwardMessage
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async forwardMessage(parameters: Object): Promise<{}> {
    return this.query('forwardMessage', parameters);
  }

  /**
   * Send query for sendPhoto
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendPhoto(parameters: Object): Promise<{}> {
    return this.query('sendPhoto', parameters);
  }

  /**
   * Send query for sendAudio
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendAudio(parameters: Object): Promise<{}> {
    return this.query('sendAudio', parameters);
  }

  /**
   * Send query for sendDocument
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendDocument(parameters: Object): Promise<{}> {
    return this.query('sendDocument', parameters);
  }

  /**
   * Send query for sendSticker
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendSticker(parameters: Object): Promise<{}> {
    return this.query('sendSticker', parameters);
  }

  /**
   * Send query for sendVideo
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVideo(parameters: Object): Promise<{}> {
    return this.query('sendVideo', parameters);
  }

  /**
   * Send query for sendVoice
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVoice(parameters: Object): Promise<{}> {
    return this.query('sendVoice', parameters);
  }

  /**
   * Send query for sendLocation
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendLocation(parameters: Object): Promise<{}> {
    return this.query('sendLocation', parameters);
  }

  /**
   * Send query for sendVenue
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVenue(parameters: Object): Promise<{}> {
    return this.query('sendVenue', parameters);
  }

  /**
   * Send query for sendContact
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendContact(parameters: Object): Promise<{}> {
    return this.query('sendContact', parameters);
  }

  /**
   * Send query for sendChatAction
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendChatAction(parameters: Object): Promise<{}> {
    return this.query('sendChatAction', parameters);
  }

  /**
   * Send query for getUserProfilePhotos
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getUserProfilePhotos(parameters: Object): Promise<{}> {
    return this.query('getUserProfilePhotos', parameters);
  }

  /**
   * Send query for getFile
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getFile(parameters: Object): Promise<{}> {
    return this.query('getFile', parameters);
  }

  /**
   * Send query for kickChatMember
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async kickChatMember(parameters: Object): Promise<{}> {
    return this.query('kickChatMember', parameters);
  }

  /**
   * Send query for unbanChatMember
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async unbanChatMember(parameters: Object): Promise<{}> {
    return this.query('unbanChatMember', parameters);
  }

  /**
   * Send query for answerCallbackQuery
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async answerCallbackQuery(parameters: Object): Promise<{}> {
    return this.query('answerCallbackQuery', parameters);
  }

  /**
   * Send query for editMessageText
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageText(parameters: Object): Promise<{}> {
    return this.query('editMessageText', parameters);
  }

  /**
   * Send query for editMessageCaption
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageCaption(parameters: Object): Promise<{}> {
    return this.query('editMessageCaption', parameters);
  }

  /**
   * Send query for editMessageReplyMarkup
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageReplyMarkup(parameters: Object): Promise<{}> {
    return this.query('editMessageReplyMarkup', parameters);
  }

  /**
   * Send query for answerInlineQuery
   * @param  {string} methodName
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async answerInlineQuery(parameters: Object): Promise<{}> {
    return this.query('answerInlineQuery', parameters);
  }


}
