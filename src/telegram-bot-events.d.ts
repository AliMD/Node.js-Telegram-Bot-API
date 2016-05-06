/// <reference path="../typings/main.d.ts" />
import TelegramBotApiMethods from './telegram-bot-methods';
/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiMethods {
    events: any;
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
    /**
     * Add event listener to events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    on(eventName: string, listener: Function): void;
    /**
     * Add one time event listener to events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    once(eventName: string, listener: Function): void;
    /**
     * Remove special listener from events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    off(eventName: string, listener: Function): void;
    /**
     * Remove all listeners form events
     * @param  {string} eventName
     * @param  {Function} listener
     */
    offAll(eventName?: string): void;
}
