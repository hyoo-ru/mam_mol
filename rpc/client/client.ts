namespace $ {
	export class $mol_rpc_client< Handlers extends Record<string, (...args: unknown[]) => unknown>> extends $mol_object {
		@ $mol_action
		protected create_id() {
			return `$mol_rpc_client:${this.$.$mol_guid()}:${ Date.now().toString(16) }`
		}

		call_async(id: string) {
			return new Promise<unknown>( ( done , fail )=> {
				const timer = setTimeout(
					() => handle({ data: { id, error: 'RPC call timeout' } }),
					this.timeout()
				)

				const handle = ( event : { data: unknown } )=> {
					const data = event.data as { id?: string, error?: string, result?: string }
					if (! data || typeof data !== 'object') return
					if( data.id !== id ) return

					clearTimeout(timer)

					this.$.$mol_dom_context.removeEventListener( 'message' , handle )
					
					if( data.error ) fail( new Error( data.error ) )
					else done( data.result )
				}

				this.$.$mol_dom_context.addEventListener( 'message' , handle )
			} )
		}

		@ $mol_action
		post_message(request: { id: string, name: string, args: unknown[] }) {
			return null
		}

		@ $mol_action
		call( request : { name : string , args : unknown[] } ) {
			const id = this.create_id()
			this.post_message({ ...request, id })
			return $mol_wire_sync(this).call_async(id)
		}

		timeout() { return 10000 }

		@ $mol_mem
		proxy() {
			return new Proxy( {} as Handlers, {
				get : ( target : unknown , name : string )=> {
					return ( ... args : unknown[] )=> this.call({ name , args })
				}
			} )
		}


	}
}
