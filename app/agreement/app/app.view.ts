module $.$mol {
	export class $mol_app_agreement_app extends $.$mol_app_agreement_app {

		childs() {
			return [
				this.entered()
					? this.mainer()
					: null ,
				this.addoner()
			]
		}
		
		main() {
			return this.supply()
				? this.detailer()
				: null
		}

		addon() {
			return this.entered()
				? this.lister()
				: this.enter()
		}
		
		@ $mol_prop()
		domain() {
			return new $mol_app_agreement_domain_mock()
		}

		supplies() {
			return this.domain().supplies()
		}

		supplyId( ...diff : string[] ) {
			var next = this.argument().value( 'supply' , ...diff )
			return next && String( next )
		}

		supply() {
			if( !this.entered() ) return null
			var id = this.supplyId()
			return id ? this.domain().supply( id ) : null
		}

	}
}
