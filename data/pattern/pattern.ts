namespace $ {

	export function $mol_data_pattern( pattern : RegExp ) {
		return ( val : string ) => {

			const val2 = $mol_data_string( val )
			if( pattern.test( val2 ) ) return val2
			
			return $mol_fail( new Error( `is not a ${ pattern }` ) )

		}
	}
					
}
