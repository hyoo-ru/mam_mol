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
		
		"Order range points"( $ ) {

			const div = <div>
				<span>one</span>
				<span>two</span>
			</div>
			
			const one = $mol_dom_point.head( div.firstChild! )
			const two = $mol_dom_point.head( div.lastChild! )
			
			const forward = new $mol_dom_range( one, two )
			const backward = new $mol_dom_range( two, one )

			$mol_assert_equal( forward.ordered(), backward.ordered(), forward )
			
		},
		
		"Lift to common block parent"( $ ) {

			const quote = <blockquote>
				123
				<p><span>foo</span></p>
				<p><span>bar</span></p>
				456
			</blockquote>
			
			const foo = quote.firstChild!.nextSibling!
			const bar = quote.lastChild!.previousSibling!.firstChild!.firstChild!
			
			const lifted = new $mol_dom_range(
				$mol_dom_point.head( foo ),
				$mol_dom_point.foot( bar ),
			).lifted()

			const ideal = new $mol_dom_range(
				$mol_dom_point.tail( quote.firstChild! ),
				$mol_dom_point.nose( quote.lastChild! ),
			)
			
			$mol_assert_equal( lifted, ideal )
			
		},
		
	})
}
