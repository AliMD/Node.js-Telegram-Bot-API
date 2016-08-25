import debug = require('debug');
const log = debug('TelegramBotApi:methods');
const fs = require('fs');
const _extend = require('lodash/extend');

import TelegramBotApiCore from './core'

log('init');

export type integer = string | number;

export type chatActions =
  'typing' |
  'upload_photo' |
  'record_video' |
  'upload_video' |
  'record_audio' |
  'upload_audio' |
  'upload_document' |
  'find_location'
;

/**
 * @class TelegramBotApi
 * extends TelegramBotApiCore with bot api methods
 */
export default class TelegramBotApi extends TelegramBotApiCore {
  public options = {
    gzip: true,
    autoChatAction: true,
    autoChatActionUploadOnly: true
  }

  /**
   * create a TelegramBotApi
   * @param {string} token
   * @param {Object} options
   */
  constructor(token?: string, options?: {
    gzip?: boolean,
    autoChatAction?: boolean,
    autoChatActionUploadOnly?: boolean
  }) {
    super(token, options);
    _extend(this.options, options);
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
    offset?: integer,
    limit?:  integer,
    timeout?:  integer
  }): Promise<any> {
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
  }): Promise<any> {
    return this.query('setWebhook', parameters);
  }

  /**
   * Send query for getMe
   * @returns {Promise} requet promise
   */
  async getMe(): Promise<any> {
    return this.query('sendMessage');
  }

  /**
   * Send query for sendMessage
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendMessage(parameters: {
      chat_id: integer, // Unique identifier for the target chat or username of the target channel (in the format @channelusername)
      text: string, // Text of the message to be sent
      parse_mode?: string, // Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message.
      disable_web_page_preview?: boolean, // Disables link previews for links in this message
      disable_notification?: boolean, // Sends the message silently. iOS users will not receive a notification, Android users will receive a notification with no sound.
      reply_to_message_id?: integer, // If the message is a reply, ID of the original message
      reply_markup?: string | Object // Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to hide reply keyboard or to force a reply from the user.
    }): Promise<any> {

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.typing
    }, false);

    return this.query('sendMessage', parameters);
  }

  /**
   * Send query for forwardMessage
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async forwardMessage(parameters: {
      chat_id: integer,
      from_chat_id: integer,
      message_id: integer,
      disable_notification?: boolean
    }): Promise<any> {

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.typing
    }, false);

    return this.query('forwardMessage', parameters);
  }

  /**
   * Send query for sendPhoto
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendPhoto(parameters: {
      chat_id: integer,
      photo: string,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    console.assert((parameters.caption || '').length <= 200, "Photo caption must be 0-200 characters");
    parameters.photo = await TelegramBotApi.fileIdOrReadStream(parameters.photo);

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.upload_photo
    }, typeof parameters.photo !== 'string');

    return this.query('sendPhoto', parameters);
  }

  /**
   * Send query for sendAudio
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendAudio(parameters: {
      chat_id: integer,
      audio: string,
      duration?: number,
      performer?: string,
      title?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.audio = await TelegramBotApi.fileIdOrReadStream(parameters.audio);

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.upload_audio
    }, typeof parameters.audio !== 'string');

    return this.query('sendAudio', parameters);
  }

  /**
   * Send query for sendDocument
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendDocument(parameters: {
      chat_id: integer,
      document: string,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.document = await TelegramBotApi.fileIdOrReadStream(parameters.document);

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.upload_document
    }, typeof parameters.document !== 'string');

    return this.query('sendDocument', parameters);
  }

  /**
   * Send query for sendSticker
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendSticker(parameters: {
      chat_id: integer,
      sticker: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.sticker = await TelegramBotApi.fileIdOrReadStream(parameters.sticker);

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.upload_photo
    }, typeof parameters.sticker !== 'string');

    return this.query('sendSticker', parameters);
  }

  /**
   * Send query for sendVideo
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVideo(parameters: {
      chat_id: integer,
      video: string,
      duration?: number,
      width?: number,
      height?: number,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.video = await TelegramBotApi.fileIdOrReadStream(parameters.video);

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.upload_video
    }, typeof parameters.video !== 'string');

    return this.query('sendVideo', parameters);
  }

  /**
   * Send query for sendVoice
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVoice(parameters: {
      chat_id: integer,
      voice: string,
      duration?: number,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.voice = await TelegramBotApi.fileIdOrReadStream(parameters.voice);

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.record_audio
    }, typeof parameters.voice !== 'string');

    return this.query('sendVoice', parameters);
  }

  /**
   * Send query for sendLocation
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendLocation(parameters: {
      chat_id: integer,
      latitude: number,
      longitude: number,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.find_location
    }, false);

    return this.query('sendLocation', parameters);
  }

  /**
   * Send query for sendVenue
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendVenue(parameters: {
      chat_id: integer,
      latitude: number,
      longitude: number,
      title: string,
      address: string,
      foursquare_id?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.find_location
    }, false);

    return this.query('sendVenue', parameters);
  }

  /**
   * Send query for sendContact
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendContact(parameters: {
      chat_id: integer,
      phone_number: string,
      first_name: string,
      last_name: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.typing
    }, false);

    return this.query('sendContact', parameters);
  }

  static chatActions = {
    typing: <chatActions>'typing',
    upload_photo: <chatActions>'upload_photo',
    record_video: <chatActions>'record_video',
    upload_video: <chatActions>'upload_video',
    record_audio: <chatActions>'record_audio',
    upload_audio: <chatActions>'upload_audio',
    upload_document: <chatActions>'upload_document',
    find_location: <chatActions>'find_location'
  }

  /**
   * Send query for sendChatAction
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendChatAction(parameters: {
      chat_id: integer,
      action: chatActions
    }): Promise<any> {
    return this.query('sendChatAction', parameters);
  }

  async _sendAutoChatAction(parameters: {
      chat_id: integer,
      action: chatActions
    }, uploadMode: boolean) {
    if (!this.options.autoChatAction) return false;
    else if (this.options.autoChatActionUploadOnly && !uploadMode) return false;
    else return this.sendChatAction(parameters);
  }

  /**
   * Send query for getUserProfilePhotos
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getUserProfilePhotos(parameters: {
      chat_id: integer,
      offset?: number,
      limit?: number,
    }): Promise<any> {
    return this.query('getUserProfilePhotos', parameters);
  }

  /**
   * Send query for getFile
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getFile(parameters: {
      file_id: string
    }): Promise<any> {
    return this.query('getFile', parameters);
  }

  /**
   * Send query for kickChatMember
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async kickChatMember(parameters: {
      chat_id: integer,
      user_id: integer
    }): Promise<any> {
    return this.query('kickChatMember', parameters);
  }

  /**
   * Send query for leaveChat
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async leaveChat(parameters: {
      chat_id: integer
    }): Promise<any> {
    return this.query('leaveChat', parameters);
  }

  /**
   * Send query for unbanChatMember
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async unbanChatMember(parameters: {
      chat_id: integer,
      user_id: integer
    }): Promise<any> {
    return this.query('unbanChatMember', parameters);
  }

  /**
   * Send query for getChat
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getChat(parameters: {
      chat_id: integer
    }): Promise<any> {
    return this.query('getChat', parameters);
  }

  /**
   * Send query for getChatAdministrators
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getChatAdministrators(parameters: {
      chat_id: integer
    }): Promise<any> {
    return this.query('getChatAdministrators', parameters);
  }

  /**
   * Send query for getChatMembersCount
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getChatMembersCount(parameters: {
      chat_id: integer
    }): Promise<any> {
    return this.query('getChatMembersCount', parameters);
  }

  /**
   * Send query for getChatMember
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async getChatMember(parameters: {
      chat_id: integer,
      user_id: number
    }): Promise<any> {
    return this.query('getChatMember', parameters);
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
    return this.query('answerCallbackQuery', parameters);
  }

  // ..== Inline mode methods ==..

  /**
   * Send query for editMessageText
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageText(parameters: {
      chat_id?: integer,
      message_id?: integer,
      inline_message_id?: integer,
      text: string,
      parse_mode?: string,
      disable_web_page_preview?: boolean,
      reply_markup?: string
    }): Promise<any> {
    return this.query('editMessageText', parameters);
  }

  /**
   * Send query for editMessageCaption
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageCaption(parameters: {
      chat_id?: integer,
      message_id?: integer,
      inline_message_id?: integer,
      caption?: string,
      reply_markup?: string
    }): Promise<any> {
    return this.query('editMessageCaption', parameters);
  }

  /**
   * Send query for editMessageReplyMarkup
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async editMessageReplyMarkup(parameters: {
      chat_id?: integer,
      message_id?: integer,
      inline_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {
    return this.query('editMessageReplyMarkup', parameters);
  }

  /**
   * Send query for answerInlineQuery
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async answerInlineQuery(parameters: {
      inline_query_id: integer,
      results: Array<Object>,
      cache_time?: number,
      is_personal?: boolean,
      next_offset?: string,
      switch_pm_text?: string,
      switch_pm_parameter?: string
    }): Promise<any> {
    return this.query('answerInlineQuery', parameters);
  }

}
