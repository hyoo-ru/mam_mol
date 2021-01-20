namespace $ {

	export function $mol_tree2_text_to_string( tree: $mol_tree2 ) {
		return tree.kids.map( chunk => chunk.text() ).join( '' )
	}

	export function $mol_tree2_text_to_sourcemap( tree: $mol_tree2 ) {

		let offset = 0
		let prev: $mol_span | undefined
		let prev_index = 0
		const mappings = [] as string[]

		const files = new Map< string, number >()
		function name2index( name: string ) {
			if( files.has( name ) ) return files.get( name )!
			const index = files.size
			files.set( name, index )
			return index
		}

		for( const chunk of tree.kids ) {

			const index = name2index( chunk.span.uri )

			mappings.push(
				$mol_vlq_encode( offset ) +
				$mol_vlq_encode( index - prev_index ) +
				$mol_vlq_encode( chunk.span.row - ( prev?.row ?? 1 ) ) +
				$mol_vlq_encode( chunk.span.col - ( prev?.col ?? 1 ) )
			)
			
			const text = chunk.text()
			offset = text.length
			prev = chunk.span
			prev_index = index

		}

		const map = {
			version: 3,
			sources: [ ... files.keys() ],
			mappings: mappings.join( ',' ) + ';',
		}

		return map

	}
}
