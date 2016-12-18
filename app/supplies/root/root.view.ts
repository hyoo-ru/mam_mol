namespace $.$mol {
	export class $mol_app_supplies_root extends $.$mol_app_supplies_root {
		
		entered( next? : boolean ) {
			return $mol_state_session.value( `${ this }.entered()` , next ) || false
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
				? [ this.detailer() ]
				: []
		}

		addon() {
			return this.entered()
				? [ this.lister() ]
				: [ this.enter() ]
		}
		
		title() {
			return ( this.main()[0] || this.addon()[0] ).title()
		}
		
		@ $mol_mem()
		domain() {
			return new $mol_app_supplies_domain_mock()
		}

		supplies() {
			return this.domain().supplies()
		}

		supplyId( next? : string ) {
			return $mol_state_arg.value( this.stateKey( 'supply' ) , next )
		}
		
		@ $mol_mem()
		searchQuery( next? : string ) {
			if( !next ) return ''
			if( next.length < 7 ) return next
			this.supplyId( next )
			return ''
		}

		supply() {
			if( !this.entered() ) return null
			var id = this.supplyId()
			return id ? this.domain().supply( id ) : null
		}

	}
}
