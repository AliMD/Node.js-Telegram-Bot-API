/// <reference path="../typings/main.d.ts" />
import TelegramBotApiMethods from './telegram-bot-methods';
/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi extends TelegramBotApiMethods {
    events: any;
    options: {
        gzip: boolean;
        autoChatAction: boolean;
        autoChatActionUploadOnly: boolean;
        autoUpdate: boolean;
        updateInterval: number;
        updateLimit: number;
        updatePoolingTimeout: number;
    };
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token?: string, options?: {
        gzip?: boolean;
        autoChatAction?: boolean;
        autoUpdate?: boolean;
        updateInterval?: number;
        updateLimit?: number;
        updatePoolingTimeout?: number;
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
    /**
     * Emit special event
     * @param  {string} eventName
     * @param  {Function} listener
     */
    emit(eventName: string, ...args: any[]): void;
    private _setTimeout;
    private _updateOffset;
    static _getUpdates(_this: TelegramBotApi): Promise<void>;
    private _startGetUpdates();
    startAutoUpdate(updateInterval?: number): void;
    stopAutoUpdate(): void;
}
