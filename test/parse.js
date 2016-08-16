'use strict';

var path = require('../');

var testrun = require('testrun').mocha;

var testcases = [
  {
    name: 'When argument type is not atring',
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
    name: 'When argument is a string which is only a basename',
    cases: [
      {
        name: 'And path is ${testcase.path}',
        path: '',
        expected: {
          root: '',
          dir: '',
          base: '',
          ext: '',
          name: '',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '.',
        expected: {
          root: '',
          dir: '',
          base: '.',
          ext: '',
          name: '.',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '..',
        expected: {
          root: '',
          dir: '',
          base: '..',
          ext: '',
          name: '..',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa',
        expected: {
          root: '',
          dir: '',
          base: 'aaa',
          ext: '',
          name: 'aaa',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa.bbb',
        expected: {
          root: '',
          dir: '',
          base: 'aaa.bbb',
          ext: '.bbb',
          name: 'aaa',
        },
      },
    ],
  },
  {
    name: 'When argument is a string which has directory without root',
    cases: [
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa/bbb.c',
        expected: {
          root: '',
          dir: 'aaa',
          base: 'bbb.c',
          ext: '.c',
          name: 'bbb',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa/bbb/ccc.d',
        expected: {
          root: '',
          dir: 'aaa/bbb',
          base: 'ccc.d',
          ext: '.d',
          name: 'ccc',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa//bbb/ccc.d',
        expected: {
          root: '',
          dir: 'aaa//bbb',
          base: 'ccc.d',
          ext: '.d',
          name: 'ccc',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa/./bbb/ccc.d',
        expected: {
          root: '',
          dir: 'aaa/./bbb',
          base: 'ccc.d',
          ext: '.d',
          name: 'ccc',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa/../bbb/ccc.d',
        expected: {
          root: '',
          dir: 'aaa/../bbb',
          base: 'ccc.d',
          ext: '.d',
          name: 'ccc',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: './aaa/bbb/ccc.d',
        expected: {
          root: '',
          dir: './aaa/bbb',
          base: 'ccc.d',
          ext: '.d',
          name: 'ccc',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '../aaa/bbb/ccc.d',
        expected: {
          root: '',
          dir: '../aaa/bbb',
          base: 'ccc.d',
          ext: '.d',
          name: 'ccc',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\bbb.c',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: 'aaa',
            base: 'bbb.c',
            ext: '.c',
            name: 'bbb',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\bbb.c',
            ext: '.c',
            name: 'aaa\\bbb',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\bbb\\ccc.dd',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: 'aaa\\bbb',
            base: 'ccc.dd',
            ext: '.dd',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\bbb\\ccc.dd',
            ext: '.dd',
            name: 'aaa\\bbb\\ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\\\bbb\\ccc.d',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: 'aaa\\\\bbb',
            base: 'ccc.d',
            ext: '.d',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\\\bbb\\ccc.d',
            ext: '.d',
            name: 'aaa\\\\bbb\\ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\.\\bbb\\ccc.d',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: 'aaa\\.\\bbb',
            base: 'ccc.d',
            ext: '.d',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\.\\bbb\\ccc.d',
            ext: '.d',
            name: 'aaa\\.\\bbb\\ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\..\\bbb\\ccc.d',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: 'aaa\\..\\bbb',
            base: 'ccc.d',
            ext: '.d',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\..\\bbb\\ccc.d',
            ext: '.d',
            name: 'aaa\\..\\bbb\\ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '.\\aaa\\bbb\\ccc.d',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: '.\\aaa\\bbb',
            base: 'ccc.d',
            ext: '.d',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '.\\aaa\\bbb\\ccc.d',
            ext: '.d',
            name: '.\\aaa\\bbb\\ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '..\\aaa\\bbb\\ccc.ddd',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: '..\\aaa\\bbb',
            base: 'ccc.ddd',
            ext: '.ddd',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '..\\aaa\\bbb\\ccc.ddd',
            ext: '.ddd',
            name: '..\\aaa\\bbb\\ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: './',
        expected: {
          root: '',
          dir: '',
          base: '.',
          ext: '',
          name: '.',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '../',
        expected: {
          root: '',
          dir: '',
          base: '..',
          ext: '',
          name: '..',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa/',
        expected: {
          root: '',
          dir: '',
          base: 'aaa',
          ext: '',
          name: 'aaa',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa/.',
        expected: {
          root: '',
          dir: 'aaa',
          base: '.',
          ext: '',
          name: '.',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '.\\',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: '',
            base: '.',
            ext: '',
            name: '.',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '.\\',
            ext: '',
            name: '.\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '..\\',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: '',
            base: '..',
            ext: '',
            name: '..',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '..\\',
            ext: '.\\',
            name: '.',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: '',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\',
            ext: '',
            name: 'aaa\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\.',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: 'aaa',
            base: '.',
            ext: '',
            name: '.',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\.',
            ext: '.',
            name: 'aaa\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa///',
        expected: {
          root: '',
          dir: '',
          base: 'aaa',
          ext: '',
          name: 'aaa',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'aaa\\\\\\',
        expected: testrun.byPlatform({
          win32: {
            root: '',
            dir: '',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'aaa\\\\\\',
            ext: '',
            name: 'aaa\\\\\\',
          },
        }),
      },
    ],
  },
  {
    name: 'When argument is a string which has directory with root',
    cases: [
      {
        name: 'And path is ${testcase.path}',
        path: '/',
        expected: {
          root: '/',
          dir: '/',
          base: '',
          ext: '',
          name: '',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '/aaa',
        expected: {
          root: '/',
          dir: '/',
          base: 'aaa',
          ext: '',
          name: 'aaa',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '/aaa/bbb.cc',
        expected: {
          root: '/',
          dir: '/aaa',
          base: 'bbb.cc',
          ext: '.cc',
          name: 'bbb',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '//',
        expected: {
          root: '/',
          dir: '/',
          base: '',
          ext: '',
          name: '',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '/..',
        expected: {
          root: '/',
          dir: '/',
          base: '..',
          ext: '',
          name: '..',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '/aaa/..',
        expected: {
          root: '/',
          dir: '/aaa',
          base: '..',
          ext: '',
          name: '..',
        },
      },
      {
        name: 'And path is ${testcase.path}',
        path: '\\',
        expected: testrun.byPlatform({
          win32: {
            root: '\\',
            dir: '\\',
            base: '',
            ext: '',
            name: '',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '\\',
            ext: '',
            name: '\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '\\aaa',
        expected: testrun.byPlatform({
          win32: {
            root: '\\',
            dir: '\\',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '\\aaa',
            ext: '',
            name: '\\aaa',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '\\aaa\\bbb.cc',
        expected: testrun.byPlatform({
          win32: {
            root: '\\',
            dir: '\\aaa',
            base: 'bbb.cc',
            ext: '.cc',
            name: 'bbb',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '\\aaa\\bbb.cc',
            ext: '.cc',
            name: '\\aaa\\bbb',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '\\\\',
        expected: testrun.byPlatform({
          win32: {
            root: '\\',
            dir: '\\',
            base: '',
            ext: '',
            name: '',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '\\\\',
            ext: '',
            name: '\\\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '\\..',
        expected: testrun.byPlatform({
          win32: {
            root: '\\',
            dir: '\\',
            base: '..',
            ext: '',
            name: '..',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '\\..',
            ext: '.',
            name: '\\.',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: '\\aaa\\..',
        expected: testrun.byPlatform({
          win32: {
            root: '\\',
            dir: '\\aaa',
            base: '..',
            ext: '',
            name: '..',
          },
          otherwise: {
            root: '',
            dir: '',
            base: '\\aaa\\..',
            ext: '.',
            name: '\\aaa\\.',
          },
        }),
      },
    ],
  },
  {
    name: 'When argument is a string which has a drive letter (for Windows)',
    cases: [
      {
        name: 'And path is ${testcase.path}',
        path: 'C:/',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C:/',
            base: '',
            ext: '',
            name: '',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'C:',
            ext: '',
            name: 'C:',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\',
            base: '',
            ext: '',
            name: '',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\',
            ext: '',
            name: 'c:\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C://',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C:/',
            base: '',
            ext: '',
            name: '',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'C:',
            ext: '',
            name: 'C:',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\\\\\',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\',
            base: '',
            ext: '',
            name: '',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\\\\\',
            ext: '',
            name: 'c:\\\\\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:/aaa',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C:/',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: 'C:',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\aaa',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\aaa',
            ext: '',
            name: 'c:\\aaa',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:///aaa',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C://',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: 'C://',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\\\\\aaa',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\\\',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\\\\\aaa',
            ext: '',
            name: 'c:\\\\\\aaa',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:/aaa/bbb/ccc.dd',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C:/aaa/bbb',
            base: 'ccc.dd',
            ext: '.dd',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: 'C:/aaa/bbb',
            base: 'ccc.dd',
            ext: '.dd',
            name: 'ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\aaa\\bbb\\ccc.dd',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\aaa\\bbb',
            base: 'ccc.dd',
            ext: '.dd',
            name: 'ccc',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\aaa\\bbb\\ccc.dd',
            ext: '.dd',
            name: 'c:\\aaa\\bbb\\ccc',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:',
            dir: 'C:',
            base: '',
            ext: '',
            name: '',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'C:',
            ext: '',
            name: 'C:',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:aaa',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:',
            dir: 'c:',
            base: 'aaa',
            ext: '',
            name: 'aaa',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:aaa',
            ext: '',
            name: 'c:aaa',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:aaa/bbb',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:',
            dir: 'C:aaa',
            base: 'bbb',
            ext: '',
            name: 'bbb',
          },
          otherwise: {
            root: '',
            dir: 'C:aaa',
            base: 'bbb',
            ext: '',
            name: 'bbb',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:aaa\\bbb',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:',
            dir: 'c:aaa',
            base: 'bbb',
            ext: '',
            name: 'bbb',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:aaa\\bbb',
            ext: '',
            name: 'c:aaa\\bbb',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:/.',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C:/',
            base: '.',
            ext: '',
            name: '.',
          },
          otherwise: {
            root: '',
            dir: 'C:',
            base: '.',
            ext: '',
            name: '.',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\.',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\',
            base: '.',
            ext: '',
            name: '.',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\.',
            ext: '.',
            name: 'c:\\',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:/..',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C:/',
            base: '..',
            ext: '',
            name: '..',
          },
          otherwise: {
            root: '',
            dir: 'C:',
            base: '..',
            ext: '',
            name: '..',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\..',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\',
            base: '..',
            ext: '',
            name: '..',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\..',
            ext: '.',
            name: 'c:\\.',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'C:/aaa/../bbb/',
        expected: testrun.byPlatform({
          win32: {
            root: 'C:/',
            dir: 'C:/aaa/..',
            base: 'bbb',
            ext: '',
            name: 'bbb',
          },
          otherwise: {
            root: '',
            dir: 'C:/aaa/..',
            base: 'bbb',
            ext: '',
            name: 'bbb',
          },
        }),
      },
      {
        name: 'And path is ${testcase.path}',
        path: 'c:\\aaa\\..\\bbb\\',
        expected: testrun.byPlatform({
          win32: {
            root: 'c:\\',
            dir: 'c:\\aaa\\..',
            base: 'bbb',
            ext: '',
            name: 'bbb',
          },
          otherwise: {
            root: '',
            dir: '',
            base: 'c:\\aaa\\..\\bbb\\',
            ext: '.\\bbb\\',
            name: 'c:\\aaa\\.',
          },
        }),
      },
    ],
  },
];

testrun('#parse', function(testcase) {
  return path.parse(testcase.path);
}, testcases);
