namespace $ {

	export function $mol_tree2_text_to_sourcemap( this: $, tree: $mol_tree2 ) {

		let col = 1
		let prev_span: $mol_span | undefined
		let prev_index = 0
		let prev_col = 1
		let mappings = ''
		let line = [] as string[]

		const file_indexes = new Map< string, number >()
		const file_sources = new Map< string, string >()

		function span2index( span: $mol_span ) {
			if( file_indexes.has( span.uri ) ) return file_indexes.get( span.uri )!
			const index = file_indexes.size
			file_indexes.set( span.uri, index )
			file_sources.set( span.uri, span.source )
			return index
		}
		
		function next_line() {
			if( !line.length ) return
			mappings += line.join(',') + ';'
			line = []
			col = 1
			prev_col = 1
		}
		
		function visit( text: $mol_tree2, prefix: number, inline: boolean ) {

			function indent() {
				col += prefix
			}
	
			if( inline && text.type === 'indent' ) next_line()
			
			if( prev_span !== text.span || col === 1 ) {

				const index = span2index( text.span )
				
				line.push(
					$mol_vlq_encode( col - prev_col ) + 
					$mol_vlq_encode( index - prev_index ) +
					$mol_vlq_encode( text.span.row - ( prev_span?.row ?? 1 ) ) +
					$mol_vlq_encode( text.span.col - ( prev_span?.col ?? 1 ) )
				)
				
				prev_col = col
				prev_span = text.span
				prev_index = index
				
			}
			
			if( text.type === 'indent' ) {

				for( let kid of text.kids ) {
					visit( kid, prefix + 1, false )
				}
				
				if( inline ) next_line()

			} else if( text.type === 'line' ) {
				
				if( !inline ) indent()
				
				for( let kid of text.kids ) {
					visit( kid, prefix, true )
				}
				
				if( !inline ) next_line()

			} else {
				
				if( !inline ) indent()
				
				col += text.text().length
				
				if( !inline ) next_line()
				
			}

		}

		for( let kid of tree.kids ) {
			visit( kid, 0, false )
		}
		next_line()
		
		const map: $mol_sourcemap_raw = {
			version: 3,
			sources: [ ... file_sources.keys() ],
			sourcesContent: [ ... file_sources.values() ],
			mappings,
		}

		return map

	}

}
