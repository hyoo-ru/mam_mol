namespace $.$$ {
	/**
	 * An input field for entering single line text.
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_string_demo
	 */
	export class $mol_string extends $.$mol_string {
		
		@ $mol_action
		event_change( next? : Event ) {
			if( !next ) return
			const el = next.target as HTMLInputElement
			const from = el.selectionStart
			const to = el.selectionEnd
			try {
				el.value = this.value_changed( el.value )
			} catch( error ) {
				const el = this.dom_node() as HTMLInputElement
				if( error instanceof Error ) {
					el.setCustomValidity( error.message )
					el.reportValidity()
				}
				$mol_fail_hidden( error )
			}
			if( to === null ) return 
			el.selectionEnd = to
			el.selectionStart = from
			this.selection_change( next )
		}
		
		@ $mol_mem
		error_report() {
			try {
				if( this.focused() ) this.value()
			} catch( error ) {
				const el = this.dom_node() as HTMLInputElement
				if( error instanceof Error ) {
					el.setCustomValidity( error.message )
					el.reportValidity()
				}
			}
		}

		hint_visible() {
			return ( this.enabled() ? this.hint() : '' ) || ' '
		}

		disabled() {
			return !this.enabled()
		}

		autocomplete_native() {
			return this.autocomplete() ? 'on' : 'off'
		}
		
		@ $mol_mem
		selection_watcher() {
			return new $mol_dom_listener(
				this.$.$mol_dom_context.document,
				'selectionchange',
				$mol_wire_async( event => this.selection_change( event ) ),
			)
		}
		
		selection_change( event: Event ) {
			
			const el = this.dom_node() as HTMLInputElement
			if( el !== this.$.$mol_dom_context.document.activeElement ) return
			
			const [ from, to ] = this.selection([
				el.selectionStart!,
				el.selectionEnd!,
			])
			
			el.selectionEnd = to
			el.selectionStart = from

			if( to !== from && el.selectionEnd === el.selectionStart ) {
				el.selectionEnd = to
			}
			
		}
		
		selection_start() {
			const el = this.dom_node() as HTMLInputElement
			if( el.selectionStart === null ) return undefined as any as number
			return this.selection()[0]
		}

		selection_end() {
			const el = this.dom_node() as HTMLInputElement
			if( el.selectionEnd === null ) return undefined as any as number
			return this.selection()[1]
		}

	}
}
