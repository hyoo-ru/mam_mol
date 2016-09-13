/// Fake namespace for optional overrides
///
/// 	module $ { export var x = 1 , y = 1 } // defaults
/// 	module $.$mol { export var x = 2 } // overrides
/// 	module $.$mol { console.log( x , y ) } // usage
///
this['$'] = this['$'] || this
this['$']['$mol'] = this['$']

/// Support for static constructors
var __extends = (
	Sub : Function & { [ key : string ] : any } ,
	Sup : Function & { [ key : string ] : any }
) => {
	for( var prop in Sup ) if( Sup.hasOwnProperty( prop ) ) Sub[ prop ] = Sup[ prop ]
	Sub.prototype = Object.create( Sup.prototype , {
		constructor : {
			configurable : true ,
			writable : true ,
			value : Sub ,
		}
	} )
	if( Sub['initializer'] ) Sub['initializer']()
}

