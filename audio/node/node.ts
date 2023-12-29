namespace $ {
	export class $mol_audio_node extends $mol_object2 {
		context() { return this.$.$mol_audio_context.context() }
		
		@ $mol_mem
		node_raw() { return this.context().destination as AudioNode }

		node() {
			return this.node_raw()
		}

		@ $mol_mem
		input( next = [] as readonly $mol_audio_node[] ) { return next }
		
		@ $mol_mem
		input_connected() {
			
			const node = this.node_raw()
			
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
			return this.node_raw()
		}
		
		time() { return this.context().currentTime }
		
		destructor() {
			
			const node = this.node_raw()
			
			for( const src of this.input() ) {
				src.output().disconnect( node )
			}
			
		}
		
	}
}
