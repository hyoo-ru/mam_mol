namespace $.$$ {
	export class $mol_frame extends $.$mol_frame {

		allow() {
			return [
				... this.fullscreen() ? [ 'fullscreen' ] : [] ,
				... this.accelerometer() ? [ 'accelerometer' ] : [] ,
				... this.autoplay() ? [ 'autoplay' ] : [] ,
				... this.encription() ? [ 'encrypted-media' ] : [] ,
				... this.gyroscope() ? [ 'gyroscope' ] : [] ,
				... this.pip() ? [ 'picture-in-picture' ] : [] ,
			].join(';')
		}
		
	}
}
