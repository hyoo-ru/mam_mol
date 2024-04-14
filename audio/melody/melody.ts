namespace $ {
	export class $mol_audio_melody extends $mol_audio_gain {
		@ $mol_mem
		notes(next?: string) { return next ?? '' }

		@ $mol_mem
		clips() {
			let start_at_prev = 0
			const default_length = this.note_length()
			const note_off = this.note_off()

			return this.notes().split(' ').map((note, id) => {
				const { freq, divider } = $mol_audio_tone_parse(note.trim())
				const duration = default_length / divider

				const start_at = start_at_prev
				const stop_at = start_at + duration - note_off
				start_at_prev += duration

				return { freq, start_at, stop_at, id }
			})
		}

		note_length(sec?: number) { return sec ?? 0.25 }

		note_off_part() { return .4 }

		note_off() { return this.note_length() * this.note_off_part() }

		duration() { return this.clips().at(-1)?.stop_at ?? 0 }

		note(index: number) { return this.clips()[index] }
		note_freq(index: number) { return this.note(index).freq }

		protected input_remove(target: $mol_audio_instrument) {
			this.offset(null)
			this.input(this.input().filter(instrument => instrument !== target))
		}

		@ $mol_mem
		start_at(next?: number) {
			if (next === undefined) return -1

			const offset = this.offset()
			if (! offset) this.start_at_absolute = this.time_cut() + next

			const instruments = []
			for (const clip of this.clips()) {
				if (clip.stop_at < offset) continue

				const instrument = this.instrument(clip.id)

				instrument.start_at(next + clip.start_at - offset)
				instrument.stop_at(next + clip.stop_at - offset)
				instruments.push(instrument)
				instrument.end = () => this.input_remove(instrument)
			}
			this.input(instruments)
			this.output()

			return next
		}

		override output() {
			this.offset()
			return super.output()
		}

		protected start_at_absolute = 0

		@ $mol_mem
		protected stop_at_scheduled(next?: number): null | $mol_after_timeout {
			if (! next) {
				this.offset(null)
				this.input([])
				return null
			}

			return new $mol_after_timeout(next * 1000, () => this.stop_at_scheduled(0))
		}

		@ $mol_mem
		stop_at(next?: number) {
			if (next === -1) return -1
			if (next === undefined) return -1
			if (next < this.start_at()) return -1
			this.stop_at_scheduled(next)

			return next
		}

		@ $mol_action
		start() {
			this.offset(0)
			this.active(true)
		}

		@ $mol_mem
		offset(next?: number | null) {
			if (next === null) next = this.time_cut() - this.start_at_absolute
			if (! next) next = 0
			if (next >= this.duration()) next = 0
			next = Math.max(next, 0)

			return next
		}

		@ $mol_mem
		override active(next?: boolean | null) {
			if (next) {
				this.context().active(true)
				this.start_at(0)

				return next
			}

			if (next === false) {
				this.stop_at(0)
				return next
			}

			return this.input().length > 0
		}

		@ $mol_mem_key
		instrument(index: number): $mol_audio_instrument {
			throw new Error('implement')
		}
	}
}
