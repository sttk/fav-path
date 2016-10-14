@fav/path.resolve [![NPM version][npm-image]][npm-url]
=================

Provides same behaviors of `path.resolve` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm:

```
$ npm install @fav/path --save
```

For installing only `@fav/path.resolve` with npm:

```
$ npm install @fav/path.resolve --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.resolve('aaa/bbb/../ccc', 'ddd/eee')
// => '/absolute/path/to/aaa/ccc/ddd/eee'
```

When installing `@fav/path.resolve`:

```js
const resolve = require('@fav/path.resolve');

relative('aaa/bbb/../ccc', 'ddd/eee')
// => '/absolute/path/to/aaa/ccc/ddd/eee'
```

API
---

### <u>resolve()</u>

Resolves a sequence of path segments into an absolute path.

##### Arguments

* **...paths** [string] :  a sequence of path segments

##### Errors

* [TypeError] : if any of the arguments is not a string.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.8.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

