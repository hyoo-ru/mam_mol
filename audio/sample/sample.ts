namespace $ {
	export class $mol_audio_sample extends $mol_audio_instrument {
		@ $mol_mem
		override node_raw() {
			const node = this.context().createBufferSource()
			node.buffer = this.audio_buffer()
			this.count()

			return node
		}

		override duration() {
			return this.audio_buffer()?.duration ?? 0
		}

		buffer() {
			return null as ArrayBuffer | null
		}

		@ $mol_mem
		audio_buffer() {
			const buffer = this.buffer()
			return buffer ? this.context().decodeAudioData(buffer) : null
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

		@ $mol_mem
		override node() {
			const node = super.node()

			node.loop = this.loop()

			node.loopStart = this.loop_start()
			node.loopEnd = this.loop_end()

			node.playbackRate.value = this.active() ? node.playbackRate.defaultValue : 0

			return node
		}

		@ $mol_mem
		count(next?: number) { return next ?? 0 }

		reset() {
			this.count(this.count() + 1)
			this.active(true)
		}

	}
}
