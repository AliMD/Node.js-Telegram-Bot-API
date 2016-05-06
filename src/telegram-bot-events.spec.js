import "babel-polyfill";
import expect from 'expect.js';

import TelegramBotApi from './telegram-bot-events';

const
token = process.env.TEST_TOCKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
userId = process.env.TEST_USERID || 777000,
defOptions = {
  webhook: false,
  autoUpdate: true,
  updateInterval: 1000
},

expectToBePromise = (obj) => {
  expect(obj).to.be.an('object');
  expect(obj).to.have.property('then');
  expect(obj.then).to.be.a('function');
}
;

describe('bot.js', () => {
  var bot = new TelegramBotApi(token, defOptions);

  describe('new instance', () => {

    it('should an constructor', () => {
      expect(TelegramBotApi).to.be.a('function');
      expect(new TelegramBotApi()).to.be.an('object');
    });

    it('should have token', () => {
      let bot = new TelegramBotApi(token);
      expect(bot.token).to.be.equal(token);
    });

    it('should have not token', () => {
      let bot = new TelegramBotApi();
      expect(bot.token).to.be.empty();
    });

    it('should have default options', () => {
      let bot = new TelegramBotApi(token);
      expect(bot.options).to.be.eql(defOptions);
    });

    it('should have default options with extend', () => {
      let bot = new TelegramBotApi(token, {});
      expect(bot.options).to.be.eql(defOptions);
    });

    it('should have extended options', () => {
      let bot = new TelegramBotApi(token, {foo: 'bar'});
      expect(bot.options.foo).to.be.equal('bar');
    });

  });

  describe('methods', () => {
    let methods = [
      'makeUrl',
      'query',
      'getMe',
      'sendMessage',
      'forwardMessage',
      'sendPhoto',
      'sendAudio',
      'sendDocument',
      'sendSticker',
      'sendVideo',
      'sendVoice',
      'sendLocation',
      'sendVenue',
      'sendContact',
      'sendChatAction',
      'getUserProfilePhotos',
      'getFile',
      'kickChatMember',
      'unbanChatMember',
      'answerCallbackQuery',
      'editMessageText',
      'editMessageCaption',
      'editMessageReplyMarkup',
      'answerInlineQuery'
    ];
  });

  describe.only('events', () => {
    it('should have `on` method', () => {
      expect(bot).to.have.property('on');
      expect(bot.on).to.be.a('function');
    });

    it('should have `off` method', () => {
      expect(bot).to.have.property('off');
      expect(bot.off).to.be.a('function');
    });

    it('should trigger on mesage', (done) => {
      console.log('send message to this bot for test');
      bot.on('message', () => {
        done();
      })
    });

    it.skip('should trigger on inlineQuery', () => {

    })
  })

});
