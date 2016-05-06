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

  async getMe(): Promise<{}> {
    return this.query('sendMessage');
  }

  async sendMessage(parameters: Object): Promise<{}> {
    return this.query('sendMessage', parameters);
  }

  async forwardMessage(parameters: Object): Promise<{}> {
    return this.query('forwardMessage', parameters);
  }

  async sendPhoto(parameters: Object): Promise<{}> {
    return this.query('sendPhoto', parameters);
  }

  async sendAudio(parameters: Object): Promise<{}> {
    return this.query('sendAudio', parameters);
  }

  async sendDocument(parameters: Object): Promise<{}> {
    return this.query('sendDocument', parameters);
  }

  async sendSticker(parameters: Object): Promise<{}> {
    return this.query('sendSticker', parameters);
  }

  async sendVideo(parameters: Object): Promise<{}> {
    return this.query('sendVideo', parameters);
  }

  async sendVoice(parameters: Object): Promise<{}> {
    return this.query('sendVoice', parameters);
  }

  async sendLocation(parameters: Object): Promise<{}> {
    return this.query('sendLocation', parameters);
  }

  async sendVenue(parameters: Object): Promise<{}> {
    return this.query('sendVenue', parameters);
  }

  async sendContact(parameters: Object): Promise<{}> {
    return this.query('sendContact', parameters);
  }

  async sendChatAction(parameters: Object): Promise<{}> {
    return this.query('sendChatAction', parameters);
  }

  async getUserProfilePhotos(parameters: Object): Promise<{}> {
    return this.query('getUserProfilePhotos', parameters);
  }

  async getFile(parameters: Object): Promise<{}> {
    return this.query('getFile', parameters);
  }

  async kickChatMember(parameters: Object): Promise<{}> {
    return this.query('kickChatMember', parameters);
  }

  async unbanChatMember(parameters: Object): Promise<{}> {
    return this.query('unbanChatMember', parameters);
  }

  async answerCallbackQuery(parameters: Object): Promise<{}> {
    return this.query('answerCallbackQuery', parameters);
  }

  async editMessageText(parameters: Object): Promise<{}> {
    return this.query('editMessageText', parameters);
  }

  async editMessageCaption(parameters: Object): Promise<{}> {
    return this.query('editMessageCaption', parameters);
  }

  async editMessageReplyMarkup(parameters: Object): Promise<{}> {
    return this.query('editMessageReplyMarkup', parameters);
  }

  async answerInlineQuery(parameters: Object): Promise<{}> {
    return this.query('answerInlineQuery', parameters);
  }


}
