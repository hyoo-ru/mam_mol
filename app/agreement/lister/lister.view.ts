module $.$mol {
	export class $mol_app_agreement_lister extends $.$mol_app_agreement_lister {
		
		requests() {
			return [] as $mol_app_agreement_supply[]
		}
		
		@ $mol_prop()
		supplyRows() {
			return this.supplies().map( ( supply , index ) => this.supplyRow( index ) )
		}
		
		@ $mol_prop()
		supplyRow( index : number ) {
			return new $mol_app_agreement_carder().setup( obj => {
				obj.supply = ()=> this.supplies()[ index ]
				obj.patch = ()=> ({
					supply : this.supplies()[ index ].id()
				})
			} )
		}
		
	}
}
