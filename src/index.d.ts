/**
 * @class TelegramBot
 * @param {string} tocken
 */
export default class TelegramBot {
    token: string;
    options: {
        webhook: boolean;
        autoUpdate: boolean;
        updateInterval: number;
    };
    constructor(token?: string, opt?: Object);
}
