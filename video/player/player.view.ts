namespace $.$$ {

	/**
	 * Video player component
	 * @see https://mol.hyoo.ru/#!section=demos/demo=mol_video_player_demo
	 */
	export class $mol_video_player extends $.$mol_video_player {
		
		dom_node() {
			return super.dom_node() as HTMLVideoElement
		}
		
		@ $mol_mem
		volume( next?: number ) {
			
			this.revolume()
			
			if( next === undefined ) {
				return this.dom_node().volume
			} else {
				return this.dom_node().volume = Math.max( 0, Math.min( next, 1 ) )
			}
			
		}
		
		@ $mol_mem
		time( next?: number ) {
			
			this.retime()
			
			if( next === undefined ) {
				return this.dom_node().currentTime
			} else {
				return this.dom_node().currentTime = Math.max( 0, Math.min( next, this.duration() ) )
			}
			
		}
		
		@ $mol_mem
		duration() {
			this.redurate()
			return this.dom_node().duration
		}
		
		@ $mol_mem
		playing( next?: boolean ) {
			if( next === undefined ) {
				return false
			} else {
				if( next ) {
					this.dom_node().play()
				} else {
					this.dom_node().pause()
				}
				return next
			}
		}
		
		play() {
			this.playing( true )
		}
		
		pause() {
			this.playing( false )
		}
		
	}
}
