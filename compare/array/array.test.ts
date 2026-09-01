namespace $ {

	class TestClass extends Uint8Array {}

	$mol_test({
		'Uint8Array vs itself'() {
			$mol_assert_ok( $mol_compare_array( new Uint8Array , new Uint8Array ) )
			$mol_assert_ok( $mol_compare_array( new Uint8Array([ 0 ]) , new Uint8Array([ 0 ]) ) )
			$mol_assert_not( $mol_compare_array( new Uint8Array([ 0 ]) , new Uint8Array([ 1 ]) ) )
		} ,

		'Uint8Array vs subclassed array'() {
			$mol_assert_not( $mol_compare_array( new Uint8Array , new TestClass ) )
		} ,

	})
}
