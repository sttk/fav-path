@fav/path.extname [![NPM version][npm-image]][npm-url]
=================

Provides same behaviors of `path.extname` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm:

```
$ npm install @fav/path --save
```

For installing only `@fav/path.extname` with npm:

```
$ npm install @fav/path.extname --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.extname('path/to/file.ext');
// => .ext
```

When installing `@fav/path.extname`:

```js
const extname = require('@fav/path.extname');

extname('path/to/file.ext');
// => .ext
```

API
---

### <u>extname(path)</u>

Returns an extension part of a file path.

##### Arguments

* **path** [string] : an absolute or relative path string.

##### Errors

* [TypeError] : if **path** is not a stirng.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.5.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/license/MIT
