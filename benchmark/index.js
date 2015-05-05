'use strict'

var loadPlugins = require('load-plugins')
var loadDeps = require('../index')

suite('load-plugins vs. load-deps', function () {
  bench('load-plugins', function () {
    var plugin = loadPlugins('node-*')
  })
  bench('load-deps', function () {
    var plugin = loadDeps('node-*')
  })
})
