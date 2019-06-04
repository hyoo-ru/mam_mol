namespace $ {

	export function $mol_data_string( val : string ) {
		if( typeof val === 'string' ) return val
		throw new Error( 'Not a string' )
	}
	
}
