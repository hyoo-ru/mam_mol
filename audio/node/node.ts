namespace $ {
	export class $mol_audio_node extends $mol_object {
		context_main() { return this.$.$mol_audio_context.main() }
		context() { return this.context_main().native() }

		@ $mol_mem
		node_raw(reset?: null): AudioNode { return this.context().destination }

		node() {
			return this.node_raw() as ReturnType<this['node_raw']>
		}

		@ $mol_action
		reset() {
			this.node_raw(null)
			this.context_main().active(true)
		}

		@ $mol_mem
		input( next = [] as readonly $mol_audio_node[] ) { return next }
		
		@ $mol_mem
		active(next?: boolean) {
			return next ?? false
		}

		@ $mol_mem
		input_connected() {
			
			const node = this.node()
			
			const prev = $mol_mem_cached( ()=> this.input_connected() ) ?? []
			const next = this.input().filter(node => node.active())
			
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

		@ $mol_action
		time() { return this.context().currentTime }
		
		destructor() {
			
			const node = $mol_wire_probe(() => this.node())
			if (! node ) return
			
			for( const src of this.input() ) {
				if (src.active()) src.output().disconnect( node )
			}
			
		}
		
	}
}
