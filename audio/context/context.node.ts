namespace $ {

	type AudioContextNode = {
		outStream?: InstanceType<typeof $node.stream.Writable> | null
		format: {
			numberOfChannels: number
			bitDepth: number
		}
	}

	export class $mol_audio_context_node extends $mol_audio_context {

		static override create_context(): AudioContext & AudioContextNode {
			const AudioContext = this.$.$node['web-audio-api'].AudioContext
			return new AudioContext()
		}

		@ $mol_memo.method
		static override context() {
			const context = this.create_context()

			const Speaker = this.$.$node['speaker']

			context.outStream = new Speaker({
				channels: context.format.numberOfChannels,
				bitDepth: context.format.bitDepth,
				sampleRate: context.sampleRate
			})

			return context
		}
	}

	$.$mol_audio_context = $mol_audio_context_node
}
