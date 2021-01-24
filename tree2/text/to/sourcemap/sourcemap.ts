namespace $ {

	// @todo support `indent` and `line`
	export function $mol_tree2_text_to_sourcemap( this: $, tree: $mol_tree2 ) {

		tree = tree.clone( tree.hack({
			indent: ( input, belt )=> input.hack( belt ),
			line: ( input, belt )=> input.hack( belt ),
			'': ( input, belt )=> [ input ],
		}) )

		let offset = 0
		let prev: $mol_span | undefined
		let prev_index = 0
		const mappings = [] as string[]

		const file_indexes = new Map< string, number >()
		const file_sources = new Map< string, string >()

		function span2index( span: $mol_span ) {
			if( file_indexes.has( span.uri ) ) return file_indexes.get( span.uri )!
			const index = file_indexes.size
			file_indexes.set( span.uri, index )
			file_sources.set( span.uri, span.source )
			return index
		}

		for( const chunk of tree.kids ) {

			const text = chunk.text()
			
			if( prev !== chunk.span ) {

				const index = span2index( chunk.span )
				
				mappings.push(
					$mol_vlq_encode( offset ) + 
					$mol_vlq_encode( index - prev_index ) +
					$mol_vlq_encode( chunk.span.row - ( prev?.row ?? 1 ) ) +
					$mol_vlq_encode( chunk.span.col - ( prev?.col ?? 1 ) )
				)
				
				offset = text.length
				prev = chunk.span
				prev_index = index

			} else {
				offset += text.length
			}			

		}

		const map = {
			version: 3,
			sources: [ ... file_sources.keys() ],
			sourcesContent: [ ... file_sources.values() ],
			mappings: mappings.join( ',' ),
		}

		return map

	}

}
