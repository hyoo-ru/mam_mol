namespace $ {
	export function $mol_tree2_span_imprint( tree: $mol_tree2 ) {

		const sources = new Map< string, $mol_tree2 >()

		const res = tree.clone( tree.hack({
			'': ( input, belt )=> {

				if( !sources.has( input.span.uri ) ) {
					sources.set( input.span.uri,
						tree.struct( input.span.uri, [
							tree.data( input.span.source )
						] ),
					)
				}

				return [
					input.clone([
						input.data( input.span.toString() ),
						... input.hack( belt ),
					]),
				]

			},
		}) )

		return tree.clone([
			... sources.values(),
			res,
		])

	}
}
