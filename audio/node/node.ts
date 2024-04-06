namespace $ {
	export class $mol_audio_node extends $mol_object {
		@ $mol_mem
		context_main(next?: $mol_audio_context) {
			return next ?? this.$.$mol_audio_context_main
		}

		context() { return this.context_main().native() }

		@ $mol_mem
		node_raw(): AudioNode { return this.context().destination }

		node() {
			return this.node_raw() as ReturnType<this['node_raw']>
		}

		@ $mol_mem
		input( next = [] as readonly $mol_audio_node[] ) { return next }
		
		@ $mol_mem
		active(next?: boolean) {
			if (next) this.context_main().active(true)
			return next ?? false
		}

		@ $mol_mem
		input_connected() {
			
			const node = this.node()
			
			const prev = $mol_wire_probe( ()=> this.input_connected() ) ?? []
			const next = this.input()
			
			for( const src of prev ) {
				if( next.includes( src ) ) continue
				src.output().disconnect( node )
			}
			
			const context = this.context_main()

			for( const src of next ) {
				src.context_main(context)
				src.output().connect( node )
			}
			
			return next 
		}
		
		@ $mol_mem
		inputs_active() {
			return this.input_connected().some(src => src.active())
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

			const inputs = $mol_wire_probe(() => this.input_connected())
			if (! inputs?.length) return

			for( const src of inputs ) {
				src.output().disconnect( node )
			}
			
		}
		
	}
}
