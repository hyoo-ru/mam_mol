namespace $ {

	export function $mol_data_enum(name: string, e: Record<number|string,number|string>) {
		return (key : number ) => {
			const keyNumber = $mol_data_number(key)
			if ( !(keyNumber in e) ) return $mol_fail( new Error( `key ${keyNumber} is not a type of ${name} enum` ) )

			return e[keyNumber]
		}
	}
	
}
