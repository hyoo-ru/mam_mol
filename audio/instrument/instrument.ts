namespace $ {

	const started = new WeakMap<Object, boolean | null>()

	export class $mol_audio_instrument extends $mol_audio_node {
		override node(reset?: null): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		@ $mol_mem
		node_destruct() {
			const node = this.node()
			const destructor = node.onended = this.onended.bind(this, node)
			return Object.assign(node, { destructor })
		}

		@ $mol_mem
		override output() {
			this.node_destruct()
			return super.output()
		}

		protected onended(node: AudioScheduledSourceNode, e?: Event) {
			const state = started.get(node)

			if ( state === false) return
			if ( state === true ) node.stop()

			started.set(node, false)

			if ( node !== $mol_wire_probe(() => this.node()) ) return
			this.active(false)
			if (e) this.end()
		}

		end() {}

		node_started() {
			const prev = $mol_wire_probe(() => this.node())
			return prev ? ( started.get(prev) ?? null ) : null
		}

		@ $mol_mem
		start_at(next?: number ) {
			if (this.node_started() !== null) this.node(null)
			if (next === undefined) return -1

			this.output().start(next + this.time_cut())

			started.set(this.node(), true)
			return next
		}

		@ $mol_mem
		note(next?: string) { return next ?? 'a' }

		@ $mol_mem
		stop_at(next?: number ) {
			if (next === undefined || next < 0) return -1
			if (! this.node_started()) return next
			this.node().stop( next + this.time_cut() )

			return next
		}

		@ $mol_mem
		override active(next?: boolean) {
			if (next) {
				this.context().active(true)
				this.start_at(0)
				this.stop_at(-1)
			}

			if (next === false) this.stop_at(0)

			if (next !== undefined) return next

			return next ?? (this.node_started() ?? false)
		}

		@ $mol_action
		start() {
			this.node(null)
			this.active(true)
		}
	}
}
