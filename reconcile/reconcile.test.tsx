/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
namespace $ {
	$mol_test({
		
		'same list'() {
			
			const list = <>
				<p rev-old>a</p>
				<p rev-old>b</p>
				<p rev-old>c</p>
			</>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 0,
				to: 3,
				next: 'abc',
				equal: ( prev, next )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p rev-new>{ next }</p>, lead?.nextSibling ?? list.firstChild ),
				update: ( next, prev, lead )=> ( prev.textContent = next, prev ),
			})
			
			$mol_assert_like( list, <>
				<p rev-old>a</p>
				<p rev-old>b</p>
				<p rev-old>c</p>
			</> )
			
		},
		
		'insert items'() {
			
			const list = <>
				<p rev-old>a</p>
				<p rev-old>b</p>
				<p rev-old>c</p>
				<p rev-old>d</p>
			</>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 1,
				to: 3,
				next: 'bXYc',
				equal: ( prev, next )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p rev-new>{ next }</p>, lead?.nextSibling ?? list.firstChild ),
				update: ( next, prev, lead )=> ( prev.textContent = next, prev ),
			})
			
			$mol_assert_like( list, <>
				<p rev-old>a</p>
				<p rev-old>b</p>
				<p rev-new>X</p>
				<p rev-new>Y</p>
				<p rev-old>c</p>
				<p rev-old>d</p>
			</> )
			
		},
		
		'drop items'() {
			
			const list = <>
				<p rev-old>A</p>
				<p rev-old>B</p>
				<p rev-old>x</p>
				<p rev-old>y</p>
				<p rev-old>C</p>
				<p rev-old>D</p>
			</>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 1,
				to: 5,
				next: 'BC',
				equal: ( prev, next )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p rev-new>{ next }</p>, lead?.nextSibling ?? list.firstChild ),
				update: ( next, prev, lead )=> ( prev.textContent = next, prev ),
			})
			
			$mol_assert_like( list, <>
				<p rev-old>A</p>
				<p rev-old>B</p>
				<p rev-old>C</p>
				<p rev-old>D</p>
			</> )
			
		},
		
		'update items'() {
			
			const list = <>
				<p rev-old>a</p>
				<p rev-old>B</p>
				<p rev-old>C</p>
				<p rev-old>d</p>
			</>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 1,
				to: 3,
				next: 'XY',
				equal: ( prev, next )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p rev-new>{ next }</p>, lead?.nextSibling ?? list.firstChild ),
				update: ( next, prev, lead )=> ( prev.textContent = next, prev ),
			})
			
			$mol_assert_like( list, <>
				<p rev-old>a</p>
				<p rev-old>X</p>
				<p rev-old>Y</p>
				<p rev-old>d</p>
			</> )
			
		},
		
	})
}
