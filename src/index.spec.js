/// <reference path="../typings/main.d.ts" />

import TelegramBot from "./";

const expect = require('expect.js');

var expectToBePromise = (obj) => {
  expect(bot).to.be.an('object');
  expect(bot).to.have('then');
  expect(bot.then).to.be.a('function');
};

const token = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';

describe('telegram bot client general', () => {

  describe('setup', () => {

    it.only('should be an constructor', () => {
      expect(TelegramBot).to.be.a('function');
      expect(new TelegramBot()).to.be.an('object');
    });

    it('should be return a promise', (done) => {
      const bot = new TelegramBot(token);
      expect(bot).to.be.an('object');
      expect(bot).to.have('then');
      expect(bot.then).to.be.a('function');
      bot.then(done, (err) => {
        throw err;
      });
    });

  });

  describe('api', () => {

    before((done) => {
      const bot = new TelegramBot(token);
      bot.then(done);
    });

    it('should be worked!');

  });

});
