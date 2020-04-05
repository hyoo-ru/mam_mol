namespace $.$$ {

	$mol_test( {
		'simple'( $ ) {
			const app = $mol_view_tree_test_simple.make({
				$
			})

			$mol_assert_equal( app.some() , 1 )
		}
	} )
}
