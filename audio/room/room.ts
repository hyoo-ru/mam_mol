namespace $ {

	export type $mol_audio_room_status = AudioContextState | 'playing' | 'error'

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo
	 */
	export class $mol_audio_room extends $mol_audio_node {

		@ $mol_mem
		override node() {
			return this.context().native().destination
		}

		// @ $mol_mem
		// override context() {
		// 	return new this.$.$mol_audio_context
		// }

		override active(next?: boolean) {
			return this.context().active(next)
		}

		@ $mol_mem
		suspend_time(sec?: number) {
			return sec ?? 5
		}

		@ $mol_mem
		suspend_timer() {
			const time = this.suspend_time()
			if (! time ) return null
			if (! this.active()) return null
			return new this.$.$mol_after_timeout(time * 1000, () => $mol_wire_async(this).active(false))
		}

		@ $mol_mem
		error() {
			try {
				this.output()
			} catch (e) {
				if (! $mol_promise_like(e)) return { value: e as Error }
			}

			return null
		}

		@ $mol_mem
		status(next?: $mol_audio_room_status | null): $mol_audio_room_status {
			if (next === 'playing') next = 'running'
			if (next === 'error') next = 'closed'

			const state = this.context().state(next)

			if (state === 'closed') return state

			if ( this.error() ) return 'error'

			if (this.inputs_active() && state === 'running') return 'playing'

			this.suspend_timer()

			return state
		}
		
	}
}
