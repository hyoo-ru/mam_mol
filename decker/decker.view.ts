module $.$mol {
	export class $mol_decker extends $.$mol_decker {
		
		@ $mol_prop()
		current( ...diff : string[] ) {
			return this.session( 'value()' , ...diff ) || '0'
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
