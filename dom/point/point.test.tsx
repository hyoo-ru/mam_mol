/** @jsx $mol_jsx */
namespace $.$$ {
	$mol_test({
		
		"Head"( $ ) {

			const div = <div>foo</div>

			$mol_assert_equal(
				$mol_dom_point.head( div ),
				new $mol_dom_point( div, 0 ),
			)
			
			$mol_assert_equal(
				$mol_dom_point.head( div ).is_head(),
				true,
			)

			$mol_assert_equal(
				new $mol_dom_point( div.firstChild!, 1 ).is_head(),
				false,
			)

		},
		
		"Foot"( $ ) {

			const div = <div>foo</div>

			$mol_assert_equal(
				$mol_dom_point.foot( div ),
				new $mol_dom_point( div, 1 ),
				$mol_dom_point.tail( div.firstChild! ),
			)
			
			$mol_assert_equal(
				$mol_dom_point.foot( div ).is_foot(),
				true,
			)

			$mol_assert_equal(
				new $mol_dom_point( div.firstChild!, 2 ).is_foot(),
				false,
			)

		},
		
		"Near & jump"( $ ) {

			const div = <div>123<span>foo</span>456</div>
			const span = div.childNodes[1]

			$mol_assert_equal(
				new $mol_dom_point( div, 1 ),
				$mol_dom_point.near( span, -1 ),
				new $mol_dom_point( span, 1 ).jump(-1),
			)
			
			$mol_assert_equal(
				new $mol_dom_point( div, 2 ),
				$mol_dom_point.near( span, +1 ),
				new $mol_dom_point( span, 1 ).jump(+1),
			)
			
		},
		
		"move by steps to the end"( $ ) {

			const div = <div>1<span>23</span><br/>4</div>
			const span = div.childNodes[1]
			const br = div.childNodes[2]

			let cursor = $mol_dom_point.head( div )

			$mol_assert_equal([
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
				cursor = cursor.move_step(+1)!,
			], [
				$mol_dom_point.head( div.firstChild! ),
				$mol_dom_point.foot( div.firstChild! ),
				$mol_dom_point.tail( div.firstChild! ),
				$mol_dom_point.head( span ),
				$mol_dom_point.head( span.firstChild! ),
				new $mol_dom_point( span.firstChild!, 1 ),
				$mol_dom_point.foot( span.firstChild! ),
				$mol_dom_point.tail( span.firstChild! ),
				$mol_dom_point.tail( span ),
				$mol_dom_point.head( br ),
				$mol_dom_point.tail( br ),
				$mol_dom_point.head( div.lastChild! ),
				$mol_dom_point.foot( div.lastChild! ),
				$mol_dom_point.tail( div.lastChild! ),
				null,
			] )
			
		},
		
		"move by chars to the end"( $ ) {

			const div = <div>1<span>23</span><br/>4</div>
			const span = div.childNodes[1]
			const br = div.childNodes[2]

			let start = $mol_dom_point.head( div )

			$mol_assert_equal([
				start.move_chars( div, +0 )!,
				start.move_chars( div, +1 )!,
				start.move_chars( div, +2 )!,
				start.move_chars( div, +3 )!,
				start.move_chars( div, +4 )!,
				start.move_chars( div, +5 )!,
			], [
				$mol_dom_point.head( div.firstChild! ),
				$mol_dom_point.foot( div.firstChild! ),
				new $mol_dom_point( span.firstChild!, 1 ),
				$mol_dom_point.foot( span.firstChild! ),
				$mol_dom_point.foot( div.lastChild! ),
				$mol_dom_point.foot( div ),
			] )
			
		},
		
	})
}
