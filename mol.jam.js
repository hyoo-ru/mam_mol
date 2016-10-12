/// Fake namespace for optional overrides
///
/// 	module $ { export var x = 1 , y = 1 } // defaults
/// 	module $.$mol { export var x = 2 } // overrides
/// 	module $.$mol { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$mol = $
