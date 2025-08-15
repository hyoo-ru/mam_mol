namespace $ {
	export class $mol_file_progress extends $mol_object {
		@ $mol_mem
		processed(next?: number): number {
			return ( $mol_wire_probe(( ) => this.processed()) ?? 0) + (next ?? 0)
		}

		protected attach() { return {
			destructor() {}
		} }

		@ $mol_mem
		done(next?: boolean) {
			if (next === undefined) this.attach()
			return next ?? false
		}
	}

	export class $mol_file_progress_write extends $mol_file_progress {
		constructor(
			protected readable: ReadableStream<Uint8Array>,
			readonly native: WritableStream<Uint8Array>,
		) {
			super()
		}

		@ $mol_mem
		protected override attach() {
			const writer = this.native.getWriter()
			const write = writer.write.bind(writer)

			writer.write = async (chunk: Uint8Array< ArrayBuffer >) => {
				try {
					await write(chunk)
				} catch (error) {
					this.done(error as boolean)
					$mol_fail_hidden(error)
				}
				this.processed(chunk.length)
			}

			this.readable.pipeTo(this.native)
			this.readable_progress = new $mol_file_progress_read(this.readable)

			return super.attach()
		}

		readable_progress = null as null | $mol_file_progress_read

		@ $mol_mem
		done(next?: boolean) {
			if (next === undefined) {
				this.attach()
				const progress = this.readable_progress!

				return progress.done() && progress.processed() === this.processed()
			}

			return next
		}

	}

	export class $mol_file_progress_read extends $mol_file_progress {
		constructor(
			readonly native: ReadableStream<Uint8Array>
		) {
			super()
		}

		@ $mol_mem
		protected override attach() {
			const reader = this.native.getReader()
			const read = reader.read.bind(reader)

			reader.read = async () => {
				try {
					const result = await read()
					this.processed(result.value?.length ?? 0)
					if (result.done) this.done(true)
					return result
				} catch (error) {
					this.done(error as boolean)
					$mol_fail_hidden(error)
				}
			}

			return super.attach()
		}


	}
}
