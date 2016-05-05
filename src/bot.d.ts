/// <reference path="../typings/main.d.ts" />
/**
 * @class TelegramBot
 * @param {string} tocken
 */
export default class TelegramBot {
    token: string;
    opt: {
        webhook: boolean;
        autoUpdate: boolean;
        updateInterval: number;
    };
    options: {
        webhook: boolean;
        autoUpdate: boolean;
        updateInterval: number;
    };
    constructor(token: string, opt: {
        webhook: boolean;
        autoUpdate: boolean;
        updateInterval: number;
    });
    query(methodName: string, parameters: Object): Promise<number>;
}
