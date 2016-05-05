/// <reference path="../typings/main.d.ts" />

const request = require('request');

export default function (options: Object): Promise<{}> {
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
