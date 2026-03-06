namespace $ {
	export function $mol_store_mock() {
		const dict = new Map< string , string >()

		return {
			getItem : ( key : string ) => dict.get( key ) ?? null,
			setItem : ( key : string , value : string )=> { dict.set( key , value ) },
			removeItem : ( key : string )=> { dict.delete( key ) },
		}

	}
}
