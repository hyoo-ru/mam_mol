namespace $ {

	export function $mol_stream_limit(
		limit: number,
	) {
		
		return new TransformStream< Uint8Array, Uint8Array >({
			
			transform( chunk, controller ) {
				
				if( chunk.byteLength <= limit ) controller.enqueue( chunk )
				else controller.enqueue( chunk.subarray( 0, limit ) )
				
				limit -= chunk.byteLength
				if( limit < 0 ) controller.terminate()
				
			},
			
		})
		
	}

}
