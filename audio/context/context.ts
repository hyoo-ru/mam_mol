declare module 'web-audio-api'
namespace $ {
	export class $mol_audio_context extends $mol_object {

		time() {
			return this.native().currentTime
		}

		@ $mol_mem
		native(reset?: null) {
			const AudioContext = this.$.$mol_dom_context.AudioContext || this.$.$node['web-audio-api'].AudioContext

			const ctx = new AudioContext()
			ctx.onstatechange = (e: Event) => this.state(null)
			
			return $mol_wire_sync( ctx )
		}

		@ $mol_mem
		state(next?: null | AudioContextState) {
			const ctx = this.native()
			if (ctx.state === next) return next

			if (next === 'closed') ctx.close()
			if (next === 'running') ctx.resume()
			if (next === 'suspended') ctx.suspend()

			return ctx.state
		}

		active(next?: boolean) {
			return this.state(next ? 'running' : next === false ? 'suspended' : undefined) === 'running'
		}

	}
	export const $mol_audio_context_main = new $mol_audio_context
}
