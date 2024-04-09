namespace $ {
	export class $mol_audio_node extends $mol_object {
		@ $mol_mem
		context(next?: $mol_audio_context) {
			return next ?? this.$.$mol_audio_context_main
		}

		@ $mol_mem
		input( next = [] as readonly $mol_audio_node[] ) { return next }

		@ $mol_mem
		input_connected() {

			const node = this.node_raw()
			if (! node ) return []

			const prev = $mol_wire_probe( ()=> this.input_connected() ) ?? []
			const next = this.input()

			for( const src of prev ) {
				if( next.includes( src ) ) continue
				src.output().disconnect( node )
			}
			
			const ctx = this.context()

			for( const src of next ) {
				src.context(ctx)
				src.output().connect( node )
			}
			
			return next 
		}

		@ $mol_mem
		active(next?: boolean) { return next ?? false }
		
		@ $mol_mem
		inputs_active() {
			return this.input_connected().some(src => src.active())
		}

		@ $mol_mem
		node_raw(): AudioNode {
			throw new Error('implement')
		}

		node() {
			return this.node_raw() as ReturnType<this['node_raw']>
		}

		@ $mol_mem
		output() {
			this.input_connected()
			return this.node()
		}

		time(reset?: null) { return this.context().time(reset) }

		@ $mol_action
		time_cut() { return this.time(null) }

		destructor() {
			const inputs = $mol_wire_probe(() => this.input_connected())
			if (! inputs?.length) return

			const node = $mol_wire_probe(() => this.node_raw())
			if (! node ) return

			for( const src of inputs ) {
				src.output().disconnect( node )
			}
			
		}
		
	}
}
