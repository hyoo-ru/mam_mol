namespace $ {
	export class $mol_audio_vibe extends $mol_audio_node {
		
		@ $mol_mem
		node() { return this.audio().createOscillator() }
		
		@ $mol_mem
		freq( next = 440 ) { return next }
		
		@ $mol_mem
		active( next = false ) {
			if( next ) this.node().start()
			else if( next !== undefined ) this.node().stop()
			return next
		}
		
		@ $mol_mem
		output() {
			this.node().frequency.setValueAtTime( this.freq(), this.time() )
			this.active( true )
			return super.output()
		}
		
		destructor() {
			this.active( false )
			super.destructor()
		}
		
	}
}