/// <reference path="../typings/main.d.ts" />

import TelegramBot from "./bot";

const expect = require('expect.js');

var expectToBePromise = (obj) => {
  expect(bot).to.be.an('object');
  expect(bot).to.have('then');
  expect(bot.then).to.be.a('function');
};

const token = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
const defOptions = {
  webhook: false,
  autoUpdate: true,
  updateInterval: 1000
};

describe('telegram bot client general', () => {

  describe('setup', () => {

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

  describe('api', () => {
    var bot;
    before(() => {
      bot = new TelegramBot(token);
    });

    it('should be worked!');

  });

});
