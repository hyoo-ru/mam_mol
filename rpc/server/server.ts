namespace $ {

	export class $mol_rpc_server extends $mol_object {

		@ $mol_mem
		listener() {
			return new this.$.$mol_dom_listener(
				this.$.$mol_dom_context ,
				'message' ,
				$mol_fiber_root( ( event : MessageEvent )=> this.handle( event.data ) ),
			)
		}

		@ $mol_fiber.method
		handle( { id , name , args } : { id : string , name : string , args : any[] } ) {

			const handler = this.handlers()[ name ] || this.handlers()[ '' ]
			if( !handler ) return

			try {
				const result = handler( ... args )
				this.$.$mol_dom_context.parent.postMessage( { id , result } , '*' )
			} catch( error: any ) {
				if( 'then' in error ) $mol_fail_hidden( error )
				this.$.$mol_dom_context.parent.postMessage( { id , error : error.message } , '*' )
			}

		}

		handlers() {
			return {}
		}

	}

}
