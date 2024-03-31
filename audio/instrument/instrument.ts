namespace $ {
	export class $mol_audio_instrument extends $mol_audio_node {
		override node_raw(): AudioScheduledSourceNode {
			throw new Error('implement')
		}

		@ $mol_mem
		override node() {
			const node = super.node()
			node.onended = $mol_wire_async((e: Event) => {
				this.active_cached(false)
				this.end(e)
			})

			return node
		}

		end(e: Event) {}

		@ $mol_action
		start() {
			const node = this.node_raw()
			node.start()
			node.stop(this.duration() + this.current_time())
			this.active_cached(true)
		}

		resume() {
			if ( this.active_cached() ) return
			this.start()
		}

		@ $mol_action
		stop() {
			if (! this.active_cached()) return

			this.node_raw().stop()
		}

		protected active_cached(next?: boolean) {
			if (next !== undefined) new $mol_after_frame(() => this.active(next, 'cache'))
			return next ?? $mol_wire_probe( ()=> this.active() )
		}

		@ $mol_mem
		active_initial(next?: boolean) {
			return next ?? true
		}

		@ $mol_mem
		active( next?: boolean, cached?: 'cache' ): boolean {
			if (cached  === 'cache') return next ?? false
			$mol_wire_solid()

			this.node()

			if( next === true || ( next === undefined && this.active_initial() ) ) {
				this.resume()
				next = true
			}

			if( next === false ) this.stop()
			
			return next ?? false
		}

		override destructor() {
			this.active( false )
			super.destructor()
		}

		@ $mol_mem
		override output() {
			this.active()
			return super.output()
		}

	}
}
