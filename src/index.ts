const log = require('debug')('TelegramBot index');
const _ = require('lodash/core');

/**
 * @class TelegramBot
 * @param {string} tocken
 */
export default class TelegramBot {
  public options = {
    webhook: false,
    autoUpdate: true,
    updateInterval: 1000
  }

  constructor (public token:string = '', opt:Object = {}) {
    _.extend(this.options, opt);
  }
}
