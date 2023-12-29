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
			return $mol_wire_sync(this.context()).decodeAudioData(this.buffer())
		}

		@ $mol_mem
		override node() {
			const node = this.node_raw()
			node.buffer = this.audio_buffer()
			node.onended = $mol_wire_async(() => this.end())

			return node
		}

	}
}
