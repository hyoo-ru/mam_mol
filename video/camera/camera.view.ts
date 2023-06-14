namespace $.$$ {
	export class $mol_video_camera extends $.$mol_video_camera {
		
		@ $mol_mem
		stream_raw() {
			
			const stream = $mol_wire_sync( navigator.mediaDevices ).getUserMedia({
				video: this.video_constraints(),
			})
			
			return Object.assign( stream, {
				destructor: ()=> stream.getTracks().forEach( track => track.stop() )
			} )
			
		}
		
		@ $mol_mem
		stream() {
			
			const settings = this.video_settings()
			const stream = this.stream_raw()
			
			for( const track of stream.getVideoTracks() ) {
				for( const param in settings ) {
					
					if( param === 'advanced' ) {
						
						for( const constraint of settings.advanced ) {
							
							try {
								track.applyConstraints({ advanced: [ constraint ] })
							} catch( error ) {
								$mol_fail_log( error )
							}
							
						}
						
					} else if( settings[ param ] !== null ) {
					
						try {
							track.applyConstraints({ [ param ]: settings[ param ] })
						} catch( error ) {
							$mol_fail_log( error )
						}
						
					}
					
				}
			}
			
			return stream
		}
		
		dom_node_actual() {
			return super.dom_node_actual() as HTMLVideoElement
		}
		
		transform() {
			return this.facing() === 'user' ? 'scaleX(-1)' : ''
		}
		
	}
}
