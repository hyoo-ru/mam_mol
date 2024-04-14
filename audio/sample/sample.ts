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

		@ $mol_mem
		loop(next?: boolean) {
			return next ?? false
		}

		@ $mol_mem
		loop_start(next?: number) {
			return next ?? 0
		}

		@ $mol_mem
		loop_end(next?: number) {
			return next ?? this.duration()
		}

		rate_default() {
			return this.node_raw().playbackRate.defaultValue
		}

		@ $mol_mem
		rate(next?: number) {
			return next ?? this.rate_default()
		}

		@ $mol_mem
		override node_raw(reset?: null) {
			const node = this.context().native().createBufferSource()
			node.buffer = this.audio_buffer()

			return node
		}

		@ $mol_mem
		override active(next?: boolean) {

			if (this.node_started()) {
				if (next) this.context().active(true)
				this.node().playbackRate.value = next ? this.rate() : 0

				return next ?? false
			}

			return super.active(next)
		}

		@ $mol_mem
		override node() {
			const node = super.node()

			node.loop = this.loop()
			node.loopStart = this.loop_start()
			node.loopEnd = this.loop_end()
			node.playbackRate.value = this.rate()

			return node
		}

	}
}
