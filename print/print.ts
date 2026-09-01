namespace $ {

	export class $mol_print extends $mol_object {

		@ $mol_mem
		static before() {
			return new $mol_dom_listener( this.$.$mol_dom_context , 'beforeprint' , ()=> {
				this.active( true )
			} )
		}

		@ $mol_mem
		static after() {
			return new $mol_dom_listener( this.$.$mol_dom_context , 'afterprint' , ()=> {
				this.active( false )
			} )
		}

		@ $mol_mem
		static active( next? : boolean ) {
			this.before()
			this.after()
			return next || false
		}

	}

}
