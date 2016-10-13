# APIs of @fav/path

<a name="basename"></a>
## #basename(path)

Returns a basename of a file path.

See [basename/README.md](../lib/basename/README.md).

<a name="delimiter"></a>
## #delimiter

Provides the platform-specific path delimiter. (Windows: `;`, Posix: `:`)

<a name="dirname"></a>
## #dirname(path)

Returns a directory path of a file path.

See [dirname/README.md](../lib/dirname/README.md).

<a name="extname"></a>
## #extname(path)

Returns an extension of a file path. 

See [extname/README.md](../lib/extname/README.md).

<a name="format"></a>
## #format(pathObject)

Returns a path string from an object.

See [format/README.md](../lib/format/README.md).

<a name="isabsolute"></a>
## #isAbsolute(path)

Checks if a file path is absolute.

See [isAbsolute/README.md](../lib/isAbsolute/README.md).

<a name="join"></a>
## #join(path[, ...])

Joins a sequence of path segments.

See [join/README.md](../lib/join/README.md).

<a name="normalize"></a>
## #normalize(path)

Normalizes the given `path`, resolving `'..'` and `'.'` segments.

See [normalize/README.md](../lib/normalize/README.md).

<a name="parse"></a>
## #parse(path)

Parses the `path` string and returns the result object which has the path elements as its properties.

See [parse/README.md](../lib/parse/README.md).

<a name="relative"></a>
## #relative(from, to)

Returns a relative path from `from` to `to`.

See [relative/README.md](../lib/relative/README.md).

<a name="resolve"></a>
## #resolve(path[, ...])

Resolves a sequence of path segments into an absolute path.

<a name="sep"></a>
## #sep

Provides the platform-specific path separator. (Windows: `\`, Posix: `/`)

