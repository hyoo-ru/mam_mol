namespace $ {
	
	export async function $mol_tree2_to_stream(
		tree: $mol_tree2,
		output: {
			write( chunk: string ): boolean
			once?( event: 'drain', cb: ()=> void ): void
		},
		prefix = '',
	) {

		const pause = ()=> {
			return new Promise( done => {
				output.once!( 'drain', ()=> done( null ) )
			} )
		}

		if( tree.type.length ) {
			
			if( !prefix.length ) {
				prefix = "\t";
			}

			output.write( tree.type )

			if( tree.kids.length == 1 ) {
				output.write( ' ' )
				await $mol_tree2_to_stream( tree.kids[ 0 ], output, prefix )
				return
			}

			output.write( "\n" )

		} else if( tree.value.length || prefix.length ) {

			output.write( "\\" + tree.value + "\n" )

		}

		for( const kid of tree.kids ) {
			if( !output.write( prefix ) ) await pause()
			await $mol_tree2_to_stream( kid, output, prefix + "\t" )
		}

	}

}
