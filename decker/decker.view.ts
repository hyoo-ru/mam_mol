module $.$mol {
	export class $mol_decker extends $.$mol_decker {
		
		current( ...diff : string[] ) {
			return $mol_state_session.value( this.objectPath() + '.current()' , ...diff ) || '0'
		}
		
		switcherOptions() {
			let options : { [ key : string ] : ()=> string } = {}
			this.items().forEach( ( item , index ) => {
				options[ String( index ) ] = ()=> item.title()
			} )
			return options
		}
		
		@ $mol_prop()
		content() {
			return this.items()[ this.current() ].content()
		}
		
	}
}
