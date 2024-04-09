namespace $ {

	export type $mol_audio_vibe_shape = OscillatorType

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo_vibe
	 */
	export class $mol_audio_vibe extends $mol_audio_instrument {
		
		@ $mol_mem
		override node_raw() {
			const node = this.context().native().createOscillator()
			this.start_at()
			const destructor = node.onended = this.onended.bind(this, node)
			return Object.assign(node, { destructor })
		}

		@ $mol_mem
		freq( next = 440 ) { return next }

		@ $mol_mem
		shape( next: $mol_audio_vibe_shape = 'sine' ) { return next }

		@ $mol_mem
		override node() {
			const node = super.node()

			node.frequency.setValueAtTime( this.freq(), this.time_cut() )
			node.type = this.shape()

			return node
		}

	}
}
