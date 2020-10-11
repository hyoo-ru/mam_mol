/** @jsx $mol_jsx */
namespace $ {
	$mol_test({

		'$mol_dom_patch'() {

			const dom = <object data="foo"><input id="xxx" value="123" /></object>
			$mol_dom_patch( dom , <object data="bar"><input id="xxx" value="321" /></object> )
			
			$mol_assert_equal( dom.outerHTML , '<object data="bar"><input id="xxx" value="321"></object>' )
			// $mol_assert_equal( ( dom.children[0] as HTMLInputElement ).value , '321' )
			// $mol_assert_equal( dom['data'] , 'bar' )

		} ,

	})
}
