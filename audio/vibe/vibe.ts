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
		override node_raw() { return this.context().createOscillator() }

		@ $mol_mem
		freq( next = 440 ) { return next }

		@ $mol_mem
		shape( next: $mol_audio_vibe_shape = 'sine' ) { return next }

		@ $mol_mem
		override node() {
			const node = this.node_raw()
			node.frequency.setValueAtTime( this.freq(), this.time() )
			node.type = this.shape()

			return node
		}

	}
}
