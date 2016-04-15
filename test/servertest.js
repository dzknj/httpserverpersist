const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;
const server = require('./../server');
const router = require('./../lib/router');
const fs = require('fs');
require(__dirname + '/../server');

describe('Testing the http server', () => {
  before((done) => {
    server.listen(3000, () => {
      console.log('server listening on 3000');
      done();
    })
    .on('error', (err) => {
      console.log(err);
    });
  });
  after(() => {
    server.close(() => {
      console.log('closing server');
    });
  });
  it('should respond to GET request to /notes with a list of files in location /notes', (done) => {
    request('localhost:3000')
    .get('/notes')
    .end((err, res) => {
      var foo = fs.readdirSync('./notes');
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.text.slice(17,30)).to.equal(foo.toString().slice(0,13));
      done();
    })
  })
  it('Should write POST data in JSON form into a unique file at /notes', (done) => {
    chai.request('localhost:3000')
    .post('/notes')
    .send('{"message":"hello from my JSON test message!!"}')
    .end((err,res) => {
      var foo = fs.readdirSync('./notes');
      var index = foo.length -1;
      expect(res.text.toString().slice(39,47)).to.eql(foo[index].slice(0,8));
      done();
    });
  })
})
