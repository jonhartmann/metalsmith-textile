
var assert = require('assert');
var equal = require('assert-dir-equal');
var Metalsmith = require('metalsmith');
var textile = require('..');

describe('metalsmith-textile', function(){
  it('should convert textile files', function(done){
    Metalsmith('test/fixtures/basic')
      .use(textile())
      .build(function(err){
        if (err) return done(err);
        equal('test/fixtures/basic/expected', 'test/fixtures/basic/build');
        done();
      });
  });
});