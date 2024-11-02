namespace $ {
	export class $mol_service_channel extends $mol_object {
		protected channel = new MessageChannel()

		timeout() { return 20000 }

		out() { return this.channel.port2 }

		result() { return $mol_wire_sync(this).result_async() }

		result_async() {
			return new Promise<unknown>((resolve, reject) => {
				const channel = this.channel

				const handler = setTimeout(
					() => reject(new Error('Channel timeout', { cause: channel })),
					this.timeout()
				)

				this.destructor = () => {
					clearTimeout(handler)
					reject(new Error('Channel cancelled'))
				}

				channel.port1.onmessage = event => {
					clearTimeout(handler)
					const data = event.data
					const result = data?.result
					const error = data?.error

					if (result) {
						if (error) console.warn('Message result+error:', error)
						resolve(result)
						return
					}

					if (! error) return resolve(result ?? null)

					reject(new Error(error, { cause: event }))
				}
	
				channel.port1.onmessageerror = event => {
					clearTimeout(handler)
					reject(new Error('Message fatal error: ' + event.data, { cause: event }))
				}
			})
		}
	}
}
