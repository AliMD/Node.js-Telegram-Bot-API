import "babel-polyfill";
const expect = require('expect.js');

import TelegramBotApi from '../dist/src/core';

const
token = process.env.TEST_TOKEN || '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
userId = process.env.TEST_USERID || 777000,

expectToBePromise = (obj) => {
  expect(obj).to.be.an('object');
  expect(obj).to.have.property('then');
  expect(obj.then).to.be.a('function');
}
;

describe('core', () => {
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

    it('should can have option', () => {
      let bot = new TelegramBotApi(token, {junk: 10});
      expect(bot.options.junk).to.be(10);
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
      bot.query('getMe')
      .then((data) => {
        expect(data).to.be.ok();
        done();
      }, done);
    });

    it('should return pased json', (done) => {
      bot.query('getMe')
      .then((data) => {
        expect(data).to.be.an('object');
        expect(data).to.have.property('ok');
        done();
      }, done);
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

});
