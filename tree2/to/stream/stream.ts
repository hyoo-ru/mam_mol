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

		let out = ''

		if( tree.type.length ) {
			
			if( !prefix.length ) {
				prefix = "\t";
			}

			out += tree.type

			if( tree.kids.length == 1 ) {
				output.write( out + ' ' )
				await $mol_tree2_to_stream( tree.kids[ 0 ], output, prefix )
				return
			}

			out += "\n"

		} else if( tree.value.length || prefix.length ) {

			out += "\\" + tree.value + "\n"

		}

		output.write( out )

		for( const kid of tree.kids ) {
			if( !output.write( prefix ) ) await pause()
			await $mol_tree2_to_stream( kid, output, prefix + "\t" )
		}

	}

}
