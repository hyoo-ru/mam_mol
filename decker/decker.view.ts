module $.$mol {
	export class $mol_decker extends $.$mol_decker {
		
		current( next? : string ) {
			return $mol_state_session.value( this.objectPath() + '.current()' , next ) || '0'
		}
		
		switcherOptions() {
			let options : { [ key : string ] : ()=> string } = {}
			this.items().forEach( ( item , index ) => {
				options[ String( index ) ] = ()=> item.title()
			} )
			return options
		}
		
		@ $mol_mem()
		content() {
			return (<any>this.items())[ this.current() ].content()
		}
		
	}
}
