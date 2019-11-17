namespace $ {

	export function $mol_data_pattern( pattern : RegExp ) {

		return $mol_data_setup( ( val : string ) => {

			const val2 = $mol_data_string( val )
			if( pattern.test( val2 ) ) return val2
			
			return $mol_fail( new Error( `is not a ${ pattern }` ) )

		} , pattern )

	}
					
}
