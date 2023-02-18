namespace $ {
	export class $mol_audio_node extends $mol_object2 {
		
		@ $mol_mem
		audio( next = new AudioContext ) { return next }
		
		@ $mol_mem
		node() { return this.audio().destination as AudioNode }
		
		@ $mol_mem
		input( next = [] as readonly $mol_audio_node[] ) { return next }
		
		@ $mol_mem
		output() {
			
			const audio = this.audio()
			const node = this.node()
			
			for( const src of this.input() ) {
				src.audio( audio )
				src.output().connect( node )
			}
			
			return node
		}
		
		time() { return this.audio().currentTime }
		
		destructor() {
			
			const node = this.node()
			
			for( const src of this.input() ) {
				src.output().disconnect( node )
			}
			
		}
		
	}
}