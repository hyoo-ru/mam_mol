namespace $ {

	export function $mol_data_enum(e: object) {
		return (val : string | number ) => {
		
			if( (typeof val === 'string' || typeof val === 'number') && val in e) return e[val]
			
			return $mol_fail( new Error( 'is not a type of enum' ) )
		}
	}
	
}
