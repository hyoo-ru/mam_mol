namespace $.$$ {
	export class $mol_audio_demo_sequencer extends $.$mol_audio_demo_sequencer {
		override play_notes() {
			this.start_time(this.time())
			new this.$.$mol_after_frame(() => $mol_wire_async(this).play_task())
			this.beep_play()
		}

		@ $mol_mem
		start_time(next?: number) { return next ?? 0 }

		@ $mol_mem
		notes_normalized() {
			return this.notes().split(' ').map(note => $mol_audio_tone_parse(note.trim()))
		}

		@ $mol_mem
		note_time_ranges() {
			const times = [] as [number, number][]
			let duration_prev = 0
			const default_length = this.note_length()

			for (const note of this.notes_normalized()) {
				const duration = note.divider * default_length

				const end = duration_prev + duration

				times.push([ duration_prev, end ])

				duration_prev = end
			}

			return times
		}

		play_task() {
			if (this.note_index(null) === -1) return
			if (! this.room_active()) return // 60 мс мало для обновления output, поэтому вытягиваем и применяем сразу

			new this.$.$mol_after_frame(() => $mol_wire_async(this).play_task())
		}

		@ $mol_mem
		note_index(reset?: null) {
			const start = this.start_time()

			const relative = this.time() - start

			const note_index = this.note_time_ranges().findIndex(([from, to]) => relative >= from && relative <= to)

			return note_index
		}

		@ $mol_mem
		protected current() {
			const index = this.note_index()
			if (index === -1) return null

			new this.$.$mol_after_frame( () => this.Beep().active(true))

			return this.notes_normalized().at(index)
		}

		override note_freq() {
			return this.current()?.freq ?? 0
		}

		override note_duration() {
			const divider = this.current()?.divider ?? 1

			return this.note_length() * divider
		}

		override beep_play_title() {
			return super.beep_play_title().replace('{note}', String(this.note_index()))
		}
	}
}
