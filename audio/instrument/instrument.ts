namespace $ {
	export class $mol_audio_instrument extends $mol_audio_node {
		override node_raw(): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		@ $mol_mem
		override node() {
			const node = super.node()
			node.onended = $mol_wire_async((e: Event) => {
				this.active(false, false)
				this.end(e)
			})

			return node
		}

		end(e: Event) {}

		@ $mol_mem
		active( next?: boolean, cached?: boolean ): boolean {
			if (cached !== undefined) return cached
			$mol_wire_solid()
			
			const node = next === false ? this.node_raw() : this.node()

			const prev = $mol_wire_probe( ()=> this.active() )
			if( prev === next ) return next ?? false

			if( next === true ) {
				node.start()
			} else if( prev === true ) {
				node.stop()
			}
			
			return next ?? false
		}

		override destructor() {
			this.active( false )
			super.destructor()
		}

		@ $mol_mem
		override output() {
			this.active( true )
			return super.output()
		}

	}
}
