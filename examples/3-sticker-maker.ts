import TelegramBot from '../src/';

const token = process.env.BOT_TOKEN || process.env.TEST_TOKEN; // run `. config.test.sh` for setting TEST_TOKEN
const bot = new TelegramBot(token, {autoUpdate: true});

bot.on('update.message.text', (msg) => {
  console.log('new text message recived');
  // console.log(msg);

  if (msg.text.match(/^hi/i)) {
    bot.sendSticker({
      chat_id: msg.chat.id,
      sticker: 'examples/hi.png'
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
