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
				track.applyConstraints( settings )
			}
			
			return stream
		}
		
	}
}
