namespace $ {

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo
	 */
	export class $mol_audio_room extends $mol_audio_node {
		// @ $mol_memo.field
		// get $() {
		// 	const ctx = $mol_audio_context.make({})

		// 	return super.$.$mol_ambient({
		// 		$mol_audio_context_main: ctx
		// 	})
		// }

		active(next?: boolean) {
			return this.context_main().active(next)
		}

		@ $mol_mem
		suspend_time(sec?: number) {
			return sec ?? 5
		}

		@ $mol_mem
		suspend_timer() {
			const time = this.suspend_time()
			if (! time ) return null

			if (this.inputs_active()) return null

			return new this.$.$mol_after_timeout(time * 1000, () => $mol_wire_async(this).active(false))
		}

		@ $mol_mem
		inputs_active() {
			return this.input_connected().some(src => src.active())
		}

		@ $mol_mem
		status(next?: AudioContextState) {
			const state = this.context_main().state(next)
			if (state === 'closed') return state

			this.output()
			this.suspend_timer()

			if (state === 'running' && this.inputs_active()) return 'playing'

			return state
		}
		
	}
}
