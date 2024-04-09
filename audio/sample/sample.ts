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
		override node_raw(): AudioBufferSourceNode {
			this.start_at()
			this.offset()
			const prev = $mol_wire_probe(() => this.node_raw())
			const started = $mol_wire_probe(() => this.start_scheduled())
			if (prev && prev !== started) return prev

			const node = this.context().native().createBufferSource()
			node.buffer = this.audio_buffer()

			const destructor = node.onended = this.onended.bind(this, node)
			return Object.assign(node, { destructor })
		}

		@ $mol_mem
		offset(next?: number) {
			if (next && ( next > this.duration() || next < 0 ) ) return 0
			return next ?? 0
		}

		@ $mol_action
		override start() {
			super.start()
			this.offset(0)
		}

		@ $mol_action
		override pause() {
			super.pause()
			this.offset( this.time_cut() - this.start_at() )
		}

		@ $mol_mem
		protected override start_scheduled() {
			if ( this.start_at() < this.time_cut() ) return null
			const node = this.node()
			node.start(this.start_at(), this.offset())
			return node
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
