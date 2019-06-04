namespace $ {

	export function $mol_data_number( val : number ) {
		if( typeof val === 'number' ) return val
		throw new Error( 'Not a number' )
	}
	
}
