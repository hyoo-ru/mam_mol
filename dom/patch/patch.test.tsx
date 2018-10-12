namespace $ {
	$mol_test({

		'$mol_dom_patch'() {

			const dom = <div xx><input id="xxx" value="123" /></div>
			$mol_dom_patch( dom , <div yy><input id="xxx" value="321" /></div> )
			
			$mol_assert_equal( dom.outerHTML , '<div yy="true"><input id="xxx"></div>' )
			$mol_assert_equal( dom['yy'] , true )
			$mol_assert_equal( ( dom.children[0] as HTMLInputElement ).value , '321' )

		} ,

	})
}
