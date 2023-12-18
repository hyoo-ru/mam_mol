/** @jsx $mol_jsx */
/** @jsxFrag $mol_jsx_frag */
namespace $ {

	$mol_test({
		
		'same list'() {
			
			const list = <body>
				<p data-rev="old">a</p>
				<p data-rev="old">b</p>
				<p data-rev="old">c</p>
			</body>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 0,
				to: 3,
				next: 'abc',
				equal: ( next, prev )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p data-rev="new">{ next }</p>, lead ? lead.nextSibling : list.firstChild ),
				update: ( next, prev, lead )=> {
					prev.textContent = next
					prev.setAttribute( 'data-rev', 'up' )
					return prev
				},
			})
			
			$mol_assert_equal( list, <body>
				<p data-rev="old">a</p>
				<p data-rev="old">b</p>
				<p data-rev="old">c</p>
			</body> )
			
		},
		
		'insert items'() {
			
			const list = <body>
				<p data-rev="old">a</p>
				<p data-rev="old">b</p>
				<p data-rev="old">c</p>
				<p data-rev="old">d</p>
			</body>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 1,
				to: 3,
				next: 'bXYc',
				equal: ( next, prev )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p data-rev="new">{ next }</p>, lead ? lead.nextSibling : list.firstChild ),
				update: ( next, prev, lead )=> {
					prev.textContent = next
					prev.setAttribute( 'data-rev', 'up' )
					return prev
				},
			})
			
			$mol_assert_equal( list, <body>
				<p data-rev="old">a</p>
				<p data-rev="old">b</p>
				<p data-rev="new">X</p>
				<p data-rev="new">Y</p>
				<p data-rev="old">c</p>
				<p data-rev="old">d</p>
			</body> )
			
		},
		
		'split item'() {
			
			const list = <body>
				<p data-rev="old">a</p>
				<p data-rev="old">bc</p>
				<p data-rev="old">d</p>
			</body>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 0,
				to: 3,
				next: 'abcd',
				equal: ( next, prev )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p data-rev="new">{ next }</p>, lead ? lead.nextSibling : list.firstChild ),
				update: ( next, prev, lead )=> {
					prev.textContent = next
					prev.setAttribute( 'data-rev', 'up' )
					return prev
				},
			})
			
			$mol_assert_equal( list, <body>
				<p data-rev="old">a</p>
				<p data-rev="new">b</p>
				<p data-rev="up">c</p>
				<p data-rev="old">d</p>
			</body> )
			
		},
		
		'drop items'() {
			
			const list = <body>
				<p data-rev="old">A</p>
				<p data-rev="old">B</p>
				<p data-rev="old">x</p>
				<p data-rev="old">y</p>
				<p data-rev="old">C</p>
				<p data-rev="old">D</p>
			</body>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 1,
				to: 5,
				next: 'BC',
				equal: ( next, prev )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p data-rev="new">{ next }</p>, lead ? lead.nextSibling : list.firstChild ),
				update: ( next, prev, lead )=> {
					prev.textContent = next
					prev.setAttribute( 'data-rev', 'up' )
					return prev
				},
			})
			
			$mol_assert_equal( list, <body>
				<p data-rev="old">A</p>
				<p data-rev="old">B</p>
				<p data-rev="old">C</p>
				<p data-rev="old">D</p>
			</body> )
			
		},
		
		'update items'() {
			
			const list = <body>
				<p data-rev="old">a</p>
				<p data-rev="old">B</p>
				<p data-rev="old">C</p>
				<p data-rev="old">d</p>
			</body>
			
			$mol_reconcile({
				prev: [ ... list.children ],
				from: 1,
				to: 3,
				next: 'XY',
				equal: ( next, prev )=> prev.textContent === next,
				drop: ( prev, lead )=> list.removeChild( prev ),
				insert: ( next, lead )=> list.insertBefore( <p data-rev="new">{ next }</p>, lead ? lead.nextSibling : list.firstChild ),
				update: ( next, prev, lead )=> {
					prev.textContent = next
					prev.setAttribute( 'data-rev', 'up' )
					return prev
				},
			})
			
			$mol_assert_equal( list, <body>
				<p data-rev="old">a</p>
				<p data-rev="up">X</p>
				<p data-rev="up">Y</p>
				<p data-rev="old">d</p>
			</body> )
			
		},
		
	})
}
