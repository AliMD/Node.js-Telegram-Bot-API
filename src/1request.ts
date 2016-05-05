/// <reference path="../typings/main.d.ts" />

import debug = require('debug');
const log = debug('TelegramBotApi:1request');
const request = require('request');

log('init');

export default function (options: Object): Promise<{}> {
  log(options);
  return new Promise((resolve, reject) => {
    request(options, (err, response, body) => {
      if (err) {
        reject(err);
      }
      else {
        resolve({response: response, body: body});
      }
    })
  });
}
