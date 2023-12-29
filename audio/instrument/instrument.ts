namespace $ {
	export class $mol_audio_instrument extends $mol_audio_node {
		override node_raw(): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		@ $mol_mem
		override node() {
			const node = super.node()
			node.onended = $mol_wire_async(() => this.end())

			return node
		}

		duration() {
			return 1
		}

		promise = $mol_promise<void>()

		@ $mol_mem
		wait() {
			return this.promise
		}

		end() {
			this.active( false )
		}

		@ $mol_mem
		active( next?: boolean ): boolean {
			
			$mol_wire_solid()
			
			const node = next === false ? this.node_raw() : this.node()

			const prev = $mol_wire_probe( ()=> this.active() )
			if( prev === next ) return next ?? false

			if( next === true ) {
				node.start()
			} else if( prev === true ) {
				node.stop()
				this.promise.done()
				this.promise = $mol_promise()
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
