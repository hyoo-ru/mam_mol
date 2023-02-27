namespace $ {

	export function $mol_data_const< Val >( ref : Val ) {

		return $mol_data_setup( ( val : Val ) => {
			
			if( $mol_compare_deep( val , ref ) ) return ref
			
			return $mol_fail( new $mol_data_error( `${ JSON.stringify( val ) } is not ${ JSON.stringify( ref ) }` ) )

		} , ref )

	}
	
}
