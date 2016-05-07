import "babel-polyfill";
import expect from 'expect.js';

import TelegramBotApi from './telegram-bot-methods';

const
token = process.env.TEST_TOKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
userId = process.env.TEST_USERID || 777000,

expectToBePromise = (obj) => {
  expect(obj).to.be.an('object');
  expect(obj).to.have.property('then');
  expect(obj.then).to.be.a('function');
}
;

describe('telegram-bot-methods', () => {
  var bot;

  describe('new instance', () => {

    it('should an constructor', () => {
      expect(TelegramBotApi).to.be.a('function');
      expect(new TelegramBotApi()).to.be.an('object');
    });

    it('should have token', () => {
      let bot = new TelegramBotApi(token);
      expect(bot.token).to.be.equal(token);
    });

    it('should have not token by default', () => {
      let bot = new TelegramBotApi();
      expect(bot.token).to.be.empty();
    });

    it('should not have any option', () => {
      let bot = new TelegramBotApi(token, {});
      expect(bot.options).to.be(undefined);
    });

  });

  describe('makeUrl', () => {

    it('should exist', () => {
      let bot = new TelegramBotApi('123456');
      expect(bot).to.have.property('makeUrl');
    });

    it('should return correct url', () => {
      let bot = new TelegramBotApi('123456');
      expect(bot.makeUrl('getMe')).to.be.equal('https://api.telegram.org/bot123456/getMe');
    });
  });

  before(() => {
    bot = new TelegramBotApi(token);
    return bot;
  });

  describe('query', () => {

    it('should exist', () => {
      expect(bot).to.have.property('query');
    });

    it('should a function', () => {
      expect(bot.query).to.be.a('function');
    });

    it('should return promise', () => {
      var queryRes = bot.query('getMe', {});
      expectToBePromise(queryRes);
    })

    it('should work with getMe', (done) => {
      bot.query('getMe', {})
      .then((data) => {
        expect(data).to.be.ok();
        done();
      }, done);
    });

    it('should return pased json', (done) => {
      bot.query('getMe', {})
      .then((data) => {
        expect(data).to.be.an('object');
        expect(data).to.have.property('ok');
        done();
      })
      .catch(done);
    });

    it('should send text message', (done) => {
      bot.query('sendMessage', {
        chat_id: userId,
        text: 'Test bot.js',
        disable_notification: true
      })
      .then((data) => {
        expect(data).to.be.an('object');
        expect(data).to.have.property('ok');
        done();
      }, done);
    });

  });

  describe('methods', () => {
    let methods = [
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
    methods.forEach((method) => {
      it(`should ${method} exist.`, () => {
        expect(bot).to.have.property(method);
      })
    });

    it('should sendMessage work', (done) => {
      bot.sendMessage({
        chat_id: userId+'',
        text: 'Test2 bot.js',
        disable_notification: true
      })
      .then((data) => {
        expect(data).to.be.an('object');
        expect(data).to.have.property('ok');
        done();
      }, done);
    });

    it('should sendMessage with userId as a number', (done) => {
      bot.sendMessage({
        chat_id: parseInt(userId),
        text: 'Test3 bot.js',
        disable_notification: true
      })
      .then((data) => {
        expect(data).to.be.an('object');
        expect(data).to.have.property('ok');
        done();
      }, done);
    });
  });

});
