namespace $ {
	export class $mol_audio_instrument extends $mol_audio_node {
		@ $mol_mem
		override node_raw(reset?: null): AudioScheduledSourceNode {
			this.count()
			throw new Error('implement')
		}

		@ $mol_mem
		override node() {
			const node = super.node()

			const destructor = () => {
				if ( extended.started === 'started') extended.stop()
				extended.started = 'stopped'
			}

			const extended = Object.assign(node, {
				destructor,
				started: null as null | 'started' | 'stopped',
				onended: this.onended.bind(this, node)
			})

			return extended
		}

		onended(node: AudioNode, e: Event) {
			const current = this.node()
			if (current !== node) return
			current.started = 'stopped'
			this.active(false)
			this.end(e)
		}

		@ $mol_mem
		active(next?: boolean) {
			return next ?? false
		}

		end(e: Event) {}

		@ $mol_mem
		count(next?: number) { return next ?? 0 }

		@ $mol_action
		reset() {
			this.count(this.count() + 1)
			this.active(true)
		}

		@ $mol_mem
		override output() {
			if (this.active() && $mol_wire_probe(() => this.node())?.started === 'stopped') this.count(this.count() + 1)
			const node = this.node()

			if (node.started === null) {
				node.start()
				node.started = 'started'
			}

			return super.output()
		}

	}
}
