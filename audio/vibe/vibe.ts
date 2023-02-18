namespace $ {
	export class $mol_audio_vibe extends $mol_audio_node {
		
		@ $mol_mem
		node() { return this.audio().createOscillator() }
		
		@ $mol_mem
		freq( next = 440 ) { return next }
		
		@ $mol_mem
		active( next?: boolean ): boolean {
			
			$mol_wire_solid()
			
			const prev = $mol_wire_probe( ()=> this.active() )
			if( prev === next ) return next ?? false
			
			if( next === true ) this.node().start()
			else if( prev === true ) this.node().stop()
			
			return next ?? false
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