namespace $ {
	export class $mol_audio_sample extends $mol_audio_scheduled {
		@ $mol_mem
		override node() { return this.context().createBufferSource() }

		duration() {
			return this.audio_buffer().duration * 1000
		}

		buffer() {
			return new ArrayBuffer(0)
		}

		@ $mol_mem
		audio_buffer() {
			return $mol_wire_sync(this.context()).decodeAudioData(this.buffer())
		}

		@ $mol_mem
		override node_configured() {
			const node = this.node()
			node.buffer = this.audio_buffer()
			node.onended = $mol_wire_async(() => this.active(false))

			return node
		}

	}
}
