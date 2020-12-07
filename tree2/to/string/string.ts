namespace $ {

	/** Serializes tree to string in tree format. */
	export function $mol_tree2_to_string(
		this: $,
		tree: $mol_tree2,
	) : string {

		let output = [] as string[]
		
		function dump(
			tree: $mol_tree2,
			prefix = '',
		) {

			if( tree.type.length ) {
				
				if( !prefix.length ) {
					prefix = "\t";
				}

				output.push( tree.type )

				if( tree.kids.length == 1 ) {
					output.push( ' ' )
					dump( tree.kids[ 0 ], prefix )
					return
				}

				output.push( "\n" )

			} else if( tree.value.length || prefix.length ) {

				output.push( "\\" + tree.value + "\n" )

			}

			for( const kid of tree.kids ) {
				output.push( prefix )
				dump( kid, prefix + "\t" )
			}
			
		}

		dump( tree )

		return output.join('')
	}
		
}
