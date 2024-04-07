namespace $.$$ {
	export class $mol_audio_demo_sequencer extends $.$mol_audio_demo_sequencer {
		override play() {
			this.room_active(true)
			this.beep_track_start()
		}

		override beep_play_title() {
			return super.beep_play_title().replace('{note}', String(this.beep_current_note()?.name ?? '-'))
		}
	}
}
