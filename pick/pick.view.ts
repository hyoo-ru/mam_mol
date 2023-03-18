namespace $.$$ {

	/**
	 * Pop-up display and hide by mouse click, also hide by unfocus.
	 * Based on [mol_pop](https://mol.hyoo.ru/#!section=demos/demo=mol_pop_demo) component.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_pick_demo
	 */
	export class $mol_pick extends $.$mol_pick {
		
		keydown( event : KeyboardEvent ) {
			
			if( !this.trigger_enabled() ) return

			if( event.defaultPrevented ) return 
			
			if( event.keyCode === $mol_keyboard_code.escape ) {
				if( !this.showed() ) return
				event.preventDefault()
				this.showed( false )
			}
			
		}
		
	}
}
