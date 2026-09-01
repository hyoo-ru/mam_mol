namespace $ {

	export class $mol_audio_sample extends $mol_audio_instrument {

		duration() {
			return this.audio_buffer()?.duration ?? 0
		}

		buffer() {
			return null as ArrayBuffer | null
		}

		@ $mol_mem
		audio_buffer() {
			const buffer = this.buffer()
			return buffer ? this.context().native().decodeAudioData(buffer) : null
		}

		loop_default() { return false }

		@ $mol_mem
		loop(next?: boolean | null) {
			return this.node().loop = next ?? this.loop_default()
		}

		loop_start_default() { return 0 }

		@ $mol_mem
		loop_start(next?: number | null) {
			return this.node().loopStart = next ?? this.loop_start_default()
		}

		loop_end_default() { return this.duration() }

		@ $mol_mem
		loop_end(next?: number | null) {
			return this.node().loopEnd = next ?? this.loop_end_default()
		}

		rate_default() {
			return this.node().playbackRate.defaultValue
		}

		@ $mol_mem
		rate(next?: number | null) {
			return this.node().playbackRate.value = next ?? this.rate_default()
		}

		@ $mol_mem
		override node(reset?: null) {
			const node = this.context().native().createBufferSource()
			node.buffer = this.audio_buffer()

			return node
		}

		@ $mol_mem
		override active(next?: boolean) {
			const prev = super.active(next)
			if (this.node_started()) {
				if (next) this.context().active(true)
				this.rate(next ? null : 0)

				return next ?? false
			}

			return prev
		}

		@ $mol_mem
		override output() {
			this.loop()
			this.loop_start()
			this.loop_end()
			this.rate()

			return super.output()
		}

	}
}
