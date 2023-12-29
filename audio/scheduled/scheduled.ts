namespace $ {
	export class $mol_audio_scheduled extends $mol_audio_node {
		@ $mol_mem
		override node(): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		duration() {
			return 1000
		}

		@ $mol_mem
		node_configured() {
			return this.node()
		}

		promise = $mol_promise<void>()

		@ $mol_mem
		wait() {
			return this.promise
		}

		@ $mol_mem
		active( next?: boolean ): boolean {
			
			$mol_wire_solid()
			
			const node = this.node_configured()

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
