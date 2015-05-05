/**
 * load-deps <https://github.com/tunnckoCore/load-deps>
 *
 * Copyright (c) 2015 Charlike Mike Reagent, contributors.
 * Released under the MIT license.
 */

'use strict'

var test = require('assertit')
var appname = require('app-name')
var loadDeps = require('./index')

test('load-deps:', function () {
  test('should load plugins from devDependencies by default', function (done) {
    var res = loadDeps('node-*')
    var actual = Object.keys(res).length
    var expected = 3

    test.equal(actual, expected)
    test.ok(res['node-foo'])
    done()
  })
  test('should load plugins from dependencies', function (done) {
    var res = loadDeps('is-*', {type: 'dependencies'})
    var actual = Object.keys(res).length
    var expected = 1

    test.equal(actual, expected)
    test.ok(res['is-match'])
    done()
  })
  test('should return empty object if no matches', function (done) {
    var res = loadDeps('foo-bar-*')
    var actual = Object.keys(res).length
    var expected = 0

    test.equal(actual, expected)
    test.equal(typeof res, 'object')
    done()
  })
  test('should be able to pass renameKey function through options', function (done) {
    var res = loadDeps('node-*', {renameKey: function (name) {
      return appname(name, ['node'])
    }})
    var actual = Object.keys(res).length
    var expected = 3

    test.equal(actual, expected)
    test.ok(res.foo)
    test.ok(res.bar)
    test.ok(res.baz)
    done()
  })
  test('should be able to pass custom require-ing function', function (done) {
    var res = loadDeps('node-ba*', {
      require: function (name) {
        return require.resolve(name)
      },
      renameKey: function (name) {
        return name.toUpperCase()
      }
    })
    var actual = Object.keys(res).length
    var expected = 2

    test.equal(actual, expected)
    test.ok(res['NODE-BAR'])
    test.ok(res['NODE-BAZ'])
    done()
  })
})
