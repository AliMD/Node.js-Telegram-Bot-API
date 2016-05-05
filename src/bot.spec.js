import "babel-polyfill";
import expect from 'expect.js';

import TelegramBot from '../';

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

describe('bot.js', () => {

  describe('new instance', () => {

    it('should an constructor', () => {
      expect(TelegramBot).to.be.a('function');
      expect(new TelegramBot()).to.be.an('object');
    });

    it('should have token', () => {
      let bot = new TelegramBot(token);
      expect(bot.token).to.be.equal(token);
    });

    it('should have not token', () => {
      let bot = new TelegramBot();
      expect(bot.token).to.be.empty();
    });

    it('should have default options', () => {
      let bot = new TelegramBot(token);
      expect(bot.options).to.be.eql(defOptions);
    });

    it('should have default options with extend', () => {
      let bot = new TelegramBot(token, {});
      expect(bot.options).to.be.eql(defOptions);
    });

    it('should have extended options', () => {
      let bot = new TelegramBot(token, {foo: 'bar'});
      expect(bot.options.foo).to.be.equal('bar');
    });

  });

  describe('makeUrl', () => {

    it('should exist', () => {
      let bot = new TelegramBot('123456');
      expect(bot).to.have.property('makeUrl');
    });

    it('should return correct url', () => {
      let bot = new TelegramBot(token);
      expect(bot.makeUrl('getMe')).to.be.equal('https://api.telegram.org/bot123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11/getMe');
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
    })

    it('should work with getMe', (done)=>{
      bot.query('getMe', {})
      .then((data) => {
        if(!data) throw(data);
        done();
      }, done);
    });

  });

});
