namespace $.$$ {
	export class $mol_audio_demo extends $.$mol_audio_demo {
		@ $mol_mem
		override noise_freq() {
			$mol_wire_watch()
			return Math.random() * 1000
		}

		override beep_play_click(e: Event) { this.beep_play() }

		override noise_play_click(e: Event) {
			this.noise_active(true)
			this.noise_stop_at(1)
		}
		
	}
}
