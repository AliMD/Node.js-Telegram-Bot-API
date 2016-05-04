import Calc from './calc';

describe('Calculator', () => {
    var subject : Calc;

    beforeEach(function () {
        subject = new Calc();
    });

    describe('#add', () => {
        it('should add two numbers together', () => {
            var result : number = subject.add(2, 3);
            if (result !== 5) {
                throw new Error('Expected 2 + 3 = 5 but was ' + result);
            }
        });
    });
});
