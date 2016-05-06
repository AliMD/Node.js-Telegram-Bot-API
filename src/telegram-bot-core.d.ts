/// <reference path="../typings/main.d.ts" />
/**
 * @class TelegramBotApi
 */
export default class TelegramBotApi {
    token: string;
    /**
     * create a TelegramBotApi
     * @param {string} token
     * @param {Object} options
     */
    constructor(token?: string);
    static baseApiUrl: string;
    /**
     * Make telegram api query url
     * @param {string} methodName
     * @returns {string} url
     */
    makeUrl(methodName: string): string;
    /**
     * Send query to telegram api server
     * @param  {string} methodName
     * @param  {Object} parameters
     * @returns {Promise} requet promise
     */
    query(methodName: string, parameters?: Object): Promise<{}>;
}
