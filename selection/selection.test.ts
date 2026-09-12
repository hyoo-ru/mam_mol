namespace $ {

	function rows( $: $, count: number ) {
		return Array.from( { length: count }, ( _, index )=> $mol_view.make({
			$,
			minimal_height: ()=> 30,
			sub: ()=> [ `row ${ index }` ],
		}) )
	}

	class $mol_selection_test_host extends $mol_list {

		text() {
			return ''
		}

		@ $mol_mem
		Selection() {
			return $mol_selection.make({ $: this.$, text: ()=> this.text() })
		}

		override plugins() {
			return [ this.Selection() ]
		}

	}

	function copy( $: $, node: Element ) {
		const data = {} as Record< string, string >
		const event = Object.assign(
			new $.$mol_dom_context.Event( 'copy', { bubbles: true, cancelable: true } ),
			{ clipboardData: { setData: ( type: string, text: string )=> { data[ type ] = text } } },
		)
		node.dispatchEvent( event )
		return { data, prevented: event.defaultPrevented }
	}

	$mol_test({

		'select all selects the owner without rendering every row'( $ ) {

			const doc = $.$mol_dom_context.document
			const host = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 200 ) ) })
			doc.body.appendChild( host.dom_tree() )

			host.Selection().select_all()

			$mol_assert_like( $.$mol_selection.root(), host.dom_node() )
			$mol_assert_like( doc.getSelection()!.anchorNode, host.dom_node() )
			$mol_assert_ok( host.view_window()[1] < 200 )

			$.$mol_selection.root( null )
			host.destructor()
			doc.body.innerHTML = ''
		},

		'copy puts the source text into the clipboard while the owner is selected'( $ ) {

			const doc = $.$mol_dom_context.document
			const host = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 200 ) ), text: ()=> 'source' })
			doc.body.appendChild( host.dom_tree() )

			host.Selection().select_all()
			const copied = copy( $, host.dom_node() )

			$mol_assert_equal( copied.data[ 'text/plain' ], 'source' )
			$mol_assert_ok( copied.prevented )

			$.$mol_selection.root( null )
			host.destructor()
			doc.body.innerHTML = ''
		},

		'copy is left to the browser for a partial selection or an empty source'( $ ) {

			const doc = $.$mol_dom_context.document
			const host = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 3 ) ), text: ()=> 'source' })
			doc.body.appendChild( host.dom_tree() )

			$mol_assert_not( copy( $, host.dom_node() ).prevented )

			const empty = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 3 ) ) })
			doc.body.appendChild( empty.dom_tree() )
			empty.Selection().select_all()

			$mol_assert_not( copy( $, empty.dom_node() ).prevented )

			$.$mol_selection.root( null )
			host.destructor()
			empty.destructor()
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
