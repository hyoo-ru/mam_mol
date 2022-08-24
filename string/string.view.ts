namespace $.$$ {
	export class $mol_string extends $.$mol_string {
		
		// _timer = null as any
		
		event_change( next? : Event ) {
			if( !next ) return
			this.value( ( next.target as HTMLInputElement ).value )
			this.selection_change( next )
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
			const prev = $mol_wire_probe( ()=> this.selection() ) ?? [ 0, 0 ]
			const el = this.dom_node() as HTMLInputElement
			const next = [
				el.selectionStart!,
				el.selectionEnd!,
			]
			if( $mol_compare_deep( prev, next ) ) return
			this.selection( next )
		}
		
		selection_start() {
			return this.selection()[0]
		}

		selection_end() {
			return this.selection()[1]
		}

	}
}
