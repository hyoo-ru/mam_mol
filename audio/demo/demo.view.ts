namespace $.$$ {
	export class $mol_audio_demo extends $.$mol_audio_demo {
		@ $mol_mem_key
		override noise_freq(id: number) {
			$mol_wire_watch()
			const base_freq = $mol_audio_tone_parse(this.note(id)).freq
			return base_freq + Math.random() * 1000
		}

		override beep_play_click(e: Event) { this.beep_play() }
		override noise_play_click(e: Event) { this.noise_play() }
		
	}
}
