@fav/path.dirname [![NPM version][npm-image]][npm-url]
==================

Provides same behaviors of `path.dirname` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm: 

```
$ npm install @fav/path --save
```

For installing only `@fav/path.dirname` with npm:

```
$ npm install @fav/path.dirname --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.dirname('path/to/file.ext');
// => path/to
```

When installing `@fav/path.dirname`:

```js
const dirname = require('@fav/path.dirname');

dirname('path/to/file.ext');
// => path/to
```

API
---

### <u>dirname(path)</u>

Returns a directory part of a file path.

##### Arguments

* **path** [string] : an absolute or relative path string.

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

