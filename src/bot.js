/// <reference path="../typings/main.d.ts" />
"use strict";
const _ = require('lodash');
const debug = require('debug');
const log = debug('TelegramBot index');
/**
 * @class TelegramBot
 * @param {string} tocken
 */
class TelegramBot {
    constructor(token = '', opt) {
        this.token = token;
        this.opt = opt;
        this.options = {
            webhook: false,
            autoUpdate: true,
            updateInterval: 1000
        };
        console.assert(typeof token === 'string', 'token must be string');
        _.extend(this.options, opt);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBot;
