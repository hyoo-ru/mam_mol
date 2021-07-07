namespace $ {

	export function $mol_data_const< Val extends {} | string | number >( ref : Val ) {

		return $mol_data_setup( function( this: $, val : Val ) {
			
			if( Object.is( val , ref ) ) return ref
			
			return this.$mol_fail( new this.$mol_data_error( `${ val } is not ${ ref }` ) )

		} , ref )

	}
	
}
