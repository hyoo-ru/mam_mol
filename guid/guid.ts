namespace $ {

	/** Generates 8 byte unique identifier. */
	export function $mol_guid(
		exists: ( id: string )=> boolean = ()=> false
	) {

		for(;;) {

			let id = Math.random().toString( 36 ).substring( 2, 10 ).toUpperCase()
			if( exists( id ) ) continue
			
			return id
		}

	}

}
