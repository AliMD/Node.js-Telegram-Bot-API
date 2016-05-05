import "babel-polyfill";

import TelegramBot from '../';
import expect from 'expect.js';

const
token = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
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

describe('Bot.js', () => {

  describe('New TelegramBot', () => {

    it('should be an constructor', () => {
      expect(TelegramBot).to.be.a('function');
      expect(new TelegramBot()).to.be.an('object');
    });

    it('should be have token', () => {
      let bot = new TelegramBot(token);
      expect(bot.token).to.be.equal(token);
    });

    it('should be have not token', () => {
      let bot = new TelegramBot();
      expect(bot.token).to.be.empty();
    });

    it('should be have default options', () => {
      let bot = new TelegramBot(token);
      expect(bot.options).to.be.eql(defOptions);
    });

    it('should be have default options with extend', () => {
      let bot = new TelegramBot(token, {});
      expect(bot.options).to.be.eql(defOptions);
    });

    it('should be have extended options', () => {
      let bot = new TelegramBot(token, {foo: 'bar'});
      expect(bot.options.foo).to.be.equal('bar')
    });

  });

  describe('query', () => {
    var bot;
    before(() => {
      bot = new TelegramBot(token);
      return bot;
    });

    it('should exist', () => {
      expect(bot).to.have.property('query');
    });

    it('should a function', () => {
      expect(bot.query).to.be.a('function');
    });

    it('should return promise', () => {
      var queryRes = bot.query('getMe', {});
      expectToBePromise(queryRes);
    });

    it('should work with getMe');
  });

});
