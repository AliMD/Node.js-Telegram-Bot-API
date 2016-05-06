/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:bot');
const queryLog = debug('TelegramBotApi:bot:query');
const _extend = require('lodash/extend');
import _1request from './1request';

/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi {
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
  constructor(public token: string = '', options?: {
    webhook?: boolean,
    autoUpdate?: boolean,
    updateInterval?: number
  }) {
    log('new TelegramBotApi');
    console.assert(typeof token === 'string', 'token must be string');
    _extend(this.options, options);
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

  /**
   * Send query for getUpdates from server
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getUpdates(parameters: {
    offset?: number | string,
    limit?:  number | string,
    timeout?:  number | string
  }): Promise<{}> {
    return this.query('getUpdates', parameters);
  }

  /**
   * Send query for setWebhook
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async setWebhook(parameters: {
    url?: string,
    certificate?: string
  }): Promise<{}> {
    return this.query('setWebhook', parameters);
  }

  /**
   * Send query for getMe
   * @returns {Promise} requet promise
   */
  async getMe(): Promise<{}> {
    return this.query('sendMessage');
  }

  /**
   * Send query for sendMessage
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendMessage(parameters: {
      chat_id: number | string, // Unique identifier for the target chat or username of the target channel (in the format @channelusername)
      text: string, // Text of the message to be sent
      parse_mode?: string, // Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message.
      disable_web_page_preview?: boolean, // Disables link previews for links in this message
      disable_notification?: boolean, // Sends the message silently. iOS users will not receive a notification, Android users will receive a notification with no sound.
      reply_to_message_id?: number | string, // If the message is a reply, ID of the original message
      reply_markup?: string | Object // Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to hide reply keyboard or to force a reply from the user.
    }): Promise<{}> {
    return this.query('sendMessage', parameters);
  }

  /**
   * Send query for forwardMessage
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async forwardMessage(parameters: {
      chat_id: number | string,
      from_chat_id: number | string,
      message_id: number | string,
      disable_notification?: boolean
    }): Promise<{}> {
    return this.query('forwardMessage', parameters);
  }

  /**
   * Send query for sendPhoto
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendPhoto(parameters: {
      chat_id: number | string,
      photo: string,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    console.assert((parameters.caption || '').length <= 200, "Photo caption must be 0-200 characters");
    return this.query('sendPhoto', parameters);
  }

  /**
   * Send query for sendAudio
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendAudio(parameters: {
      chat_id: number | string,
      audio: string,
      duration?: number,
      performer?: string,
      title?: string,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendAudio', parameters);
  }

  /**
   * Send query for sendDocument
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendDocument(parameters: {
      chat_id: number | string,
      document: string,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendDocument', parameters);
  }

  /**
   * Send query for sendSticker
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendSticker(parameters: {
      chat_id: number | string,
      sticker: string,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendSticker', parameters);
  }

  /**
   * Send query for sendVideo
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVideo(parameters: {
      chat_id: number | string,
      video: string,
      duration?: number,
      width?: number,
      height?: number,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendVideo', parameters);
  }

  /**
   * Send query for sendVoice
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVoice(parameters: {
      chat_id: number | string,
      voice: string,
      duration?: number,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendVoice', parameters);
  }

  /**
   * Send query for sendLocation
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendLocation(parameters: {
      chat_id: number | string,
      latitude: number,
      longitude: number,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendLocation', parameters);
  }

  /**
   * Send query for sendVenue
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVenue(parameters: {
      chat_id: number | string,
      latitude: number,
      longitude: number,
      title: string,
      address: string,
      foursquare_id?: string,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendVenue', parameters);
  }

  /**
   * Send query for sendContact
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendContact(parameters: {
      chat_id: number | string,
      phone_number: string,
      first_name: string,
      last_name: string,
      disable_notification?: boolean,
      reply_to_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('sendContact', parameters);
  }

  static chatActions = {
    typings: 'typings',
    upload_photo: 'upload_photo',
    record_video: 'record_video',
    upload_video: 'upload_video',
    record_audio: 'record_audio',
    upload_audio: 'upload_audio',
    upload_document: 'upload_document',
    find_location: 'find_location'
  }

  /**
   * Send query for sendChatAction
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendChatAction(parameters: {
      chat_id: number | string,
      action: string
    }): Promise<{}> {
    return this.query('sendChatAction', parameters);
  }

  /**
   * Send query for getUserProfilePhotos
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getUserProfilePhotos(parameters: {
      chat_id: number | string,
      offset?: number,
      limit?: number,
    }): Promise<{}> {
    return this.query('getUserProfilePhotos', parameters);
  }

  /**
   * Send query for getFile
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getFile(parameters: {
      file_id: string
    }): Promise<{}> {
    return this.query('getFile', parameters);
  }

  /**
   * Send query for kickChatMember
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async kickChatMember(parameters: {
      chat_id: number | string,
      user_id: number | string
    }): Promise<{}> {
    return this.query('kickChatMember', parameters);
  }

  /**
   * Send query for unbanChatMember
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async unbanChatMember(parameters: {
      chat_id: number | string,
      user_id: number | string
    }): Promise<{}> {
    return this.query('unbanChatMember', parameters);
  }

  /**
   * Send query for answerCallbackQuery
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async answerCallbackQuery(parameters: {
      callback_query_id: string,
      text?: string,
      show_alert?: boolean
    }): Promise<{}> {
    return this.query('answerCallbackQuery', parameters);
  }

  /**
   * Send query for editMessageText
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageText(parameters: {
      chat_id?: number | string,
      message_id?: number | string,
      inline_message_id?: number | string,
      text: string,
      parse_mode?: string,
      disable_web_page_preview?: boolean,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('editMessageText', parameters);
  }

  /**
   * Send query for editMessageCaption
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageCaption(parameters: {
      chat_id?: number | string,
      message_id?: number | string,
      inline_message_id?: number | string,
      caption?: string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('editMessageCaption', parameters);
  }

  /**
   * Send query for editMessageReplyMarkup
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageReplyMarkup(parameters: {
     chat_id?: number | string,
      message_id?: number | string,
      inline_message_id?: number | string,
      reply_markup?: string
    }): Promise<{}> {
    return this.query('editMessageReplyMarkup', parameters);
  }

  /**
   * Send query for answerInlineQuery
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async answerInlineQuery(parameters: {
      inline_query_id: number | string,
      results: Array<Object>,
      cache_time?: number,
      is_personal?: boolean,
      next_offset?: string,
      switch_pm_text?: string,
      switch_pm_parameter?: string
    }): Promise<{}> {
    return this.query('answerInlineQuery', parameters);
  }

}
