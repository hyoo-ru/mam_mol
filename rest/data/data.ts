namespace $ {
	
	export function $mol_rest_data_simplify(
		data: null | string | Uint8Array | object
	) {
		
		if( data === null ) return data
		if( typeof data === 'string' ) return data
		if( data instanceof Uint8Array ) return data
		
		if( typeof data === 'object' && Reflect.getPrototypeOf( data ) === Object.prototype ) {
			return JSON.stringify( data )
		}

		$mol_fail( new Error( 'Wrong data' ) )
	}
	
}
