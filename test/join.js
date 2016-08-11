'use strict';

var testrun = require('testrun').mocha;
var path = require('../');

var testcases = [
  {
    name: 'When arguments are illegal types',
    cases: [
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          null,
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          true,
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          123,
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          {},
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          function() {},
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          'aaa', null, 'bbb',
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          'aaa', true, 'bbb',
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          'aaa', 123, 'bbb',
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          'aaa', {}, 'bbb',
        ],
        error: TypeError,
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.error}',
        paths: [
          'aaa', function() {}, 'bbb',
        ],
        error: TypeError,
      },
    ],
  },
  {
    name: 'When arguments are strings',
    cases: [
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [],
        expected: '.',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '',
        ],
        expected: '.',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          'aaa',
        ],
        expected: 'aaa',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          'aaa', 'bbb',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa/bbb',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          'aaa', 'bbb', 'ccc',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\ccc',
          otherwise: 'aaa/bbb/ccc',
        }),
      },
    ],
  },
  {
    name: 'When arguments start or end with shashes',
    cases: [
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '/',
        ],
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '/aaa',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa',
          otherwise: '/aaa',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '/aaa', '/bbb',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb',
          otherwise: '/aaa/bbb',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '/aaa', '/bbb','/ccc',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\ccc',
          otherwise: '/aaa/bbb/ccc',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          'aaa/',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\',
          otherwise: 'aaa/',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          'aaa/', 'bbb/', 'ccc/',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\ccc\\',
          otherwise: 'aaa/bbb/ccc/',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '/aaa/', '/bbb/', '/ccc/',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\ccc\\',
          otherwise: '/aaa/bbb/ccc/',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '///aaa//', '//bbb//', '///ccc////',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\ccc\\',
          otherwise: '/aaa/bbb/ccc/',
        }),
      },
    ],
  },
  {
    name: 'When arguments start or end with back shashes',
    cases: [
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '\\',
        ],
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '\\aaa',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa',
          otherwise: '\\aaa',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '\\aaa', '\\bbb',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb',
          otherwise: '\\aaa/\\bbb',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '\\aaa', '\\bbb', '\\ccc',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\ccc',
          otherwise: '\\aaa/\\bbb/\\ccc',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          'aaa\\',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\',
          otherwise: 'aaa\\',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          'aaa\\', 'bbb\\', 'ccc\\',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\ccc\\',
          otherwise: 'aaa\\/bbb\\/ccc\\',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '\\aaa\\', '\\bbb\\', '\\ccc\\',
        ],
        expected: testrun.byPlatform({
          win32: '\\aaa\\bbb\\ccc\\',
          otherwise: '\\aaa\\/\\bbb\\/\\ccc\\',
        }),
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '\\\\a\\\\', '\\b\\\\', '\\\\c\\\\',
        ],
        expected: testrun.byPlatform({
          win32: '\\a\\b\\c\\',
          otherwise: '\\\\a\\\\/\\b\\\\/\\\\c\\\\',
        }),
      },
    ],
  },
  {
    name: 'When arguments start or end with dots',
    cases: [
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '.',
        ],
        expected: '.',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '.', '.',
        ],
        expected: '.',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '..',
        ],
        expected: '..',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '.', '..',
        ],
        expected: '..',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '..', '.',
        ],
        expected: '..',
      },
      {
        name: 'And paths is ${testcase.paths} => ${testcase.expected}',
        paths: [
          '..', '..',
        ],
        expected: testrun.byPlatform({
          win32: '..\\..',
          otherwise: '../..',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          'aaa/bbb', 'ccc', '..', 'ddd/eee',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\ddd\\eee',
          otherwise: 'aaa/bbb/ddd/eee',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          'aaa/bbb', '..', 'ccc', '../../../', 'ddd/eee', '..',
        ],
        expected: testrun.byPlatform({
          win32: '..\\ddd',
          otherwise: '../ddd',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          '//a//b//', '..', '/c//', '..//..//', '/d//e/', '..',
        ],
        expected: testrun.byPlatform({
          win32: '\\d',
          otherwise: '/d',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          '//aaa//bbb//', '../..//..//../',
        ],
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '/',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          'aaa\\bbb', 'ccc', '..', 'ddd\\eee',
        ],
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb\\ddd\\eee',
          otherwise: 'aaa\\bbb/ddd\\eee',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          'aaa\\bbb', '..', 'ccc', '..\\..\\..\\', 'ddd\\eee', '..',
        ],
        expected: testrun.byPlatform({
          win32: '..\\ddd',
          otherwise: 'ccc/..\\..\\..\\',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          '\\\\a\\\\b\\', '..', '\\c\\', '..\\\\..\\', '\\d\\\\e\\', '..',
        ],
        expected: testrun.byPlatform({
          win32: '\\d',
          otherwise: '\\c\\/..\\\\..\\',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          '\\aaa\\bbb\\', '..\\..\\\\..\\\\..\\',
        ],
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\aaa\\bbb\\/..\\..\\\\..\\\\..\\',
        }),
      },
      {
        name: 'And paths is ${testcase.paths}',
        paths: [
          '\\/\\aaa/\\/\\\bbb\\/', '..\\/../\\/\\../\\\\..\\',
        ],
        expected: testrun.byPlatform({
          win32: '\\',
          otherwise: '\\/\\aaa/\\/\\\bbb\\/\\/\\../\\\\..\\',
        }),
      },
    ],
  },
];

function testfn(testcase) {
  return path.join.apply(path, testcase.paths);
}

testrun('#join', testfn, testcases);
