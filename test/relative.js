'use strict';

var os = require('os');
var path = require('../');
var resolve = require('path').resolve;

var testrun = require('testrun').mocha;

var cwdPaths, currentDrive = 'C:', differentDrive = 'D:';
if (os.platform() === 'win32') {
  process.chdir(process.cwd());

  cwdPaths = process.cwd().replace(/(^\\\\|\\\\$)/, '').split('\\');
  cwdPaths = cwdPaths.filter(function(s) {
    return !!s;
  });

  currentDrive = cwdPaths.shift();
  if (currentDrive === 'D:') {
    differentDrive = 'E:';
  }
} else {
  cwdPaths = process.cwd().replace(/(^\/|\/$)/, '').split('/');
  cwdPaths = cwdPaths.filter(function(s) {
    return !!s;
  });
}

function repeat(s, n) {
  var t = '';
  for (var i = 0; i < n; i++) {
    t += s;
  }
  return t;
}

var testcases = [
  {
    name: 'When argument type is not a string',
    cases: [
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: undefined,
        to: undefined,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: null,
        to: null,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: true,
        to: false,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 123,
        to: 456,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: {},
        to: {},
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: [],
        to: [],
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: function fn1() {},
        to: function fn2() {},
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: undefined,
        to: 'bbb',
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: null,
        to: 'bbb',
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: false,
        to: 'bbb',
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 123,
        to: 'bbb',
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: {},
        to: 'bbb',
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: [],
        to: 'bbb',
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: function fn() {},
        to: 'bbb',
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 'aaa',
        to: undefined,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 'aaa',
        to: null,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 'aaa',
        to: true,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 'aaa',
        to: 123,
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 'aaa',
        to: {},
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 'aaa',
        to: [],
        error: TypeError,
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.error}',
        from: 'aaa',
        to: function fn() {},
        error: TypeError,
      },
    ],
  },
  {
    name: 'When arguments are a string',
    cases: [
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: 'aaa',
        expected: 'aaa',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: 'aaa/bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa/bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '/aaa/bbb',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length) + 'aaa\\bbb',
          otherwise: repeat('../', cwdPaths.length) + 'aaa/bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '/',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length - 1) + '..',
          otherwise: repeat('../', cwdPaths.length - 1) + '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa',
        to: '',
        expected: '..',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa/bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: '..\\..',
          otherwise: '../..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/aaa/bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: '..\\..\\' + cwdPaths.join('\\'),
          otherwise: '../../' + cwdPaths.join('/'),
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: 'aaa',
        expected: 'aaa',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: 'aaa/bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa/bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '/aaa/bbb',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length) + 'aaa\\bbb',
          otherwise: repeat('../', cwdPaths.length) + 'aaa/bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '/',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length - 1) + '..',
          otherwise: repeat('../', cwdPaths.length - 1) + '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa',
        to: 'aaa',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa/bbb',
        to: 'aaa/bbb',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa',
        to: 'bbb',
        expected: testrun.byPlatform({
          win32: '..\\bbb',
          otherwise: '../bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa/bbb',
        to: 'aaa/ccc',
        expected: testrun.byPlatform({
          win32: '..\\ccc',
          otherwise: '../ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa/bbb',
        to: 'ccc/ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../../ccc/ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/aaa',
        to: '/aaa',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/aaa',
        to: '/bbb',
        expected: testrun.byPlatform({
          win32: '..\\bbb',
          otherwise: '../bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/aaa/bbb',
        to: '/aaa/bbb',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/aaa/bbb',
        to: '/aaa/ccc',
        expected: testrun.byPlatform({
          win32: '..\\ccc',
          otherwise: '../ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/aaa/bbb',
        to: '/ccc/ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../../ccc/ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/aaa/bbb',
        to: 'ccc/ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\' + cwdPaths.join('\\') + '\\ccc\\ddd',
          otherwise: '../../' + cwdPaths.join('/') + '/ccc/ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa/bbb',
        to: '/ccc/ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\' + repeat('..\\', cwdPaths.length) + 'ccc\\ddd',
          otherwise: '../../' + repeat('../', cwdPaths.length) + 'ccc/ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '//',
        to: '',
        expected: testrun.byPlatform({
          win32: cwdPaths.join('\\'),
          otherwise: cwdPaths.join('/'),
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '///',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length - 1) + '..',
          otherwise: repeat('../', cwdPaths.length - 1) + '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '///',
        to: '//',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '///aaa//bbb////ccc',
        to: '//aaa///ddd///eee',
        expected: testrun.byPlatform({
          win32: '..\\..\\ddd\\eee',
          otherwise: '../../ddd/eee',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa////',
        to: 'bbb////',
        expected: testrun.byPlatform({
          win32: '..\\bbb',
          otherwise: '../bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '.',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: './aaa',
        expected: 'aaa',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: './aaa/./bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa/bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '.',
        to: '',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: './aaa',
        to: '',
        expected: '..',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: './aaa/./bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: '..\\..',
          otherwise: '../..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '..',
        to: '',
        expected: cwdPaths[cwdPaths.length - 1],
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '../../',
        to: '',
        expected: testrun.byPlatform({
          win32: cwdPaths.slice(-2).join('\\'),
          otherwise: cwdPaths.slice(-2).join('/'),
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: repeat('../', cwdPaths.length + 1),
        to: '',
        expected: testrun.byPlatform({
          win32: cwdPaths.join('\\'),
          otherwise: cwdPaths.join('/'),
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/../../',
        to: '',
        expected: testrun.byPlatform({
          win32: cwdPaths.join('\\'),
          otherwise: cwdPaths.join('/'),
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '..',
        expected: '..',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '../../',
        expected: testrun.byPlatform({
          win32: '..\\..',
          otherwise: '../..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: repeat('../', cwdPaths.length + 1),
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length - 1) + '..',
          otherwise: repeat('../', cwdPaths.length - 1) + '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '/../../',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length - 1) + '..',
          otherwise: repeat('../', cwdPaths.length - 1) + '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '..',
        to: '..',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '../',
        to: '../../',
        expected: '..',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '../../',
        to: '../',
        expected: cwdPaths[cwdPaths.length - 2],
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/../',
        to: '/../',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/../../',
        to: '/..',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '/../',
        to: '/../../../',
        expected: '',
      },
    ],
  },
  {
    name: 'When platform is Windows',
    cases: [
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: 'aaa\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: 'aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: currentDrive + 'aaa\\bbb',
        expected: testrun.byPlatform({
          win32: 'aaa\\bbb',
          otherwise: currentDrive + 'aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: differentDrive + 'aaa\\bbb',
        expected: testrun.byPlatform({
          win32: path.join(resolve(differentDrive), 'aaa\\bbb'),
          otherwise: differentDrive + 'aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '\\aaa\\bbb',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length) + 'aaa\\bbb',
          otherwise: '\\aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: currentDrive + '\\aaa\\bbb',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length) + 'aaa\\bbb',
          otherwise: currentDrive + '\\aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: differentDrive + '\\aaa\\bbb',
        expected: testrun.byPlatform({
          win32: differentDrive + '\\aaa\\bbb',
          otherwise: differentDrive + '\\aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: '\\',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length - 1) + '..',
          otherwise: '\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: currentDrive + '\\',
        expected: testrun.byPlatform({
          win32: repeat('..\\', cwdPaths.length - 1) + '..',
          otherwise: currentDrive + '\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '',
        to: differentDrive + '\\',
        expected: testrun.byPlatform({
          win32: differentDrive + '\\',
          otherwise: differentDrive + '\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa\\bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: '..\\..',
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa\\bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: '..\\..',
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + 'aaa\\bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: resolve(currentDrive),
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\aaa\\bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: '..\\..\\' + cwdPaths.join('\\'),
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa\\bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: '..\\..\\' + cwdPaths.join('\\'),
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\aaa\\bbb',
        to: '',
        expected: testrun.byPlatform({
          win32: resolve(currentDrive),
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\',
        to: '',
        expected: testrun.byPlatform({
          win32: cwdPaths.join('\\'),
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\',
        to: '',
        expected: testrun.byPlatform({
          win32: cwdPaths.join('\\'),
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\',
        to: '',
        expected: testrun.byPlatform({
          win32: resolve(currentDrive),
          otherwise: '..',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa',
        to: currentDrive + 'aaa',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + 'aaa',
        to: differentDrive + 'aaa',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa',
        to: differentDrive + 'aaa',
        expected: testrun.byPlatform({
          win32: path.join(resolve(differentDrive), 'aaa'),
          otherwise: '../' + differentDrive + 'aaa',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + 'aaa',
        to: currentDrive + 'aaa',
        expected: testrun.byPlatform({
          win32: path.join(resolve(currentDrive), 'aaa'),
          otherwise: '../' + currentDrive + 'aaa',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa\\bbb',
        to: 'aaa\\bbb',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa\\bbb',
        to: currentDrive + 'aaa\\bbb',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa\\bbb',
        to: differentDrive + 'aaa\\bbb',
        expected: testrun.byPlatform({
          win32: path.join(resolve(differentDrive), 'aaa\\bbb'),
          otherwise: '../' + differentDrive + 'aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + 'aaa\\bbb',
        to: currentDrive + 'aaa\\bbb',
        expected: testrun.byPlatform({
          win32: path.join(resolve(currentDrive), 'aaa\\bbb'),
          otherwise: '../' + currentDrive + 'aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa\\bbb',
        to: 'aaa\\ccc',
        expected: testrun.byPlatform({
          win32: '..\\ccc',
          otherwise: '../aaa\\ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa\\bbb',
        to: currentDrive + 'aaa\\ccc',
        expected: testrun.byPlatform({
          win32: '..\\ccc',
          otherwise: '../' + currentDrive + 'aaa\\ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + 'aaa\\bbb',
        to: currentDrive + 'aaa\\ccc',
        expected: testrun.byPlatform({
          win32: resolve(currentDrive) + '\\aaa\\ccc',
          otherwise: '../' + currentDrive + 'aaa\\ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: 'aaa\\bbb',
        to: 'ccc\\ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa\\bbb',
        to: currentDrive + 'ccc\\ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../' + currentDrive + 'ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + 'aaa\\bbb',
        to: differentDrive + 'ccc\\ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../' + differentDrive + 'ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + 'aaa\\bbb',
        to: currentDrive + 'ccc\\ddd',
        expected: testrun.byPlatform({
          win32: path.join(resolve(currentDrive), 'ccc\\ddd'),
          otherwise: '../' + currentDrive + 'ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + 'aaa\\bbb',
        to: differentDrive + 'ccc\\ddd',
        expected: testrun.byPlatform({
          win32: path.join(resolve(differentDrive), 'ccc\\ddd'),
          otherwise: '../' + differentDrive + 'ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\aaa',
        to: '\\aaa',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa',
        to: currentDrive + '\\aaa',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\aaa',
        to: differentDrive + '\\aaa',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa',
        to: differentDrive + '\\aaa',
        expected: testrun.byPlatform({
          win32: differentDrive + '\\aaa',
          otherwise: '../' + differentDrive + '\\aaa',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\aaa',
        to: currentDrive + '\\aaa',
        expected: testrun.byPlatform({
          win32: currentDrive + '\\aaa',
          otherwise: '../' + currentDrive + '\\aaa',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\aaa\\bbb',
        to: '\\aaa\\bbb',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa\\bbb',
        to: currentDrive + '\\aaa\\bbb',
        expected: '',
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa\\bbb',
        to: differentDrive + '\\aaa\\bbb',
        expected: testrun.byPlatform({
          win32: differentDrive + '\\aaa\\bbb',
          otherwise: '../' + differentDrive + '\\aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\aaa\\bbb',
        to: currentDrive + '\\aaa\\bbb',
        expected: testrun.byPlatform({
          win32: currentDrive + '\\aaa\\bbb',
          otherwise: '../' + currentDrive + '\\aaa\\bbb',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\aaa\\bbb',
        to: '\\aaa\\ccc',
        expected: testrun.byPlatform({
          win32: '..\\ccc',
          otherwise: '../\\aaa\\ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa\\bbb',
        to: currentDrive + '\\aaa\\ccc',
        expected: testrun.byPlatform({
          win32: '..\\ccc',
          otherwise: '../' + currentDrive + '\\aaa\\ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\aaa\\bbb',
        to: currentDrive + '\\aaa\\ccc',
        expected: testrun.byPlatform({
          win32: currentDrive + '\\aaa\\ccc',
          otherwise: '../' + currentDrive + '\\aaa\\ccc',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\aaa\\bbb',
        to: '\\ccc\\ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../\\ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa\\bbb',
        to: currentDrive + '\\ccc\\ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../' + currentDrive + '\\ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\aaa\\bbb',
        to: differentDrive + '\\ccc\\ddd',
        expected: testrun.byPlatform({
          win32: '..\\..\\ccc\\ddd',
          otherwise: '../' + differentDrive + '\\ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\aaa\\bbb',
        to: currentDrive + '\\ccc\\ddd',
        expected: testrun.byPlatform({
          win32: currentDrive + '\\ccc\\ddd',
          otherwise: '../' + currentDrive + '\\ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\aaa\\bbb',
        to: differentDrive + '\\ccc\\ddd',
        expected: testrun.byPlatform({
          win32: differentDrive + '\\ccc\\ddd',
          otherwise: '../' + differentDrive + '\\ccc\\ddd',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\',
        to: '\\',
        expected: testrun.byPlatform({
          win32: '',
          otherwise: '',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\\\',
        to: '\\',
        expected: testrun.byPlatform({
          win32: '',
          otherwise: '../\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: '\\',
        to: '\\\\',
        expected: testrun.byPlatform({
          win32: '',
          otherwise: '../\\\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive.toLowerCase() + '\\',
        to: currentDrive.toUpperCase() + '\\',
        expected: testrun.byPlatform({
          win32: '',
          otherwise: '../' + currentDrive.toUpperCase() + '\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive.toUpperCase() + '\\',
        to: differentDrive.toLowerCase() + '\\',
        expected: testrun.byPlatform({
          win32: '',
          otherwise: '../' + differentDrive.toLowerCase() + '\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: currentDrive + '\\',
        to: differentDrive + '\\',
        expected: testrun.byPlatform({
          win32: differentDrive + '\\',
          otherwise: '../' + differentDrive + '\\',
        }),
      },
      {
        name: 'And from is ${testcase.from} and to is ${testcase.to} => ' +
              '${testcase.expected}',
        from: differentDrive + '\\',
        to: currentDrive + '\\',
        expected: testrun.byPlatform({
          win32: currentDrive + '\\',
          otherwise: '../' + currentDrive + '\\',
        }),
      },
    ],
  },
];

testrun('#relative', function(testcase) {
  return path.relative(testcase.from, testcase.to);
}, testcases);
