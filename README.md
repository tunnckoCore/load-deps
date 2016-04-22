# [load-deps][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] 

> Just load devDependencies of the current project or any other dependencies. Useful for any node.js app that needs to load plugins from node_modules. 15-20x times faster alternative to `load-plugins` and `gulp-load-plugins`.

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]


## Install
```
npm i load-deps --save
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
var appname = require('app-name')
var loadDeps = require('load-deps')

var strip = ['gulp', 'handlebars', 'helpers']
var rename = function renameFn(name) {
  return appname(name, strip)
}

var plugin = loadDeps('gulp-*', {renameKey: rename})

gulp.task('default', function () {
  gulp.src('test/*.js')
    .pipe(plugin.jshint())
    .pipe(plugin.mocha())
    .pipe(plugin.stylus())
    .pipe(plugin.mustache())
    .pipe(plugin.istanbul())
})
```

## Options
### options.require

Pass a custom function for `require`ing files.

```js
var loadDeps = require('load-deps')
var plugin = loadDeps('gulp-*', {
  require: function (name) {
    // do stuff to name
  }
})
```

### options.renameKey

Pass a renameKey function to change how plugins are named.

```js
var loadDeps = require('load-deps')
var plugin = loadDeps('my-plugins-*', {
  renameKey: function (name) {
    return path.resolve(name)
  }
})
```


## Benchmark

Just run benchmarks against `load-plugins` and `gulp-load-plugins`. It is 15-20x faster then them.

```
npm run benchmark
```

results as of `22 April, 2016`

```
[charlike@voltaire load-deps]$ npm run benchmark
  load-plugins x 205 ops/sec ±3.09% (61 runs sampled)
  load-deps x 14,297 ops/sec ±10.74% (63 runs sampled)
  gulp-load-plugins x 813 ops/sec ±2.27% (62 runs sampled)

Fastest is load-deps
```


## Related
- [benz](https://github.com/tunnckocore/benz): Compose your control flow with absolute elegance. Support async/await, callbacks, thunks, generators, promises, observables, child processes and streams. Can power applications that need to have plugins. Useful for creating task, test and bench runners.
- [create-callback](https://github.com/tunnckocore/create-callback): Create callback api from synchronous function. Same as `make-callback`, but won't handle generators and if async function is given returns it.
- [extend-shallow](https://github.com/jonschlinkert/extend-shallow): Extend an object with the properties of additional objects. node.js/javascript util.
- [is-match](https://github.com/jonschlinkert/is-match): Create a matching function from a glob pattern, regex, string, array, object or function.
- [is-kindof](https://github.com/tunnckocore/is-kindof): Check type of given javascript value. Support promises, generators, streams, and native types. Thin wrapper around `kind-of` module.
- [is-extendable](https://github.com/jonschlinkert/is-extendable): Returns true if a value is any of the object types: array, regexp, plain object, function or date. This is useful for determining if a value can be extended, e.g. "can the value have keys?"
- [load-plugins](https://github.com/jonschlinkert/load-plugins): Load plugins for gulp, grunt, assemble, verb any node.js app that needs to load plugins from node_modules or local folders.
- [load-pkg](https://github.com/jonschlinkert/load-pkg): Load the package.json in the base of the user's current project.


## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/tunnckoCore/load-deps/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.


## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckocore.tk][author-www-img]][author-www-url] [![keybase tunnckocore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]


[npmjs-url]: https://www.npmjs.com/package/load-deps
[npmjs-img]: https://img.shields.io/npm/v/load-deps.svg?label=load-deps

[license-url]: https://github.com/tunnckoCore/load-deps/blob/master/LICENSE.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg


[codeclimate-url]: https://codeclimate.com/github/tunnckoCore/load-deps
[codeclimate-img]: https://img.shields.io/codeclimate/github/tunnckoCore/load-deps.svg

[travis-url]: https://travis-ci.org/tunnckoCore/load-deps
[travis-img]: https://img.shields.io/travis/tunnckoCore/load-deps.svg

[coveralls-url]: https://coveralls.io/r/tunnckoCore/load-deps
[coveralls-img]: https://img.shields.io/coveralls/tunnckoCore/load-deps.svg

[david-url]: https://david-dm.org/tunnckoCore/load-deps
[david-img]: https://img.shields.io/david/tunnckoCore/load-deps.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/messages
[new-message-img]: https://img.shields.io/badge/send%20me-message-green.svg
