import "babel-polyfill";
const expect = require('expect.js');
import TelegramBotApi from '../lib/telegram-bot-events';

const
token = process.env.TEST_TOKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
userId = process.env.TEST_USERID || 777000,
options = {
  gzip: true,
  autoChatAction: true,
  autoChatActionUploadOnly: false,
  autoUpdate: false,
  updateInterval: 1000,
  updateLimit: 50,
  updatePoolingTimeout: 0
},

expectToBePromise = (obj) => {
  expect(obj).to.be.an('object');
  expect(obj).to.have.property('then');
  expect(obj.then).to.be.a('function');
}
;

describe('telegram-bot-events', () => {
  var bot = new TelegramBotApi(token, options);
  after(() => {
    bot.stopAutoUpdate();
  })

  describe('new instance', () => {

    it('should have default options', () => {
      let bot = new TelegramBotApi(token);
      bot.stopAutoUpdate();
      expect(bot.options)
    });

    it('should have default options with extend', () => {
      let bot = new TelegramBotApi(token, {});
      bot.stopAutoUpdate();
      expect(bot.options).to.be.eql(options);
    });

    it('should have extended options', () => {
      let bot = new TelegramBotApi(token, {foo: 'bar'});
      bot.stopAutoUpdate();
      expect(bot.options.foo).to.be.equal('bar');
    });

    it('should can change super options like gzip', () => {
      let bot = new TelegramBotApi(token, {gzip: false});
      bot.stopAutoUpdate();
      expect(bot.options.gzip).to.be.equal(false);
    });

  });

  describe('events', () => {
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
      done();
    });


  })

  describe('auto update', () => {
    afterEach(() => {
      bot.stopAutoUpdate();
      bot.offAll();
    });

    it('shout be stopAutoUpdated work', (done) => {
      let bot = new TelegramBotApi(token, options);
      bot.startAutoUpdate();

      setTimeout(()=>{
        bot.stopAutoUpdate();
        expect(bot._setTimeout._onTimeout).to.not.be.ok();
        expect(bot.options.autoUpdate).to.not.be.ok();
        bot.stopAutoUpdate();
        done();
      }, 200);
    });

    it('shout be not autoUpdated by default option', () => {
      let bot = new TelegramBotApi(token);
      expect(bot._setTimeout).to.not.be.ok();

      bot = new TelegramBotApi(token, {autoUpdate: false});
      expect(bot._setTimeout).to.not.be.ok();
    });

    it('shout be autoUpdated by default', () => {
      let bot = new TelegramBotApi(token, {autoUpdate: true});
      after(() => {
        bot.stopAutoUpdate();
      });
      expect(bot._setTimeout).to.be.ok();
    });

    it('shout be startAutoUpdated work', (done) => {
      let bot = new TelegramBotApi(token, {autoUpdate: false, updateInterval: 100});
      after(() => {
        bot.stopAutoUpdate();
      });
      expect(bot._setTimeout).to.not.be.ok();
      bot.startAutoUpdate();
      setTimeout(()=>{
        expect(bot._setTimeout).to.be.ok();
        bot.stopAutoUpdate();
        expect(bot._setTimeout._setTimeout).to.not.be.ok();
        done();
      }, 200);
    });

    it.skip('should trigger on update', (done) => {
      console.log('send message to this bot for test');
      bot.once('update', () => {
        done();
      });
      bot.startAutoUpdate();
    });

    it.skip('should trigger on message', (done) => {
      console.log('send message to this bot for test');
      bot.once('update.message', () => {
        done();
      });
      bot.startAutoUpdate();
    });

    it.skip('should trigger on inline_query', (done) => {
      console.log('send inline_query to this bot for test');
      bot.once('update.inline_query', () => {
        done();
      });
      bot.startAutoUpdate();
    });

  })

});
