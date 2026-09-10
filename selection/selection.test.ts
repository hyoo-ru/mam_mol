namespace $ {

	function rows( $: $, count: number ) {
		return Array.from( { length: count }, ( _, index )=> $mol_view.make({
			$,
			minimal_height: ()=> 30,
			sub: ()=> [ `row ${ index }` ],
		}) )
	}

	class $mol_selection_test_host extends $mol_list {

		@ $mol_mem
		Selection() {
			return $mol_selection.make({ $: this.$ })
		}

		override plugins() {
			return [ this.Selection() ]
		}

	}

	$mol_test({

		'lists render every row inside the root'( $ ) {

			const list = $mol_list.make({ $, rows: $mol_const( rows( $, 200 ) ) })
			list.dom_tree()
			$mol_assert_ok( list.view_window()[1] < 200 )

			$.$mol_selection.root( list.dom_node() )
			$mol_assert_like( list.view_window(), [ 0, 200 ] )

			$.$mol_selection.root( null )
			$mol_assert_ok( list.view_window()[1] <= 200 )

			list.destructor()
		},

		'select all covers rows that were not rendered'( $ ) {

			const doc = $.$mol_dom_context.document
			const host = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 200 ) ) })
			doc.body.appendChild( host.dom_tree() )
			$mol_assert_ok( host.view_window()[1] < 200 )

			host.Selection().select_all()

			$mol_assert_like( host.view_window(), [ 0, 200 ] )
			$mol_assert_like( $.$mol_selection.root(), host.dom_node() )
			$mol_assert_ok( doc.getSelection()!.toString().includes( 'row 199' ) )

			$.$mol_selection.root( null )
			host.destructor()
			doc.body.innerHTML = ''
		},

		'Ctrl+A is handled only around the caret'( $ ) {

			const doc = $.$mol_dom_context.document
			const host = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 3 ) ) })
			doc.body.appendChild( host.dom_tree() )
			const outside = doc.body.appendChild( doc.createElement( 'p' ) )
			outside.textContent = 'outside'

			const press = ()=> {
				const event = new $.$mol_dom_context.KeyboardEvent( 'keydown', { code: 'KeyA', ctrlKey: true, bubbles: true, cancelable: true } )
				doc.dispatchEvent( event )
				return event.defaultPrevented
			}

			doc.getSelection()!.collapse( outside.firstChild, 0 )
			$mol_assert_not( press() )

			doc.getSelection()!.collapse( host.dom_node().firstChild, 0 )
			$mol_assert_ok( press() )

			$.$mol_selection.root( null )
			host.destructor()
			doc.body.innerHTML = ''
		},

	})

}
