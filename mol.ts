/// Fake namespace for optional overrides
///
/// 	module $ { export var x = 1 , y = 1 } // defaults
/// 	module $.$mol { export var x = 2 } // overrides
/// 	module $.$mol { console.log( x , y ) } // usage
///
this['$'] = this['$'] || this
this['$']['$mol'] = this['$']

/// Support for static constructors
var __extends = ( Sub , Sup ) => {
	for( var prop in Sup ) if( Sup.hasOwnProperty( prop ) ) Sub[ prop ] = Sup[ prop ]
	Sub.prototype = Object.create( Sup.prototype )
	Sub.prototype.constructor = Sub
	if( Sub.initializer ) Sub.initializer()
};

/// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
declare class Map<Key,Value> {
	size : number
	get( key : Key ) : Value
	set( key : Key , value : Value ) : this
	delete( key : Key )
	has( key : Key )
	clear()
	keys() : Key[]
	values() : Value[]
	entries() : [ Key , Value ][]
	forEach( handler : ( Value , Key ) => void )
}
