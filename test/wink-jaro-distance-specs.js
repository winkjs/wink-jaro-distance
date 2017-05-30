//     wink-jaro-distance
//     An Implementation of Jaro Distance Algorithm
//     by Matthew A. Jaro
//
//     Copyright (C) 2017  GRAYPE Systems Private Limited
//
//     This file is part of “wink-jaro-distance”.
//
//     “wink-jaro-distance” is free software: you can redistribute it
//     and/or modify it under the terms of the GNU Affero
//     General Public License as published by the Free
//     Software Foundation, version 3 of the License.
//
//     “wink-jaro-distance” is distributed in the hope that it will
//     be useful, but WITHOUT ANY WARRANTY; without even
//     the implied warranty of MERCHANTABILITY or FITNESS
//     FOR A PARTICULAR PURPOSE.  See the GNU Affero General
//     Public License for more details.
//
//     You should have received a copy of the GNU Affero
//     General Public License along with “wink-jaro-distance”.
//     If not, see <http://www.gnu.org/licenses/>.

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
  ];

  tests.forEach( function ( t ) {
    it( 'should return when input is ' + t.whenInputIs.join( ', ' ), function () {
      expect( jaro( t.whenInputIs[ 0 ], t.whenInputIs[ 1 ] ) ).to.deep.equal( t.expectedOutputIs );
    } );
  } );
} );
