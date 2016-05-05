/// <reference path="../typings/main.d.ts" />
export default class TelegramBot {
    token: string;
    options: Object;
    constructor(token: string, opt: {
        webhook: boolean;
        autoUpdate: boolean;
        updateInterval: number;
    });
    makeUrl(methodName: string): string;
    query(methodName: string, parameters?: Object): Promise<{}>;
}
