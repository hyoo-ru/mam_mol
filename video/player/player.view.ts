namespace $.$$ {

	/**
	 * Video player component
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_video_player_demo
	 */
	export class $mol_video_player extends $.$mol_video_player {
		
		override dom_node() {
			return super.dom_node() as HTMLVideoElement
		}
		
		@ $mol_mem
		override volume( next?: number ) {
			
			this.revolume()
			
			if( next === undefined ) {
				return this.dom_node().volume
			} else {
				return this.dom_node().volume = Math.max( 0, Math.min( next, 1 ) )
			}
			
		}
		
		@ $mol_mem
		override time( next?: number ) {
			
			this.retime()
			
			if( next === undefined ) {
				return this.dom_node().currentTime
			} else {
				return this.dom_node().currentTime = Math.max( 0, Math.min( next, this.duration() ) )
			}
			
		}
		
		@ $mol_mem
		override duration() {
			this.redurate()
			return this.dom_node().duration
		}
		
		@ $mol_mem
		override playing( next?: boolean ) {
			const node = this.dom_node()
			this.playing_event()
			this.play_event()

			if( next === undefined ) return ! node.paused

			if( next && node.paused) $mol_wire_sync(node).play()
			if (! next && ! node.paused) node.pause()

			return ! node.paused
		}
		
		override play() {
			this.playing( true )
		}
		
		override pause() {
			this.playing( false )
		}
		
	}
}
