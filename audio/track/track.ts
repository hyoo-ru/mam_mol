namespace $ {
	export class $mol_audio_track extends $mol_audio_gain {
		@ $mol_mem
		notes(next?: string) { return next ?? '' }

		@ $mol_mem
		commands() {
			let start_at_prev = 0
			const default_length = this.note_length()
			const note_off = this.note_off()

			return this.notes().split(' ').map(note => {
				const { freq, divider } = $mol_audio_tone_parse(note.trim())
				const duration = default_length / divider

				const start_at = start_at_prev
				const stop_at = start_at + duration - note_off
				start_at_prev += duration

				return { freq, start_at, stop_at, }
			})
		}

		note_length(sec?: number) { return sec ?? 0.25 }

		note_off_part() { return .4 }

		note_off() { return this.note_length() * this.note_off_part() }

		duration() { return this.commands().at(-1)?.stop_at ?? 0 }

		@ $mol_mem
		clips() {
			const time = this.time_cut()
			const from = time - this.start_at()
			let to = time - this.stop_at()
			if (to <= from) to = 0

			return this.commands()
				.filter(clip => clip.start_at >= from && ( ! to || clip.stop_at <= to) )
				.map(clip => ({ ... clip, start_at: clip.start_at + time, stop_at: clip.stop_at + time }))
		}

		clip(index: number) { return this.clips()[index] }
		clip_start_at(index: number) { return this.clip(index).start_at }
		clip_stop_at(index: number) { return this.clip(index).stop_at }
		clip_freq(index: number) { return this.clip(index).freq }

		@ $mol_mem
		start_at(next?: number ) { return next ?? 0 }

		@ $mol_mem
		stop_at(next?: number) { return next ?? 0 }

		@ $mol_action
		start() {
			this.start_at( this.time_cut() )
			this.stop_at( this.time_cut() + this.duration() )
		}

		@ $mol_action
		resume() {
			let paused = this.stop_at() - this.start_at()
			if (paused >= this.duration()) paused = 0
			this.start_at( this.time_cut() + paused )
			this.stop_at( this.time_cut() + this.duration() )
		}

		@ $mol_action
		pause() { this.stop_at(this.time_cut()) }

		@ $mol_mem
		override active(next?: boolean) {
			if (next) this.resume()
			if (next === false) this.pause()

			this.input().every(clip => clip.ended())

			return this.input().length > 0
		}

		@ $mol_mem_key
		instrument(index: number): $mol_audio_instrument {
			throw new Error('implement')
		}

		@ $mol_mem
		override input() {
			return this.clips().map((_, index) => this.instrument(index))
		}
	}
}
