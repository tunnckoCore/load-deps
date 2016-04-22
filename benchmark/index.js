'use strict'

var ansi = require('ansi')
var bold = require('ansi-bold')
var Benchmark = require('benchmark')
var suite = new Benchmark.Suite
var cursor = ansi(process.stdout)

var gulpLoadPlugins = require('gulp-load-plugins')
var loadPlugins = require('load-plugins')
var loadDeps = require('../index')

var opts = {
  onCycle: function onCycle (event) {
    cursor.horizontalAbsolute()
    cursor.eraseLine()
    cursor.write('  ' + event.target)
  },
  onComplete: function onComplete () {
    cursor.write('\n')
  }
}

suite
  .add('load-plugins', function () {
    loadPlugins('gulp-*')
  }, opts)
  .add('load-deps', function () {
    loadDeps('gulp-*')
  }, opts)
  .add('gulp-load-plugins', function () {
    gulpLoadPlugins()
  }, opts)
  .on('complete', function () {
    cursor.write('\n')
    cursor.write('Fastest is ' + bold(this.filter('fastest').map('name')))
    cursor.write('\n')
    process.exit(0)
  })
  .run()
