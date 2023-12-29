namespace $ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo
	 */
	export class $mol_audio_room extends $mol_audio_node {
		
		duration_default() {
			return 1000
		}

		duration() {
			let duration = 0
			for (const input of this.input_connected()) {
				if (input instanceof $mol_audio_room) duration += input.duration()
				if (input instanceof $mol_audio_instrument) duration += input.duration()
			}
			return duration || this.duration_default()
		}
		
		@ $mol_action
		play() {
			this.output()
			this.$.$mol_wait_timeout( this.duration() )
		}
		
	}
}
