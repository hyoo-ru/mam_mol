namespace $ {

	export function $mol_data_string( this: $, val : string ) {
		
		if( typeof val !== 'string' )
			this.$mol_fail( new this.$mol_data_error( `${ val } is not a string` ) )
		
		return val
	}
	
}
