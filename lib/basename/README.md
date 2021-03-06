@fav/path.basename [![NPM version][npm-image]][npm-url]
==================

Provides same behaviors of `path.basename` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm: 

```
$ npm install @fav/path --save
```

For installing only `@fav/path.basename` with npm:

```
$ npm install @fav/path.basename --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.basename('path/to/file.ext');
// => file.ext

path.basename('path/to/file.ext', '.ext');
// => file
```

When installing `@fav/path.basename`:

```js
const basename = require('@fav/path.basename');

basename('path/to/file.ext');
// => file.ext

basename('path/to/file.ext', '.ext');
// => file
```

API
---

### <u>basename(path, [, ext])</u>

Returns a basename of a file path.

##### Arguments

* **path** [string] : an absolute or relative path string.
* **ext** [string] : an extension (optional).

##### Errors

* [TypeError] : if **path** is not a string, or **ext** is given and not a string.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.9.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

