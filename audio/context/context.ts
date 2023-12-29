namespace $ {
	export class $mol_audio_context extends $mol_object2 {
		@ $mol_memo.method
		static context() {
			return new this.$.$mol_dom_context.AudioContext() || this.$.$node['web-audio-api'].AudioContext
		}
	}
}
