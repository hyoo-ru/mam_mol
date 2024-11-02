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
					const message = data?.error ?? (data?.result ? null : 'empty data')
					if (message) return reject(new Error(message, { cause: event }))
	
					resolve(event.data.result)
				}
	
				channel.port1.onmessageerror = event => {
					clearTimeout(handler)
					reject(new Error('Can\'t be deserialized: ' + event.data, { cause: event }))
				}
			})
		}
	}
}
