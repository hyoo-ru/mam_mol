namespace $ {

	export type $mol_audio_vibe_shape =
	| 'sine' 
	| 'square' 
	| 'sawtooth' 
	| 'triangle' 
	| 'custom'

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo_vibe
	 */
	export class $mol_audio_vibe extends $mol_audio_instrument {
		
		@ $mol_mem
		override node_raw(reset?: null) {
			return this.context().createOscillator()
		}

		@ $mol_mem
		freq( next = 440 ) { return next }

		@ $mol_mem
		shape( next: $mol_audio_vibe_shape = 'sine' ) { return next }

		override duration() {
			return 0.5
		}

		@ $mol_mem
		protected override node_start() {
			super.node_start()
			const duration = this.duration()
			if (! duration) return null

			return new this.$.$mol_after_timeout(
				duration * 1000,
				() => this.active(false)
			)
		}

		@ $mol_mem
		override node() {
			const node = super.node()
			node.frequency.setValueAtTime( this.active() ? this.freq() : -1, this.time() )
			node.type = this.shape()

			return node
		}

	}
}
