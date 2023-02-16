namespace $.$$ {
	type Confirmations = keyof ReturnType<typeof $.$mol_pick_demo.prototype.confirmation_popup_content>

	export class $mol_pick_demo extends $.$mol_pick_demo {

		override menu_item_download_blob() {
			
			const data = {
				foo: 'bar',
				arr: [ 1, 2, 3 ]
			}
			
			const text = JSON.stringify( data, null, '\t' )

			return new $mol_blob( [ text ], { type: 'text/json' } )

		}

		hide_options_menu() {
			this.Options_pop().focused( false )
		}

		show_confirmation( confirmation: Confirmations ) {
			this.showed_confirmation( confirmation )
			this.Options_pop().focused( true )
		}

		/** Current showed confirmation dialog name */
		@ $mol_mem
		override showed_confirmation( next?: Confirmations | null ) {
			// Reset showed_confirmation after menu hide
			this.Options_pop().showed()
			
			return next !== undefined ? next : null
		}

		@ $mol_mem
		override options_bubble_content() {
			const showed_confirmation = this.showed_confirmation()

			if ( showed_confirmation !== null ) {
				return [ this.confirmation_popup_content()[ showed_confirmation ] ]
			} else {
				return super.options_bubble_content()
			}
		}

		override menu_item_copy_click( event?: MouseEvent ) {
			this.hide_options_menu()
			event?.preventDefault()
		}

		override menu_item_delete_click( event?: MouseEvent ) {
			this.show_confirmation( 'delete' )
			event?.preventDefault()
		}

		override delete_confirm_click( event?: MouseEvent ) {
			this.hide_options_menu()
			event?.preventDefault()
		}

		override delete_cancel_click( event?: MouseEvent ) {
			this.hide_options_menu()
			event?.preventDefault()
		}

	}
}
