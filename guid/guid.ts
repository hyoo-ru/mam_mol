namespace $ {

	/** Generates unique identifier. */
	export function $mol_guid(
		length = 8,
		exists: ( id: string )=> boolean = ()=> false,
	) {

		for(;;) {

			let id = Math.random().toString( 36 ).substring( 2, length + 2 ).toUpperCase()
			if( exists( id ) ) continue
			
			return id
		}

	}

}
