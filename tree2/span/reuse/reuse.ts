namespace $ {
	export function $mol_tree2_span_reuse( tree: $mol_tree2 ) {
		
		const sources = new Map< string, string >()

		return tree.clone(
			tree.hack({
				'': ( input, belt )=> {

					if( input.type ) {
						sources.set( input.type, input.kids[0].text() )
						return []
					}
					
					return input.hack({
						'': ( input, belt )=> {
							const kids = input.list( input.kids.slice(1) ).hack( belt )
							const [ _, uri, row, col, length ] = /^(.*)#(\d+):(\d+)\/(\d+)$/.exec( input.kids[0].text() )!
							const span = new $mol_span( uri, sources.get( uri )!, Number( row ), Number( col ), Number( length ) )
							return [
								new $mol_tree2( input.type , input.value , kids, span ),
							]
						},
					})

				},
			}),
		)

	}
}
