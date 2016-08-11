@fav/path.format [![NPM version][npm-image]][npm-url]
==================

Provides same behaviors of `path.format` module for all versions of node.js

Install
-------

For installing `@fav/path` with npm: 

```
$ npm install @fav/path --save
```

For installing only `@fav/path.format` with npm:

```
$ npm install @fav/path.format --save
```

Usage
-----

When installing `@fav/path`:

```js
const path = require('@fav/path');

path.format({ dir: 'path/to', base: 'file.ext' });
// => path/to/file.ext

path.format({ dir: 'path/to', name: 'file', ext: '.ext' });
// => path/to/file.ext
```

When installing `@fav/path.format`:

```js
const format = require('@fav/path.format');

format({ dir: 'path/to', base: 'file.ext' });
// => path/to/file.ext

format({ dir: 'path/to', name: 'file', ext: '.ext' });
// => path/to/file.ext
```

API
---

### <u>format(pathObject)</u>

Returns a path string from an object.

##### Arguments

* **pathObject** [object] :

    `pathObject` can has following properties:

    * **dir** : a string for a directory.
    * **root** : a string for a root.
      This property is used if `dir` property is not supplied.
    * **base** : a string for a base name.
    * **name** : a string for a file name without an extension.
      This property is used if `base` property is not supplied.
    * **ext** : a string for an extension.
      This property is used if `base` property is not supplied.

##### Errors

* [TypeError] : if **path** is not an object.

License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[npm-image]: http://img.shields.io/badge/npm-v0.5.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT

