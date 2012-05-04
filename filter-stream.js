/*!
 * FilterStream
 * Copyright(c) 2012 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Stream = require("stream").Stream,
  util = require("util")

/**
 * Configuration.
 */

var noop = function () {}
  , DEBUG = console.log

/**
 * Exports.
 */

module.exports = FilterStream

/**
 * FilterStream
 *
 * - Like Array#filter but in a Stream
 *
 * @param {Object} options [optional]
 * @param {Function} filter
 * @param initialValue
 * @constructor
 */

function FilterStream(options, filter) {
  if (!(this instanceof FilterStream)) return new FilterStream(options, filter)

  if (typeof options === 'function') {
    filter = options
    options = {}
  }

  this.options = options
  if (!options.debug) DEBUG = noop

  this.filter = filter

  this.writable = true
  this.readable = true
}

util.inherits(FilterStream, Stream)

/**
 * Write
 *
 * Apply filter function to incoming data.
 *
 * @param chunk
 * @api public
 */

FilterStream.prototype.write = function (chunk) {
  var data = this.filter(chunk)
  DEBUG(data)
  if (typeof data !== 'undefined') {
    this.emit('data', data)
    return true
  }
}

FilterStream.prototype.end = function () {
  this.emit('end')
}
