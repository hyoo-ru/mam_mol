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
			this.end(e)
		}

		end(e: Event) {}

		protected node_start() {
			this.node().start()
		}

		@ $mol_mem
		override output() {
			// if (this.active() && $mol_wire_probe(() => this.node())?.started === false) this.reset()
			const node = this.node()

			if (node.started === null) {
				this.node_start()
				node.started = true
			}

			return super.output()
		}

	}
}
