var assert = require('assert')
  , mocha = require('mocha')
  , ReduceStream = require('reduce-stream')
  , FilterStream = require('..')

describe('MapReduce Streams', function () {

  describe('streamReduce', function () {
    var extractor = function (data) { if (data) return data.n }
      , adder = function (acc, x, i) {
          acc += x
          return acc
      }
      , filterStream = FilterStream(extractor)
      , reduceStream = ReduceStream(adder, 0)

    filterStream.pipe(reduceStream).pipe(process.stdout)

    it('should accumulate the filtered value', function(done) {
      reduceStream.on('end', function (data) {
        assert.equal(reduceStream.accumulator, 42)
        done()
      })
      filterStream.write({ n: 5, m: 'it' })
      filterStream.write({ n: 19, g: 6 })
      filterStream.write({ n: 18, o: 6 })
      filterStream.end()
    })

  })

})