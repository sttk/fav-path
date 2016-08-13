'use strict';

var testrun = require('testrun').mocha;

var path = require('../');

var testcases = [
  {
    name: 'When argument type is not a string',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: null,
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: true,
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: false,
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: 123,
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: {},
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: function fn() {},
        error: TypeError,
      },
    ],
  },
  {
    name: 'When argument is a string without path separators',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '.',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '..',
        expected: '..',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'a',
        expected: 'a',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa.b',
        expected: 'aaa.b',
      },
    ],
  },
  {
    name: 'When argument is a string with path seprators',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa/bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa\\bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa//bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa/bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa\\\\bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa///////bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa/bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\\\\\\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa\\\\\\\\bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\',
          otherwise: 'aaa/bbb/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\bbb\\',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\',
          otherwise: 'aaa\\bbb\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa//bbb///',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\',
          otherwise: 'aaa/bbb/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\\\bbb\\\\\\',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\',
          otherwise: 'aaa\\\\bbb\\\\\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/aaa/bbb/',
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\',
          otherwise: '/aaa/bbb/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\aaa\\bbb\\',
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\',
          otherwise: '\\aaa\\bbb\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '////aaa//bbb///',
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\',
          otherwise: '/aaa/bbb/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\\\aaa\\bbb\\\\\\',
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\',
          otherwise: '\\\\aaa\\bbb\\\\\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '//\\//\\\\aaa\\///bbb\\//\\\\ccc//\\\\////',
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\ccc\\',
          otherwise: '/\\/\\\\aaa\\/bbb\\/\\\\ccc/\\\\/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/////',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\\\\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\\\\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\/\\\\//\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\/\\\\/\\',
        }),
      },
    ],
  },
  {
    name: 'When argument contains `..`',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/..',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\..',
        expected: testrun.byPlatform({
          win32: '.',
          otherwise: 'aaa\\..',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/../bbb/ccc/../../ddd',
        expected: 'ddd',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\..\\bbb\\ccc\\..\\..\\ddd',
        expected: testrun.byPlatform({
          win32: 'ddd',
          otherwise: 'aaa\\..\\bbb\\ccc\\..\\..\\ddd',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '../aaa/bbb/../ccc/ddd/..',
        expected: testrun.byPlatform({
          win32: '..\\aaa\\ccc',
          otherwise: '../aaa/ccc',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '..\\aaa\\bbb\\..\\ccc\\ddd\\..',
        expected: testrun.byPlatform({
          win32: '..\\aaa\\ccc',
          otherwise: '..\\aaa\\bbb\\..\\ccc\\ddd\\..',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/..',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\..',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\..',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '//..',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\..',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\..',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/../aaa',
        expected: testrun.byPlatform({
          win32: '\\aaa',
          otherwise: '/aaa',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\..\\aaa',
        expected: testrun.byPlatform({
          win32: '\\aaa',
          otherwise: '\\..\\aaa',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/../../',
        expected: testrun.byPlatform({
          win32: '..\\',
          otherwise: '../',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa\\..\\..\\',
        expected: testrun.byPlatform({
          win32: '..\\',
          otherwise: 'aaa\\..\\..\\',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '/aaa/../../',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        })
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '\\aaa\\..\\..\\',
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\aaa\\..\\..\\',
        })
      },
    ],
  },
  {
    name: 'When argument starts with a drive letter (for Windows)',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'C:/',
        expected: testrun.byPlatform({
          'win32': 'C:\\',
          'otherwise': 'C:/',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'c:\\',
        expected: testrun.byPlatform({
          'win32': 'c:\\',
          'otherwise': 'c:\\',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'd://aaa/bbb',
        expected: testrun.byPlatform({
          'win32': 'd:\\aaa\\bbb',
          'otherwise': 'd:/aaa/bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'D:\\aaa\\bbb',
        expected: testrun.byPlatform({
          'win32': 'D:\\aaa\\bbb',
          'otherwise': 'D:\\aaa\\bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'D:/aaa/../../',
        expected: testrun.byPlatform({
          'win32': 'D:\\',
          'otherwise': './',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'D:\\\\aaa\\\\bbb',
        expected: testrun.byPlatform({
          'win32': 'D:\\aaa\\bbb',
          'otherwise': 'D:\\\\aaa\\\\bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'e:',
        expected: testrun.byPlatform({
          'win32': 'e:.',
          'otherwise': 'e:',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'F:aaa//bbb',
        expected: testrun.byPlatform({
          'win32': 'F:aaa\\bbb',
          'otherwise': 'F:aaa/bbb',
        }),
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'f:aaa\\\\bbb',
        expected: testrun.byPlatform({
          'win32': 'f:aaa\\bbb',
          'otherwise': 'f:aaa\\\\bbb',
        }),
      },
    ],
  },
];

testrun('#normalize', function(testcase) {
  return path.normalize(testcase.path);
}, testcases);
