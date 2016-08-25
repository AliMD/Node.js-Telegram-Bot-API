import "babel-polyfill";
const expect = require('expect.js');
import http from 'http';

import _1request from './1request';

function expectToBePromise (obj) {
  expect(obj).to.be.an('object');
  expect(obj).to.have.property('then');
  expect(obj.then).to.be.a('function');
};

const
host = '127.0.0.1',
port = 3010,
serverUrl = `http://${host}:${port}/`
;

var server = http.createServer((req, resp) => {
  try {
    if (req.url === '/') {
      resp.writeHead(200, {'Content-Type': 'text/plain'});
      resp.end('okay');
    }

    else if (req.url === '/test.json') {
      resp.writeHead(200, {'Content-Type': 'application/json'});
      resp.end('{msg: hi}');
    }

    else if (req.url === '/timeout') {
      resp.writeHead(200, {'Content-Type': 'application/json'});
      // resp.end('okay');
      // cancel for timeout test
    }

    else {
      resp.writeHead(200, {'Content-Type': 'text/plain'});
      resp.end(req.url.substr(1));
    }
  }
  catch (err) {
    console.error(err);
  }
});

describe('1request.js', () => {
  before ((done) => {
    console.log(`server listen on ${port}`);
    server.listen(port, host, null, done);
  });

  after ((done) => {
    console.log('server close');
    server.close(done);
  })

  it('shoud return promise', () => {
    expectToBePromise(_1request({}));
  });

  it('shoud rejected on failed', (done) => {
    let count = 0;
    _1request({
      url: 'junk'
    })
    .then((data) => {
      throw('_1request load success !!!');
    }, (err) => {
      done();
    });
  });

  it('shoud resolved on success', (done) => {
    _1request({
      url: serverUrl
    })
    .then((data) => {
      expect(data.response.statusCode).to.be.equal(200);
      done(data.err);
    }, (err) => {
      console.log(err);
      throw(err);
    })
    .catch((err) => {
      throw(err);
    })
    ;
  });

  it('shoud return body', (done) => {
    let text = 'salam';
    _1request({
      url: serverUrl + text
    })
    .then((data) => {
      expect(data.response.statusCode).to.be.equal(200);
      expect(data.body).to.be.equal(text);
      done(data.err);
    }, done)
    ;
  });

  it('shoud timeout on server busy', (done) => {
    _1request({
      url: serverUrl + 'timeout',
      timeout: 200
    })
    .then((data) => {
      done('request response!');
    }, (err) => {
      console.log(err.Error);
      if (err == 'Error: ETIMEDOUT') {
        done();
      } else {
        done(err);
      }
    })
    ;
  });

});
