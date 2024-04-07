namespace $ {
	
	export class $mol_audio_gain extends $mol_audio_node {
		
		@ $mol_mem
		override node_raw() { return this.context().native().createGain() }

		@ $mol_mem
		override node() {
			const node = super.node()
			node.gain.setValueAtTime( this.gain(), this.time() )
			return node
		}

		@ $mol_mem
		gain( next = 1 ) { return next }
		
	}
	
}
