namespace $ {

	export function $mol_data_pattern( pattern : RegExp ) {

		return $mol_data_setup( function( this: $, val: string ) {

			const val2 = this.$mol_data_string( val )
			
			if( !pattern.test( val2 ) )
				return this.$mol_fail( new this.$mol_data_error( `${ val } is not a ${ pattern }` ) )
			
			return val2

		} , pattern )

	}
					
}
