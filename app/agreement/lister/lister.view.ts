module $.$mol {
	export class $mol_app_agreement_lister extends $.$mol_app_agreement_lister {
		
		requests() {
			return [] as $mol_app_agreement_request[]
		}
		
		@ $mol_prop()
		requestRows() {
			return this.requests().map( ( request  , id ) => this.requestRow( id ) )
		}
		
		@ $mol_prop()
		requestRow( id : number ) {
			return new $mol_app_agreement_carder().setup( obj => {
				obj.request = ()=> this.requests()[ id ]
			} )
		}
		
	}
}
