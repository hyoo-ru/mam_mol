namespace $.$$ {
	export class $mol_string extends $.$mol_string {
		
		// _timer = null as any
		
		event_change( next? : Event ) {
			if( !next ) return
			this.value( ( next.target as HTMLInputElement ).value )
			this.selection_change( next )
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
				event => this.selection_change( event ),
			)
		}
		
		selection_change( event: Event ) {
			const el = this.dom_node() as HTMLInputElement
			this.selection_start( el.selectionStart )
			this.selection_end( el.selectionEnd )
		}

	}
}
