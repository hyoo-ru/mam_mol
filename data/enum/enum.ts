namespace $ {

	export function $mol_data_enum(name: string, e: Record<number|string,number|string>) {
		const errorMessage =  `is not a type of ${name} enum`;
		return (val : string | number ) => {
			if ( typeof val !== 'string' && typeof val !== 'number') return $mol_fail( new Error( errorMessage ) )
			if ( !(val in e) ) return $mol_fail( new Error( errorMessage ) )
			return e[val]
		}
	}
	
}
