@fav/path.isabsolute [![NPM version][npm-image]][npm-url]
====================

Provides same behaviors of `path.isAbsolute` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm:

```
$ npm install @fav/path --save
```

For installing only `@fav/path.isabsolute` with npm:

```
$ npm install @fav/path.isabsolute --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.isAbsolute('/path/to/file.txt');
// => true

path.isAbsolute('path/to/file.txt');
// => false
```

When installing `@fav/path.isabsolute`:

```js
const isAbsolute = require('@fav/path.isabsolute');

isAbsolute('/path/to/file.txt');
// => true

isAbsolute('path/to/file.txt');
// => false
```

API
---

### <u>isAbsolute(path)</u>

Checks if a file path is absolute.

##### Arguments

* **path** [string] : a path string.

##### Errors

* [TypeError] : if **path** is not a string.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.9.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

