namespace $ {

	export type $mol_audio_vibe_shape = OscillatorType

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo_vibe
	 */
	export class $mol_audio_vibe extends $mol_audio_instrument {
		
		@ $mol_mem
		override node_raw(reset?: null) {
			return this.context().native().createOscillator()
		}

		@ $mol_mem
		freq( next = 440 ) { return next }

		@ $mol_mem
		shape( next: $mol_audio_vibe_shape = 'sine' ) { return next }

		freq_normalized() {
			const freq = this.freq()
			return this.active() && freq > 0 ? freq : -1
		}

		@ $mol_mem
		override node() {
			const node = super.node()
			node.frequency.setValueAtTime( this.freq_normalized(), this.time_cut() )
			node.type = this.shape()

			return node
		}

	}
}
