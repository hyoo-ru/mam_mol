namespace $.$$ {
	export class $mol_video_camera extends $.$mol_video_camera {
		
		@ $mol_mem
		facing( next = 'user' as 'user' | 'environment' ) {
			return next
		}
		
		@ $mol_mem
		stream() {
			
			const stream = $mol_wire_sync( navigator.mediaDevices ).getUserMedia({
				video: {
					facingMode: this.facing(),
				},
			})
			
			return Object.assign( stream, {
				destructor: ()=> stream.getTracks().forEach( track => track.stop() )
			} )
			
		}
		
	}
}
