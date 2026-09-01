namespace $ {

	export function $mol_json_from_string( str: string ) {
		return JSON.parse( str )
	}

	export function $mol_json_to_string( str: string ) {
		return JSON.stringify( str, null, '\t' )
	}

}
