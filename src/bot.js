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
    query(methodName, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            return 1;
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TelegramBot;
