/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:methods');
const fs = require('fs');

import TelegramBotApiCore from './telegram-bot-core'

log('init');

/**
 * @class TelegramBotApi
 * extends TelegramBotApiCore with bot api methods
 */
export default class TelegramBotApi extends TelegramBotApiCore {

  /**
   * create a TelegramBotApi
   * @param {string} token
   * @param {Object} options
   */
  constructor(token?: string) {
    super(token);
    log('constructor');
  }

  /**
   * Create fileReadStream from path or retur file_id
   * @param  {any} file
   */
  static async fileIdOrReadStream (file: string): Promise<any> {
    log(`fileIdOrReadStream for ${file}`);
    let isFile = false;
    try {
      isFile = fs.statSync(file).isFile();
    }
    catch (err){}; // skip err

    return !isFile ?
      file :
      fs.createReadStream(file, {
        flags: 'r',
        autoClose: true
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
  }): Promise<any> {
    return super.query('getUpdates', parameters);
  }

  /**
   * Send query for setWebhook
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async setWebhook(parameters: {
    url?: string,
    certificate?: string
  }): Promise<any> {
    return super.query('setWebhook', parameters);
  }

  /**
   * Send query for getMe
   * @returns {Promise} requet promise
   */
  async getMe(): Promise<any> {
    return super.query('sendMessage');
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
    }): Promise<any> {
    return super.query('sendMessage', parameters);
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
    }): Promise<any> {
    return super.query('forwardMessage', parameters);
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
    }): Promise<any> {

    console.assert((parameters.caption || '').length <= 200, "Photo caption must be 0-200 characters");
    parameters.photo = await TelegramBotApi.fileIdOrReadStream(parameters.photo);
    return super.query('sendPhoto', parameters);
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
    }): Promise<any> {
    parameters.audio = await TelegramBotApi.fileIdOrReadStream(parameters.audio);
    return super.query('sendAudio', parameters);
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
    }): Promise<any> {
    parameters.document = await TelegramBotApi.fileIdOrReadStream(parameters.document);
    return super.query('sendDocument', parameters);
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
    }): Promise<any> {
    parameters.sticker = await TelegramBotApi.fileIdOrReadStream(parameters.sticker);
    return super.query('sendSticker', parameters);
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
    }): Promise<any> {
    parameters.video = await TelegramBotApi.fileIdOrReadStream(parameters.video);
    return super.query('sendVideo', parameters);
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
    }): Promise<any> {
    parameters.voice = await TelegramBotApi.fileIdOrReadStream(parameters.voice);
    return super.query('sendVoice', parameters);
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
    }): Promise<any> {
    return super.query('sendLocation', parameters);
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
    }): Promise<any> {
    return super.query('sendVenue', parameters);
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
    }): Promise<any> {
    return super.query('sendContact', parameters);
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
    }): Promise<any> {
    return super.query('sendChatAction', parameters);
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
    }): Promise<any> {
    return super.query('getUserProfilePhotos', parameters);
  }

  /**
   * Send query for getFile
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getFile(parameters: {
      file_id: string
    }): Promise<any> {
    return super.query('getFile', parameters);
  }

  /**
   * Send query for kickChatMember
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async kickChatMember(parameters: {
      chat_id: number | string,
      user_id: number | string
    }): Promise<any> {
    return super.query('kickChatMember', parameters);
  }

  /**
   * Send query for unbanChatMember
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async unbanChatMember(parameters: {
      chat_id: number | string,
      user_id: number | string
    }): Promise<any> {
    return super.query('unbanChatMember', parameters);
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
    }): Promise<any> {
    return super.query('answerCallbackQuery', parameters);
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
    }): Promise<any> {
    return super.query('editMessageText', parameters);
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
    }): Promise<any> {
    return super.query('editMessageCaption', parameters);
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
    }): Promise<any> {
    return super.query('editMessageReplyMarkup', parameters);
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
    }): Promise<any> {
    return super.query('answerInlineQuery', parameters);
  }

}
