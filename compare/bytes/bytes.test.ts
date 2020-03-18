namespace $ {

	class TestArray extends Uint8Array {}

	$mol_test({
		'Uint8Array vs subclassed array'() {
			$mol_assert_ok( $mol_compare_deep( new Uint8Array , new TestArray ) )
			$mol_assert_ok( $mol_compare_deep( new Uint8Array([ 0 ]) , new TestArray([ 0 ]) ) )
			$mol_assert_not( $mol_compare_deep( new Uint8Array([ 0 ]) , new TestArray([ 1 ]) ) )
		} ,

	})
}
