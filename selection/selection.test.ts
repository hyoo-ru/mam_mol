namespace $ {

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

	$mol_test({

		'Ctrl+A around the caret copies the owner source text'( $ ) {

			const doc = $.$mol_dom_context.document
			const written = [] as string[]
			Object.defineProperty( $.$mol_dom_context.navigator, 'clipboard', {
				value: { writeText: ( text: string )=> { written.push( text ) } },
				configurable: true,
			})

			const row = ()=> [ $mol_view.make({ $, sub: ()=> [ 'row' ] }) ]
			const host = $mol_selection_test_host.make({ $, rows: row, text: ()=> 'source' })
			const empty = $mol_selection_test_host.make({ $, rows: row })
			doc.body.appendChild( host.dom_tree() )
			doc.body.appendChild( empty.dom_tree() )
			const outside = doc.body.appendChild( doc.createElement( 'p' ) )
			outside.textContent = 'outside'

			const press = ()=> {
				const event = new $.$mol_dom_context.KeyboardEvent( 'keydown', { code: 'KeyA', ctrlKey: true, bubbles: true, cancelable: true } )
				doc.dispatchEvent( event )
				return event.defaultPrevented
			}

			doc.getSelection()!.collapse( outside.firstChild, 0 )
			$mol_assert_equal( press(), false )

			doc.getSelection()!.collapse( host.dom_node().firstChild, 0 )
			$mol_assert_equal( press(), true )
			$mol_assert_equal( written, [ 'source' ] )

			doc.getSelection()!.collapse( empty.dom_node().firstChild, 0 )
			$mol_assert_equal( press(), false )
			$mol_assert_equal( written, [ 'source' ] )

			host.destructor()
			empty.destructor()
			doc.body.innerHTML = ''
		},

	})

}
