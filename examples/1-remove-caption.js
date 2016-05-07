/// <reference path="../typings/main.d.ts" />
"use strict";
const index_1 = require('../index');
const token = process.env.TEST_TOKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
const bot = new index_1.default(token, { autoUpdate: true });
bot.on('update.message.photo', (msg) => {
    console.log('new photo message recived');
    // console.log(msg);
    let photo = msg.photo.pop(); // get last item (largest photo) in array
    bot.sendPhoto({
        chat_id: msg.chat.id,
        photo: photo.file_id
    })
        .then(() => {
        console.log('Message sent');
    })
        .catch((err) => {
        console.log('Send Message Error:', err);
    });
});
bot.on('update.message.video', (msg) => {
    console.log('new vide message recived');
    // console.log(msg);
    bot.sendVideo({
        chat_id: msg.chat.id,
        video: msg.video.file_id
    })
        .then(() => {
        console.log('Message sent');
    })
        .catch((err) => {
        console.log('Send Message Error:', err);
    });
});
bot.on('update.message.document', (msg) => {
    console.log('new document message recived');
    // telegram sending gif movies as a document
    // console.log(msg);
    bot.sendDocument({
        chat_id: msg.chat.id,
        document: msg.document.file_id
    })
        .then(() => {
        console.log('Message sent');
    })
        .catch((err) => {
        console.log('Send Message Error:', err);
    });
});
console.log('Bot actived.');
// Run command:
// BOT_TOCKEN=your_bot_token node 1-remove-caption.js
