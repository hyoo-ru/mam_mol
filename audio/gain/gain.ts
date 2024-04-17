namespace $ {
	
	export class $mol_audio_gain extends $mol_audio_node {
		
		@ $mol_mem
		override node(reset?: null) { return this.context().native().createGain() }

		@ $mol_mem
		override output() {
			this.gain()
			return super.output()
		}

		gain_default() { return 1 }

		@ $mol_mem
		gain( next?: number | null) {
			this.node().gain.setValueAtTime( next ?? this.gain_default(), this.time_cut() )

			return next
		}
		
	}
	
}
