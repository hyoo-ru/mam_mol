namespace $ {
	
	export const $mol_key_store = new WeakMap< object, string >()
	
	const TypedArray = Object.getPrototypeOf( Uint8Array )

	/** Returns string key for any value. */
	export function $mol_key< Value >( value : Value ) : string {
		
		if( typeof value === 'bigint' ) return value.toString() + 'n'
		if( typeof value === 'symbol' ) return value.description!
		if( !value ) return JSON.stringify( value )
		if( typeof value !== 'object' && typeof value !== 'function' ) return JSON.stringify( value )
		
		return JSON.stringify( value, ( field, value )=> {
			
			if( typeof value === 'bigint' ) return value.toString() + 'n'
			if( typeof value === 'symbol' ) return value.description
			if( !value ) return value
			if( typeof value !== 'object' && typeof value !== 'function' ) return value
			if( Array.isArray( value ) ) return value
			
			const proto = Reflect.getPrototypeOf( value )
			if( !proto ) return value
			if( Reflect.getPrototypeOf( proto ) === null ) return value
			
			if( 'toJSON' in value ) return value
			if( value instanceof RegExp ) return value.toString()
			// if( value instanceof DataView ) return [ ... new Uint8Array( value.buffer ) ]
			if( value instanceof TypedArray ) return [ ... value as any ]
			
			let key = $mol_key_store.get( value )
			if( key ) return key
			
			key = $mol_guid()
			$mol_key_store.set( value, key )
			
			return key
		} )

	}
	
}
