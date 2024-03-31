namespace $ {
	export class $mol_audio_sample extends $mol_audio_instrument {
		@ $mol_mem
		override node_raw() { return this.context().createBufferSource() }

		override duration() {
			return this.audio_buffer().duration
		}

		buffer() {
			return new ArrayBuffer(0)
		}

		@ $mol_mem
		audio_buffer() {
			return this.context().decodeAudioData(this.buffer())
		}

		@ $mol_mem
		loop(range?: readonly [ number, number ] | null) {
			return range ?? null
		}

		@ $mol_mem
		start_time(next?: number) { return next ?? 0 }

		@ $mol_mem
		stop_time(next?: number) { return next ?? 0 }

		offset() {
			const offset = this.stop_time() - this.start_time()

			return offset >= 0 && offset < this.duration() ? offset : 0
		}

		@ $mol_action
		override start() {
			if ( this.active_cached() ) this.stop()

			this.node_raw().start()

			this.start_time(this.current_time())
			this.stop_time(0)
			this.active(true, true)
		}

		@ $mol_action
		override resume() {
			if ( this.active_cached() ) return

			this.node_raw().start(undefined, this.offset())

			this.start_time(this.current_time())
			this.stop_time(0)
			this.active(true, true)
		}

		@ $mol_action
		override stop() {
			super.stop()
			this.stop_time(this.current_time())
		}

		override output() {
			this.offset()
			return super.output()
		}

		@ $mol_mem
		override node() {
			const node = super.node()

			node.buffer = this.audio_buffer()
			const loop = this.loop()
			node.loop = loop !== null

			if (loop) {
				node.loopStart = loop[0]
				node.loopEnd = loop[1]
			}

			return node
		}

	}
}
