/**
 * Run command:
 * BOT_TOCKEN=your_bot_token node dist/examples/0-echo-bot.js
 *
 * if you change the ts file you must build typescript by run `npn run build`
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const _1 = require('../src/');
const token = process.env.BOT_TOKEN || process.env.TEST_TOKEN; // run `. config.test.sh` for setting TEST_TOKEN
const bot = new _1.default(token, { autoUpdate: true });
bot.onMessage(/^\/test[ ]*$/, function (msg) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('new /test command recived');
        yield bot.sendMessage({
            chat_id: msg.chat.id,
            text: 'Command test recived ;)'
        });
        console.log('sent');
    });
});
console.log('Bot actived, send /test command to the bot.');
