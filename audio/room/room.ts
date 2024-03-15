namespace $ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo
	 */
	export class $mol_audio_room extends $mol_audio_node {
	
		@ $mol_action
		play() {
			this.$.$mol_audio_context.active()
			this.output()
			this.$.$mol_wait_timeout( this.duration() * 1000 )
		}
		
	}
}
