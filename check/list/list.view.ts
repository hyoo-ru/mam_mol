namespace $.$$ {
	
	export class $mol_check_list extends $.$mol_check_list {

		options() : { [ key : string ] : string } {
			return {}
		}

		@ $mol_mem
		keys(): readonly string[] {
			return Object.keys( this.options() )
		}

		@ $mol_mem
		items() {
			return this.keys().map( key => this.Option( key ) )
		}
		
		option_title( key : string ) {
			return this.options()[key] || key
		}
		
	}

}
