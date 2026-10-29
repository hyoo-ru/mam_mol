namespace $ {
	$mol_test({
		
		'Pads buffer views to 16 bytes'( $ ) {
			
			const buffer = new Uint8Array([ 9, 1, 2, 3, 8 ])
			const data = buffer.subarray( 1, 4 )
			
			const padded = $$.$mol_crypto2_padding_add.call( $, data )
			
			$mol_assert_equal( padded.subarray( 0, 3 ), data )
			$mol_assert_unique( padded.subarray( 3 ), new Uint8Array( 13 ) )
			$mol_assert_equal( padded[15] & 0x0F, 13 )
			
			const cropped = $$.$mol_crypto2_padding_crop.call( $, padded )
			
			$mol_assert_equal( cropped, data )
			$mol_assert_equal( cropped.buffer, padded.buffer )
			
		},
		
		'Adds full block when already padded'( $ ) {
			
			const buffer = Uint8Array.from( { length: 18 }, ( _, i )=> i )
			const data = buffer.subarray( 1, 17 )
			
			const padded = $$.$mol_crypto2_padding_add.call( $, data )
			
			$mol_assert_equal( padded.subarray( 0, 16 ), data )
			$mol_assert_unique( padded.subarray( 16 ), new Uint8Array( 16 ) )
			$mol_assert_equal( padded[31] & 0x0F, 0 )
			
			const cropped = $$.$mol_crypto2_padding_crop.call( $, padded )
			
			$mol_assert_equal( cropped, data )
			$mol_assert_equal( cropped.buffer, padded.buffer )
			
		},
		
	})
}
