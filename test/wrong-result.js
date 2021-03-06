const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const mockery = require('mockery');

const sandbox = sinon.sandbox.create();
let itunesApiSearch;

function requestWrongData(url, callback){
  callback(
    null,
    {statusCode: 200},
    '<html><head><title>Error</title></head><body>Your request produced an error.  <BR>[newNullResponse]</body></html>');
}

describe('itunesApiSearch - with wrongResult', function() {

  before(function (){
    mockery.enable({
      warnOnReplace: false,
	    warnOnUnregistered: false,
      useCleanCache: true
    });
  });

  beforeEach(function(){
    mockery.registerMock('request', requestWrongData);
    itunesApiSearch = require('../index.js');
  });

  afterEach(function(){
    sandbox.verifyAndRestore();
    mockery.deregisterAll();
  });

  after(function(){
    mockery.disable();
  });

  it('should callback be called if the search is not empty', function(done) {
    itunesApiSearch.search('test', null, function(err, res) {
      should.not.exist(res);
      should.exist(err);
      err.message.should.equal('Unexpected token < in JSON at position 0');
      done();
    });
  });
});
