namespace $ {
	
	export class $mol_audio_gain extends $mol_audio_node {
		
		@ $mol_mem
		node() { return this.context().createGain() }
		
		@ $mol_mem
		gain( next = 1 ) { return next }
		
		@ $mol_mem
		output() {
			this.node().gain.setValueAtTime( this.gain(), this.time() )
			return super.output()
		}
		
	}
	
}
