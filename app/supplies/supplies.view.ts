module $.$mol {
	export class $mol_app_supplies extends $.$mol_app_supplies {
		
		entered( ...diff : boolean[] ) {
			return $mol_state_session.value( this.objectPath() + '.entered()' , ...diff ) || false
		}

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
		
		title() {
			return ( this.main() || this.addon() ).title()
		}
		
		@ $mol_prop()
		domain() {
			return new $mol_app_supplies_domain_mock()
		}

		supplies() {
			return this.domain().supplies()
		}

		supplyId( ...diff : string[] ) {
			return $mol_state_arg.value( this.stateKey( 'supply' ) , ...diff )
		}

		supply() {
			if( !this.entered() ) return null
			var id = this.supplyId()
			return id ? this.domain().supply( id ) : null
		}

	}
}
