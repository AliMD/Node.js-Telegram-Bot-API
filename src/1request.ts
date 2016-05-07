/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:1request');
const request = require('request');
const timeout = 20000;

log('init');

export default function (options): Promise<any> {
  if(!options.timeout) options.timeout = timeout;
  log(options);

  return new Promise((resolve, reject) => {
    try {
      let skip = false;
      let _timeout = setTimeout(() => {
        skip = true;
        reject('Error: ETIMEDOUT');
      }, options.timeout);

      request(options, (err, response, body) => {
        log('response');
        if (skip) {
          log('skiped!', err);
          return;
        }
        clearTimeout(_timeout);

        if (err) {
          setImmediate(reject, err);
        }
        else {
          setImmediate(resolve, {response: response, body: body});
        }
      });
    }
    catch (err){
      log('err', err);
      setImmediate(reject, err);
    }
  });
}
