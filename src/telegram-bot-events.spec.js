import "babel-polyfill";
import expect from 'expect.js';

import TelegramBotApi from './telegram-bot-events';

const
token = process.env.TEST_TOCKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
userId = process.env.TEST_USERID || 777000,
defOptions = {
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
  after(() => {
    bot.stopAutoUpdates();
  })

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
    afterEach(() => {
      bot.offAll();
    });

    it('should have `on` method', () => {
      expect(bot).to.have.property('on');
      expect(bot.on).to.be.a('function');
    });

    it('should have `once` method', () => {
      expect(bot).to.have.property('once');
      expect(bot.once).to.be.a('function');
    });

    it('should have `off` method', () => {
      expect(bot).to.have.property('off');
      expect(bot.off).to.be.a('function');
    });

    it('should have `offAll` method', () => {
      expect(bot).to.have.property('offAll');
      expect(bot.offAll).to.be.a('function');
    });

    it('should have `events`', () => {
      expect(bot.events).to.be.a('object');
      expect(bot.events.on).to.be.a('function');
    });

    it('should can add listner', (done) => {
      let callback = function () {
        done('callback called !')
      };

      bot.on('junk', callback);
      let listeners = bot.events.listeners('junk');

      expect(listeners).to.be.an('array');
      expect(listeners.length).to.be.equal(1);
      expect(listeners[0]).to.be.equal(callback);
      done();
    });

    it('should can remove all special listners', (done) => {
      let callback1 = function () {
        done('callback1 called !')
      };
      bot.on('junk', callback1);
      bot.on('junk', callback1);

      let callback2 = function () {
        done('callback2 called !')
      };
      bot.on('junk', callback2);
      bot.on('junk', callback2);

      let callback3 = function () {
        done('callback3 called !')
      };
      bot.on('junk2', callback2);

      bot.offAll('junk');

      expect(bot.events.listeners('junk').length).to.be.equal(0);
      expect(bot.events.listeners('junk2').length).to.be.equal(1);
      done();
    });

    it('should can remove all listners', (done) => {
      let callback1 = function () {
        done('callback1 called !')
      };
      bot.on('junk', callback1);
      bot.on('junk', callback1);

      let callback2 = function () {
        done('callback2 called !')
      };
      bot.on('junk', callback2);
      bot.on('junk', callback2);

      let callback3 = function () {
        done('callback3 called !')
      };
      bot.on('junk2', callback2);

      bot.offAll();

      expect(bot.events.listeners('junk').length).to.be.equal(0);
      expect(bot.events.listeners('junk2').length).to.be.equal(0);
      done();
    });

    it('should can remove a special listner', (done) => {
      let callback1 = function () {
        done('callback1 called !')
      };
      bot.on('junk', callback1);

      let callback2 = function () {
        done('callback2 called !')
      };
      bot.on('junk', callback2);

      expect(bot.events.listeners('junk').length).to.be.equal(2); // also check offAll in afterEach

      bot.off('junk', callback1);

      expect(bot.events.listeners('junk').length).to.be.equal(1);
      expect(bot.events.listeners('junk')[0]).to.be.equal(callback2);
    });


  })

  describe('auto update', () => {
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
