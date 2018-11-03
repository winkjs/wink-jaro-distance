//     wink-jaro-distance
//     An Implementation of Jaro Distance Algorithm
//     by Matthew A. Jaro
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-jaro-distance”.
//
//     Permission is hereby granted, free of charge, to any person obtaining a
//     copy of this software and associated documentation files (the "Software"),
//     to deal in the Software without restriction, including without limitation
//     the rights to use, copy, modify, merge, publish, distribute, sublicense,
//     and/or sell copies of the Software, and to permit persons to whom the
//     Software is furnished to do so, subject to the following conditions:
//
//     The above copyright notice and this permission notice shall be included
//     in all copies or substantial portions of the Software.
//
//     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
//     OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//     THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//     FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//     DEALINGS IN THE SOFTWARE.

//
var chai = require( 'chai' );
var mocha = require( 'mocha' );
var jaro = require( '../src/wink-jaro-distance.js' );


var expect = chai.expect;
var describe = mocha.describe;
var it = mocha.it;

// Validate jaro test case.
describe( 'jaro()', function () {
  var tests = [
    { whenInputIs: [ 'loans and accounts', 'loan account' ], expectedOutputIs: { similarity: 0.8333333333333334, distance: 1 - 0.8333333333333334 } },
    { whenInputIs: [ 'loan account', 'loans and accounts' ], expectedOutputIs: { similarity: 0.8333333333333334, distance: 1 - 0.8333333333333334 } },
    { whenInputIs: [ 'trace', 'crate' ], expectedOutputIs: { similarity: 0.7333333333333334, distance: 1 - 0.7333333333333334 } },
    { whenInputIs: [ 'trace', 'trace' ], expectedOutputIs: { similarity: 1, distance: 0 } },
    { whenInputIs: [ 'trace', '' ], expectedOutputIs: { similarity: 0, distance: 1 } },
    { whenInputIs: [ '', 'trace' ], expectedOutputIs: { similarity: 0, distance: 1 } },
    { whenInputIs: [ '', '' ], expectedOutputIs: { similarity: 1, distance: 0 } },
    { whenInputIs: [ 'abcd', 'badc' ], expectedOutputIs: { similarity: 0.8333333333333334, distance: 1 - 0.8333333333333334 } },
    { whenInputIs: [ 'abcd', 'dcba' ], expectedOutputIs: { similarity: 0.5, distance: 0.5 } },
    { whenInputIs: [ 'washington', 'notgnihsaw' ], expectedOutputIs: { similarity: 0.43333333333333335, distance: 1 - 0.43333333333333335 } },
    { whenInputIs: [ 'washington', 'washingtonx' ], expectedOutputIs: { similarity: 0.9696969696969697, distance: 1 - 0.9696969696969697 } },
    { whenInputIs: [ 'daniel', 'danielle' ], expectedOutputIs: { similarity: 0.9166666666666666, distance: 1 - 0.9166666666666666 } },
    // No match case
    { whenInputIs: [ 'sat', 'urn' ], expectedOutputIs: { similarity: 0, distance: 1 } },
    // Empty string case
    { whenInputIs: [ '', '' ], expectedOutputIs: { similarity: 1, distance: 0 } },
    // One of them is Empty
    { whenInputIs: [ '', 'urn' ], expectedOutputIs: { similarity: 0, distance: 1 } },
  ];

  tests.forEach( function ( t ) {
    it( 'should return when input is ' + t.whenInputIs.join( ', ' ), function () {
      expect( jaro( t.whenInputIs[ 0 ], t.whenInputIs[ 1 ] ) ).to.deep.equal( t.expectedOutputIs );
    } );
  } );
} );
