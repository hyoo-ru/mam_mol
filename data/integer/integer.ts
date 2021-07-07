namespace $ {

	export function $mol_data_integer( this: $, val: number ) {

		const val2 = this.$mol_data_number( val )
		
		if( Math.floor( val2 ) !== val2 )
			return this.$mol_fail( new this.$mol_data_error( `${ val } is not an integer` ) )
		
		return val2
	}
	
}
