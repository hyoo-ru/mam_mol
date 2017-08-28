namespace $ {

	export function $mol_match_text< Variant >( query : string , values : ( variant : Variant )=> string[] ) {
		const tags = query.toLowerCase().trim().split( /\s+/ ).filter( tag => tag )

		if( tags.length === 0 ) return ()=> true
		
		return ( variant : Variant )=> {
			const vals = values( variant )
			return tags.every( tag => vals.some( val => val.toLowerCase().indexOf( tag ) >= 0 ) )
		}
	}

}
