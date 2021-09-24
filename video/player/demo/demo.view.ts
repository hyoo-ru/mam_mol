namespace $.$$ {
	export class $mol_video_player_demo extends $.$mol_video_player_demo {
		
		uri() {
			
			const file = this.files()[0]
			if( !file ) return null!
			
			return URL.createObjectURL( file )
			
		}
		
	}
}
