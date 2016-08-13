@fav/path [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Build Status][appveyor-image]][appveyor-url]
=======

Provides same behaviors of `path` module for all versions of node.js and enhanced features related to file path

Install
-------

Install with npm.

```
$ npm install @fav/path --save
```

Usage
-----

```js
const path = require('@fav/path');
```

APIs
----

* [path.basename](./lib/basename/README.md)
* [path.delimiter](./doc/API.md/#delimiter)
* [path.dirname](./lib/dirname/README.md)
* [path.extname](./lib/extname/README.md)
* [path.format](./lib/format/README.md)
* [path.isAbsolute](./lib/isAbsolute/README.md)
* [path.join](./lib/join/README.md)
* [path.normalize](./lib/normalize/README.md)
* [path.sep](./doc/API.md#sep)


License
-------

Copyright (C) 2016 Takayuki Sato

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.

[travis-image]: https://travis-ci.org/sttk/fav-path.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/fav-path
[appveyor-image]: https://ci.appveyor.com/api/projects/status/github/sttk/fav-path?branch=master&svn=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/fav-path
[npm-image]: http://img.shields.io/badge/npm-v0.6.0-blue.svg
[npm-url]: https://www.npmjs.org/package/@fav/path/
[mit-url]: https://opensource.org/licenses/MIT
