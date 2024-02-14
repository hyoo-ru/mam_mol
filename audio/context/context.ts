declare module 'web-audio-api'
namespace $ {
	export class $mol_audio_context extends $mol_object2 {
		@ $mol_memo.method
		static context() {
			const AudioContext = this.$.$mol_dom_context.AudioContext || this.$.$node['web-audio-api'].AudioContext
			return new AudioContext()
		}
	}
}
