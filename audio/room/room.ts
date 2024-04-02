namespace $ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo
	 */
	export class $mol_audio_room extends $mol_audio_node {

		active(next?: boolean) {
			return this.status(next ? 'running' : undefined) === 'running'
		}

		status(next?: AudioContextState) {
			const state = this.context_main().state(next)
			if (state === 'running') this.output()
			return state
		}
		
	}
}
