@fav/path.relative [![NPM version][npm-image]][npm-url]
==================

Provides same behaviors of `path.relative` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm:

```
$ npm install @fav/path --save
```

For installing only `@fav/path.relative` with npm:

```
$ npm install @fav/path.relative --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.relative('path/to/aaa/bbb', 'path/to/ccc/ddd')
// => '../../ccc/ddd'
```

When installing `@fav/path.relative`:

```js
const relative = require('@fav/path');

relative('path/to/aaa/bbb', 'path/to/ccc/ddd')
// => '../../ccc/ddd'
```

API
---

### <u>relative(from, to)</u>

Returns a relative path from `from` to `to`.

##### Arguments

* **from** [string] : an absolute or relative path string.
* **to** [string] : an absolute or relative path string.

##### Errors

* [TypeError] : if neither **from** nor **to** is a string.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.8.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

