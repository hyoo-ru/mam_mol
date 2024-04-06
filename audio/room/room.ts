namespace $ {

	export type $mol_audio_room_status = AudioContextState | 'playing'

	/**
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_audio_demo
	 */
	export class $mol_audio_room extends $mol_audio_node {

		@ $mol_mem
		override context_main() {
			return new this.$.$mol_audio_context
		}

		override active(next?: boolean) {
			return this.context_main().active(next)
		}

		@ $mol_mem
		suspend_time(sec?: number) {
			return sec ?? 5
		}

		@ $mol_mem
		suspend_timer(reset?: null) {
			const time = this.suspend_time()
			if (! time ) return null
			if (! this.active()) return null
			return new this.$.$mol_after_timeout(time * 1000, () => $mol_wire_async(this).active(false))
		}

		@ $mol_mem
		status(next?: $mol_audio_room_status): $mol_audio_room_status {
			const state = this.context_main().state(next === 'playing' ? 'running' : next)
			if (state === 'closed') return state

			this.output()

			if (this.inputs_active() && state === 'running') return 'playing'
			this.suspend_timer()

			return state
		}
		
	}
}
