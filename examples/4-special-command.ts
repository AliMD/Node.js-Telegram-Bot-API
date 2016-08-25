/**
 * Run command:
 * BOT_TOCKEN=your_bot_token node dist/examples/0-echo-bot.js
 *
 * if you change the ts file you must build typescript by run `npn run build`
 */

import TelegramBot from '../src/';

const token = process.env.BOT_TOKEN || process.env.TEST_TOKEN; // run `. config.test.sh` for setting TEST_TOKEN
const bot = new TelegramBot(token, {autoUpdate: true});

bot.onMessage(/^\/test[ ]*$/, async function (msg){
  console.log('new /test command recived');

  await bot.sendMessage({
    chat_id: msg.chat.id,
    text: 'Command test recived ;)'
  });

  console.log('sent');
});

console.log('Bot actived, send /test command to the bot.');
