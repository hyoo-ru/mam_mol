namespace $ {
	// const api = require('web-audio-api') as { AudioContext: new() => AudioContext }

	// export const $mol_audio_context_node = new api.AudioContext()
	export const $mol_audio_context_node = new Proxy({} as AudioContext, {
		get() {
			throw new Error('Not implemented')
		}
	})

	$.$mol_audio_context = $mol_audio_context_node
}
