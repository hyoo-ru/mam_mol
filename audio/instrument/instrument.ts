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

		@ $mol_action
		start() {
			const node = this.node_raw()
			node.start()
			node.stop(this.duration() + this.current_time())
			this.active(true, true)
		}

		@ $mol_action
		stop() {
			if (! this.active_cached()) return

			this.node_raw().stop()
			this.active(false, false)
		}

		active_cached() {
			return $mol_wire_probe( ()=> this.active() )
		}

		@ $mol_mem
		active_initial(next?: boolean) {
			return next ?? true
		}

		@ $mol_mem
		active( next?: boolean, cached?: boolean ): boolean {
			if (cached !== undefined) return cached
			$mol_wire_solid()

			this.node()

			if( ( next === true || ( next === undefined && this.active_initial() ) ) && ! this.active_cached()) this.start()
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
