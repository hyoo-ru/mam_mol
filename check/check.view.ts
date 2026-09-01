namespace $.$$ {

	/**
	 * Checkbox UI component. See Variants for more concrete implementations.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_check_box_demo
	 */
	export class $mol_check extends $.$mol_check {

		click( next? : Event ) {
			const event = next ? $mol_dom_event.wrap(next) : null
			if( event?.prevented() ) return
			event?.prevented(true)
			this.checked( !this.checked() )
		}

		sub() {
			return [
				... $mol_maybe( this.Icon() ) ,
				... this.label() ,
			] as readonly $mol_view_content[]
		}

		label() {
			return this.title() ? super.label() : []
		}
		
		aria_checked() {
			return String( this.checked() )
		}

	}
}
