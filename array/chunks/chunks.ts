namespace $ {

	export function $mol_array_chunks< Item >(
		array : Item[],
		br: ( item: Item, index: number )=> boolean,
	) {

		let chunk = [] as Item[]
		const chunks = [ chunk ]

		for( let i = 0; i < array.length; ++i ) {

			const item = array[i]
			chunk.push( item )
			
			if( br( item, i ) ) {
				chunks.push( chunk = [] )
			}

		}

		if( chunk.length === 0 ) chunks.pop()

		return chunks
	}

}
