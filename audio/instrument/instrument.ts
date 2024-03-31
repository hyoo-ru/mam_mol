namespace $ {
	export class $mol_audio_instrument extends $mol_audio_node {
		override node_raw(): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		@ $mol_mem
		override node() {
			const node = super.node()
			const destructor = () => extended.started ? extended.stop() : undefined
			const extended = Object.assign(node, { destructor, started: false, onended: this.onended.bind(this) })

			return extended
		}

		onended(e: Event) {
			this.active(false)
			this.end(e)
		}

		@ $mol_mem
		active(next?: boolean) {
			return next ?? false
		}

		end(e: Event) {}

		@ $mol_mem
		protected node_started() {
			if (! this.active()) return null

			const node = this.node()
			node.start()
			node.started = true

			return node
		}

		@ $mol_mem
		override output() {
			this.node_started()
			return super.output()
		}

	}
}
