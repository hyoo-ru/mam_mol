namespace $ {

	export function $mol_data_array< Sub extends $mol_data_value >( sub : Sub ) {
		return ( val : readonly Parameters< Sub >[0][] ) => {
			
			if( !Array.isArray( val ) ) return $mol_fail( new Error( 'is not an array' ) )
			
			return val.map( ( item , index )=> {

				try {
					return sub( item )
				} catch( error ) {
					return $mol_fail_hidden( new Error( `[${ index }] ${ error.message || error }` ) )
				}

			} ) as readonly ReturnType< Sub >[]
			
		}
	}
			
}
