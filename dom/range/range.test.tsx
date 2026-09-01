/** @jsx $mol_jsx */
namespace $.$$ {
	$mol_test({

		"Inside, expand & around"( $ ) {

			const div = <div>123<span>foo</span>456</div>
			const span = div.childNodes[1]

			$mol_assert_equal(
				$mol_dom_range.inside( span ).expand(),
				$mol_dom_range.around( span ),
			)
			
		},
		
	})
}
