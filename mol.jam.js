"use strict"
/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$$ { export var x = 2 } // overrides
/// 	namespace $.$$ { console.log( x , y ) } // usage
///
var $ = $ || ( typeof module === 'object' ) && module['export'+'s'] || ( typeof window === 'object' ) && window
$.$$ = $

$.$mol = $  // deprecated
