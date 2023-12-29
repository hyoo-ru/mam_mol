namespace $ {

	export class $mol_audio_context_node extends $mol_audio_context {

		@ $mol_memo.method
		static override context() {
			const AudioContext = this.$.$mol_dom_context.AudioContext || this.$.$node['web-audio-api'].AudioContext
			return new AudioContext()
		}
	}

	$.$mol_audio_context = $mol_audio_context_node
}
