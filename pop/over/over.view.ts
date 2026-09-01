namespace $.$$ {

	/**
	 * Bubble that can be shown anchored to Anchor element.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pop_over_demo
	 */
	export class $mol_pop_over extends $.$mol_pop_over {
		
		event_show( event? : MouseEvent ) {
			this.hovered( true )
		}
		
		event_hide( event? : MouseEvent ) {
			this.hovered( false )
		}

		showed() {
			return this.focused() || this.hovered()
		}
		
	}
}
