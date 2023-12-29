namespace $ {
	export class $mol_audio_context extends $mol_object2 {
		static create_context() {
			return new this.$.$mol_dom_context.AudioContext()
		}

		@ $mol_memo.method
		static context() {
			return this.create_context()
		}
	}
}
