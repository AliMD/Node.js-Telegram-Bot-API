/**
 * Run command:
 * BOT_TOCKEN=your_bot_token node lib/examples/0-echo-bot.js
 *
 * if you change the ts file you must build typescript by run `npn run build`
 */
"use strict";
const _1 = require('../src/');
const token = process.env.BOT_TOKEN || process.env.TEST_TOKEN; // run `. config.test.sh` for setting TEST_TOKEN
const bot = new _1.default(token, { autoUpdate: true });
bot.on('update.message.text', (msg) => {
    console.log('new text message recived');
    // console.log(msg);
    bot.sendMessage({
        chat_id: msg.chat.id,
        text: msg.text
    })
        .then(() => {
        console.log('Message sent');
    })
        .catch((err) => {
        console.log('Send Message Error:', err);
    });
});
console.log('Bot actived, send any message to bot');
console.log('Bot token: ' + token);
