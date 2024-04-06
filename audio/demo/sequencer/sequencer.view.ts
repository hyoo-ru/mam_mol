namespace $.$$ {
	export class $mol_audio_demo_sequencer extends $.$mol_audio_demo_sequencer {
		override play() {
			this.room_active(true)
			this.start_time(this.time())
		}

		@ $mol_mem
		start_time(next?: number) { return next ?? 0 }

		@ $mol_mem
		notes_normalized() {
			return this.notes().split(' ').map(note => $mol_audio_tone_parse(note.trim()))
		}

		override note_off_less_length() {
			return this.note_length() <= this.note_off() ? super.note_off_less_length() : ''
		}

		@ $mol_mem
		note_time_ranges() {
			const times = [] as [number, number][]
			let duration_prev = 0
			const default_length = this.note_length()
			const note_off = this.note_off()

			for (const note of this.notes_normalized()) {
				const duration = note.divider * default_length

				const end = duration_prev + duration

				times.push([ duration_prev, end - note_off ])

				duration_prev = end
			}

			return times
		}

		@ $mol_mem
		current(reset?: null) {
			const start = this.start_time()
			if (! start) return null

			const relative = this.time() - start

			const ranges = this.note_time_ranges()
			const index = ranges.findIndex(([from, to]) => relative >= from && relative <= to)

			const is_end = index === ranges.length - 1

			if (! is_end) new this.$.$mol_after_frame(() => $mol_wire_async(this).current(null))

			return index >= 0 ? this.notes_normalized().at(index) : null
		}

		override beep_active() {
			return Boolean(this.current())
		}

		override note_freq() {
			return this.current()?.freq ?? 0
		}

		override beep_play_title() {
			return super.beep_play_title().replace('{note}', String(this.current()?.name ?? '-'))
		}
	}
}
