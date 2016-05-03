import {Greeter} from "./greeter";

describe("greeter", function () {
    it("should greet with message", function () {
        var greeter = new Greeter('ali');
        expect(greeter.greet()).toBe('Salam, ali!');
    });
});
