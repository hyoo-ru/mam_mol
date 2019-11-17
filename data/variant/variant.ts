namespace $ {

	export function $mol_data_variant< Sub extends $mol_data_value[] >( ... sub : Sub ) {

		return $mol_data_setup( ( val : Parameters< Sub[ number ] >[0] ) => {
			
			const errors = [] as String[]
			
			for( const type of sub ) {
				try {
					return type( val ) as ReturnType< Sub[ number ] >
				} catch ( error ) {
					errors.push( error.message )
				}
			}
			
			return $mol_fail( new Error( errors.join( ' and ' ) ) )
		} , sub )

	}
	
}
