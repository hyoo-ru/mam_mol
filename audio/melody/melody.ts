namespace $ {
	export class $mol_audio_melody extends $mol_audio_gain {
		@ $mol_mem
		notes(next?: string) { return next ?? '' }

		@ $mol_mem
		clips() {
			let start_at_prev = 0
			const default_length = this.note_length()
			const note_off = this.note_off()

			return this.notes().split(' ').map((command, id) => {
				const note = command.trim()
				const { divider } = $mol_audio_tone_parse(note)
				const duration = default_length / divider

				const start_at = start_at_prev
				const stop_at = start_at + duration - note_off
				start_at_prev += duration

				return { note, start_at, stop_at, id }
			})
		}

		note_length(sec?: number) { return sec ?? 0.25 }

		note_off_part() { return .4 }

		note_off() { return this.note_length() * this.note_off_part() }

		@ $mol_mem
		duration() { return this.clips().reduce((acc, clip) => Math.max(acc, clip.stop_at), 0) }

		note(index: number) { return this.clips()[index] }

		@ $mol_action
		offset_cut(next: number) {
			let offset = this.offset()
			if (offset === null) offset = this.offset(0) ?? 0
			if (offset === 0) this.start_at_absolute = this.time_cut() + next
			return offset
		}

		@ $mol_mem
		start_at(next?: number) {
			if (next === undefined) return -1

			const offset = this.offset_cut(next)

			const instruments = []
			for (const clip of this.clips()) {
				if (clip.stop_at < offset) continue

				const instrument = this.instrument(clip.id)

				instrument.note(clip.note)
				instrument.start_at(next + clip.start_at - offset)
				const stop_at = next + clip.stop_at - offset
				instrument.stop_at(stop_at)
				instrument.end = () => this.offset(null)

				instruments.push(instrument)
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

			if (next === undefined) return null
			if (next > this.duration()) return null
			if (next < 0) return null

			return next

		}

		@ $mol_mem
		override active(next?: boolean) {
			if (next) {
				this.context().active(true)
				this.start_at(0)

				return next
			}

			if (next === false) {
				this.stop_at(0)
				return next
			}

			return this.offset() !== null
		}

		@ $mol_mem_key
		instrument(index: number): $mol_audio_instrument {
			return this.$.$mol_audio_vibe.make({})
		}
	}
}
