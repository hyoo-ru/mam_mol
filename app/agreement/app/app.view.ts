module $.$mol {
	export class $mol_app_agreement_app extends $.$mol_app_agreement_app {
		
		main() {
			if( !this.supplyCurrent() ) return null
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
		
		supplyCurrent() {
			var id = this.argument().value( 'supply' )
			return id && this.domain().supply( id )
		}
		
	}
}
