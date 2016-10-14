'use strict';

var testrun = require('testrun').mocha;
var path = require('../');
var os = require('os');
var sep = require('path').sep;

var currentPaths = process.cwd().split(sep);
var currentPathTop = currentPaths.shift();
var currentRoot = currentPathTop + sep;
var currentDrive = currentPathTop || 'c:';

function testfn(testcase) {
  return path.resolve.apply(path, testcase.paths);
}

testrun('#resovle', testfn, [
  {
    name: 'When argument type is not a string',
    cases: [
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ null ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', null ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 'b', null ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ undefined ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', undefined ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 'b', undefined ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 123 ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 123 ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 'b', 123 ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ true ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', true ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 'b', true ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ false ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', false ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 'b', false ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ [] ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', [] ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 'b', [] ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ {} ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', {} ],
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.paths} => ${testcase.error}',
        paths: [ 'a', 'b', {} ],
        error: TypeError,
      },
    ],
  },
  {
    name: 'When passing no argument => cwd',
    cases: [
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [],
        expected: currentRoot + currentPaths.join(sep),
      },
    ],
  },
  {
    name: 'When passing an argument', 
    cases: [
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '//' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '///' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '.' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '..' ],
        expected: currentRoot + currentPaths.slice(0, -1).join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '...' ],
        expected: currentRoot + currentPaths.join(sep) + sep + '...',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ './././' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ './/.///.////' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '//.///.////' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a//' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/.' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/b' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/b/' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a//b' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a//b/' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a//b//' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/b/.' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/b/./' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/a' ],
        expected: currentRoot + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '//a' ],
        expected: currentRoot + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/./a' ],
        expected: currentRoot + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/a/' ],
        expected: currentRoot + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/a/.' ],
        expected: currentRoot + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/a/b' ],
        expected: currentRoot + 'a' + sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/a/b/' ],
        expected: currentRoot + 'a' + sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/a/./b' ],
        expected: currentRoot + 'a' + sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/./a/b' ],
        expected: currentRoot + 'a' + sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/a/b/.' ],
        expected: currentRoot + 'a' + sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '//a///b////.' ],
        expected: currentRoot + 'a' + sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '../..' ], 
        expected: currentRoot + currentPaths.slice(0, -2).join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '../../..' ], 
        expected: currentRoot + currentPaths.slice(0, -3).join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '..///.///..//..' ], 
        expected: currentRoot + currentPaths.slice(0, -3).join(sep),
      },
    ],
  },
  {
    name: 'When passing multiple arguments',
    cases: [
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '', '' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '.', '' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '', '.' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '.', '.' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/', '' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '', '/' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '/', '.' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '.', '/' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ './', './' ],
        expected: currentRoot + currentPaths.join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '//', '///' ],
        expected: currentRoot,
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '..', '..' ],
        expected: currentRoot + currentPaths.slice(0, -2).join(sep),
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '...', '...' ],
        expected: currentRoot + currentPaths.join(sep) + sep + '...' +
          sep + '...',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a', '' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ '', 'b' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a', 'b' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/', 'b/' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a///', 'b/.//./' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ './//a///', '././/./b/.//./' ],
        expected: currentRoot + currentPaths.join(sep) + sep + 'a' +
          sep + 'b',
      },
      {
        name: 'And ${testcase.paths} => ${testcase.expected}',
        paths: [ 'a/b/c', 'd/e' ],
        expected: currentRoot + currentPaths.join(sep) + sep +
          ['a', 'b', 'c', 'd', 'e'].join(sep),
      },
    ],
  },
  {
    name: 'For windows',
    cases: [
      {
        name: 'When passing an argument',
        cases: [
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + '\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + '\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\\\\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + '\\\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '.\\.\\.\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep),
              otherwise: sep + currentPaths.join(sep) + sep + '.\\.\\.\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '.\\\\.\\\\\\.\\\\\\\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                '.\\\\.\\\\\\.\\\\\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\\\.\\\\\\.\\\\\\\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep +
                '\\\\.\\\\\\.\\\\\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\.' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\.',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\b' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a' +
                sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\b',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\b\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a' +
                sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\b\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\\\b' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a' +
                sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\\\b',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\\\b\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a' +
                sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\\\b\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\\\b\\\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a' +
                sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\\\b\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\b\\.' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a' +
                sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\b\\.',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ 'a\\b\\.\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep + 'a' +
                sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + 'a\\b\\.\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\a' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + '\\a',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\\\a' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + '\\\\a',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\.\\a' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + '\\.\\a',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\a\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + '\\a\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\a\\.' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a',
              otherwise: sep + currentPaths.join(sep) + sep + '\\a\\.',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\a\\b' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + '\\a\\b',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\a\\b\\' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + '\\a\\b\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\a\\.\\b' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + '\\a\\.\\b',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\.\\a\\b' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + '\\.\\a\\b',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\a\\b\\.' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep + '\\a\\b\\.',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '\\\\a\\\\\\b\\\\\\\\.' ],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + 'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep +
                '\\\\a\\\\\\b\\\\\\\\.',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '..\\..' ], 
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.slice(0, -2).join(sep),
              otherwise: sep + currentPaths.join(sep) + sep + '..\\..',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '..\\..\\..' ], 
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.slice(0, -3).join(sep),
              otherwise: sep + currentPaths.join(sep) + sep + '..\\..\\..',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [ '..\\\\\\.\\\\..\\\\..' ], 
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.slice(0, -3).join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                '..\\\\\\.\\\\..\\\\..',
            }),
          },
        ],
      },
      {
        name: 'When passing multiple arguments',
        cases: [
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['\\', ''],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + '\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['', '\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + '\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['\\', '.'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + '\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['.', '\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + '\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['.\\', '.\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                '.\\' + sep + '.\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['\\\\', '\\\\\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep +
                '\\\\' + sep + '\\\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['a\\', 'b\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep +
                'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep +
                'a\\' + sep + 'b\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['a\\\\\\', 'b\\.\\\\.\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep +
                'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep +
                'a\\\\\\' + sep + 'b\\.\\\\.\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['.\\\\\\a\\\\\\', '.\\.\\\\.\\b\\.\\\\.\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep +
                'a' + sep + 'b',
              otherwise: sep + currentPaths.join(sep) + sep +
                '.\\\\\\a\\\\\\' + sep + '.\\.\\\\.\\b\\.\\\\.\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['a\\b\\c', 'd\\e'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep +
                ['a','b','c','d','e'].join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                'a\\b\\c' + sep + 'd\\e',
            }),
          },
        ],
      },
      {
        name: 'When using a drive letter',
        cases: [
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep),
              otherwise: sep + currentPaths.join(sep) + sep + currentDrive,
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive + '/'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + currentDrive,
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive + '\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep,
              otherwise: sep + currentPaths.join(sep) + sep + currentDrive +
                '\\'
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['/' + currentDrive],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentDrive,
              otherwise: sep + currentDrive,
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['\\' + currentDrive],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentDrive,
              otherwise: sep + currentPaths.join(sep) + sep + '\\' +
                currentDrive,
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['/' + currentDrive + '//'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentDrive,
              otherwise: sep + currentDrive,
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: ['\\' + currentDrive + '\\\\'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentDrive,
              otherwise: sep + currentPaths.join(sep) + sep + '\\' + 
                currentDrive + '\\\\',
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive, 'a', 'b//cc'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + currentPaths.join(sep) + sep +
                ['a', 'b', 'cc'].join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                [currentDrive, 'a', 'b', 'cc'].join(sep),
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive + '/', 'a', 'b/cc'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + ['a', 'b', 'cc'].join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                [currentDrive, 'a', 'b', 'cc'].join(sep),
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive + '\\', 'a', 'b\\cc'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + ['a', 'b', 'cc'].join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                [currentDrive + '\\', 'a', 'b\\cc'].join(sep),
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive + '//', 'a', 'b//cc'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + ['a', 'b', 'cc'].join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                [currentDrive, 'a', 'b', 'cc'].join(sep),
            }),
          },
          {
            name: 'And ${testcase.paths} => ${testcase.expected}',
            paths: [currentDrive + '\\\\', 'a', 'b\\\\cc'],
            expected: testrun.byPlatform({
              win32: currentDrive + sep + ['a', 'b', 'cc'].join(sep),
              otherwise: sep + currentPaths.join(sep) + sep +
                [currentDrive + '\\\\', 'a', 'b\\\\cc'].join(sep),
            }),
          },
        ],
      },
    ],
  },
]);
