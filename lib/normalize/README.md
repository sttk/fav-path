@fav/path.normalize [![NPM version][npm-image]][npm-url]
===================

Provides same behaviors of `path.normalize` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm:

```
$ npm install @fav/path --save
```

For installing only `@fav/path.normalize` with npm:

```
$ npm install @fav/path.normalize --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.normalize('/foo/bar//baz/asdf/quux/..');
// => '/foo/bar/baz/asdf'
```

When installing `@fav/path.normalize`:

```js
const normalize = require('@fav/path.normalize');

normalize('/foo/bar//baz/asdf/quux/..');
// => '/foo/bar/baz/asdf'
```

API
---

### <u>normalize(path)</u>

Normalizes the given `path`, resolving `'..'` and `'.'` segments.

##### Arguments

* **path** [string] : a path string.

##### Errors

* [TypeError] : if **path** is not a string.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.8.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

