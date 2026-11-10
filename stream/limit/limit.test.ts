namespace $ {

	$mol_test({

		async 'Limit stream size'( $ ) {

			const source = new ReadableStream< Uint8Array >({
				start( controller ) {
					controller.enqueue( new Uint8Array([ 1, 2, 3 ]) )
					controller.enqueue( new Uint8Array([ 4, 5, 6 ]) )
					controller.enqueue( new Uint8Array([ 7, 8, 9 ]) )
					controller.close()
				},
			})
			const stream = source.pipeThrough( $mol_stream_limit( 5 ) )

			const chunks = []
			for await( const chunk of stream ) chunks.push( chunk )

			$mol_assert_equal( chunks, [
				new Uint8Array([ 1, 2, 3 ]),
				new Uint8Array([ 4, 5 ]),
			] )

		},

	})

}
