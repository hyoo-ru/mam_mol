namespace $ {
	export class $mol_rpc_worker<
		Remote_handlers extends $mol_rpc_handlers = $mol_rpc_handlers,
	> extends $mol_rpc<Remote_handlers> {
		static is_main() {
			return this.threads().isMainThread
		}

		static threads() {
			return $node['node:worker_threads'] as typeof import('node:worker_threads')
		}

		threads() { return this.$.$mol_rpc_worker.threads() }

		uri() { return '' }

		options() {
			return {} as import('node:worker_threads').WorkerOptions
		}

		worker_data() {
			return this.threads().workerData as unknown
		}

		worker() {
			const { Worker } = this.threads()

			let destructing = false

			const destructor = () => {
				if (destructing) return
				destructing = true
				worker.terminate().catch(e => this.$.$mol_fail_log(e))
			}

			const worker = Object.assign(new Worker(this.uri(), this.options()), { destructor })

			let inited = false

			return new Promise<typeof worker>((done, fail) => {

				worker.on('error', (err: Error & { code?: string }) => {
					if (destructing) return
					if ( ! inited) return fail(err)

					this.$.$mol_fail_log(err)
					this.error([ err ])
					this.restarts(null)
				})

				worker.on('exit', code => {
					if (destructing) return
					destructing = true
					const err = new Error('Worker exited', { cause: { code }})
					if (! inited) return fail(err)
					this.error([ err ]) // Need to reset callers fail callbacks
					this.restarts(null)
				})
	
				worker.on('message', e => {
					if (destructing) return
					if (! inited) done(worker)
					inited = true
					this.receive(e)
				})

			})
		}

		@ $mol_mem
		restarts(next?: null): number {
			return 1 + ($mol_wire_probe(() => this.restarts()) ?? -1)
		}

		@ $mol_mem
		protected override target() {
			this.restarts()
			const parent = this.threads().parentPort
			const worker = parent ? null : $mol_wire_sync(this).worker()

			const cb = (e: Event) => this.receive(e)
			parent?.on('message', cb)

			const destructor = () => {
				worker?.destructor()
				parent?.off('message', cb)
			}

			const send = (payload: $mol_rpc_payload) => {
				(parent ?? worker)?.postMessage(payload, [ payload[2] as any ])
			}

			return { send, destructor }
		}

		override toString() {
			return `${this.threads().isMainThread ? 'main' : 'thread'} ${super.toString()}`
		}

		receive(data: unknown) {
			if (! Array.isArray(data) ) return
			if ( data.length !== 3) return

			const [ name, args, sender ] = data

			if (typeof name !== 'string') return
			if ( ! (sender instanceof MessagePort) ) return

			this.handle_async([ name, args, sender ])
		}

	}
}
