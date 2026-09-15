namespace $ {

	export type $mol_rpc_handlers = Record<string, Function>

	export type $mol_rpc_methods<Obj extends {}> = {
		[Key in keyof Obj]: Obj[Key] extends Function ? Obj[Key] : never
	}

	export type $mol_rpc_payload = [name : string , args : readonly unknown[], sender: MessagePort]

	export class $mol_rpc<
		Remote_handlers extends $mol_rpc_handlers = $mol_rpc_handlers,
	> extends $mol_object {

		handlers() {
			return {} as Record<string, Function>
		}

		handle_async(payload: $mol_rpc_payload) {
			return $mol_wire_async(this).handle(payload)
		}

		handle([ name, args, sender ]: $mol_rpc_payload) {
			let result, error

			try {
				result = this.handlers()[name](...args)
			} catch (e) {
				if ($mol_promise_like(e)) $mol_fail_hidden(e)
				this.$.$mol_fail_log(e)
				error = { message: (e as Error).message, name, args, cause: (e as Error).cause }
			}

			sender.postMessage({ result , error })
		}

		@ $mol_mem
		protected target() {
			return {
				send(payload: $mol_rpc_payload) {}
			}
		}

		protected fail_callbacks = [] as ((e: unknown) => void)[]

		@ $mol_mem
		error(next?: [Error]) {
			this.target()
			if (next === undefined) return null

			for (const callback of this.fail_callbacks) callback(next[0])
			this.fail_callbacks = []

			return next
		}

		call_async(method : string , args : readonly unknown[]) {
			const target = this.target()
			const channel = new MessageChannel()
			target.send([method, args, channel.port2 ])

			return new Promise<unknown>((done, fail) => {
				const remove_callback = () => this.fail_callbacks = this.fail_callbacks.filter(src => src !== fail)

				this.fail_callbacks.push(fail)

				channel.port1.onmessage = e => {
					remove_callback()

					const error = e.data?.error
					if (! error ) return done(e.data.result)

					fail(new Error(error.message || 'Data error', { cause: {
						method,
						args,
						error
					} }))
				}

				channel.port1.onmessageerror = event => {
					remove_callback()
					fail(new Error('Message error', { cause: { method, args, event } } ) )
				}
			})
		}

		protected call(method : string , args : readonly unknown[]) {
			return $mol_wire_sync(this).call_async(method, args)
		}

		@ $mol_mem
		remote() {
			this.target()
			return new Proxy( {} , {
				get : ( target : any , name : string ) =>
					( ... args : readonly unknown[] ) => name === 'destructor'
						? null
						: this.call(name, args)
			} ) as Remote_handlers
		}

	}

}
