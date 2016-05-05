/// <reference path="../typings/main.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const debug = require('debug');
const log = debug('TelegramBot index');
const _extend = require('lodash/extend');
const _1request_1 = require('./1request');
/**
 * @class TelegramBot
 * @param {string} tocken
 */
const BASE_API_URL = 'https://api.telegram.org/';
class TelegramBot {
    constructor(token = '', opt) {
        this.token = token;
        this.options = {
            webhook: false,
            autoUpdate: true,
            updateInterval: 1000
        };
        log('new TelegramBot');
        console.assert(typeof token === 'string', 'token must be string');
        _extend(this.options, opt);
    }
    makeUrl(methodName) {
        return `${BASE_API_URL}bot${this.token}/${methodName}`;
    }
    query(methodName, parameters) {
        return __awaiter(this, void 0, Promise, function* () {
            return _1request_1.default({
                url: this.makeUrl(methodName),
                qs: parameters
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBot;
