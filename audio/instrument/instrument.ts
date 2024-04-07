namespace $ {
	export class $mol_audio_instrument extends $mol_audio_node {
		@ $mol_mem
		override node_raw(reset?: null): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		@ $mol_mem
		override node() {
			const node = super.node()
			node.onended = this.onended.bind(this, node)

			return Object.assign(node, {
				destructor: node.onended,
				started: null as null | boolean,
			})
		}

		protected onended(node: AudioScheduledSourceNode & { started?: boolean | null }, e?: Event) {
			node.started = false
			if (e === undefined) return node.stop()

			if (this.node() !== node) return

			this.active(false)
			this.end()
		}

		end() {}

		@ $mol_action
		start(e?: Event | null) {
			this.node_raw(null)
			this.active(true)
			return e
		}

		protected node_autostop() {}

		@ $mol_mem
		override output() {
			const prev = $mol_wire_probe(() => this.node())

			if (this.active() && prev?.started === false) this.node_raw(null)

			const node = this.node()

			if (node.started === null) {
				node.start()
				node.started = true
				this.node_autostop()
			}

			return super.output()
		}

	}
}
