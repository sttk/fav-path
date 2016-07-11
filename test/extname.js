'use strict';

var testrun = require('testrun').mocha;
var path = require('../');

function testfn(testcase) {
  return path.extname(testcase.path);
}

testrun('#extname', testfn, [
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
        path: {},
        error: TypeError,
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.error}',
        path: 1234,
        error: TypeError,
      },
    ],
  },
  {
    name: 'When path is no extension',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '.',
        expected: '',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '',
        expected: '',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa',
        expected: '',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb',
        expected: '',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/ccc',
        expected: '',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: './aaa',
        expected: '',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '../aaa',
        expected: '',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: '.../aaa',
        expected: '',
      },
    ],
  },
  {
    name: 'When path has an extension',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa.txt',
        expected: '.txt',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb.js',
        expected: '.js',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa/bbb/ccc.json',
        expected: '.json',
      },
    ],
  },
  {
    name: 'When extension is "."',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa.',
        expected: '.',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa..',
        expected: '.',
      },
    ],
  },
  {
    name: 'When path has multiple dots',
    cases: [
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa.bbb.ccc',
        expected: '.ccc',
      },
      {
        name: 'And path is ${testcase.path} => ${testcase.expected}',
        path: 'aaa.bbb.ccc.',
        expected: '.',
      },
    ],
  },
]);
