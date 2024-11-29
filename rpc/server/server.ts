namespace $ {

	export class $mol_rpc_server<Message extends Event & { data: any }> extends $mol_object {
		@ $mol_mem
		listener() {
			return new this.$.$mol_dom_listener<Message>(
				this.$.$mol_dom_context ,
				'message' ,
				event => this.request(event) ? this.message(event) : null
			)
		}

		protected message(event: Message) { }

		handlers(): Record<string, (...args: unknown[]) => unknown> {
			return {} 
		}

		request(event: Message) {
			return event.data && typeof event.data === 'object' && 'id' in event.data
				? event.data as { id : string , name : string , args : readonly unknown[] }
				: null
		}

		@ $mol_action
		response(event: Message) {
			const { id, name, args } = this.request(event)!

			const response = { id, result: undefined as unknown, error: undefined as Error | undefined }

			try {
				const handler = this.handlers()[ name ] || this.handlers()[ '' ]

				if( ! handler ) throw new Error('No handler ' + name)
				response.result = handler( ... args )
			} catch( err ) {
				if ( $mol_fail_catch(err) ) response.error = err
			}

			return response
		}

	}

}
