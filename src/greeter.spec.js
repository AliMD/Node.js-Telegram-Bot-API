const expect = require('expect.js');

import {Greeter} from "./greeter";

describe("greeter", function () {
    it("should greet with message", function () {
        var greeter = new Greeter('ali');
        expect(greeter.greet()).to.be('Salam, ali!');
    });
});
