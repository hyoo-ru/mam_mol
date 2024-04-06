namespace $.$$ {
	export class $mol_audio_status extends $.$mol_audio_status {

		override status(next?: $mol_audio_room_status) {
			return super.status(next) as $mol_audio_room_status
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
