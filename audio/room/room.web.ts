namespace $ {
	export class $mol_audio_room extends $mol_audio_node {
		
		duration() {
			return 1000
		}
		
		@ $mol_action
		play() {
			this.output()
			this.$.$mol_wait_timeout( this.duration() )
		}
		
	}
}