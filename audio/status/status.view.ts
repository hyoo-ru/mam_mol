namespace $.$$ {
	export class $mol_audio_status extends $.$mol_audio_status {

		override status(next?: $mol_audio_room_status) {
			return super.status(next) as $mol_audio_room_status
		}

		override wakeup() {
			this.status('running')
		}

		override Icon() {
			return this.icons()[this.status()] ?? super.Icon()
		}

		override wakeup_enabled() {
			return this.status() === 'suspended'
		}

		override status_name() {
			return this.status_template().replace('{status}', this.status())
		}
	}
}
