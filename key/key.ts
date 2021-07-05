namespace $ {

	export function $mol_key< Value >( value : Value ) : string | Value {
		
		if( !value ) return JSON.stringify( value )
		if( typeof value !== 'object' && typeof value !== 'function' ) return JSON.stringify( value )

		if( Array.isArray( value ) ) return JSON.stringify( value )
		if( Object.getPrototypeOf( Object.getPrototypeOf( value ) ) === null ) return JSON.stringify( value )
		
		return value
	}
	
}
