/*!
 * load-deps <https://github.com/tunnckoCore/load-deps>
 *
 * Copyright (c) 2015-2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Copyright (c) 2014-2015 Jon Schlinkert
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * Load devDependencies of the current project or
 * any other dependencies
 *
 * @param  {String|Array|Function|RegExp|Object} `patterns`
 * @param  {Object} `opts`
 * @return {Object}
 * @api public
 */
module.exports = function loadDeps (patterns, opts) {
  opts = utils.extend({
    cwd: process.cwd(),
    type: 'devDependencies'
  }, opts)

  var pkg = utils.loadPkg.sync(opts.cwd) || false
  var deps = pkg ? utils.extend({}, opts.type ? pkg[opts.type] : pkg.dependencies) : false

  if (!deps) return {}

  var isMatch = utils.matcher(patterns, opts)
  var keys = deps ? Object.keys(deps) : []
  var len = keys.length
  var res = {}
  var i = 0

  while (i < len) {
    var name = keys[i++]
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
