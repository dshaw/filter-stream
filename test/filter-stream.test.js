var assert = require('assert')
  , mocha = require('mocha')
  , Stream = require('stream').Stream
  , FilterStream = require('..')

//console.dir(FilterStream)

describe('FilterStream', function () {

  describe('FilterStream', function () {
    var filter = function (obj) { return obj.awesome }
      , filterStream = FilterStream(filter)

    it('should be a FilterStream', function(done) {
      assert.ok(filterStream instanceof FilterStream)
      done()
    })
    it('should be a Stream', function(done) {
      assert.ok(filterStream instanceof Stream)
      done()
    })
    it('should have a `filter` function', function(done) {
      assert.equal(typeof filterStream.filter, 'function')
      done()
    })
    it('should accumulate the value written to it', function(done) {
      filterStream.on('data', function (data) {
        assert.deepEqual(data, 'yeah')
        done()
      })
      filterStream.write({ so: 'much', awesome: 'yeah' })
    })
  })

})