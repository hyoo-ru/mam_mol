namespace $ {
	export class $mol_audio_context_web extends $mol_audio_context {

		@ $mol_memo.method
		static override context() {
			return new this.$.$mol_dom_context.AudioContext()
		}
	}

	$.$mol_audio_context = $mol_audio_context_web
}
