namespace $ {
	
	const TypedArray = Object.getPrototypeOf( Uint8Array )

	/** Returns string key for any value. */
	export function $mol_key< Value >( value : Value ) : string {
		
		primitives: {
			if( typeof value === 'bigint' ) return value.toString() + 'n'
			if( typeof value === 'symbol' ) return `Symbol(${ value.description! })`
			if( !value ) return JSON.stringify( value ) // 0, null, ""
			if( typeof value !== 'object' && typeof value !== 'function' ) return JSON.stringify( value ) // boolean, number, string
		}
		
		caching: {
			let key = $mol_key_store.get( value )
			if( key ) return key
		}
		
		objects: {
			
			if( value instanceof TypedArray ) {
				return `${ ( value as any )[ Symbol.toStringTag ] }([${ [ ... value as number[] ].map( v => $mol_key( v ) ) }])`
			}
			if( Array.isArray( value ) ) return `[${ value.map( v => $mol_key( v ) ) }]`
			if( value instanceof RegExp ) return value.toString()
			if( value instanceof Date ) return `Date(${ value.valueOf() })`
			
		}
		
		structures: {
			const proto = Reflect.getPrototypeOf( value )
			if( !proto || !Reflect.getPrototypeOf( proto ) ) {
				return `{${ Object.entries( value ).map( ([ k, v ]) => JSON.stringify( k ) + ':' + $mol_key( v ) ) }}`
			}
		}
		
		handlers: {
			if( $mol_key_handle in value ) {
				return ( value[ $mol_key_handle ] as any )()
			}
		}
		
		containers: {
			const key = '#' + $mol_guid()
			$mol_key_store.set( value, key )
			return key
		}

	}
	
}
