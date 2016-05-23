/// Creates the decorator for caching result value by json-key passed as first argument.
/// Method must be a polymorphic property (getter/setter/getter+setter).
function $mol_atom( ) {
	
	return function< Object extends { objectPath() : string } , Key , Value >(
		obj : Object ,
		name : string ,
		descr : TypedPropertyDescriptor< ( key : Key , next? : Value , prev? : Value ) => Value >
	) {
		var pull = descr.value
		descr.value = get
		
		function get( arg? , next? , prev? ) {
			var key = name + "(" + ( arg === void 0 ? '' : JSON.stringify( arg ) ) + ")"
			
			if( arguments.length === 1 ) {
				if( this[ key ] !== void 0 ) return this[ key ]
				return push.call( this, pull.call( this , arg ) )
			} else {
				push.call( this , pull.call( this , arg , next ) )
				return this
			}
			
			function push( next ) {
				var prev = this[ key ]
				if( prev !== next ) {
					if( next && next instanceof $mol_object ) {
						next.objectPath( this.objectPath() + '.' + key )
					}
					this[ key ] = next
				}
				return next
			}
		}
	}

}
