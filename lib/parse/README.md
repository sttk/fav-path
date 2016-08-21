@fav/path.parse [![NPM version][npm-image]][npm-url]
===============

Provides same behaviors of `path.parse` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm:

```
$ npm install @fav/path --save
```

For installing only `@fav/path.parse` with npm:

```
$ npm install @fav/path.parse --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.parse('/path/to/file.txt');
// => {
//      root: '/',
//      dir: '/path/to',
//      base: 'file.txt',
//      ext: '.txt',
//      name: 'file'
//    }
```

When installing `@fav/path.parse`:

```js
const parse = require('@fav/path.parse');

parse('/path/to/file.txt');
// => {
//      root: '/',
//      dir: '/path/to',
//      base: 'file.txt',
//      ext: '.txt',
//      name: 'file'
//    }
```

API
---

### <u>parse(path)</u>

Parses the `path` string and returns the result object which has the path elements as its properties.
The properties are as follows:

   * `root` [String]
   * `dir` [String]
   * `base` [String]
   * `ext` [String]
   * `name` [String]

##### Arguments

* **path** [string] : a path string.

##### Errors

* [TypeError] : if **path** is not a string.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.7.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

