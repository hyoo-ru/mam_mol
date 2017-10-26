namespace $ {

	export class $mol_rpc_server extends $mol_object {

		@ $mol_mem
		listener() {
			return new this.$.$mol_dom_listener(
				this.$.$mol_dom_context ,
				'message' ,
				( event : MessageEvent )=> this.handle( event.data ) ,
			)
		}

		handle( { id , name , args } : { id : string , name : string , args : any[] } ) {
			const handler = this.handlers()[ name ] || this.handlers()[ '' ]
			if( !handler ) return

			new $mol_atom( 'handle' , ()=> handler( ... args ) )
			.then(
				result => {
					this.$.$mol_dom_context.parent.postMessage( { id , result } , '*' )
				} ,
				error => {
					this.$.$mol_dom_context.parent.postMessage( { id , error : error.message } , '*' )
				} ,
			)
		}

		handlers() {
			return {}
		}

	}

}
