namespace $ {

	export function $mol_array_shuffle<Item>(
		array: readonly Item[],
	) {

		const res = array.slice()

		for( let index = res.length - 1; index > 0; index-- ) {
			const index_swap = Math.floor( Math.random() * ( index + 1 ) )
			const temp = res[ index ]
			res[ index ] = res[ index_swap ]
			res[ index_swap ] = temp
		}

		return res

	}

}
