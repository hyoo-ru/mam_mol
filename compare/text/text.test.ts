namespace $ {

	$mol_test({

		'simple sort'() {
			const list = [ 'abc' , 'ac' , 'ab' ]
			list.sort( $mol_compare_text() )
			$mol_assert_equal( `${ list }` , 'ab,abc,ac' )
		} ,

		'sort ignoring spaces around'() {
			const list = [ ' a' , '\tb' , ' b' ]
			list.sort( $mol_compare_text() )
			$mol_assert_equal( `${ list }` , ' a,\tb, b' )
		} ,

		'sort ignoring letter case'() {
			const list = [ 'A' , 'B' , 'a' ]
			list.sort( $mol_compare_text() )
			$mol_assert_equal( `${ list }` , 'A,a,B' )
		} ,

		'sort with custom serializer'() {
			const list = [ 'abc' , 'ab' , 'ac' ]
			list.sort( $mol_compare_text( str => str.split('').reverse().join('') ) )
			$mol_assert_equal( `${ list }` , 'ab,ac,abc' )
		} ,

	})

}
