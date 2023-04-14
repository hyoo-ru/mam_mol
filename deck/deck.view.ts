namespace $.$$ {
	
	/**
	 * The component which arrange content in multiple tabs.
	 * @seehttps://mol.hyoo.ru/#!section=demos/demo=mol_deck_demo
	 */
	export class $mol_deck extends $.$mol_deck {
		
		current( next? : string ) {
			return $mol_state_session.value( `${ this }.current()` , next ) || '0'
		}
		
		switch_options() {
			let options : Record< string , string > = {}
			this.items().forEach( ( item , index ) => {
				options[ String( index ) ] = item.title()
			} )
			return options
		}
		
		@ $mol_mem
		Content() {
			return this.items()[ Number( this.current() ) ]
		}
		
	}
}
