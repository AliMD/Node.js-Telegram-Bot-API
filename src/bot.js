"use strict";
const log = require('debug')('TelegramBot index');
const _ = require('lodash/core');
/**
 * @class TelegramBot
 * @param {string} tocken
 */
class TelegramBot {
    constructor(token = '', opt = {}) {
        this.token = token;
        this.options = {
            webhook: false,
            autoUpdate: true,
            updateInterval: 1000
        };
        _.extend(this.options, opt);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBot;
