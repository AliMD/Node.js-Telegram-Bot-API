export class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Salam, ' + this.greeting + '!';
  }
}
