/// <reference path="../typings/main.d.ts" />
"use strict";
const debug = require('debug');
const log = debug('TelegramBotApi:1request');
const request = require('request');
log('init');
function default_1(options) {
    log(options);
    return new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ response: response, body: body });
            }
        });
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
