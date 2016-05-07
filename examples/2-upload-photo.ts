/// <reference path="../typings/main.d.ts" />

import TelegramBot from '../index';

const token = process.env.BOT_TOCKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11'
const bot = new TelegramBot(token, {autoUpdate: true});

bot.on('update.message.text', (msg) => {
  console.log('new text message recived');
  // console.log(msg);

  if (msg.text.match(/^hi/i)) {
    bot.sendMessage({
      chat_id: msg.chat.id,
      text: 'Hi ;)'
    })
    .then(() => {
      return bot.sendPhoto({
        chat_id: msg.chat.id,
        photo: './alimd.jpg',
        caption: 'Ali Mihandoost\n\ntelegram.me/al1md\n\ntelegram.me/alimd\n\nhttp://ali.md/'
      });
    })
    .then(() => {
      console.log('Messages sent.');
    })
    .catch((err) => {
      console.log('Send Message Error:', err);
    });
  }
});

console.log('Bot actived, say hi to the bot');

// Run command:
// BOT_TOCKEN=your_bot_token node 2-upload-photo.js
