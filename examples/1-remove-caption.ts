import TelegramBot from '../src/';

const token = process.env.BOT_TOKEN || process.env.TEST_TOKEN; // run `. config.test.sh` for setting TEST_TOKEN
const bot = new TelegramBot(token, {autoUpdate: true});

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
