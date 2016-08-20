module $.$mol {
	export class $mol_app_agreement_app extends $.$mol_app_agreement_app {
		
		main() {
			if( !this.supply() ) return null
			return super.main()
		}
		
		addon() {
			if( !this.entered() ) return this.enter()
			return super.addon()
		}
		
		@ $mol_prop()
		domain() {
			return new $mol_app_agreement_domain_mock()
		}
		
		supplies() {
			return this.domain().supplies()
		}

		supplyId( ...diff : string[] ) {
			return this.argument().value( 'supply' , ...diff )
		}
		
		supply() {
			var id = this.supplyId()
			return id ? this.domain().supply( id ) : null
		}

	}
}
