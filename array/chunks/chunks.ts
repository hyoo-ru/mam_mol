namespace $ {

	export function $mol_array_chunks< Item >(
		array : readonly Item[],
		rule: number | ( ( item: Item, index: number )=> boolean ),
	) {
		
		const br = typeof rule === 'number' ? ( _: Item, i: number )=> i % rule === 0 : rule

		let chunk = [] as Item[]
		const chunks = []

		for( let i = 0; i < array.length; ++i ) {

			const item = array[i]
			
			if( br( item, i ) ) {
				if( chunk.length ) chunks.push( chunk )
				chunk = []
			}

			chunk.push( item )
			
		}

		if( chunk.length ) chunks.push( chunk )

		return chunks
	}

}
