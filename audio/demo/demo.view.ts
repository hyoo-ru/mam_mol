namespace $.$$ {
	export class $mol_audio_demo extends $.$mol_audio_demo {
		@ $mol_mem_key
		override noise_freq(id: number) {
			$mol_wire_watch()
			return this.noise_base_freq(id) + Math.random() * 1000
		}

		override beep_play_click(e: Event) { this.beep_play() }
		override noise_play_click(e: Event) { this.noise_play() }
		
	}
}
