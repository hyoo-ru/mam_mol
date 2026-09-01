namespace $ {
	$mol_test({

		'$mol_leb128'() {
			$mol_assert_like( $mol_leb128_encode( 0 ) , new Uint8Array([ 0 ]) )
			$mol_assert_like( $mol_leb128_encode( 624485 ) , new Uint8Array([ 0xE5 , 0x8E , 0x26 ]) )
			$mol_assert_equal( $mol_leb128_decode( new Uint8Array([ 0xE5 , 0x8E , 0x26 ]) ) , 624485 )
		} ,

	})
}
