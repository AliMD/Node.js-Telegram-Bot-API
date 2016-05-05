"use strict";
var _ = require('lodash');
var debug = require('debug');
var log = debug('TelegramBot index');
/**
 * @class TelegramBot
 * @param {string} tocken
 */
var TelegramBot = (function () {
    function TelegramBot(token, opt) {
        if (token === void 0) { token = ''; }
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
    return TelegramBot;
}());
exports.__esModule = true;
exports["default"] = TelegramBot;
