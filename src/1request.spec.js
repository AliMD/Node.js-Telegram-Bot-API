import "babel-polyfill";
import expect from 'expect.js';
import http from 'http';

import _1request from './1request';

function expectToBePromise (obj) {
  expect(obj).to.be.an('object');
  expect(obj).to.have.property('then');
  expect(obj.then).to.be.a('function');
};
describe('_1request', () => {
  it('shoud return promise', () => {
    expectToBePromise(_1request({}));
  });
});
