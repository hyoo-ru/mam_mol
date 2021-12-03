namespace $ {
	
	const keys = new WeakMap< object, string >()

	export function $mol_key< Value >( value : Value ) : string {
		
		if( !value ) return JSON.stringify( value )
		if( typeof value !== 'object' && typeof value !== 'function' ) return JSON.stringify( value )
		
		return JSON.stringify( value, ( field, value )=> {
			
			if( !value ) return value
			if( typeof value !== 'object' && typeof value !== 'function' ) return value
			if( Array.isArray( value ) ) return value
			
			const proto = Reflect.getPrototypeOf( value )
			if( !proto ) return value
			if( Reflect.getPrototypeOf( proto ) === null ) return value
			
			if( 'toJSON' in value ) return value
			if( value instanceof RegExp ) return value.toString()
			
			let key = keys.get( value )
			if( key ) return key
			
			key = $mol_guid()
			keys.set( value, key )
			
			return key
		} )

	}
	
}
