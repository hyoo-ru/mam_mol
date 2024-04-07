namespace $ {
	export class $mol_audio_track extends $mol_audio_gain {
		@ $mol_mem
		start_time(next?: number) { return next ?? 0 }

		@ $mol_mem
		notes(next?: string) { return next ?? '' }

		@ $mol_mem
		notes_normalized() {
			return this.notes().split(' ').map(note => $mol_audio_tone_parse(note.trim()))
		}

		note_length(sec?: number) { return sec ?? 0.25 }

		note_off_part() { return .4 }

		note_off() { return this.note_length() * this.note_off_part() }

		@ $mol_mem
		note_time_ranges() {
			const times = [] as [number, number][]
			let duration_prev = 0
			const default_length = this.note_length()
			const note_off = this.note_off()

			for (const note of this.notes_normalized()) {
				const duration = default_length / note.divider

				const end = duration_prev + duration

				times.push([ duration_prev, end - note_off ])

				duration_prev = end
			}

			return times
		}

		duration() {
			return this.note_time_ranges().at(-1)?.[1] ?? 0
		}

		protected relative_time_last = 0

		loop() {
			return false
		}

		loop_from() { return 0 }
		loop_to() { return this.duration() }

		@ $mol_mem
		current() {
			const relative = this.time() - this.start_time()
			const ended = relative > (this.loop() ? this.loop_to() : this.duration())

			if (ended) {
				if (this.loop()) this.start()
				else this.active(false)
				return null
			}

			if (! this.active()) return null

			const index = this.note_time_ranges().findIndex(([from, to]) => relative >= from && relative <= to)

			return this.notes_normalized().at(index) ?? null
		}

		note_active() { return Boolean(this.current()) }
		note_freq() { return this.current()?.freq ?? 0 }

		@ $mol_action
		reset() {
			this.start_time( this.time_cut() + ( this.loop() ? this.loop_from() : 0 ) )
		}

		@ $mol_action
		start(e?: Event | null) {
			this.active(true)
			this.start_paused(null)
			return e
		}

		@ $mol_mem
		protected start_paused(reset?: null) {
			if (this.active()) this.reset()
			return null
		}

		@ $mol_mem
		override output() {
			this.start_paused()
			for (const input of this.input_connected()) {
				input.active(this.note_active())

				if (input instanceof $mol_audio_vibe) {
					input.freq(this.note_freq())
				}
			}

			return super.output()
		}
	}
}
