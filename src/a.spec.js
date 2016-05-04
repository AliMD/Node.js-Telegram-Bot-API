/// <reference path="../typings/main.d.ts" />

const expect = require('expect.js');

describe('Test group 1', () => {

  describe('Sub group 1', () => {
    it('should equal work', () => {
      expect([1,2,3].indexOf(5)).equal(-1);
    });

    it('should be work', () => {
      expect([1,2,3].indexOf(5)).be(-1);
    });

    it('should to.be work', () => {
      expect([1,2,3].indexOf(5)).to.be(-1);
    });

    it('should to.be.equal work', () => {
      expect([1,2,3].indexOf(5)).to.be.equal(-1);
    });

    it('should to.be.below work', () => {
      expect([1,2,3].indexOf(5)).to.be.below(0);
    });
  });

  describe('Sub group 2', () => {
    it('should equal work', () => {
      expect([1,2,3].indexOf(5)).equal(-1);
    });

    it('should be work', () => {
      expect([1,2,3].indexOf(5)).be(-1);
    });

    it('should to.be work', () => {
      expect([1,2,3].indexOf(5)).to.be(-1);
    });

    it('should to.be.equal work', () => {
      expect([1,2,3].indexOf(5)).to.be.equal(-1);
    });

    it('should to.be.below work', () => {
      expect([1,2,3].indexOf(5)).to.be.below(0);
    });
  });


});
