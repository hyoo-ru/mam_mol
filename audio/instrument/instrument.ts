namespace $ {
	export class $mol_audio_instrument extends $mol_audio_node {
		@ $mol_mem
		override node_raw(reset?: null): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		@ $mol_mem
		duration() {
			let duration = 0
			for (const input of this.input_connected()) {
				duration = Math.max(
					duration,
					input instanceof $mol_audio_instrument ? input.duration() : 0
				)
			}

			return duration
		}
		
		@ $mol_mem
		override node() {
			const node = super.node()

			const destructor = () => {
				if ( extended.started) extended.stop()
				extended.started = false
			}

			const extended = Object.assign(node, {
				destructor,
				started: null as null | boolean,
				onended: this.onended.bind(this, node)
			})

			return extended
		}

		onended(node: AudioNode, e: Event) {
			const current = this.node()
			if (current !== node) return
			current.started = false
			this.active(false)
			this.end()
		}

		end() {}

		protected node_start() {
			const node = this.node()

			if (node.started === null) {
				this.node().start()
				node.started = true
			}
		}

		@ $mol_mem
		override output() {
			this.node_start()

			return super.output()
		}

	}
}
