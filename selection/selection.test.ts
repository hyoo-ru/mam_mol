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

	function press( $: $ ) {
		const event = new $.$mol_dom_context.KeyboardEvent( 'keydown', { code: 'KeyA', ctrlKey: true, bubbles: true, cancelable: true } )
		$.$mol_dom_context.document.dispatchEvent( event )
		return event.defaultPrevented
	}

	function copy( $: $, node: Element ) {
		const data = {} as Record< string, string >
		const event = Object.assign(
			new $.$mol_dom_context.Event( 'copy', { bubbles: true, cancelable: true } ),
			{ clipboardData: { setData: ( type: string, text: string )=> { data[ type ] = text } } },
		)
		node.dispatchEvent( event )
		return event.defaultPrevented ? data[ 'text/plain' ] : null
	}

	$mol_test({

		'Ctrl+A around the caret selects the whole owner without rendering it'( $ ) {

			const doc = $.$mol_dom_context.document
			const host = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 200 ) ) })
			doc.body.appendChild( host.dom_tree() )
			const outside = doc.body.appendChild( doc.createElement( 'p' ) )
			outside.textContent = 'outside'

			doc.getSelection()!.collapse( outside.firstChild, 0 )
			$mol_assert_not( press( $ ) )

			doc.getSelection()!.collapse( host.dom_node().firstChild, 0 )
			$mol_assert_ok( press( $ ) )
			$mol_assert_equal( doc.getSelection()!.anchorNode, host.dom_node() )
			$mol_assert_ok( host.view_window()[1] < 200 )

			host.destructor()
			doc.body.innerHTML = ''
		},

		'copy takes the source text only while the whole owner is selected'( $ ) {

			const doc = $.$mol_dom_context.document
			const host = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 3 ) ), text: ()=> 'source' })
			const empty = $mol_selection_test_host.make({ $, rows: $mol_const( rows( $, 3 ) ) })
			doc.body.appendChild( host.dom_tree() )
			doc.body.appendChild( empty.dom_tree() )

			host.Selection().select_all()
			$mol_assert_equal( copy( $, host.dom_node() ), 'source' )

			doc.getSelection()!.collapse( host.dom_node().firstChild, 0 )
			$mol_assert_equal( copy( $, host.dom_node() ), null )

			empty.Selection().select_all()
			$mol_assert_equal( copy( $, empty.dom_node() ), null )

			host.destructor()
			empty.destructor()
			doc.body.innerHTML = ''
		},

	})

}
