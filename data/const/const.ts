namespace $ {

	export function $mol_data_const< Val >( ref : Val ) {
		return ( val : Val ) => {
			
			if( Object.is( val , ref ) ) return ref
			
			return $mol_fail( new Error( `is not ${ ref }` ) )

		}
	}
	
}
