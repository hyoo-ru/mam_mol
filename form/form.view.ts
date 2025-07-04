namespace $.$$ {

	/**
	 * Form, that contains form fields and action buttons.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_form_demo
	 */
	export class $mol_form extends $.$mol_form {
		
		@ $mol_mem
		form_fields() {
			return [ ... this.view_find( view => view instanceof $mol_form_field ) ]
				.map( path => path[ path.length - 1 ]  ) as any as readonly $mol_form_field[]
		}
		
		@ $mol_mem
		submit_allowed() {
			return this.form_fields().every( field => !field.bid() )
		}

		submit_blocked( ) {
			return !this.submit_allowed()
		}
		
		keydown( next : KeyboardEvent ) {
			if( next.ctrlKey && next.keyCode === $mol_keyboard_code.enter && !this.submit_blocked() ) this.submit( next )
		}
		
	}
}
