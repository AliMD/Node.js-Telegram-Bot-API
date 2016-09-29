import debug = require('debug');
const log = debug('TelegramBotApi:methods');
import fs = require('fs');
import _extend = require('lodash/extend');

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

export type fileObject =
  string |
  {
    value: string,
    options: {
      filename: string,
      contentType: string
    }
  } |
  fs.ReadStream;

export type parseMode = 'Markdown' | 'HTML';

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
   * Try to convert fileObject to validated for use in form-data
   * @static
   * @param {(string | customeFile | any)} file
   * @returns {(string | customeFile | any)}
   */
  static sanitizeFilePath (file: fileObject): fileObject {
    log(`fileIdOrReadStream for ${file}`);

    if (typeof file === 'string') {
      file = TelegramBotApi._makeReadStram(file+'');
    }
    else if (file['value'] && typeof file['value'] === 'string') {
      file['value'] = TelegramBotApi._makeReadStram(file['value']);
    }

    return file;
  }

  /**
   * Create ReadStream from path to use in form-data if file exist
   * @static
   * @param {string} path
   * @returns {(fs.ReadStream | string)}
   */
  static _makeReadStram (path: string): fs.ReadStream | string {
    let isFile = false;

    //TODO: Find better way for check file exist
    try {
      isFile = fs.statSync(path).isFile();
    }
    catch (err){}; // skip err

    return !isFile ?
      path :
      fs.createReadStream(path, {
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

  private _textLimit: number = 4096

  /**
   * Send query for sendMessage
   * @param  {Object} parameters
   * @returns {Promise} requet promise
   */
  async sendMessage(parameters: {
      chat_id: integer, // Unique identifier for the target chat or username of the target channel (in the format @channelusername)
      text: string, // Text of the message to be sent
      parse_mode?: parseMode, // Send Markdown or HTML, if you want Telegram apps to show bold, italic, fixed-width text or inline URLs in your bot's message.
      disable_web_page_preview?: boolean, // Disables link previews for links in this message
      disable_notification?: boolean, // Sends the message silently. iOS users will not receive a notification, Android users will receive a notification with no sound.
      reply_to_message_id?: integer, // If the message is a reply, ID of the original message
      reply_markup?: string | Object // Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to hide reply keyboard or to force a reply from the user.
    }): Promise<any> {

    await this._sendAutoChatAction({
      chat_id: parameters.chat_id,
      action: TelegramBotApi.chatActions.typing
    }, false);

    if (parameters.text.length <= this._textLimit) {
      return this.query('sendMessage', parameters);
    }

    // else

    let
      i: number = 0,
      ret: Promise<any> = null,
      text: string = parameters.text
    ;

    for (; i<text.length; i += this._textLimit) {
      parameters.text = text.substr(i, this._textLimit);
      ret = await this.query('sendMessage', parameters);
    }

    return ret;
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
      photo: fileObject,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    console.assert((parameters.caption || '').length <= 200, "Photo caption must be 0-200 characters");

    parameters.photo = TelegramBotApi.sanitizeFilePath(parameters.photo);

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
      audio: fileObject,
      duration?: number,
      performer?: string,
      title?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.audio = TelegramBotApi.sanitizeFilePath(parameters.audio);

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
      document: fileObject,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.document = await TelegramBotApi.sanitizeFilePath(parameters.document);

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
      sticker: fileObject,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.sticker = await TelegramBotApi.sanitizeFilePath(parameters.sticker);

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
      video: fileObject,
      duration?: number,
      width?: number,
      height?: number,
      caption?: string,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.video = await TelegramBotApi.sanitizeFilePath(parameters.video);

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
      voice: fileObject,
      duration?: number,
      disable_notification?: boolean,
      reply_to_message_id?: integer,
      reply_markup?: string
    }): Promise<any> {

    parameters.voice = await TelegramBotApi.sanitizeFilePath(parameters.voice);

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
      parse_mode?: parseMode,
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
