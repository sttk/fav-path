@fav/path.join [![NPM version][npm-image]][npm-url]
====================

Provides same behaviors of `path.join` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm:

```
$ npm install @fav/path --save
```

For installing only `@fav/path.join` with npm:

```
$ npm install @fav/path.join --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.join('/path/to', 'foo', '..', 'file.txt');
// => /path/to/file.txt
```

When installing `@fav/path.join`:

```js
const join = require('@fav/path.join');

join('/path/to', 'foo', '..', 'file.txt');
// => /path/to/file.txt
```

API
---

### <u>join(path[, ...])</u>

Checks if a file path is absolute.

##### Arguments

* **path** [string] : a sequence of path segments.

##### Errors

* [TypeError] : if any of the path segments is not a string.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.8.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

