namespace $ {
	/**
	 * Со стороны
	 */
	export class $mol_service_worker extends $mol_object {
		static path() { return 'web.js' }

		static send_timeout() { return 20000 }

		protected static post_message(data: {}) {
		}

		@ $mol_mem
		protected static rpc() {
			$mol_wire_solid()

			const rpc = this.$.$mol_rpc_client.make<typeof $mol_rpc_client<{}>>({
				timeout: () => this.send_timeout(),
				post_message: request => this.post_message(request) ?? null
			})

			return new Proxy({} as typeof $mol_service_plugin, {
				get: (t, klass) => {
					return new Proxy({} as any, {
						get: (t, method) => {
							return (...args: unknown[]) => rpc.call({
								name: `${klass as string}.${method as string}`,
								args
							})
						}
					})
				}
			})
		}

		@ $mol_mem
		static init() {
			try {
				this.state()
				// this.rpc()
			} catch (error) {
				$mol_fail_log( error )
			}
		}

		static state() {
			return 'installing' as 'activated' | 'activating' | 'installed' | 'installing' | 'parsed' | 'redundant'
		}

		static claim() {}

		static blocked_response() {
			return new Response(
				null,
				{
					status: 418,
					statusText: 'Blocked'
				},
			)
		}
	}

}
