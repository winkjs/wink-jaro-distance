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
// Because we want to logically group the variables.
/* eslint sort-vars: 0 */

// ### Jaro
/**
 *
 * Computes Jaro distance and similarity between strings `s1` and `s2`.
 *
 * Original Reference: UNIMATCH:
 * [A Record Linkage System: Users Manual pp 104.](https://books.google.co.in/books?id=Ahs9TABe61oC)
 *
 * @param {string} s1 — the first string.
 * @param {string} s2 — the second string.
 * @return {object} - containing `distance` and `similarity` values between 0 and 1.
 *
 * @example
 * jaro( 'daniel', 'danielle' );
 * // -> { distance: 0.08333333333333337, similarity: 0.9166666666666666 }
 * jaro( 'god', 'father' );
 * // -> { distance: 1, similarity: 0 }
 */
var jaro = function ( s1, s2 ) {
  // On the basis of the length of `s1` and `s2`, the shorter length string will
  // be assigned to 'short' (with length as `shortLen`) and longer one will be
  // assigned to `long` (with length as `longLen`).
  var shortLen = s1.length;
  var longLen = s2.length;
  // Early exits!
  if ( s1 === s2 ) return { distance: 0, similarity: 1 };
  if ( !shortLen || !longLen ) return { distance: 1, similarity: 0 };

  // Start with random assignment; will be swapped later if required.
  var short = s1;
  var long = s2;
  // The jaro number of matches & transposes.
  var matches = 0;
  var transposes = 0;
  // The **s**earch **window**.
  var swindow = Math.floor( Math.max( shortLen, longLen ) / 2 ) - 1;
  // All matching characters go into this array in *sequqnce*: important to getProbabilityStats
  // number of transposes.
  var matchedChars = [];
  // Helper variables.
  var i, j;
  var char;
  // Flagged true at locations that contain a match.
  var longMatchedAt;
  // Search window start and end indexes.
  var winStart, winEnd;
  // Returns.
  var smlrty;

  // Time to swap, if required.
  if ( shortLen > longLen ) {
    short = [ long, long = short ][ 0 ];
    shortLen = [ longLen, longLen = shortLen ][ 0 ];
  }

  longMatchedAt = new Array( longLen );
  for ( i = 0; i < longLen; i += 1 ) longMatchedAt[ i ] = false;
  // Determine number of matches: loop thru the `short` and search in `long`
  // string to minimize the time.
  for ( i = 0; i < shortLen; i += 1 ) {
    char = short[ i ];
    winStart = Math.max( i - swindow, 0 );
    winEnd = Math.min( i + swindow + 1, longLen );
    for ( j = winStart; j < winEnd; j += 1 ) {
      if ( ( !longMatchedAt[ j ] ) && ( char === long[ j ] ) ) {
        matches += 1;
        longMatchedAt[ j ] = true;
        matchedChars.push( char );
        break;
      }
    }
  }

  // Determine # of transposes; note `j` is an index into `matchedChars`.
  for ( i = 0, j = 0; j < matches; i += 1 ) {
    if ( longMatchedAt[ i ] ) {
      if ( long[ i ] !== matchedChars[ j ] ) transposes += 1;
      j += 1;
    }
  }
  transposes /= 2;
  // Compute similarity; if no `matches` means similarity is 0!
  smlrty = ( matches === 0 ) ?
            0 :
            ( ( matches / shortLen ) + ( matches / longLen ) + ( ( matches - transposes ) / matches ) ) / 3;
  return {
    distance: 1 - smlrty,
    similarity: smlrty
  };
}; // jaro()

// Export Jaro.
module.exports = jaro;
