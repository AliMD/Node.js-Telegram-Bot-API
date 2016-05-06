/// <reference path="../typings/main.d.ts" />
import TelegramBotApiMethods from './telegram-bot-methods';
/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiMethods {
    options: Object;
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token?: string, options?: {
        webhook?: boolean;
        autoUpdate?: boolean;
        updateInterval?: number;
    });
}
