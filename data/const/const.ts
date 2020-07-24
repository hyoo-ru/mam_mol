namespace $ {

	export function $mol_data_const< Val extends {} | string | number >( ref : Val ) {

		return $mol_data_setup( ( val : Val ) => {
			
			if( Object.is( val , ref ) ) return ref
			
			return $mol_fail( new $mol_data_error( `${ val } is not ${ ref }` ) )

		} , ref )

	}
	
}
