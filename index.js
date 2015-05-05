/**
 * load-deps <https://github.com/tunnckoCore/load-deps>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Copyright (c) 2014-2015 Jon Schlinkert.
 * Released under the MIT license.
 */

'use strict'

var matcher = require('is-match')
var extend = require('extend-shallow')
var pkg = require('load-pkg')

/**
 * Load devDependencies of the current project or
 * any other dependencies
 *
 * @param  {String|Array|Function|RegExp} `patterns`
 * @param  {Object} `opts`
 * @return {Object}
 * @api public
 */
module.exports = function loadDeps (patterns, opts) {
  opts = extend({type: 'devDependencies'}, opts)

  var deps = extend({}, opts.type ? pkg[opts.type] : pkg.dependencies)
  var isMatch = matcher(patterns, opts)
  var res = {}

  var keys = Object.keys(deps)
  var len = keys.length
  var i = 0

  while (i++ < len) {
    var name = keys[i]
    if (name && isMatch(name)) {
      var key = renameKey(name, opts)
      res[key] = req(name, opts)
    }
  }
  return res
}

/**
 * Default `require` function. Pass a custom function to
 * `opts.require` to override.
 *
 * @param  {String} `name`
 * @param  {Object} `opts`
 * @return {String}
 */
function req (name, opts) {
  if (opts && opts.require) {
    return opts.require(name, opts)
  }
  var fp = require.resolve(name)
  return require(fp)
}

/**
 * Default `renameKey` function. Pass a custom function to
 * `opts.renameKey` to override.
 *
 * @param  {String} `name`
 * @param  {Object} `opts`
 * @return {String}
 */
function renameKey (name, opts) {
  if (opts && opts.renameKey) {
    return opts.renameKey(name, opts)
  }
  return name
}
