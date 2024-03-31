namespace $.$$ {
	export class $mol_audio_demo_sample extends $.$mol_audio_demo_sample {
		override sample_buffer() {
			$mol_wire_solid()

			return this.$.$mol_fetch.response(this.sample_url()).buffer()
		}

		@ $mol_mem
		override sample_active(next?: boolean) {
			if (next) this.$.$mol_audio_context.active(next)

			return next ?? false
		}

		override sample_message() {
			return this.$.$mol_audio_context.active() ? ( this.room_output() ? 'attached' : 'detouched' ) : 'context not active'
		}
	}
}

