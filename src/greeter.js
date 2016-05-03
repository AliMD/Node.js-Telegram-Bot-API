"use strict";
class Greeter {
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return 'Salam, ' + this.greeting + '!';
    }
}
exports.Greeter = Greeter;
