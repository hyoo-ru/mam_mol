namespace $ {
	
	export function $mol_array_groups<
		Item,
		Groups extends string,
	>(
		all: readonly Item[],
		group: ( item: Item )=> Groups,
	) {
		const res = {} as Record< Groups, Item[] | undefined >
		for( const item of all ) {
			const list = ( res[ group( item ) ] ||= [] )
			list.push( item )
		}
		return res as $mol_type_immutable_deep< typeof res >
	}
	
}
