"use strict";
const calc_1 = require('./calc');
describe('Calculator', () => {
    var subject;
    beforeEach(function () {
        subject = new calc_1.default();
    });
    describe('#add', () => {
        it('should add two numbers together', () => {
            var result = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
});
