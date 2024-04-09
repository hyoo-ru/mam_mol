namespace $ {

	export class $mol_audio_instrument extends $mol_audio_node {
		@ $mol_mem
		override node_raw(): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		protected onended(node: AudioScheduledSourceNode, e?: Event) {
			const started = $mol_wire_probe( () => this.start_scheduled() )
			if ( node === started ) node.stop()
			this.ended(true)
		}

		@ $mol_mem
		ended(next?: boolean) {
			return next ?? false
		}

		@ $mol_mem
		start_at(next?: number ) { return next ?? 0 }

		@ $mol_mem
		stop_at(next?: number ) { return next ?? 0 }

		@ $mol_action
		start() {
			this.start_at( this.time_cut())
			this.stop_at(0)
		}

		@ $mol_action
		resume() {
			this.start_at(this.time_cut())
			this.stop_at( 0 )
		}

		@ $mol_action
		pause() {
			this.start_at(0)
		}

		override input_connected() {
			const input = super.input_connected()
			this.stop_scheduled()
			return input
		}

		@ $mol_mem
		protected start_scheduled() {
			if ( this.start_at() < this.time_cut() ) return null
			const node = this.node()
			node.start(this.start_at())
			return node
		}

		@ $mol_mem
		protected stop_scheduled() {
			const node = this.start_scheduled()

			if (! node) return null
			if ( this.stop_at() <= this.start_at() ) return null

			node.stop(this.stop_at())
			return node
		}
	}
}
