namespace $ {
	export class $mol_audio_node extends $mol_object2 {
		context() { return this.$.$mol_audio_context }
		
		@ $mol_mem
		node() { return this.context().destination as AudioNode }

		@ $mol_mem
		input( next = [] as readonly $mol_audio_node[] ) { return next }
		
		@ $mol_mem
		input_connected() {
			
			const node = this.node()
			
			const prev = $mol_mem_cached( ()=> this.input_connected() ) ?? []
			const next = this.input()
			
			for( const src of prev ) {
				if( next.includes( src ) ) continue
				src.output().disconnect( node )
			}
			
			for( const src of next ) {
				src.output().connect( node )
			}
			
			return next 
		}
		
		@ $mol_mem
		output() {
			this.input_connected()
			return this.node()
		}
		
		time() { return this.context().currentTime }
		
		destructor() {
			
			const node = this.node()
			
			for( const src of this.input() ) {
				src.output().disconnect( node )
			}
			
		}
		
	}
}
