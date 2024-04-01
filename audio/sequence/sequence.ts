namespace $ {
	export class $mol_audio_sequence extends $mol_audio_node {
		protected instruments = [] as $mol_audio_instrument[]
		@ $mol_mem
		current(reset?: null) { return this.instruments.at(0) ?? null }

		@ $mol_mem_key
		protected audio_data(id: string) {
			$mol_wire_solid()
			const item = this.$.$mol_audio_instrument.make({
				end: () => this.play_next(),
			})
			return item
		}

		add(instrument: $mol_audio_instrument) {
			this.instruments.push(instrument)
			this.current(null)
		}

		@ $mol_action
		protected play_next() {
			this.instruments.shift()
			this.current(null)
		}

		@ $mol_mem
		protected active(next?: boolean) {
			return next ?? true
		}

		@ $mol_mem
		override input() {
			const current = this.current()

			return current ? [ current ] : []
		}

		@ $mol_mem
		playing() {
			if (! this.active()) return false
			this.$.$mol_audio_context.active()
			this.output()
			return true
		}


	}
}
