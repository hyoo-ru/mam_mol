namespace $ {

	export function $mol_array_shuffle<Item>(
		array: readonly Item[],
	) {

		const res = new Array( array.length )

		for( let i = 0; i < res.length; ++i ) {
			const j = Math.floor( Math.random() * ( i+1 ) )
			if( i !== j ) res[i] = res[j]
			res[j] = array[i]
		}

		return res

	}

}
