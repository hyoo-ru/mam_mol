namespace $.$$ {
	export class $mol_audio_status extends $.$mol_audio_status {

		override status(next?: AudioContextState) {
			return super.status(next) as AudioContextState
		}

		override wakeup() {
			this.status('running')
		}

		@ $mol_mem
		override sub() {
			const status = this.status()
			if (status === 'suspended') return [ this.Wakeup() ]

			return [ this.status() ]
		}
	}
}
