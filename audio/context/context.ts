declare module 'web-audio-api'
namespace $ {
	export class $mol_audio_context extends $mol_object2 {
		@ $mol_memo.method
		static native() {
			const AudioContext = this.$.$mol_dom_context.AudioContext || this.$.$node['web-audio-api'].AudioContext
			return $mol_wire_sync( new AudioContext() )
		}


		@ $mol_mem
		static active(next?: boolean) {
			const context = this.native()

			if (next && context.state !== 'running') context.resume()
			if (next === false && context.state === 'running') context.suspend()

			return context.state === 'running'
		}

	}
}
